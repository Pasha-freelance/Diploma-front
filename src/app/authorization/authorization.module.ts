import { NgModule } from '@angular/core';

import { AuthorizationComponent } from './authorization.component';
import { AuthorizationRoutingModule } from "./authorization-routing.module";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { SharedModule } from "../shared/shared.module";
import { LogInComponent } from "./components/log-in/log-in.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AuthorizationComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    AuthorizationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule
  ],
  providers: [
  ],
  bootstrap: [AuthorizationComponent]
})
export class AuthorizationModule {
}
