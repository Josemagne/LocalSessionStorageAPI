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
     * @param storage Type of web storage the object will use by default.
     */
    constructor(storage: Storage = localStorage) {
        // set the choice for the default storage
        this.storageChoice = storage;

        if (storage) {

            // Keep track of entities
            if (!storage.getItem('numberOfEntities')) {
                storage.setItem('numberOfEntities', '0');
            }

            // TODO If web storage is already populated then get load the data from there?

            if (!storage.getItem('entitiesEnum')) {
                storage.setItem('entitiesEnum', JSON.stringify({}));
            }

        }
    }



    /**
     * Creates an entity
     * @param entityName Name of the entity
     * @param entityProps The properties of the entity
     * @param storage Which storage to interact with
     */
    public addEntity = async (entityName: string, entityProps: Props, storage: Storage = this.storageChoice): Promise<boolean> => {


        // Check that the entity does not already exist
        this.checkEntity(entityName, storage).then(async (entityExists) => {
            if (entityExists) Promise.reject(new Error("The entity already exists!"))

            /* Collect and process the data */

            // id
            let entityID = this.getNumberOfEntities(storage);

            if (entityID) {

                // increment id
                entityID += 1;

                // Props of entity
                if (!storage.getItem(`${entityID}.propertiesType`)) {
                    await storage.setItem(`${entityID}.propertiesType`, JSON.stringify(entityProps));
                }

                // Necessary props
                const necessaryProps = this.ascertainKindOfProps(entityProps, true)
                storage.setItem(`${entityID}.necessaryProps`, JSON.stringify(necessaryProps));

                // Optional props
                const optionalProps = this.ascertainKindOfProps(entityProps, false);
                storage.setItem(`${entityID}.optionalProps`, JSON.stringify(optionalProps));


                // numberOfInstances
                await storage.setItem(`${entityID}.numberOfInstances`, "0")



                // properties
                let properties = JSON.stringify(entityProps);

                /* Insert the data */

                // Name
                await storage.setItem(`${entityID}.entityName`, entityName);

                // numberOfInstances
                await storage.setItem(`${entityID}.numberOfInstances`, "0");

                // propertiesType
                await storage.setItem(`${entityID}.propertiesType`, properties);

                /* entitiesEnum */
                let entitiesEnum = storage.getItem("entitiesEnum");
                if (entitiesEnum) {
                    // Convert string to object
                    let parsedEnum: EntitiesEnum = JSON.parse(entitiesEnum);

                    // Add the properties
                    parsedEnum[entityName] = { id: entityID, props: entityProps }

                    // Set the item in the web storage
                    storage.setItem('entitiesEnum', JSON.stringify(parsedEnum))
                }


                // Once the entity was added then we increment 'numberOfentities
                const before = await storage.getItem('numberOfEntities');
                if (before) {

                    await storage.setItem('numberOfEntities', (parseInt(before) + 1).toString())

                }


                // Add the entity to the class property 'entities'    

                const newEntity: Entity = {
                    id: entityID,

                    props: entityProps
                }
                this.entities.push(newEntity);

                // If we were able to add the entity
                return Promise.resolve(true);
            }


        }).catch(err => {
            console.log("An err in addEntity() occured: ", err);

        })
        return Promise.reject(false);
    }

    /* CREATE */
    /* Here are all the methods that are about creating data */

    /**
     * Inserts an instance into the web storage.
     * @param entityName Name of entity
     * @param props Obj with the properties of the instance
     * @param autoIncrement A property that is auto incrementing
     * @param storage Type of web storage
     * @returns Promise Returns a promise based true for success and false for failure.
     */
    public createInstance = async (entityName: string, props: Props, storage = this.storageChoice): Promise<boolean> => {

        /* Collect the data */

        let entityID = this.getEntityID(entityName, storage);

        let instanceID = this.getNumberOfInstances(entityName, storage);

        const instanceValues = Object.values(props);


        /* Insert the data into web storage */
        instanceID.then((instance_id) => {

            instance_id++;

            // Check if the data for the entity is legitimate
            this.checkInstance(entityName, props).then(() => {
                // Insert values of instance 
                storage.setItem(`${entityID}.${instanceID}`, instanceValues.join(','));
            })


            // Once we finished inserting the new entity we increment numberOfInstances by one

            storage.setItem(`${entityID}.numberOfInstances`, (instanceID).toString())

            return true;
        });

        // If the entity does not exist
        return false;


    }

    /**
     * Loop that uses createInstance()
     * @param entityName Name of entity
     * @param props Properties of the instance
     * @param storage Type of web storage
     */
    public createInstances = async (entityName: string, props: Props[], storage: Storage = this.storageChoice): Promise<boolean> => {

        for (let i = 0; i < props.length; i++) {
            this.createInstance(entityName, props[i], storage).then((result) => {
                if (false === result) {
                    return false;
                }
            })
                .catch((err) => {
                    throw new Error("We couldn't insert the instance: " + JSON.stringify(props[i] + " /n Here is the error Code: " + err)
                    )
                })
        }

        // If we got here then it means that all instances were created successfully
        return true;

    }


    // TODO finish
    public createObject = () => {

    }


    /* READ */
    /* Here are all the methods that are about reading data */



    /**
     * Get all the instances of an entity
     * @param entity Entity whose instances we want to retrieve
     * @param storage What kind of web storage we want to access
     */
    public getInstances = async (entityName: string, storage: Storage = this.storageChoice): Promise<Props[] | null> => {

        let instances: Props[] = []

        let entityID = this.getEntityID(entityName, storage);

        if (entityID) {

            let numberOfInstances = storage.getItem(`${entityID}.numberOfInstances`);

            if (numberOfInstances)

                for (let i = 1; i <= parseInt(numberOfInstances); i++) {
                    let instance = storage.getItem(`${entityID}.${i}`);

                    // If the instance is not null
                    if (instance) {
                        await instances.push(JSON.parse(instance));
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

            numberOfInstances.then((instanceNumber) => {


                for (let i = 1; i <= instanceNumber; i++) {

                    let instance = storage.getItem(`${entityID}.${instanceID}`);

                    // Test if instance exists
                    if (instance) {

                        storage.setItem(`${entityID}.${instanceID}`, JSON.stringify(newProps))

                        return true;
                    }

                }
            })

            return false;
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

        numberOfInstances.then((number) => {

            for (let i = 0; i < number; i++) {

                // TODO finish that
                if (keys[i])
                    storage.removeItem(keys[i]);
            }

        })

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

    // TODO finish
    public convertJSON = () => {

    }


    /* HELPER FUNCTIONS */
    /* Helper functions can be accessed from the localStorage and sessionStorage methods */

    /**
     * Populates 'entities' with data
     */
    private loadData = () => {

    }

    /**
     * Returns the total number of instances for an entity
     * We have an item with the key 'numberOfInstances' on each entity that stores how much instances an entity has
     */
    private getNumberOfInstances = async (entityName: string, storage = this.storageChoice): Promise<number> => {
        let id = this.getEntityID(entityName);



        let result: number;

        // If the entity exists
        if (id) {

            let item = storage.getItem(`${id}.numberOfInstances`);

            // Check if we got a string and the item thus exists
            if (item) {
                result = parseInt(item);
                return result;
            }

        }

        return Promise.reject(new Error("The entity does not exist."));

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
            return entityObj[entityName].id.toString();
        }

        // The entity does not exist i.e. it was not added
        else return null;

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

    private checkEntity = async (entityName: string, storage: Storage = this.storageChoice): Promise<boolean> => {
        // Check if the entity already exists
        let entitiesEnum = storage.getItem("entitiesEnum");

        if (entitiesEnum) {
            let parsedEnum: EntitiesEnum = await JSON.parse(entitiesEnum);

            // If the entity already exist
            if (parsedEnum[entityName]) {
                return Promise.resolve(true);
            }

        }

        return false;
    }

    /**
     * Is only invoked by createInstance(). Tests if the instance values respect the specification at propertiesType.
     * @param entityName Name of entity
     * @param instanceValues Array with the values of the instance
     * @returns Promise Returns either true or an error message
     */
    private checkInstance = async (entityName: string, instanceProps: Props, storage: Storage = this.storageChoice): Promise<boolean> => {

        const entityID = this.getEntityID(entityName, storage);

        const propertiesTypes = this.getProperties(entityName, storage);

        // If the entity does not exist
        if (!propertiesTypes) {

            // The entity does not exist
            Promise.reject(new Error("The entity does not exist"));

        }

        /* Check if the necessary props are given */

        // Get the necessary props
        const necessaryProps = storage.getItem(`${entityID}.necessaryProps`);

        if (necessaryProps) {
            const parsedNecessaryProps = JSON.parse(necessaryProps);

            const keys_instanceProps = Object.keys(instanceProps);

            const keys_necessaryProps = Object.keys(parsedNecessaryProps);

            // Check if the length is the same
            if (keys_instanceProps.length < keys_necessaryProps.length) {
                return Promise.reject(new Error("Not all necessary properties are given"));
            }
            // The number of properties is the same
            else {

                // Check if the name of the props are the same
                for (let k = 0; k < keys_necessaryProps.length; k++) {

                    // If the property does not exist
                    if (parsedNecessaryProps[keys_instanceProps[k]]) {
                        return Promise.reject(new Error(`${parsedNecessaryProps[keys_necessaryProps[k]]} is n`))
                    }

                }

                // Check if the type of the values are the same

                for (let j = 0; j < keys_instanceProps.length; j++) {
                    if (parsedNecessaryProps[keys_necessaryProps[j]] === typeof instanceProps[keys_necessaryProps[j]]) {
                        return Promise.reject(new Error(`${instanceProps[keys_necessaryProps[j]]} is not of the required type`));
                    }

                }
            }


            return Promise.resolve(true);

        }

        // If everything went fine
        return Promise.resolve(false);


    }

    // TODO finish
    // private encryptInstance = async (): Promise<boolean> => {

    // }

    // TODO finish
    // private encryptStorage = async (): Promise<boolean> => {

    // TODO require password
    // }

    /**
     * Gets either the necessary or optional props of an entity. If 'necessaryProps' is true then it returns the properties of the given entity that must be specified. If 'necessaryProps' is false then we return the optional properties
     * @param entityName Name of entity
     * @param optionalProps Decides if we want the necessaryProps
     * @param storage 
     */
    private getCertainProps = (entityName: string, necessaryProps: boolean, storage: Storage = this.storageChoice): Props => {

        let result: Props = {};

        const entityID = this.getEntityID(entityName);

        if (entityID) {

            // If neccesary props is true
            if (necessaryProps) {

                const necessaryProps = storage.getItem(`${entityID}.necessaryProps`)

                if (necessaryProps) {
                    result = JSON.parse(necessaryProps);
                }


            }
            // If optional props are requested
            else {
                const optionalProps = storage.getItem(`${entityID}.optionalProps`);
                if (optionalProps) {
                    result = JSON.parse(optionalProps);
                }

            }
        }

        return result;

    }


    /**
     * 
     * @param props The properties of an entity
     * @param necessary Decides if we return the necessary properties if true and the optional if false
     */
    private ascertainKindOfProps = (props: Props, necessary: boolean): Props => {

        /**
         * The requested kind of properties
         */
        let result: Props = {};

        // Keys of the properties
        const keys = Object.keys(props);

        if (necessary) {
            for (let i = 0; i < Object.keys(props).length; i++) {

                // If the property is an object
                if (props[keys[i]] instanceof Object) {

                    // If the object property is necessary
                    if (!keys[i].endsWith("?")) {

                        const subProps: Props = this.getPropsOfObject(props[keys[i]], necessary)

                        // Append the property to the result
                        result[keys[i]] = subProps;
                    }
                }

                // The property is a string
                else if (typeof props[keys[i]] === "string") {
                    // The propertyName ends not with a question mark
                    if (!keys[i].endsWith("?")) {
                        // append the property to the end result
                        result[keys[i]] = props[keys[i]];
                    }
                }

                // The property is a string
                else {
                    if (!keys[i].endsWith("?")) {
                        result[keys[i]] = props[keys[i]];
                    }

                }
            }
        }

        // TODO finish optional
        else {
            result = {};
        }

        return result;

    }

    /**
     * Helper method that gets the kind of the properties for an object
     * @param prop The object whose properties is going to be extracted
     * @param necessary Decides if we return only the necessary or optional props
     */
    private getPropsOfObject = (subProp: any, necessary: boolean): Props => {

        // The requested object that gets returned
        let result: Props = {};

        const keys = Object.keys(subProp);

        // For the necessary props
        if (necessary) {

            for (let i = 0; i < keys.length; i++) {
                // If the subProp is necessary
                if (!keys[i].endsWith("?")) {
                    // Append it to the result
                    result[keys[i]] = subProp[keys[i]];
                }

            }
        }

        // For the optional props
        else {

        }

        return result;


    }



}

export default lssv;
