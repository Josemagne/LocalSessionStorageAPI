import { EntitiesEnum, Entity, Props, ILocalSessionStorageAPI, Condition } from './types';

class lssv {

    /**
     * Object that contains the key of the entity in the key and the type of the value in the value.
     * The object's lifetime is during the runtime of the program.
     */

    // TODO The object is not populated --> populate it
    public entities: Entity[] = [];





    /**
     * Defines the default web storage choice that we are handling. If no storage is specified in the methods then we use the value of storageChoice
     * The options are either localStorage or sessionStorage.
     * The predefined storage type is localStorage.
     */
    private storageChoice: Storage = localStorage;



    // initiate
    /**
     * In order to work with the API we must know which properties the entity has.
     * @example An entity Book has for example the properties: 'title', 'pages', 'language',
     * @param props Object that contains the props of of the entity
     */
    constructor(storage: Storage = localStorage) {
        // set the choice for the default storage
        this.storageChoice = storage;

        if (storage) {

            // Keep track of entities
            if (!storage.getItem('numberOfEntities')) {
                storage.setItem('numberOfEntities', '0');
            }

            if (!storage.getItem('entitiesEnum')) {
                let entitiesEnum: EntitiesEnum = {}
                storage.setItem('entitiesEnum', JSON.stringify(entitiesEnum));

            }

        }
    }

    /**
     * 
     * @param entityProps The properties of the entity
     * @param storage Which storage to interact with
     */
    public addEntity = (entityName: string, entityProps: Props, storage: Storage = this.storageChoice) => {


        /* Collect and process the data */

        // id
        let id = this.getNumberOfEntities(storage);


        if (id) {

            // Props of entity
            if (!storage.getItem(`${id}.propertiesType`)) {
                storage.setItem(`${id}.propertiesType`, JSON.stringify(entityProps));
            }

            // numberOfInstances
            storage.setItem(`${id}.numberOfInstances`, "0")

        }

        // properties
        let properties = JSON.stringify(entityProps);

        /* Insert the data */

        // Name
        storage.setItem(`${id}.entityName`, entityName);

        // numberOfInstances
        storage.setItem(`${id}.numberOfInstances`, "0");

        // propertiesType
        storage.setItem(`${id}.propertiesType`, properties);

        // Once the entity was added then we increment 'numberOfentities
        const before = storage.getItem('numberOfEntities');
        if (before) {

            storage.setItem('numberOfEntities', (parseInt(before) + 1).toString())

        }


        // Add the entity to the class property 'entities'    
        if (id) {

            const newEntity: Entity = {
                name: entityName,
                id: id,
                numberOfInstances: 0,
                props: entityProps
            }
            this.entities.push(newEntity);
        }

    }

    /* CREATE */
    /* Here are all the methods that are about creating data */

    /**
     * Inserts an instance into the web storage.
     * @param entityName Name of entity
     * @param props Obj with the properties of the instance
     * @param storage Type of web storage
     * @returns Promise Returns a promise based true for success and false for failure.
     */
    // TODO make async and return success msg
    public createInstance = async (entityName: string, props: Props, storage = this.storageChoice): Promise<boolean> => {

        /* Collect the data */

        let entityID = this.getEntityID(entityName, storage);

        let instanceID = this.getNumberOfInstances(entityName, storage);

        let values = Object.values(props);

        /* Insert the data into web storage */
        if (instanceID) {
            instanceID++;

            const checkedInstance = this.checkInstance(entityName, values);

            if (await checkedInstance.then((value) => { return true === value })) {
                // Insert values of instance 
                storage.setItem(`${entityID}.${instanceID}`, values.join(','));
            }


            // Once we finished inserting the new entity we increment numberOfInstances by one

            storage.setItem(`${entityID}.numberOfInstances`, (instanceID).toString())

            return true;
        }

        // If the entity does not exist
        return false;


    }


    // TODO finish
    public createObject = () => {

    }


    /* READ */
    /* Here are all the methods that are about reading data */

