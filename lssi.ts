import { DBRepresentationI, mainDB } from './types';
/**
 * API that facilitates the use of indexedDB
 */
class lssi {

    public representation: DBRepresentationI = {
        numberOfDatabases: 0,
        detail: {

        }
    }

    /**
     * Default database
     */
    public mainDB: mainDB = {
        name: "",
        version: 0
    }

    /**
     * Default object store
     */
    public mainObjectStore: {
        name: string;
        mode: IDBTransactionMode;
        options: IDBObjectStoreParameters;
    } = {
            name: "",
            mode: "readonly",
            options: {
                autoIncrement: true
            }
        }



    /**
     * 
     * @param mainDB Default database
     * @param mainDBVersion Version of default database
     */
    constructur(mainDB?: string, mainDBVersion?: number, mainObjectStoreName?: string, mode?: IDBTransactionMode) {
        // Choosee the main database
        if (mainDB) {
            this.mainDB.name = mainDB;
        }

        // Choose the version of the main database
        if (mainDBVersion) {
            this.mainDB.version = mainDBVersion;
        }

        // Choose the main object store
        if (mainObjectStoreName) {
            this.mainObjectStore.name = mainObjectStoreName;
        }

        // Load the data in indexedDB to the object 'representation'
        // this.loadI();
    }


    /**************************************************** */
    /* READ */
    /**************************************************** */


    /**
     * Gets an overview of the data in indexedDB
     */
    // public loadI = (): Promise<DBRepresentationI> => {
    //     // Contains the result of the method
    //     let result: DBRepresentationI = {
    //         numberOfDatabases: 0,
    //         detail: {}
    //     }

    //     // Get information about databases 
    //     indexedDB.databases().then((databases) => {

    //         // If there are no databases
    //         Promise.reject()

    //         // Assign numberOfDatabases
    //         result.numberOfDatabases = databases.length;

    //         /* Iterate over each database */
    //         for (let i = 0; i < databases.length; i++) {
    //             // Get the name
    //             const name = databases[i].name;

    //             if (name) {
    //                 // Create a database node
    //                 result.detail[name];

    //                 // Get the version
    //                 const version = databases[i].version;
    //                 if (version) {
    //                     // Assign the version
    //                     result.detail["version"] = version;



    //                     // Get connection
    //                     this.establishConnection(name, version).then((req) => {
    //                         req
    //                     })
    //                 }

    //             }

    //         }
    //     })

    //     // Get the respective object stores



    // }



    /**
     * 
     * @param mode Mode to access the object store
     * @param objectStoreName Name of the object store
     * @param DBName Name of the database
     * @param version Version of the database
     */
    public getInstanceI = async (key: string, mode: IDBTransactionMode = this.mainObjectStore.mode, objectStoreName: string = this.mainObjectStore.name, DBName: string = this.mainDB.name, version: number = this.mainDB.version): Promise<any> => {

        // Get transaction object
        await this.getTransactionI(DBName, version, objectStoreName, mode).then((tx) => {
            const record = tx.objectStore(objectStoreName).get(key);

            // error
            record.onerror = (e) => {
                return Promise.reject("Could not get instance. Here the err: " + e)
            }

            // success
            record.onsuccess = (e) => {
                return Promise.resolve(record.result);
            }

        })

    }

    public getInstanceWithConditionI = () => {

    }



    /**
     * Gets all items of an object store
     * @param objectStoreName Name of object store
     * @param version Version number
     */
    public getInstancesI = (objectStoreName: string = this.mainObjectStore.name, DBName = this.mainDB.name, version: number = this.mainDB.version, mode: IDBTransactionMode = this.mainObjectStore.mode) => {

        // Get transaction object
        this.getTransactionI(DBName, version, objectStoreName, mode)

    }

    /**************************************************** */
    /* CREATE */
    /**************************************************** */


    /**
     * Adds a database to indexedDB
     */
    public addDBI = (DBName: string = this.mainDB.name) => {
        this.getDBI(DBName, 1);

        indexedDB.databases().then((dbs) => {
            for (let i = 0; i < dbs.length; i++) {
                // If the database was added
                if (dbs[i].name === DBName) return true;

            }
        });

        return false;
    }

    /**
     * Creates a store object
     * @returns 
     */
    public addEntityI = async (DBName: string = this.mainDB.name, version: number = this.mainDB.version, objectStoreName: string = this.mainObjectStore.name, storeOptions?: IDBObjectStoreParameters, mode: IDBTransactionMode = this.mainObjectStore.mode, options: IDBObjectStoreParameters = this.mainObjectStore.options): Promise<boolean> => {
        (await this.getDBI(DBName, version)).createObjectStore(objectStoreName, options);

        // Test if the entity has been added
        this.getTransactionI(DBName, version, objectStoreName, mode).then((tx) => {
            if (tx.objectStoreNames.contains(objectStoreName)) return true;
        })

        return false;
    }

