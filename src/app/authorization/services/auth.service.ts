import { Injectable } from "@angular/core";
import { CommonService } from "../../shared/services/common";
import { ILoginDto } from "../interfaces/login-dto.interface";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService extends CommonService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  login(data: ILoginDto) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  register(data: ILoginDto) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }
}
