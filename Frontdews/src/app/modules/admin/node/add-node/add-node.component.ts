import { Cluster } from './../../../../core/models/cluster';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NodeService } from 'app/core/services/node.service';
import { ClusterService } from 'app/core/services/cluster.service';
import { ClientService } from 'app/core/services/client.service';
import { Client } from 'app/core/models/client';
import { Node } from 'app/core/models/node';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
    selector     : 'add-node',
    standalone   : false,
    templateUrl  : './add-node.component.html',
    styleUrls: ['add-node.component.scss','./../../../../core/utils/snackbar.scss'],

    encapsulation: ViewEncapsulation.None,
})
export class AddNodeComponent implements OnInit {


    public createForm: FormGroup;
    public selectedClient;
    public selectedTemplate;

    public clusters = []
    public clients = []
    public templates = []

    public node:any;

    constructor(
        private formBuilder: FormBuilder,
        private clusterService : ClusterService,
        private clientService : ClientService,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private service : NodeService) {
    }

    ngOnInit() {



        
        this.clusterService.getAll().subscribe(data => {
            this.clusters = data ;
      
        },error => {
        
    
        });
        
        this.clientService.getAll().subscribe(data => {
            this.clients = data ;
      
        },error => {
        
    
        });    
          
     
        this.createForm =  this.formBuilder.group({
            step0: this.formBuilder.group({
                client: ['', Validators.required],
            }),
            step1: this.formBuilder.group({
                template: ['', Validators.required],
            }),
            step2: this.formBuilder.group({
                cluster   : ['', [Validators.required]],
                node_type   : [1, [Validators.required]],
                name   : ['', [Validators.required]],
                description   : ['New node', [Validators.required]],
                serial_number   : ['223ASDASD222', [Validators.required]],
                ip   : ['192.168.0.1', [Validators.required]],
                hostname   : ['localhost', [Validators.pattern,Validators.pattern("[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")]],

            }),

        
        })

        this.createForm.get('step0.client').valueChanges.subscribe((client) => {
            this.selectedClient = client;
        });
        this.createForm.get('step1.template').valueChanges.subscribe((template) => {
            this.selectedTemplate = template;
        });  
    }

    onSubmit() {
    

        let node = new Node()

        node.name  = this.createForm.get("step2").value.name
        node.description  = this.createForm.get("step2").value.description
        node.serial_number  = this.createForm.get("step2").value.serial_number
        node.node_type  = this.createForm.get("step2").value.node_type
        node.ip  = this.createForm.get("step2").value.ip
        node.hostname  = this.createForm.get("step2").value.hostname
        node.cluster  = this.createForm.get("step2").value.cluster


        node.client  = this.createForm.get("step0").value.client
        //node.template  = this.createForm.get("step1").value.template


        

        this.service.create(node).subscribe(data => {

            this.openSnackBar("Node created successfully","success")
            this._router.navigateByUrl("/node/list");


        },error => {
            console.log(error)
            this.openSnackBar(error.error.message,"faild")

    
        }); 
    
      }
      openSnackBar(message: string, classe: string) {
        this._snackBar.open(message, 'Ok', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 7 * 1000,
          panelClass: [classe]
        });
      }

}   