    public createInstanceI = async (DBName: string = this.mainDB.name, version: number = this.mainDB.version, objectStoreName: string = this.mainObjectStore.name, mode = this.mainObjectStore.mode, value: any) => {
        await this.getEntityI(DBName, version, objectStoreName, mode).then((entity) => {
            // is autoIncrement true?
            if (this.mainObjectStore.options.autoIncrement) {
                entity.add(value)
            }

            // TODO Handle index management?

        })
    }

    /**************************************************** */
    /* UPDATE */
    /**************************************************** */

    /**
     * 
     * @param DBName Name of database
     * @param version Version number
     */
    public updateDatabaseI = (DBName: string = this.mainDB.name, version: number = this.mainDB.version) => {



    }


    /**
     * Updates object store
     */
    public updateEntityI = () => {

    }

    /**
     * Updates an item in an object store
     */
    public updateInstanceI = async (key: string, value: any, mode: IDBTransactionMode = this.mainObjectStore.mode, objectStoreName: string = this.mainObjectStore.name, DBName: string = this.mainDB.name, version: number = this.mainDB.version): Promise<boolean> => {

        // TODO Use getEntityI() instead?
        // Get transaction object
        await this.getTransactionI(DBName, version, objectStoreName, mode).then((tx) => {
            const record = tx.objectStore(objectStoreName).put(value, key);

            // error
            record.onerror = (e) => {
                return Promise.reject("Could not create instance. Here the err: " + e)
            }

            // success
            record.onsuccess = (e) => {
                return Promise.resolve(true);
            }

        })

        return Promise.reject(false);

    }



    /**************************************************** */
    /* DELETE */
    /**************************************************** */

    public deleteDBI = (DBName: string) => {

    }

    public deleteEntityI = (key: string, mode: IDBTransactionMode = this.mainObjectStore.mode, objectStoreName: string = this.mainObjectStore.name, DBName: string = this.mainDB.name, version: number = this.mainDB.version) => {


    }

    public deleteInstanceI = (key: string, mode: IDBTransactionMode = this.mainObjectStore.mode, objectStoreName: string = this.mainObjectStore.name, DBName: string = this.mainDB.name, version: number = this.mainDB.version): Promise<boolean> => {

        this.getEntityI(DBName, version, objectStoreName, mode).then((entity) => {
            entity.delete(key);
        })

        this.getInstanceI(key, mode, objectStoreName, DBName, version).then((result) => {
            if (result) {
                return Promise.resolve(true);
            }
        })

        return Promise.reject(false);
    }



    /**************************************************** */
    /* HELPER METHODS */
    /**************************************************** */


    /**
     * Establishes a connection to a database
     * @param DBName Name of database
     * @param version Version number
     */
    private establishConnectionI = async (DBName: string = this.mainDB.name, version: number = this.mainDB.version): Promise<IDBOpenDBRequest> => {

        return indexedDB.open(DBName, version);

    }

    private getDBI = async (DBName: string = this.mainDB.name, version: number = this.mainDB.version): Promise<IDBDatabase> => {

        return this.establishConnectionI(DBName, version).then((request) => {

            // If failed
            request.onerror = () => {
                Promise.reject(new Error("Could not establish connection"));
            }


            // If the database needs an upgrade
            request.onupgradeneeded = (e) => {

                return request.result;
            }

            return request.result;
        })

    }

    /**
     * Gets a transaction object. With that we can manipulate an object store (entity)
     */
    private getTransactionI = async (DBName: string, version: number, objectStoreName: string, mode: IDBTransactionMode = this.mainObjectStore.mode): Promise<IDBTransaction> => {

        // Get database
        return this.getDBI(DBName, version).then((db) => {

            return db.transaction(objectStoreName = this.mainObjectStore.name, mode = this.mainObjectStore.mode)

        })

    }

    private getEntityI = async (DBName: string, version: number, objectStoreName: string, mode: IDBTransactionMode = this.mainObjectStore.mode): Promise<IDBObjectStore> => {
        return this.getTransactionI(DBName, version, objectStoreName, mode).then((tx) => {
            return Promise.resolve(tx.objectStore(objectStoreName))
        })

        Promise.reject("Could not get the object store / entity.");
    }








    /**************************************************** */
    /* SYNCHRONIZATION */
    /**************************************************** */

    /**
     * Overwrites data in indexedDB with that provided by the web storage
     */
    public syncWithWebStorageI = () => {

    }

    /**
     * Overwrites data in indexedDB witht that provided by the server
     */
    public syncWithServerI = () => {

    }


    /***
     * Overwrites data in indexedDB with that provided by the server
     */
    public syncWithFileI = () => {

    }

}

export default lssi;