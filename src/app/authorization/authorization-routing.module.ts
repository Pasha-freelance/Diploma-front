import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from "./authorization.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LogInComponent } from "./log-in/log-in.component";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthorizationComponent,
        children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: 'login', component: LogInComponent },
          { path: 'sign-up', component: SignUpComponent },
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
