import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from "./dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { FileService } from "./services/file-service";
import { FileUploadModule } from "primeng/fileupload";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";

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
    DataViewModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    FormsModule
  ],
  providers: [
    FileService,
  ]
})
export class DashboardModule { }
