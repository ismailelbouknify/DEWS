import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Route, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NodeService } from 'app/core/services/node.service';

import { NodeTypeEnum } from 'app/core/models/enums/typeNode';

@Component({
    selector     : 'list-nodes',
    standalone   : false,
    templateUrl  : './list-nodes.component.html',
    styleUrls: ['list-nodes.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ListNodesComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public isLoading = false;

    public displayedColumns: string[] = ['name','cluster','ip','created_at',"node_type","actions"];

    public user_data = [];
    public dataSource = new MatTableDataSource<any>();
    public originalData: any[] = [];  


    public nodeType =  NodeTypeEnum;
    public createForm: FormGroup;
  
    public selectedNodeType = 0;
    constructor(
        private service : NodeService,
        private _router : Router,
        private _matDialog: MatDialog,
        ) {
    }

    ngOnInit() {
        this.service.getAll().subscribe(data => {

            this.originalData = data;

            this.dataSource = new MatTableDataSource<any>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.dataSource.sortingDataAccessor = (item, property) => {
                switch (property) {
                  case 'cluster': return item.cluster.name.toLowerCase();
                  default: return item[property];
                }
              };
          
 
        },error => {
            console.log(error)
        
    
        });  
    }

    addNew(){
        this._router.navigateByUrl("/node/add");

    }
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      
        
        if (this.selectedNodeType === 0) {
          this.dataSource.filter = filterValue;
        } else {
          const filteredNodes = this.originalData
            .filter(node => node.node_type === this.selectedNodeType)
            .filter(node => node.name.toLowerCase().includes(filterValue));
      
          this.dataSource.data = filteredNodes;
        }
      }
   
      applyFilterByType(selectedNodeType) {

        this.selectedNodeType = selectedNodeType.value;
        if (this.selectedNodeType === 0) {
          this.dataSource.data = [...this.originalData];
        } else {
          const filteredNodes = this.originalData.filter(node => node.node_type === this.selectedNodeType);
          this.dataSource.data = filteredNodes;

          console.log(filteredNodes)
        }
      }

      openDetail(element){
        this._router.navigate(['/node/details', element.id]);
          
      }
    
}   
