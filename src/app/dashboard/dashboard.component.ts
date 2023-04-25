import { Component, TemplateRef } from '@angular/core';
import { SessionService } from "../shared/services/session.service";
import { AuthService } from "../authorization/services/auth.service";
import { FileService } from "./services/file-service";
import { BehaviorSubject, debounceTime, first, Subject, switchMap } from "rxjs";
import { FormControl } from "@angular/forms";
import { IUser } from "../shared/interfaces/user.interface";
import { Dialog } from "primeng/dialog";
import { NotificationService } from "../shared/services/notification.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  user$ = this.session.user$;
  shouldUpdateFiles$ = new Subject<void>();
  isAttachPopupVisible = false;

  files$ = this.shouldUpdateFiles$.pipe(
    switchMap(() => this.fileService.downloadAllDocs(this.session.user.userId)),
  );
  filesToUpload: File[] = [];
  isFileLoading$ = new BehaviorSubject(false);

  allUsersToAttach: IUser[] = []
  selectedUsersToAttach: IUser[] = []
  lastUploadedUUID: string = '';

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

  attachAllowedUsers(ref: Dialog, event: any) {
    this.fileService.attachUsers(this.lastUploadedUUID, this.selectedUsersToAttach.map(u => u.userId)).subscribe(() => {
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
    this.fileService.upload(formData).subscribe((data: any) => {
      this.lastUploadedUUID = data.uuid;
      this.isFileLoading$.next(false);
      this.filesToUpload = [];
      this.isAttachPopupVisible = true;
      this.shouldUpdateFiles$.next();
    })
  }
}
