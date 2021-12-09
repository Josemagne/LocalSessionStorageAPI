import { Entity, Props, Condition } from './types';
declare class lssv {
    /**
     * Object that contains the key of the entity in the key and the type of the value in the value.
     * The object's lifetime is during the runtime of the program.
     */
    entities: Entity[];
    /**
     * Defines the default web storage choice that we are handling. If no storage is specified in the methods then we use the value of storageChoice
     * The options are either localStorage or sessionStorage.
     * The predefined storage type is localStorage.
     */
    private storageChoice;
    /**
     * @param storage Type of web storage the object will use by default.
     */
    constructor(storage?: Storage);
    /**
     *
     * @param entityProps The properties of the entity
     * @param storage Which storage to interact with
     */
    addEntity: (entityName: string, entityProps: Props, storage?: Storage) => void;
    /**
     * Inserts an instance into the web storage.
     * @param entityName Name of entity
     * @param props Obj with the properties of the instance
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
    createObject: () => void;
    /**
     * Get all the instances of an entity
     * @param entity Entity whose instances we want to retrieve
     * @param storage What kind of web storage we want to access
     */
    getInstances: (entityName: string, storage?: Storage) => Promise<Props[] | null>;
    /**
     * Retrieves instances that fulfill certain conditions
     */
    getWithCondition: (condition: Condition) => void;
    getObjects: () => void;
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
    migrateEntities: () => void;
    migrateInstances: () => void;
    convertJSON: () => void;
    /**
     * Populates 'entities' with data
     */
    private loadData;
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
    /**
     * Is only invoked by createInstance(). Tests if the instance values respect the specification at propertiesType.
     * @param entityName Name of entity
     * @param instanceValues Array with the values of the instance
     * @returns Promise Returns either true or an error message
     */
    private checkInstance;
}
export default lssv;
//# sourceMappingURL=index.d.ts.map