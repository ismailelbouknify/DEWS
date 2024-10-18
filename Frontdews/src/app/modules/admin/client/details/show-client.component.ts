import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector     : 'show-client',
    templateUrl  : './show-client.component.html',
    styleUrls: ['show-client.component.scss'],

    encapsulation: ViewEncapsulation.None,
    standalone   : false,
})
export class ShowClientComponent implements OnInit{

  
    public client : any;

    constructor(
        public matDialogRef: MatDialogRef<ShowClientComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ShowClientComponent
    )
    {
    }


    ngOnInit() {

        this.client = this.data.client

       
    }

  
    saveAndClose(): void
    {
        this.matDialogRef.close();
    }

    
    discard(): void
    {
    }

   
    
}