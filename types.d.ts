
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


export declare interface EntitiesEnum {
    [key: string]: string;
}



/**
 * Interface for the class LocalSessionStorageAPI
 */
export class ILocalSessionStorageAPI<entityName = string, propsType = propsType, storage = Storage> {
    constructor(entityName = string, propsType = propsType, storage = Storage);
    storageChoice: Storage = localStorage;


}

export interface Condition {
    entity: string,
    [key: string]: string | number | Date;
}