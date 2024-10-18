import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListNodesComponent } from './list-nodes/list-nodes.component';
import { AddNodeComponent } from './add-node/add-node.component';
import { ClusterComponent } from './cluster/cluster.component';
import { ClusterDetailsComponent } from './cluster/details/details.cluster.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddNodeComponent,
  },
  {
    path: 'list',
    component: ListNodesComponent,
  },  
  {
    path: 'cluster',
    component: ClusterComponent,

    children : [
      {
          path     : 'details/:id',
          component: ClusterDetailsComponent
      }]

 
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
export class UserRoutingModule {
}
