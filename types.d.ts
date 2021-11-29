
declare interface Props {
    [key: string]: string;
}


declare interface Entity {
    id: number;
    name: string;
    props: Props;
    numberOfInstances: number;
}

/**
 * Interface for the object 'entities'
 */
declare interface Entities {
    localStorage: {
        [key: string]: Entity
    };
    sessionStorage: {
        [key: string]: Entity
    }

}


/**
 *  A collection of all the instances of an Entity
 * 
 *  */
declare type EntityCollection = Props[];

