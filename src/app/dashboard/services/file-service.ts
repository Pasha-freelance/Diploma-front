import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "../../shared/services/common";
import { IDocumentsList } from "../interfaces/document.interface";
import { SessionService } from "../../shared/services/session.service";
import { IUser } from "../../shared/interfaces/user.interface";

@Injectable()
export class FileService extends CommonService{


  constructor(
    private http: HttpClient,
    private session: SessionService,
  ) {
    super();
  }

  downloadAllDocs(id: string) {
    return this.http.get<IDocumentsList>(`${this.apiUrl}/dashboard/documents/downloadAll?userId=${id}`);
  }

  downloadAllowedToMeDocs(id: string) {
    return this.http.get<IDocumentsList>(`${this.apiUrl}/dashboard/documents/allowedToMe?userId=${id}`);
  }

  previewDocument(uuid: string, userId: string) {
    return window.open(`${this.apiUrl}/dashboard/documents/download?userId=${userId}&uuid=${uuid}`, '_blank');
  }

  upload(file: FormData) {
    return this.http.post(`${this.apiUrl}/dashboard/documents/upload?userId=${this.session.user.userId}`, file);
  }

  getUsersToAttach(email: string) {
    return this.http.get<{ users: IUser[]}>(
      `${this.apiUrl}/dashboard/documents/usersToAttach?profileId=${this.session.user.userId}&email=${email}`
    );
  }

  attachUsers(uuid: string, profileIds: string[]) {
    return this.http.post<any[]>(
      `${this.apiUrl}/dashboard/documents/attachAllowedUsers`,
      {
        uuid,
        allowedUsers: profileIds
      }
    );
  }
}
