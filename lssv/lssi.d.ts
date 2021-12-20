import { DBRepresentationI, mainDB } from './types';
/**
 * API that facilitates the use of indexedDB
 */
declare class lssi {
    representation: DBRepresentationI;
    /**
     * Default database
     */
    mainDB: mainDB;
    /**
     * Default object store
     */
    mainObjectStore: {
        name: string;
        mode: IDBTransactionMode;
        options: IDBObjectStoreParameters;
    };
    /**
     *
     * @param mainDB Default database
     * @param mainDBVersion Version of default database
     */
    constructur(mainDB?: string, mainDBVersion?: number, mainObjectStoreName?: string, mode?: IDBTransactionMode): void;
    /**************************************************** */
    /**************************************************** */
    /**
     * Gets an overview of the data in indexedDB
     */
    /**
     *
     * @param mode Mode to access the object store
     * @param objectStoreName Name of the object store
     * @param DBName Name of the database
     * @param version Version of the database
     */
    getInstanceI: (key: string, mode?: IDBTransactionMode, objectStoreName?: string, DBName?: string, version?: number) => Promise<any>;
    getInstanceWithConditionI: () => void;
    /**
     * Gets all items of an object store
     * @param objectStoreName Name of object store
     * @param version Version number
     */
    getInstancesI: (objectStoreName?: string, DBName?: string, version?: number, mode?: IDBTransactionMode) => void;
    /**************************************************** */
    /**************************************************** */
    /**
     * Adds a database to indexedDB
     */
    addDBI: (DBName?: string) => boolean;
    /**
     * Creates a store object
     * @returns
     */
    addEntityI: (DBName?: string, version?: number, objectStoreName?: string, storeOptions?: IDBObjectStoreParameters | undefined, mode?: IDBTransactionMode, options?: IDBObjectStoreParameters) => Promise<boolean>;
    createInstanceI: (DBName: string | undefined, version: number | undefined, objectStoreName: string | undefined, mode: IDBTransactionMode | undefined, value: any) => Promise<void>;
    /**************************************************** */
    /**************************************************** */
    /**
     *
     * @param DBName Name of database
     * @param version Version number
     */
    updateDatabaseI: (DBName?: string, version?: number) => void;
    /**
     * Updates object store
     */
    updateEntityI: () => void;
    /**
     * Updates an item in an object store
     */
    updateInstanceI: (key: string, value: any, mode?: IDBTransactionMode, objectStoreName?: string, DBName?: string, version?: number) => Promise<boolean>;
    /**************************************************** */
    /**************************************************** */
    deleteDBI: (DBName: string) => void;
    deleteEntityI: (key: string, mode?: IDBTransactionMode, objectStoreName?: string, DBName?: string, version?: number) => void;
    deleteInstanceI: (key: string, mode?: IDBTransactionMode, objectStoreName?: string, DBName?: string, version?: number) => Promise<boolean>;
    /**************************************************** */
    /**************************************************** */
    /**
     * Establishes a connection to a database
     * @param DBName Name of database
     * @param version Version number
     */
    private establishConnectionI;
    private getDBI;
    /**
     * Gets a transaction object. With that we can manipulate an object store (entity)
     */
    private getTransactionI;
    private getEntityI;
    /**************************************************** */
    /**************************************************** */
    /**
     * Overwrites data in indexedDB with that provided by the web storage
     */
    syncWithWebStorageI: () => void;
    /**
     * Overwrites data in indexedDB witht that provided by the server
     */
    syncWithServerI: () => void;
    /***
     * Overwrites data in indexedDB with that provided by the server
     */
    syncWithFileI: () => void;
}
export default lssi;
