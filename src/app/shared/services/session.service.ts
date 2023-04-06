import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser } from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public user$ = new BehaviorSubject<IUser>({} as IUser);

  get user() {
    return this.user$.value;
  }
}
