import { NgModule } from '@angular/core';

import { AuthorizationComponent } from './authorization.component';
import { AuthorizationRoutingModule } from "./authorization-routing.module";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { AngularMaterialModule } from "../shared/angular-material.module";
import { LogInComponent } from "./log-in/log-in.component";

@NgModule({
  declarations: [
    AuthorizationComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    AuthorizationRoutingModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AuthorizationComponent]
})
export class AuthorizationModule { }
