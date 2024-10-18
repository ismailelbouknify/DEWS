import { ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'app/core/services/client.service';
import { Client } from 'app/core/models/client';

@Component({
    selector     : 'add-client',
    templateUrl  : './add-client.component.html',
    styleUrls: ['add-client.component.scss'],

    encapsulation: ViewEncapsulation.None,
    standalone   : false,
})
export class AddClientComponent implements OnInit{

    public createForm: FormGroup;
    
    public _edit = false;
    public _edit_client : any;

    constructor(
        public matDialogRef: MatDialogRef<AddClientComponent>,
        private formBuilder: FormBuilder,
        private service  : ClientService,
        private _router : Router,
        private _snackBar: MatSnackBar,
        private cd: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: AddClientComponent
        ){
    }


    ngOnInit() {

        if(this.data._edit){
            this._edit = this.data._edit
            this._edit_client = this.data._edit_client

        }


      
    
        this.createForm =  this.formBuilder.group({
      
            name: [this.data._edit ? this.data._edit_client.name : '', [Validators.required]],
            email: [this.data._edit ? this.data._edit_client.email : '', [Validators.required]],
            phone: [this.data._edit ? this.data._edit_client.phone : '', [Validators.required]],
            adress: [this.data._edit ? this.data._edit_client.adress : '', [Validators.required]],
            country: [this.data._edit ? this.data._edit_client.country : '', [Validators.required]],
            organization: [this.data._edit ? this.data._edit_client.organization : '', [Validators.required]],


            })
        


    }
   
    onSave() {


        let client = new Client();

        client.name = this.createForm.value.name;
        client.phone = this.createForm.value.phone;
        client.email = this.createForm.value.email;
        client.organization = this.createForm.value.organization;
        client.country = this.createForm.value.country;
        client.adress = this.createForm.value.adress;



        if(this._edit){
            
            let id = this._edit_client.id;
            client.id = id;

            this.service.update(id,client).subscribe(data => {
                this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this._router.navigate(["/client"]);
                  });
                this.openSnackBar("Client updated successfully","success")

                this.saveAndClose();
    
            },error => {
                this.openSnackBar(error.error.message,"faild")  
            });  
        }else{
            this.service.create(client).subscribe(data => {
                this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                    this._router.navigate(["/client"]);
                  });

                  this.openSnackBar("client created successfully","success")

    
                this.saveAndClose();
    
            },error => {
                this.openSnackBar(error.error.message,"faild")  
            });  
    
        }
    }
  
    saveAndClose(): void
    {
        this.matDialogRef.close();
    }

    
  
   
  
    
   

    openSnackBar(message,classe) {
        this._snackBar.open(message, 'Ok', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 7 * 1000,
          panelClass : [classe]

        });
      }

}