import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClusterComponent } from '../cluster.component';
import { Cluster } from 'app/core/models/cluster';
import { ClusterService } from 'app/core/services/cluster.service';

@Component({
    selector       : 'file-manager-details',
    templateUrl    : './details.cluster.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : false,

})
export class ClusterDetailsComponent implements OnInit
{
 
    public cluster : any;
    public done = false;

    constructor(
        private _clusterComponent: ClusterComponent ,
        private route: ActivatedRoute  ,
        private service: ClusterService)
    {
    }

    
    ngOnInit()
    {

        this.route.params.subscribe(params => {
            this.service.getById(params['id']).subscribe(data => {
                this.cluster = data;

                this.done = true;
                

                
            },error => {
    
            }); 
        });

    }

  
    closeDrawer()
    {
        this._clusterComponent.toggleDrawer();
    }

   
}