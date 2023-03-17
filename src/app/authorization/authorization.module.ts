import { NgModule } from '@angular/core';

import { AuthorizationComponent } from './authorization.component';
import { AuthorizationRoutingModule } from "./authorization-routing.module";
import { SignUpComponent } from "./components/sign-up/sign-up.component";
import { SharedModule } from "../shared/shared.module";
import { LogInComponent } from "./components/log-in/log-in.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthService } from './services/auth.service';

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
    RouterModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AuthorizationComponent]
})
export class AuthorizationModule {
}
