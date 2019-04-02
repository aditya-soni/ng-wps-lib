import { Process } from "./Processes";

export class Capabilities {
    constructor(
        Processes : Process[],
        Details:CapabilityDetail
    ){

    }
}

export class CapabilityDetail {
    constructor( 
        public service:string,
        public version : string
     ){}
}