    /**
     * Gets a single instance from an entity
     * @param entityName Name of entity
     * @param id Id of the instance
     * @param storage 
     * @returns Object that represents an instance of an entity
     */
    public getInstance = (entityName: string, id: number, storage = this.storageChoice): Props | null => {

        let entityID = this.getEntityID(entityName, storage);

        if (entityID) {

            let instance = storage.getItem(`${entityID}.${id}`);

            if (instance) {
                return JSON.parse(instance);
            }
        }

        return null;

    }

    /**
     * Get all the instances of an entity
     * @param entity Entity whose instances we want to retrieve
     * @param storage What kind of web storage we want to access
     */
    public getInstances = (entityName: string, storage: Storage = this.storageChoice): Props[] | null => {

        let instances: Props[] = []

        let entityID = this.getEntityID(entityName, storage);

        if (entityID) {

            let numberOfInstances = storage.getItem(`${entityID}.numberOfInstances`);

            if (numberOfInstances)

                for (let i = 1; i <= parseInt(numberOfInstances); i++) {
                    let instance = storage.getItem(`${entityID}.${i}`);

                    // If the instance is not null
                    if (instance) {
                        instances.push(JSON.parse(instance));
                    }

                }

            return instances;
        }

        // If no instances were found
        return null;

    }





    /**
     * Retrieves instances that fulfill certain conditions
     */
    public getWithCondition = (condition: Condition) => {

    }

    // TODO finish
    public getObjects = () => {

    }


    /* UPDATE */
    /* Here are all the methods that are related to editing data */

    /**
     * Changes the properties type of an entity. 
     * @param entityName Name of entity
     * @param storage Type of web storage
     * @returns Promise Returns a promise based true for success and false for failure.
     */
    public updateEntity = async (entityName: string, newProps: Props, storage: Storage = this.storageChoice): Promise<boolean> => {

        const entityID = this.getEntityID(entityName, storage);

        if (entityID) {
            storage.setItem(`${entityID}.propertiesType`, JSON.stringify(newProps));
            return true;

            // TODO Update the class
        }

        return false;

    }


    /**
     * Changes the value of the properties for an instance. 
     * @param entityName Name of entity
     * @param instanceID ID of instance
     * @param instanceProps New props for the instance
     * @param storage Type of web storage
     * @returns Promise Returns a promise based true for success and false for failure.
     */
    public updateInstance = async (entityName: string, instanceID: number, newProps: Props, storage: Storage = this.storageChoice): Promise<boolean> => {
        let entityID = this.getEntityID(entityName, storage);

        let instance = storage.getItem(`${entityID}.${instanceID}`);
        // Check if entity exists
        if (instance) {
            storage.setItem(`${entityID}.${instanceID}`, JSON.stringify(newProps));
            return true;
        }

        else return false;
    }

    /**
     * Updates all the instances of an entity. 
     * @param entityName Name of entity
     * @param instanceID ID of instance
     * @param newProps New props for the instances
     * @param storage 
     * @returns Promise Returns a promise based true for success and false for failure. 
     */
    public updateInstances = async (entityName: string, instanceID: number, newProps: Props, storage: Storage = this.storageChoice): Promise<boolean> => {

        let entityID = this.getEntityID(entityName, storage);

        let numberOfInstances = this.getNumberOfInstances(entityName, storage);

        if (entityID && numberOfInstances) {

            for (let i = 1; i <= numberOfInstances; i++) {

                let instance = storage.getItem(`${entityID}.${instanceID}`);

                // Test if instance exists
                if (instance) {

                    storage.setItem(`${entityID}.${instanceID}`, JSON.stringify(newProps))

                    return true;
                }

            }
        }

        return false;
    }

    public updateWithCondition = () => {

    }

    // TODO finish
    public updateObject = () => {

    }


    /* DELETE */
    /* Here are the methods that are related with deleting data */

    /**
     * Deletes all instances of an entity
     * @param entity Entity we want to delete
     */
    public deleteEntity = (entityName: string, storage: Storage = this.storageChoice = localStorage) => {
        const entityID = this.getEntityID(entityName, storage);

        const numberOfInstances = this.getNumberOfInstances(entityName, storage);

        const keys = Object.keys(storage);

        if (numberOfInstances) {

            for (let i = 0; i < numberOfInstances; i++) {

                // TODO finish that
                if (keys[i])
                    storage.removeItem(keys[i]);
            }

        }

    }

