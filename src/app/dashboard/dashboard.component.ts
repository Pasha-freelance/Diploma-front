import { Component } from '@angular/core';
import { SessionService } from "../shared/services/session.service";
import { AuthService } from "../authorization/services/auth.service";
import { FileService } from "./services/file-service";
import { BehaviorSubject, first, iif, Subject, switchMap, withLatestFrom } from "rxjs";
import { IUser } from "../shared/interfaces/user.interface";
import { Dialog } from "primeng/dialog";
import { NotificationService } from "../shared/services/notification.service";

enum MODE {
  MY,
  SHARED
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  modes = MODE;
  currMode = MODE.MY;
  user$ = this.session.user$;
  shouldUpdateFiles$ = new Subject<void>();
  isAttachPopupVisible = false;
  isManageAccessPopupVisible = false;

  files$ = this.shouldUpdateFiles$.pipe(
    switchMap(() => iif(
      () => this.currMode === MODE.MY,
      this.fileService.downloadAllDocs(this.session.user.userId),
      this.fileService.downloadAllowedToMeDocs(this.session.user.userId)
    )),
  );
  filesToUpload: File[] = [];
  isFileLoading$ = new BehaviorSubject(false);

  allUsersToAttach: IUser[] = []
  selectedUsersToAttach: IUser[] = []
  allowedUsers: IUser[] = [];
  lastUploadedUUID: string = '';
  isSidebarVisible = false;

  constructor(
    private session: SessionService,
    private authService: AuthService,
    private fileService: FileService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('ddUserId')) {
      const id = localStorage.getItem('ddUserId');
      this.authService.getUser(id as string).subscribe(r => {
        this.session.user$.next(r);
        this.shouldUpdateFiles$.next();
      });
    }
  }

  viewDocument(uuid: string) {
    this.fileService.previewDocument(uuid, this.session.user.userId);
  }

  getUsersToAttach(e: any) {
    this.fileService.getUsersToAttach(e.query).pipe(
      first(),
    ).subscribe(users => {
      const a = this.selectedUsersToAttach.map(u => u.userId);

      this.allUsersToAttach = a.length ? users['users'].filter(u => !a.includes(u.userId)) : users.users;
    })
  }

  attachAllowedUsers(ref: Dialog, event: any, edit = false) {
    this.fileService.attachUsers(this.lastUploadedUUID, this.selectedUsersToAttach.map(u => u.userId), edit).subscribe(() => {
      this.lastUploadedUUID = '';
      this.selectedUsersToAttach = [];
      ref.close(event);
      this.notificationService.showSuccess('Users successfully attached')
    });
  }

  onFileSelect(event: any) {
    this.filesToUpload = event?.target?.files;
  }

  uploadFile() {
    this.isFileLoading$.next(true);
    const formData = new FormData();
    formData.append("file", this.filesToUpload[0]);
    this.fileService.upload(formData).subscribe(
      (data: any) => {
      this.lastUploadedUUID = data.uuid;
      this.isFileLoading$.next(false);
      this.filesToUpload = [];
      this.selectedUsersToAttach = [];
      this.isAttachPopupVisible = true;
      this.shouldUpdateFiles$.next();
    },
      e => {
        this.notificationService.showServerError(e)
        this.isFileLoading$.next(false);
        this.filesToUpload = [];
      }
    )
  }

  changeMode(mode: MODE) {
    this.currMode = mode;
    this.shouldUpdateFiles$.next();
    this.isSidebarVisible = false;
  }

  tableHeaderByTab = {
    [MODE.MY]: 'Your documents',
    [MODE.SHARED]: 'Shared with you'
  }

  openManageAccessPopup(uuid: string) {
    this.isManageAccessPopupVisible = true;
    this.lastUploadedUUID = uuid;
    this.fileService.getAllowedUsersForDoc(uuid).subscribe(resp => {
      this.selectedUsersToAttach = resp.users;
    });
  }
}
