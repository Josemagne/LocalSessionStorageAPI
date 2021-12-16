/**
 * API that facilitates the use of indexedDB
 */
class lssi {

    constructur() {

    }


    /**************************************************** */
    /* READ */
    /**************************************************** */


    /**
     * Gets an overview of the data in 
     */
    public loadI = () => {

    }


    /**************************************************** */
    /* CREATE */
    /**************************************************** */

    /**
     * Creates a store
     * @returns 
     */
    public addEntityI = (DBName: string, version: number, storeName: string, storeOptions?: IDBObjectStoreParameters) => {
        this.establishConnection(DBName, version).then((connection) => {
            connection.createObjectStore(storeName, storeOptions)
        })

    }

    public createInstanceI = () => {
        // add() or put() ? --> err
    }

    /**************************************************** */
    /* UPDATE */
    /**************************************************** */

    public updateInstanceI = () => {
        // TODO put()

    }


    /**************************************************** */
    /* DELETE */
    /**************************************************** */

    /**************************************************** */
    /* HELPER METHODS */
    /**************************************************** */


    private establishConnection = async (DBName: string, version: number): Promise<IDBDatabase> => {
        const request = indexedDB.open(DBName, version);

        await request.onsuccess = () => {
            return request.result
        }

        Promise.reject("Could not establish connection");

    }

    /**
     * Gets a transaction object 
     */
    private getTransactionI = async (DBName: string, version: number, store: string, mode: IDBTransactionMode): Promise<IDBTransaction> => {
        const request = window.indexedDB.open(DBName, version);


        // In case the request worked
        request.onsuccess = () => {

            // Get database connection
            const db = request.result;

            // TODO Restrict mode
            return db.transaction(store, mode);
        }

        Promise.reject("Could not open connection to indexedDB.");

    }




}

export default lssi;