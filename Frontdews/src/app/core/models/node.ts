import { Client } from "./client";
import { Cluster } from "./cluster";

export class Node {

    id: string;
    name: string;
    node_type: number;
    serial_number : string;
    description: string;
    ip: string;
    hostname: string;
    cluster : Cluster;
    client: Client;


    
    
}
