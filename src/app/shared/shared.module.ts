import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { LogoComponent } from './components/logo/logo.component';
import { CommonService } from "./services/common";

const angualrMateerialModules = [
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule
];

@NgModule({
  declarations: [
    LogoComponent
  ],
  imports: [
    ...angualrMateerialModules
  ],
  exports: [
    ...angualrMateerialModules,
    LogoComponent
  ],
  providers: [
    CommonService
  ]
})
export class SharedModule { }
