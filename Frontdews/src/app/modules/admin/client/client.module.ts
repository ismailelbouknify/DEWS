import { NgModule } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {
    CommonModule,
    NgClass,
    NgFor,
    NgIf,
    NgTemplateOutlet,
} from '@angular/common';
import { FuseAlertComponent, FuseAlertService } from '@fuse/components/alert';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { RowsPipe } from 'app/core/utils/row';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client/client.component';
import { ShowClientComponent } from './details/show-client.component';
import { AddClientComponent } from './add-client/add-client.component';
@NgModule({
    imports: [
        ClientRoutingModule,
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
        MatSnackBarModule,
        MatExpansionModule,
        MatChipsModule,
    ],
    declarations: [AddClientComponent, ShowClientComponent, ClientComponent],
})
export class ClientModule {}
