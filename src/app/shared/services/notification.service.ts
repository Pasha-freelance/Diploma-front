import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class NotificationService {

  constructor(
    private _snackBar: MatSnackBar
  ){}

  showServerError(e: { error: string, statusCode?: number }): void {
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
  }
}
