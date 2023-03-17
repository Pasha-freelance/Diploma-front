import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable()
export class CommonService {

  public apiUrl = environment.api;
}
