import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common';
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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HttpClientModule } from '@angular/common/http';
import { SchoolsComponent } from './schools.component';
import { SchoolsRoutingModule } from './schools-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SchoolDetailsComponent } from './schools-details/schools-details.component';
 import { BarnegaComponent } from './schools-details/barnega/barnega.component';
 import { SemiDonutComponent } from './schools-details/semidonut/semidonut.component';
 import { Barnega1Component } from './schools-details/barnega1/barnega1.component';
 import { DonutComponent } from './schools-details/donut/donut.component';
 import { Donut1Component } from './schools-details/donut1/donut1.component';
 import { BaretabComponent } from './schools-details/baretab/baretab.component';
 import { Baretab1Component } from './schools-details/baretab1/baretab1.component';
import { Baretab2Component } from './schools-details/baretab2/baretab2.component';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { SemiDonut1Component } from './schools-details/semidonut1/semidonut1.component';


@NgModule({
    imports: [
        HttpClientModule,
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
        MatMenuModule,
        SchoolsRoutingModule,
        MatTabsModule,
        NgxApexchartsModule
    
    ],
    declarations: [SchoolsComponent , SchoolDetailsComponent ,BarnegaComponent,DonutComponent,Donut1Component, BaretabComponent, Baretab1Component , Baretab2Component , SemiDonutComponent, Barnega1Component , SemiDonut1Component],
})
export class SchoolsModule {}
