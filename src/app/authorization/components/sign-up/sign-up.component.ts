import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { accountModuleAnimation } from "../../../shared/animations/routerTransition";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  animations:[accountModuleAnimation()]
})
export class SignUpComponent {

  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AuthService
  ) {
  }

  register() {
    this.service.register(this.form.value).subscribe()
  }

  redirectToLogin(): void {
    this.router.navigate(['/auth/login'])
  }
}
