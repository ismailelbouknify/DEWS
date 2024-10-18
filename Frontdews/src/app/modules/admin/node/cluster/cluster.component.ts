import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorCustom } from '../../../../core/utils/validatorJson';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AddDialog } from './add/add-dialog';
import { ClusterService } from 'app/core/services/cluster.service';

@Component({
    selector     : 'cluster',
    templateUrl  : './cluster.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone     : true,
    imports        : [MatSidenavModule, RouterOutlet, NgIf, RouterLink, NgFor, MatButtonModule, MatIconModule, MatTooltipModule],
})
export class ClusterComponent implements OnInit {

    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    
    public createForm: FormGroup;
    isDrawerOpen = false;
    public done = false;
    public clusters;


    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        public dialog: MatDialog,
        public service: ClusterService
) {
    }

    ngOnInit() {

        this.service.getAll().subscribe(data => {
            this.clusters = data;
            this.done = true;
        },error => {

        }); 
    }

  
    

  

 
    onBackdropClicked(): void
    {
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});
        this._changeDetectorRef.markForCheck();
    }

  
    toggleDrawer() {
        this.isDrawerOpen = !this.isDrawerOpen;

        if(!this.isDrawerOpen) this._router.navigate(['./'], {relativeTo: this._activatedRoute});

    }

    openDialog() {
        const dialogRef = this.dialog.open(AddDialog, {
            width:'500px',  

        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      }
    


}   
