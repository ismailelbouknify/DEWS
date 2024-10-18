import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvilableRulesComponent } from './avilable-rules/avilable-rules.component';

const routes: Routes = [

  {
    path: 'avilable',
    component: AvilableRulesComponent,
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class RulesRoutingModule {
}
