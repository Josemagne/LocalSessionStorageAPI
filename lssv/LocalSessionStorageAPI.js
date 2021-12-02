class LocalSessionStorageAPI {
    /**
     * Object that contains the key of the entity in the key and the type of the value in the value.
     * The object's lifetime is during the runtime of the program.
     */
    // TODO The object is not populated --> populate it
    static entities = {
        localStorage: {},
        sessionStorage: {}
    };
    // TODO Do we need that?
    /**
     * Contains the name of entities
     */
    entitiesList = [];
    /**
     * Defines the default web storage choice that we are handling. If no storage is specified in the methods then we use the value of storageChoice
     * The options are either localStorage or sessionStorage.
     * The predefined storage type is localStorage.
     */
    static storageChoice = localStorage;
    // initiate
    /**
     * In order to work with the API we must know which properties the entity has.
     * @example An entity Book has for example the properties: 'title', 'pages', 'language',
     * @param props Object that contains the props of of the entity
     */
    constructor(entityName, propsType, storage = localStorage) {
        // set the choice for the default storage
        LocalSessionStorageAPI.storageChoice = storage;
        if (storage) {
            // Keep track of entities
            if (!storage.getItem('0numberOfEntities')) {
                storage.setItem('0numberOfEntities', '1');
            }
            if (!storage.getItem('0entitiesEnum')) {
                let entitiesEnum = {};
                entitiesEnum[entityName] = "1";
                storage.setItem('0entitiesEnum', JSON.stringify(entitiesEnum));
                let type;
            }
            // Props of entity
            if (!storage.getItem(`1.0propertiesType`)) {
                storage.setItem(`1.0propertiesType`, JSON.stringify(propsType));
            }
            // numberOfInstances
            storage.setItem(`1.0numberOfInstances`, "0");
        }
    }
    /**
     *
     * @param entityProps The properties of the entity
     * @param storage Which storage to interact with
     */
    addEntity = (entityName, entityProps, storage = LocalSessionStorageAPI.storageChoice) => {
        /* Collect and process the data */
        // id
        let id = this.getNumberOfEntities(storage);
        // properties
        let properties = JSON.stringify(entityProps);
        /* Insert the data */
        // Name
        storage.setItem(`${id}.0entityName`, entityName);
        // numberOfInstances
        storage.setItem(`${id}.0numberOfInstances`, "0");
        // propertiesType
        storage.setItem(`${id}.0propertiesType`, properties);
    };
    /* CREATE */
    /* Here are all the methods that are about creating data */
    /**
     *
     * @param entityName Name of entity
     * @param props Obj with the properties of the instance
     * @param storage Type of web storage
     */
    // TODO make async and return success msg
    createInstance = (entityName, props, storage = LocalSessionStorageAPI.storageChoice) => {
        /* Collect the data */
        let entityID = this.getEntityID(entityName, storage);
        let instanceID = this.getNumberOfInstances(entityName, storage);
        let properties = JSON.stringify(props);
        /* Insert the data into web storage */
        if (instanceID) {
            instanceID++;
            // instance with props and id
            storage.setItem(`${entityID}.${instanceID}`, properties);
            // Once we finished inserting the new entity we increment numberOfInstances by one
            storage.setItem(`${entityID}.0numberOfInstances`, (instanceID).toString());
            return;
        }
    };
    /* READ */
    /* Here are all the methods that are about reading data */
    /**
     * Gets a single instance from an entity
     * @param entityName Name of entity
     * @param id Id of the instance
     * @param storage
     * @returns Object that represents an instance of an entity
     */
    getInstance = (entityName, id, storage = LocalSessionStorageAPI.storageChoice) => {
        let entityID = this.getEntityID(entityName, storage);
        if (entityID) {
            let instance = storage.getItem(`${entityID}.${id}`);
            if (instance) {
                return JSON.parse(instance);
            }
        }
        return null;
    };
    /**
     * Get all the instances of an entity
     * @param entity Entity whose instances we want to retrieve
     * @param storage What kind of web storage we want to access
     */
    getInstances = (entityName, storage = LocalSessionStorageAPI.storageChoice) => {
        let instances = [];
        let entityID = this.getEntityID(entityName, storage);
        if (entityID) {
            let numberOfInstances = storage.getItem(`${entityID}.0numberOfInstances`);
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
    };
    /**
    * Gets the properties of an entity
    * @param entityName Name of entity
    * @param storage Type of web storage
    */
    getProperties = (entityName, storage = LocalSessionStorageAPI.storageChoice) => {
        // Obj that gets returned at the end
        let properties;
        let id = this.getEntityID(entityName, storage);
        if (id) {
            let stringProps = storage.getItem(`${id}.0properties`);
            // Let's get sure that we got a string
            if (stringProps) {
                properties = JSON.parse(stringProps);
                return properties;
            }
        }
        // The entity does not exist
        return null;
    };
    /**
     * Retrieves instances that fulfill certain conditions
     */
    getWithCondition = (condition) => {
    };
    /* UPDATE */
    /* Here are all the methods that are related to editing data */
    /**
     * Changes the properties type of an entity. It returns a promise based true for success and false for failure.
     * @param entityName Name of entity
     * @param storage Type of web storage
     */
    updateEntity = async (entityName, newProps, storage = LocalSessionStorageAPI.storageChoice) => {
        const entityID = this.getEntityID(entityName, storage);
        if (entityID) {
            storage.setItem(`${entityID}.0propertiesType`, JSON.stringify(newProps));
            return true;
            // TODO Update the class
        }
        return false;
    };
    /**
     * Changes the value of the properties for an instance. It returns a promise based true for success and false for failure.
     * @param entityName Name of entity
     * @param instanceID ID of instance
     * @param instanceProps New props for the instance
     * @param storage Type of web storage
     */
    updateInstance = async (entityName, instanceID, newProps, storage = LocalSessionStorageAPI.storageChoice) => {
        let entityID = this.getEntityID(entityName, storage);
        let instance = storage.getItem(`${entityID}.${instanceID}`);
        // Check if entity exists
        if (instance) {
            storage.setItem(`${entityID}.${instanceID}`, JSON.stringify(newProps));
            return true;
        }
        else
            return false;
    };
    /**
     * Updates all the instances of an entity. It returns a promise based true for success and false for failure.
     * @param entityName Name of entity
     * @param instanceID ID of instance
     * @param newProps New props for the instances
     * @param storage
     */
    updateInstances = async (entityName, instanceID, newProps, storage = LocalSessionStorageAPI.storageChoice) => {
        let entityID = this.getEntityID(entityName, storage);
        let numberOfInstances = this.getNumberOfInstances(entityName, storage);
        if (entityID && numberOfInstances) {
            for (let i = 1; i <= numberOfInstances; i++) {
                let instance = storage.getItem(`${entityID}.${instanceID}`);
                // Test if instance exists
                if (instance) {
                    storage.setItem(`${entityID}.${instanceID}`, JSON.stringify(newProps));
                    return true;
                }
            }
        }
        return false;
    };
    updateWithCondition = () => {
    };
    /* DELETE */
    /* Here are the methods that are related with deleting data */
    /**
     * Deletes all instances of an entity
     * @param entity Entity we want to delete
     */
    deleteEntity = (entityName, storage = LocalSessionStorageAPI.storageChoice = localStorage) => {
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
    };
    deleteInstance = () => {
    };
    /**
     * Deletes an entire storage
     */
    deleteStorage = (storage = LocalSessionStorageAPI.storageChoice) => {
        storage.clear();
    };
    /**
     * Deletes certain instances if certain conditions are fulfilled
     */
    deleteWithCondition = () => {
    };
    /* HELPER FUNCTIONS */
    /* Helper functions can be accessed from the localStorage and sessionStorage methods */
    /**
     * Returns the total number of instances for an entity
     * We have an item with the key 'numberOfInstances' on each entity that stores how much instances an entity has
     */
    getNumberOfInstances = (entityName, storage = LocalSessionStorageAPI.storageChoice) => {
        let id = this.getEntityID(entityName);
        let result;
        if (id) {
            let item = storage.getItem(`${id}.0numberOfInstances`);
            // Check if we got a string and the item thus exists
            if (item) {
                result = parseInt(item);
                return result;
            }
        }
        return null;
    };
    /**
     * Returns the number of entities
     * @param storage Type of web storage
     */
    getNumberOfEntities = (storage) => {
        // Contains the keys of 0entitiesEnum
        let keys = [];
        // The biggest number in keys indicating the number of entities
        let entitiesEnum = storage.getItem('0entitiesEnum');
        if (entitiesEnum) {
            entitiesEnum = JSON.parse(entitiesEnum);
            keys = Object.keys(storage);
            return parseInt(keys[keys.length - 1]);
        }
        else
            return 0;
    };
    /**
     *
     * @param entityName Name of the entity
     * @param storage Type of web storage
     * @returns ID of the entity
     */
    getEntityID = (entityName, storage = LocalSessionStorageAPI.storageChoice) => {
        let entitiesEnum = storage.getItem("0entitiesEnum");
        let entityObj = {};
        if (entitiesEnum) {
            entityObj = JSON.parse(entitiesEnum);
            return entityObj[entityName];
        }
        else
            return null;
    };
    // TODO finish updateProps()
    updateProps = (newProps, oldProps) => {
        /**
         * Properties that are in both objects
         */
        let persist = [];
        /**
         * Properties of old object
         */
        let newKeys = Object.keys(newProps);
    };
}
export default LocalSessionStorageAPI;
