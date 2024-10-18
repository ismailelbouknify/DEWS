import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cluster } from 'app/core/models/cluster';
import { ClusterService } from 'app/core/services/cluster.service';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'add-dialog',
    templateUrl: 'add-dialog.html',
    standalone: false,
  })
  export class AddDialog implements OnInit {


    public error;
    public createForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private service: ClusterService,
        private _router: Router,
        private dialogRef: MatDialogRef<AddDialog>) {
    }


    ngOnInit() {

      this.createForm =  this.formBuilder.group({
      
        name: ['', [Validators.required, ]],
        description: ['', [Validators.required]],
        });
      
    }

    onSubmit() {

      this.error = ""
      let cluster = new Cluster()

      cluster.description = this.createForm.value.description;
      cluster.name = this.createForm.value.name;

          this.service.create(cluster).subscribe(data => {


          this.dialogRef.close(true);

          this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this._router.navigate(["/node/cluster"]);
          });
    
        },error => {
          this.error = error.error.message        

        }); 
    }

    get name():any { return this.createForm.get('name'); }
    get description():any { return this.createForm.get('description'); }


  }