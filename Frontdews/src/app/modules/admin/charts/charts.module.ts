import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
    CurrencyPipe,
    DatePipe,
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
import { PieComponent } from './pie/pie.component';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgApexchartsModule } from 'ng-apexcharts';
import { OverviewComponent } from './overview/overview.component';
import { Overview2Component } from './overview2/overview2.component';
import { HttpClientModule } from '@angular/common/http';
import { Pie2Component } from './pie2/pie2.component';
import { DonutComponent } from './donut/donut.component';
import { TimeseriesComponent } from './timeseries/timeseries.component';
import { Donut1Component } from './donut1/donut1.component';
import { BaretabComponent } from './baretab/baretab.component';
import { Baretab1Component } from './baretab1/baretab1.component';
import { Baretab2Component } from './baretab2/baretab2.component';
import { TreemapComponent } from './treemap/treemap.component';
import { BarnegaComponent } from './barnega/barnega.component';
import { SemiDonutComponent } from './semidonut/semidonut.component';
import { Barnega1Component } from './barnega1/barnega1.component';
@NgModule({
    imports: [
        HttpClientModule,
        MatIconModule,
        ChartsRoutingModule,
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
        MatMenuModule,
        NgApexchartsModule,
        MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule, MatTableModule, MatSortModule, NgClass, MatProgressBarModule, CurrencyPipe, DatePipe,
    
    ],
    
    declarations: [ChartsComponent,PieComponent,Pie2Component, OverviewComponent,TimeseriesComponent, DonutComponent,Donut1Component, BaretabComponent, Baretab1Component , Baretab2Component , TreemapComponent,BarnegaComponent , SemiDonutComponent, Barnega1Component
    ],
    exports: [ChartsComponent],

})
export class ChartsModule {}