    public deleteInstance = () => {

    }

    /**
     * Deletes an entire storage
     */
    public deleteStorage = (storage: Storage = this.storageChoice) => {
        storage.clear();
    }

    /**
     * Deletes certain instances if certain conditions are fulfilled
     */
    public deleteWithCondition = () => {

    }

    // TODO finish
    public deleteObject = () => {

    }

    /* MIGRATION */
    // This are the methods that migrate data to the other web storage
    public migrateEntities = () => {

    }


    public migrateInstances = () => {

    }


    /* HELPER FUNCTIONS */
    /* Helper functions can be accessed from the localStorage and sessionStorage methods */

    /**
     * Returns the total number of instances for an entity
     * We have an item with the key 'numberOfInstances' on each entity that stores how much instances an entity has
     */
    private getNumberOfInstances = (entityName: string, storage = this.storageChoice): number | null => {
        let id = this.getEntityID(entityName);

        let result: number;


        if (id) {

            let item = storage.getItem(`${id}.numberOfInstances`);

            // Check if we got a string and the item thus exists
            if (item) {
                result = parseInt(item);
                return result;
            }

        }

        return null;

    }


    /**
     * Returns the number of entities that is stored in 'numberOfEntities'.
     * @param storage Type of web storage
     */
    private getNumberOfEntities = (storage: Storage = this.storageChoice): number | null => {

        const number = storage.getItem('numberOfEntities');

        if (number) {
            return parseInt(number);
        }

        return null;

    }

    /**
* Gets the properties of an entity
* @param entityName Name of entity
* @param storage Type of web storage
*/
    private getProperties = (entityName: string, storage: Storage = this.storageChoice): Props | null => {

        // Obj that gets returned at the end
        let properties: Props;
        let id = this.getEntityID(entityName, storage);

        if (id) {
            let stringProps = storage.getItem(`${id}.propertiesType`);

            // Let's get sure that we got a string
            if (stringProps) {
                properties = JSON.parse(stringProps);
                return properties;
            }
        }

        // The entity does not exist
        return null;

    }



    /**
     * Gets the id of the entity.
     * @param entityName Name of the entity
     * @param storage Type of web storage
     * @returns ID of the entity
     */
    private getEntityID = (entityName: string, storage: Storage = this.storageChoice): string | null => {

        let entitiesEnum = storage.getItem("entitiesEnum");
        let entityObj: EntitiesEnum = {};

        if (entitiesEnum) {
            entityObj = JSON.parse(entitiesEnum);
            return entityObj[entityName]
        }

        // The entity does not exist i.e. it was not added
        else return null

    }


    // TODO finish updateProps()
    private updateProps = (newProps: Props, oldProps: Props) => {
        /**
         * Properties that are in both objects 
         */
        let persist = [];

        /**
         * Properties of old object
         */
        let newKeys = Object.keys(newProps);


    }

    // TODO finish
    /**
     * Is only invoked by createInstance() and getObject(). The function gets the keys from 'propsArray' and the values from the specific instance and returns an object
     */
    private composeInstance = (entityName: string, instanceID: string) => {

    }

    /**
     * Is only invoked by createInstance(). Tests if the instance values respect the specification at propertiesType.
     * @param entityName Name of entity
     * @param instanceValues Array with the values of the instance
     * @returns Promise Returns either true or an error message
     */
    private checkInstance = async (entityName: string, instanceValues: string[], storage: Storage = this.storageChoice): Promise<boolean> => {


        let propsArray: string[] = [];
        const propertiesTypes = this.getProperties(entityName, storage);

        if (propertiesTypes) {
            propsArray = Object.keys(propertiesTypes);
        }

        // If the entity does not exist
        else throw new Error("The entity does not exist");

        // Check types
        for (let i = 0; i < propsArray.length; i++) {
            if (propsArray[i] !== typeof instanceValues[i]) {
                throw new Error(`${instanceValues[i]} is not of the type ${propsArray[i]}`);
            }
        }

        return true;

    }

}

export default lssv;