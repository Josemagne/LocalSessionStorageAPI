class LocalSessionStorageAPI {

    /**
     * Object that contains the key of the entity in the key and the type of the value in the value
     */

    entities: Entities = {
        local: {

        },
        session: {

        }
    };



    // initiate
    /**
     * In order to work with the API we must know which properties the entity has.
     * @example An entity Book has for example the properties: 'title', 'pages', 'language',
     * @param props Object that contains the props of of the entity
     */
    constructor(entityName: string, props: Props, storage: boolean = false) {



        // For sessionStorage
        if (storage) {
            // if 0numberOfInstances is not set then we create it
            if (!sessionStorage.getItem('0numberOfInstances')) {
                sessionStorage.setItem('0numberOfInstances', '')
            }

            // Keep track of entities
            if (!sessionStorage.getItem('0numberOfEntities')) {
                sessionStorage.setItem('0numberOfEntities', '1');
            }

            if (!sessionStorage.getItem('0entitiesEnum')) {
                sessionStorage.setItem('0entitiesEnum', entityName);
                this.entities.local.entityName.id = 1;
                this.entities.local.entityName.name = entityName;
                this.entities.local.entityName.props = props;
                this.entities.local.entityName.numberOfInstances = 0;
            }
        }
        else {
            // if 0numberOfInstances is not set then we create it
            if (!localStorage.getItem('0numberOfInstances')) {

                localStorage.setItem('0numberOfInstances', '0');
            }

            // Keep track of entities
            if (!localStorage.getItem('0numberOfEntities')) {
                localStorage.setItem('0numberOfEntities', '1');
            }

            if (!localStorage.getItem('0entitiesEnum')) {
                localStorage.setItem('0entitiesEnum', entityName)
                this.entities.local.entityName.id = 1;
                this.entities.local.entityName.name = entityName;
                this.entities.local.entityName.props = props;
                this.entities.local.entityName.numberOfInstances = 0;
            }
        }

    }

    /**
     * 
     * @param props The properties of the entity
     * @param storage Which storage to interact with
     */
    public static addEntity = (entityName: string, props: Props, storage: boolean = false) => {

    }


    // create
    public static createInstance = (entityName: string, props: Props, storage: boolean = false): void => {
        let nextNumber: number = this.getEntityInstances() + 1;
        let keys: string[] = Object.keys(props);
        let values: string[] = Object.values(props);


        for (let i = 0; i < keys.length; i++) {
            localStorage.setItem(`${nextNumber}${keys[i]}`, values[i])
        }

        // Once we finished inserting the new entity we increment numberOfInstances by one
        localStorage.setItem('0numberOfInstances', nextNumber.toString())
    }


    // read
    public static getInstance = (id: number, storage: boolean = false) => {


        // If we want the sessionStorage
        if (storage) {

            let keys = this.getTextFromKey(Object.keys(this.props));
            let values: string[] = Object.values(this.props);

            return this.returnObject(keys, values)
        }
        // Else we take the localStorage
        else {
            let keys = this.getTextFromKey(Object.keys(this.props));
            let values: string[] = Object.values(this.props);

            return this.returnObject(keys, values);

        }

    }


    public static getInstances = (entity: string): Props[] => {

    }

    public static getProperty = (id: number, property: string, storage: boolean = false) => {

        if (storage) return sessionStorage.getItem(`${id}${property}`);
        else return localStorage.getItem(`${id}${property}`);
    }




    // update
    public static updateEntity = (props: string[], storage: boolean = false) => {

    }

    /**
     * Deletes all instances of an entity
     * @param entity Entity we want to delete
     */
    public static deleteEntity = (entity: Entity, storage: boolean = false) => {

    }


    // HELPER FUNCTIONS
    // Helper functions can be accessed from the localStorage and sessionStorage methods

    /**
     * Returns the total number of instances that are in localStorage.
     * The number of instances is equal to the biggest prefix in localStorage.
     * We have an item with the key '0numberOfInstances'
     */
    private static getNumberOfInstances = (): number | null => {
        let numberOfInstances = localStorage.getItem('0numberOfInstances');
        if (numberOfInstances) {

            return parseInt(numberOfInstances);
        } else {
            return null;
        }
    }

    /**
     * Gets the number of instances for an entity
     * @param entity Entity for the instances we search for
     */
    private static getEntityInstances = (entity: string): number | null => {

        // Get the id of the entity
        for (let i = 0; i < 9; i++) {

        }

    }

    /**
     * Returns the number of entities
     */
    private static getNumbeOfEntities = (storage: boolean = false): number | null => {

        // For sessionStorage
        if (storage) {

        }

        // For localStorage
        if (!storage) {

        }
    }

    /**
     * Returns the length of the numerical prefix for an entity
     * @example 1 has the length of 1, 2 the length of 1, 10, the length of 2, 345 the length of 3 and 3545324 the length of 7
     */
    private static getLengthOfPrefix = (entity: string): number => {
        let numberOfInstances = this.getNumberOfInstances().toString();

        return numberOfInstances.length;
    }

    private static getEntityID = (entity: string, storage: boolean = false): number => {

        // For sessionStorage
        if (storage) {
            let entitiesEnum = sessionStorage.getItem('0entitiesEnum')
        }

    }
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
     * Brings keys and values together and puts out an object that represents an instance of an entity
     * @param key Array of keys of an instance
     * @param value Array of values of an instance
     * @returns An instance in form of an object
     */
    private static returnObject = (key: string[], value: string[]): Props => {

    // The entity that gets returned
    let instance: Props = {

    };

    for (let i = 0; i < key.length; i++) {
        instance[key[i]] = value[i];
    }

    return instance;

}

    // TODO In the future add a constraint that the beginnig of the keys should not have a number
    // public static testForNumbers = (key: string): boolean => {

    // }

    // TODO Entities that are used frequently should be stored in localStorage.
    // public static persistFrequentEntities = (): void => {

    // }

}

export default LocalSessionStorageAPI;