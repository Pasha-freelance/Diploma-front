import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { accountModuleAnimation } from "../../../shared/animations/routerTransition";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  animations:[accountModuleAnimation()]

})
export class LogInComponent {

  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthService,
    private notificationService: NotificationService
  ) {
  }

  redirectToSignUp(): void {
    this.router.navigate(['/auth/signup'])
  }

  login() {
    this.service.login(this.form.value).subscribe();
  }
}
