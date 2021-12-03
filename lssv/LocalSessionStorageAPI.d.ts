import { Entities, Props, Condition } from './types';
declare class LocalSessionStorageAPI {
    /**
     * Object that contains the key of the entity in the key and the type of the value in the value.
     * The object's lifetime is during the runtime of the program.
     */
    static entities: Entities;
    /**
     * Contains the name of entities
     */
    entitiesList: string[];
    /**
     * Defines the default web storage choice that we are handling. If no storage is specified in the methods then we use the value of storageChoice
     * The options are either localStorage or sessionStorage.
     * The predefined storage type is localStorage.
     */
    static storageChoice: Storage;
    /**
     * In order to work with the API we must know which properties the entity has.
     * @example An entity Book has for example the properties: 'title', 'pages', 'language',
     * @param props Object that contains the props of of the entity
     */
    constructor(entityName: string, propsType: Props, storage?: Storage);
    /**
     *
     * @param entityProps The properties of the entity
     * @param storage Which storage to interact with
     */
    addEntity: (entityName: string, entityProps: Props, storage?: Storage) => void;
    /**
     *
     * @param entityName Name of entity
     * @param props Obj with the properties of the instance
     * @param storage Type of web storage
     */
    createInstance: (entityName: string, props: Props, storage?: Storage) => void;
    /**
     * Gets a single instance from an entity
     * @param entityName Name of entity
     * @param id Id of the instance
     * @param storage
     * @returns Object that represents an instance of an entity
     */
    getInstance: (entityName: string, id: number, storage?: Storage) => Props | null;
    /**
     * Get all the instances of an entity
     * @param entity Entity whose instances we want to retrieve
     * @param storage What kind of web storage we want to access
     */
    getInstances: (entityName: string, storage?: Storage) => Props[] | null;
    /**
    * Gets the properties of an entity
    * @param entityName Name of entity
    * @param storage Type of web storage
    */
    private getProperties;
    /**
     * Retrieves instances that fulfill certain conditions
     */
    getWithCondition: (condition: Condition) => void;
    /**
     * Changes the properties type of an entity. It returns a promise based true for success and false for failure.
     * @param entityName Name of entity
     * @param storage Type of web storage
     */
    updateEntity: (entityName: string, newProps: Props, storage?: Storage) => Promise<boolean>;
    /**
     * Changes the value of the properties for an instance. It returns a promise based true for success and false for failure.
     * @param entityName Name of entity
     * @param instanceID ID of instance
     * @param instanceProps New props for the instance
     * @param storage Type of web storage
     */
    updateInstance: (entityName: string, instanceID: number, newProps: Props, storage?: Storage) => Promise<boolean>;
    /**
     * Updates all the instances of an entity. It returns a promise based true for success and false for failure.
     * @param entityName Name of entity
     * @param instanceID ID of instance
     * @param newProps New props for the instances
     * @param storage
     */
    updateInstances: (entityName: string, instanceID: number, newProps: Props, storage?: Storage) => Promise<boolean>;
    updateWithCondition: () => void;
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
    /**
     * Returns the total number of instances for an entity
     * We have an item with the key 'numberOfInstances' on each entity that stores how much instances an entity has
     */
    private getNumberOfInstances;
    /**
     * Returns the number of entities
     * @param storage Type of web storage
     */
    private getNumberOfEntities;
    /**
     *
     * @param entityName Name of the entity
     * @param storage Type of web storage
     * @returns ID of the entity
     */
    private getEntityID;
    private updateProps;
}
export default LocalSessionStorageAPI;
//# sourceMappingURL=LocalSessionStorageAPI.d.ts.map