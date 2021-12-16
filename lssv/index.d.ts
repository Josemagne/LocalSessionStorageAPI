import { Entity, Props, Condition } from './types';
declare class lssv {
    /**
     * Object that contains the key of the entity in the key and the type of the value in the value.
     * The object's lifetime is during the runtime of the program.
     */
    entities: Entity[];
    events: string[];
    /**
     * Defines the default web storage choice that we are handling. If no storage is specified in the methods then we use the value of storageChoice
     * The options are either localStorage or sessionStorage.
     * The predefined storage type is localStorage.
     */
    private storageChoice;
    /**
     * lssv accepts a limit of 5mb per web storage. Since the web storage saves the characters in unicode (16 bits per character) we stop if 'limit' reached 300'000.
     */
    private limit;
    /**
     * @param storage Type of web storage the object will use by default.
     */
    constructor(storage?: Storage);
    /**
     * Creates an entity
     * @param entityName Name of the entity
     * @param entityProps The properties of the entity
     * @param storage Which storage to interact with
     */
    addEntity: (entityName: string, entityProps: Props, storage?: Storage) => Promise<boolean>;
    /**
     * Inserts an instance into the web storage.
     * @param entityName Name of entity
     * @param props Obj with the properties of the instance
     * @param autoIncrement A property that is auto incrementing
     * @param storage Type of web storage
     * @returns Promise Returns a promise based true for success and false for failure.
     */
    createInstance: (entityName: string, props: Props, storage?: Storage) => Promise<boolean>;
    /**
     * Loop that uses createInstance()
     * @param entityName Name of entity
     * @param props Properties of the instance
     * @param storage Type of web storage
     */
    createInstances: (entityName: string, props: Props[], storage?: Storage) => Promise<boolean>;
    /**
     * Creates an object
     * @param objectName Name of storageObject
     * @param data
     * @param storage
     */
    createStorageObject: (objectName: string, data: Props, storage?: Storage) => Promise<boolean>;
    /**
     * Get all the instances of an entity
     * @param entity Entity whose instances we want to retrieve
     * @param storage What kind of web storage we want to access
     */
    getInstances: (entityName: string, storage?: Storage) => Promise<Props[] | null>;
    /**
     * Retrieves instances that fulfill certain conditions
     */
    getEntityWithCondition: (condition: Condition) => void;
    /**
* Retrieves first instance that fulfills a given condition
     * @param condition Condition
     */
    getInstanceWithCondition: (condition: Condition) => void;
    getStorageObject: (objectName: string, storage?: Storage) => any;
    /**
     * Changes the properties type of an entity.
     * @param entityName Name of entity
     * @param storage Type of web storage
     * @returns Promise Returns a promise based true for success and false for failure.
     */
    updateEntity: (entityName: string, newProps: Props, storage?: Storage) => Promise<boolean>;
    /**
     * Changes the value of the properties for an instance.
     * @param entityName Name of entity
     * @param instanceID ID of instance
     * @param instanceProps New props for the instance
     * @param storage Type of web storage
     * @returns Promise Returns a promise based true for success and false for failure.
     */
    updateInstance: (entityName: string, instanceID: number, newProps: Props, storage?: Storage) => Promise<boolean>;
    /**
     * Updates all the instances of an entity.
     * @param entityName Name of entity
     * @param instanceID ID of instance
     * @param newProps New props for the instances
     * @param storage
     * @returns Promise Returns a promise based true for success and false for failure.
     */
    updateInstances: (entityName: string, instanceID: number, newProps: Props, storage?: Storage) => Promise<boolean>;
    updateWithCondition: () => void;
    updateObject: () => void;
    /**
     * Deletes all instances of an entity
     * @param entity Entity we want to delete
     */
    deleteEntity: (entityName: string, storage?: Storage) => void;
    deleteInstance: () => void;
    /**
     * Deletes an entire storage
     */
    deleteStorage: (storage?: Storage) => void;
    /**
     * Deletes certain instances if certain conditions are fulfilled
     */
    deleteWithCondition: () => void;
    deleteObject: () => void;
    migrateInstances: () => void;
    convertJSON: () => void;
    /**
     * Populates 'entities' with data
     */
    private loadToEntities;
    /**
     * Populates redux with the web storage content
     */
    private loadToRedux;
    /**
     * Returns the total number of instances for an entity
     * We have an item with the key 'numberOfInstances' on each entity that stores how much instances an entity has
     */
    private getNumberOfInstances;
    /**
     * Returns the number of entities that is stored in 'numberOfEntities'.
     * @param storage Type of web storage
     */
    private getNumberOfEntities;
    /**
  * Gets the properties of an entity
  * @param entityName Name of entity
  * @param storage Type of web storage
*/
    private getProperties;
    /**
     * Gets the id of the entity.
     * @param entityName Name of the entity
     * @param storage Type of web storage
     * @returns ID of the entity
     */
    private getEntityID;
    private updateProps;
    /**
     * Is only invoked by createInstance() and getObject(). The function gets the keys from 'propsArray' and the values from the specific instance and returns an object
     */
    private composeInstance;
    private checkEntity;
    /**
     * Gets either the necessary or optional props of an entity. If 'necessaryProps' is true then it returns the properties of the given entity that must be specified. If 'necessaryProps' is false then we return the optional properties
     * @param entityName Name of entity
     * @param optionalProps Decides if we want the necessaryProps
     * @param storage
     */
    private getCertainProps;
    /**
     * Helper method that gets the kind of the properties for an object
     * @param prop The object whose properties is going to be extracted
     * @param necessary Decides if we return only the necessary or optional props
     */
    private getPropsOfObject;
    /**
     *
     * @param eventName Name of event
     * @param description The description for later lookup
     * @param thing Options: entity, object
     * @param callBackFn Function that gets executed if a an event g
     * @version 1.1.7
     */
    createEvent: (eventName: string, description: string, callBackFn: () => void) => void;
    private listenToEvent;
    removeEvent: (eventName: string, callBackFn: EventListenerObject) => void;
}
export default lssv;
