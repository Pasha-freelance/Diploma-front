import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { LogoComponent } from './components/logo/logo.component';
import { CommonService } from "./services/common";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NotificationService } from "./services/notification.service";

const angularMaterialModules = [
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [
    LogoComponent
  ],
  imports: [
    ...angularMaterialModules
  ],
  exports: [
    ...angularMaterialModules,
    LogoComponent
  ],
  providers: [
    CommonService,
    NotificationService
  ]
})
export class SharedModule { }
