import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonService } from "../../shared/services/common";
import { IDocumentsList } from "../interfaces/document.interface";

@Injectable()
export class FileService extends CommonService{


  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  downloadAllDocs(id: string) {
    return this.http.get<IDocumentsList>(`${this.apiUrl}/dashboard/documents/downloadAll?userId=${id}`);
  }

  previewDocument(uuid: string, userId: string) {
    return window.open(`${this.apiUrl}/dashboard/documents/download?userId=${userId}&uuid=${uuid}`, '_blank');
  }
}
