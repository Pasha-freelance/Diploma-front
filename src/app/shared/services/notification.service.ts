import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotificationService {

  constructor(
    private _snackBar: MatSnackBar
  ){}

  showServerError(e: { error: string, statusCode?: number }): Observable<null> {
    this._snackBar.open(
      e.error.toString(),
      '',
      {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 2000,
        panelClass: 'snackbar_error'
      }
    )
    return of(null)
  }

  showSuccess(text: string){
    this._snackBar.open(
      text,
      '',
      {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 2000,
        panelClass: 'snackbar_success'
      }
    )
    return of(null)
  }
}
