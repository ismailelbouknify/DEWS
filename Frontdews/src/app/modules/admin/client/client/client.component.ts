import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'app/core/services/client.service';
import { ShowClientComponent } from '../details/show-client.component';
import { AddClientComponent } from '../add-client/add-client.component';
@Component({
    selector     : 'client',
    standalone   : false,
    templateUrl  : './client.component.html',
    styleUrls: ['client.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ClientComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public isLoading = false;

    public displayedColumns: string[] = ['name',"email","organization","actions"];

    public user_data = [];
    public dataSource = new MatTableDataSource<any>();
    
  
    public createForm: FormGroup;
  
    constructor(
        private service : ClientService,
        private _router : Router,
        private _matDialog: MatDialog,
        ) {
    }

    ngOnInit() {
        this.service.getAll().subscribe(data => {


            this.dataSource = new MatTableDataSource<any>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

        },error => {
            console.log(error)
        
    
        });  
        this.user_data
    }


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openDialog(_client) {

        const dialogRef = this._matDialog.open(ShowClientComponent,{
            data : {client: _client},
            //height : 'auto',
            //maxHeight: 'calc(100vh - 50px)',
        });

        dialogRef.afterClosed()
            .subscribe((result) =>
            {
                console.log('Compose dialog was closed!');
            });
    }

    addClient() {

        const dialogRef = this._matDialog.open(AddClientComponent,{
            data : {_edit: false},

            height : 'auto',
            maxHeight: 'calc(100vh - 50px)',
        });

        dialogRef.afterClosed().subscribe((result) =>{console.log('Dialog was closed!');});
    }
    editClient(client) {

        const dialogRef = this._matDialog.open(AddClientComponent,{
            data : {_edit: true, _edit_client:client},
            height : 'auto',
            maxHeight: 'calc(100vh - 50px)',
        });

        dialogRef.afterClosed().subscribe((result) =>{console.log('Dialog was closed!');});
    }

    

    

}   
