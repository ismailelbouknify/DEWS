export type SensorType = {
    id?: string;
    service_id: string;
    name: string;
    version: string;
    description?: string;
    image?: string;
    // TODO: ahmed: fix this one
    service_params?: any;
};

export type ClusterType = {
    id: string;
    cluster_id: string;
    name: string;
};

export type NodeType = {
    node_id: string;
    node_name: string;
    node_type: string;
    ip: string;
    hostname: string;
};
