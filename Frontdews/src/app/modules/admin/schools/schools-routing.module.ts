import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolsComponent } from './schools.component';
import { SchoolDetailsComponent } from './schools-details/schools-details.component';
import { MarkdownModule } from 'ngx-markdown';

const routes: Routes = [
  {
    path: '',
    component: SchoolsComponent,
  },
  {
    path: ':school_name',
    component: SchoolDetailsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MarkdownModule.forRoot(),
  ],
  exports: [
    RouterModule,
  ],
})
export class SchoolsRoutingModule { }
