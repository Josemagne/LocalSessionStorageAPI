


class LocalSessionStorageAPI {

    /**
     * Object that contains the key of the entity in the key and the type of the value in the value
     */

    public static entities: Entities = {
        localStorage: {

        },
        sessionStorage: {

        }
    };

    // TODO Do we need that?
    /**
     * Contains the name of entities
     */
    public static entitiesList: string[] = [];

    public static storageChoice: Storage;



    // initiate
    /**
     * In order to work with the API we must know which properties the entity has.
     * @example An entity Book has for example the properties: 'title', 'pages', 'language',
     * @param props Object that contains the props of of the entity
     */
    constructor(entityName: string, props: Props, storage: Storage) {
        // set the choice for the default storage
        LocalSessionStorageAPI.storageChoice = storage;


        // For sessionStorage
        if (storage) {
            // if 0numberOfInstances is not set then we create it
            if (!storage.getItem('0numberOfInstances')) {
                storage.setItem('0numberOfInstances', '')
            }

            // Keep track of entities
            if (!storage.getItem('0numberOfEntities')) {
                storage.setItem('0numberOfEntities', '1');
            }

            if (!storage.getItem('0entitiesEnum')) {
                storage.setItem('0entitiesEnum', entityName);

                let type: "localStorage" | "sessionStorage";
                if (storage === localStorage) {
                    type = "localStorage";
                } else {
                    type = 'sessionStorage';
                }

                LocalSessionStorageAPI.entities[type].entityName.id = 1;
                LocalSessionStorageAPI.entities[type].entityName.name = entityName;
                LocalSessionStorageAPI.entities[type].entityName.props = props;
                LocalSessionStorageAPI.entities[type].entityName.numberOfInstances = 0;
            }

        }
    }

    /**
     * 
     * @param props The properties of the entity
     * @param storage Which storage to interact with
     */
    public static addEntity = (entityName: string, props: Props, storage: Storage = LocalSessionStorageAPI.storageChoice) => {

    }

    /* CREATE */
    /* Here are all the methods that are about creating data */

    public static createInstance = (entityName: string, props: Props, storage: Storage): void => {
        let nextNumber: number = this.getEntityInstances() + 1;
        let keys: string[] = Object.keys(props);
        let values: string[] = Object.values(props);


        for (let i = 0; i < keys.length; i++) {
            localStorage.setItem(`${nextNumber}${keys[i]}`, values[i])
        }

        // Once we finished inserting the new entity we increment numberOfInstances by one
        localStorage.setItem('0numberOfInstances', nextNumber.toString())
    }


    /* READ */
    /* Here are all the methods that are about reading data */

    /**
     * Gets a single instance from an entity
     * @param entityName Name of entity
     * @param id Id of the instance
     * @param storage 
     * @returns 
     */
    public static getInstance = (entityName: string, id: number, storage: boolean = false) => {


        // sessionStorage
        if (storage) {

            let keys = this.getTextFromKey(Object.keys(this.props));
            let values: string[] = Object.values(this.props);

            return this.returnObject(keys, values)
        }
        // localStorage
        else {
            let keys = this.getTextFromKey(Object.keys(this.props));
            let values: string[] = Object.values(this.props);

            return this.returnObject(keys, values);

        }

    }

    /**
     * Get all the instances of an entity
     * @param entity Entity whose instances we want to retrieve
     * @param storage What kind of web storage we want to access
     */
    public static getInstances = (entity: string, storage: boolean = false): Props[] => {

    }



    /**
     * Gets the properties of an entity
     * @param entityName Name of entity
     * @param storage Kind of web storage
     * @returns Object with key being the property and value the type of the property
     */
    public static getProperties = (entityName: string, storage: boolean = false) => {

        // sessionStorage
        if (storage) {

        }

        // localStorage
        else {

        }
    }





    /* UPDATE */
    /* Here are all the methods that are related to editing data */

    /**
     * Changes the properties of an entity
     * @param entityName Name of entity
     * @param storage Kind of web storage
     */
    public static updateEntity = (entityName: string, storage: boolean = false) => {
        // sessionStorage
        if (storage) {

        }

        // localStorage
        else {

        }

    }

    /* DELETE */
    /* Here are the methods that are related with deleting data */

    /**
     * Deletes all instances of an entity
     * @param entity Entity we want to delete
     */
    public static deleteEntity = (entityName: Entity, storage: boolean = false) => {
        if (storage) {

        }

        else {

        }

    }


    /* HELPER FUNCTIONS */
    /* Helper functions can be accessed from the localStorage and sessionStorage methods */

    /**
     * Returns the total number of instances for an entity
     * We have an item with the key 'numberOfInstances' on each entity setting items that stores how much instances an entity has
     */
    private static getNumberOfInstances = (entityName: string, storage: Storage): number | null => {
        let id = this.getEntityID(entityName);
    }

    /**
     * Gets the number of instances for an entity
     * @param entity Entity for the instances we search for
     */
    private static getEntityInstances = (entity: string, storage: Storage): number | null => {



    }

    /**
     * Returns the number of entities
     * @param storage Type of web storage
     */
    private static getNumberOfEntities = (storage: Storage): number | null => {
        // Contains the keys of 0entitiesEnum
        let keys: string[] = [];
        // The biggest number in keys indicating the number of entities
        let entitiesEnum = storage.getItem('0entitiesEnum');

        if (entitiesEnum) {
            entitiesEnum = JSON.parse(entitiesEnum);
            keys = Object.keys(storage);
            return parseInt(keys[keys.length - 1])
        }
        else return null;

    }

    /**
     * Returns the length of the numerical prefix for an entity
     * @example 1.33 has the length of 4, 2.22 the length of 3, 1.0 the length of 2 and so on
     */
    private static getLengthOfPrefix = (entity: string): number => {
        let numberOfInstances = this.getNumberOfInstances().toString();

        return numberOfInstances.length;
    }

    private static getEntityID = (entity: string, storage: Storage): number | null => {

        let entitiesEnum = storage.getItem("0entitiesEnum");

        if (entitiesEnum) {

        } else return null;
    }



    /**
     * Removes the numerical prefix of the key 
* @param key The key where we remove the numerical prefix. If it is a single string we handle only a string. If it is an array we handle the whole array.
     */
    private static getTextFromKey = (key: string[]): string[] => {

        let lengthOfPrefix = this.getLengthOfPrefix();


        let refinedKeys = [];

        for (let i = 0; i < key.length; i++) {
            refinedKeys.push(key[i].substring(lengthOfPrefix - 1));
        }


        return refinedKeys;

    }

    /**
     * Parses the string and returns an object
     * @param key   The key in a web storage
     * @returns An instance in form of an object
     */
    private static returnObject = (key: string, storage: Storage): Props | null => {

        let unparsedString = storage.getItem(key)

        if ('string' === typeof unparsedString) return JSON.parse(unparsedString);
        else return null;

    }

    // TODO In the future add a constraint that the beginnig of the keys should not have a number
    // public static testForNumbers = (key: string): boolean => {

    // }

    // TODO Entities that are used frequently should be stored in localStorage.
    // public static persistFrequentEntities = (): void => {

    // }




}

// TODO Should we use a middleware?

export default LocalSessionStorageAPI;