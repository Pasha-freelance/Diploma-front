import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { FileService } from "./services/file-service";
import { FileUploadModule } from "primeng/fileupload";
import { AuthService } from "../authorization/services/auth.service";
import { DataViewModule } from "primeng/dataview";

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    SharedModule,
    RouterModule,
    FileUploadModule,
    DataViewModule
  ],
  providers: [
    FileService,
  ]
})
export class DashboardModule { }
