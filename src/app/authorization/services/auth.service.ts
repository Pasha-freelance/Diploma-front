import { Injectable } from "@angular/core";
import { CommonService } from "../../shared/services/common";
import { ILoginDto } from "../interfaces/login-dto.interface";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { IUser } from "../../shared/interfaces/user.interface";
import { catchError, tap } from "rxjs";
import { SessionService } from "../../shared/services/session.service";
import { NotificationService } from "../../shared/services/notification.service";

@Injectable()
export class AuthService extends CommonService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private session: SessionService,
    private notificationService: NotificationService
  ) {
    super();
  }

  login(data: ILoginDto) {
    return this.http.post<IUser>(`${this.apiUrl}/auth/login`, data).pipe(
      tap(response => {
        if (response.token) {
          this.cacheUser(response)
        }
      }),
      catchError(e => this.notificationService.showServerError(e))
    );
  }

  register(data: ILoginDto) {
    return this.http.post<IUser>(`${this.apiUrl}/auth/register`, data).pipe(
      tap(response => {
        if (response.token) {
          this.cacheUser(response);
        }
      }),
      catchError(e => this.notificationService.showServerError(e))
    );
  }

  cacheUser(user: IUser) {
    localStorage.setItem('ddtoken', user.token);
    localStorage.setItem('ddUserId', user.userId);
    this.session.user$.next(user);
    this.router.navigate(['/dashboard'])
  }

  getUser(userId: string) {
    return this.http.get<IUser>(`${this.apiUrl}/auth/getUser?userId=${userId}`)
  }
}
