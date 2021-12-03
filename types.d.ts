
/**
 * Represents propertiesType and the instance of an entity
 */
export declare interface Props {
    [key: string]: string;
}


export declare interface Entity {
    id: number;
    name: string;
    props: Props;
    numberOfInstances: number;
}

/**
 * Interface for the object 'entities'
 */
export declare interface Entities {
    localStorage: {
        [key: string]: Entity
    };
    sessionStorage: {
        [key: string]: Entity
    }

}

export declare interface EntitiesEnum {
    [key: string]: string;
}


/**
 *  A collection of all the instances of an Entity
 * 
 *  */
export declare type EntityCollection = Props[];


export class ILocalSessionStorageAPI<entityName = string, propsType = propsType, storage = Storage> {
    constructor(entityName = string, propsType = propsType, storage = Storage);
    storageChoice: Storage = localStorage;


}

export interface Condition {
    entity: string,
    [key: string]: string | number | Date;
}