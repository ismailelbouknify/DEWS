import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { FuseAlertComponent, FuseAlertService } from '@fuse/components/alert';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { AvilableRulesComponent } from './avilable-rules/avilable-rules.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { RulesRoutingModule } from './rules-routing.module';


@NgModule({
  imports: [
    RulesRoutingModule,
    MatIconModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatOptionModule, 
    MatDividerModule, 
    MatCheckboxModule, 
    MatRadioModule, 
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    FuseAlertComponent,
    NgTemplateOutlet,
    MatProgressBarModule, 
    MatSortModule, 
    NgFor, 
    NgClass,
    MatTableModule, 
    MatPaginatorModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDialogModule,
    CommonModule,
    MatStepperModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatExpansionModule
],
declarations: [
  AvilableRulesComponent,

  ]
})
export class RulesModule { }