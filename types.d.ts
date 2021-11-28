declare interface Props {
    [key: string]: string;
}


declare interface Entity {
    name: string;
    props: Props;
    numberOfInstances: number;
}

/**
 *  A collection of all the instances of an Entity
 * 
 *  */
declare type EntityCollection = Props[];


