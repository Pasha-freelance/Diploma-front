import { Component } from '@angular/core';
import { SessionService } from "../shared/services/session.service";
import { AuthService } from "../authorization/services/auth.service";
import { FileService } from "./services/file-service";
import { IDocumentsList } from "./interfaces/document.interface";
import { filter, switchMap } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  user$ = this.session.user$;
  files$ = this.user$.pipe(
    filter(u => !!u),
    switchMap(u => this.fileService.downloadAllDocs(u.userId))
  );
  uploadedFiles: any[] = [];

  constructor(
    private session: SessionService,
    private authService: AuthService,
    private fileService: FileService
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('ddUserId')) {
      const id = localStorage.getItem('ddUserId');
      this.authService.getUser(id as string).subscribe(r => this.session.user$.next(r))
    }
  }

  viewDocument(uuid: string) {
    this.fileService.previewDocument(uuid, this.session.user.userId);
  }

  onUpload(event: { files: File[] }) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  get fileUploadLink() {
    return `${this.authService.apiUrl}/dashboard/documents/upload?userId=${this.session.user.userId}`
  }
}
