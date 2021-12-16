

/**
 * Represents propertiesType and the instance of an entity
 */
export declare interface Props {
    [key: string]: string | Object | string[] | number[];
}


export declare interface LSSVEvent extends CustomEvent {
    /**
     * That what changed
     */
    detail: {

        /**
         * The name of the entity where a change of state happened
         */
        entityName: string;
        /**
         * ID of the instanced that is no longer the same as before
         */
        instanceID: string | number | string[] | number[];
        /**
         * Defines what exactly happend to the entity
         */
        mode: "updated" | "deleted" | "created"
    }

}



export declare interface Entity {
    id: number;
    props: Props;
    events: { [eventName: string]: LSSVEvent }
}


/**
 * Object with key being the key of entity and value an object with data of entity
 */
export declare interface EntitiesEnum {
    [key: string]: Entity;
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