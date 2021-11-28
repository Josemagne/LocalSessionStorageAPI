class LocalSessionStorageAPI {

    /**
     * Object that contains the key of the entity in the key and the type of the value in the value
     */

    static props: Props
    static entities: Entities;


    // initiate
    /**
     * In order to work with the API we must know which properties the entity has.
     * @example An entity Book has for example the properties: 'title', 'pages', 'language', 
     * @param props Object that contains the props of of the entity
     */
    public static initiate = (props: Props, storage: boolean = false): void => {
        // if 0numberOfInstances is not set then we create it
        if (localStorage.getItem('0numberOfInstances')) {

            localStorage.setItem('0numberOfInstances', '0');
        }

        const keys: string[] = Object.keys(props);
        const values: string[] = Object.keys(props);

        for (let i = 0; i < keys.length; i++) {
            localStorage.setItem(`0${keys[i]}`, values[i])
        }
    }

    // create
    public static createInstance = (props: Props, storage: boolean = false): void => {
        let nextNumber: number = this.getNumberOfInstances() + 1;
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

    // delete
    public static deleteEntity = (entity: Entity)


    // HELPER FUNCTIONS
    // Helper functions can be accessed from the localStorage and sessionStorage methods

    /**
     * Returns the number of instances that are in localStorage.
     * The number of instances is equal to the biggest prefix in localStorage
     */
    private static getNumberOfInstances = (): number => {
        return parseInt(localStorage.getItem("0numberOfInstances"));
    }

    /**
     * Returns the length of the numerical prefix.
     * @example 1 has the length of 1, 2 the length of 1, 10, the length of 2, 345 the length of 3 and 3545324 the length of 7
     */
    private static getLengthOfPrefix = (): number => {
        let numberOfInstances = this.getNumberOfInstances().toString();

        return numberOfInstances.length;
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


    private static returnObject = (key: string[], value: string[]) => {

        // The entity that gets returned
        let entity = new Object();

        for (let i = 0; i < key.length; i++) {
            entity[key[i]] = value[i];
        }

        return entity;

    }

    // TODO In the future add a constraint that the beginnig of the keys should not have a number
    // public static testForNumbers = (key: string): boolean => {

    // }

    // TODO Entities that are used frequently should be stored in localStorage.
    // public static persistFrequentEntities = (): void => {

    // }

}

export default LocalSessionStorageAPI;