var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * API that facilitates the use of indexedDB
 */
var lssi = /** @class */ (function () {
    function lssi() {
        var _this = this;
        this.representation = {
            numberOfDatabases: 0,
            detail: {}
        };
        /**
         * Default database
         */
        this.mainDB = {
            name: "",
            version: 0
        };
        /**
         * Default object store
         */
        this.mainObjectStore = {
            name: "",
            mode: "readonly",
            options: {
                autoIncrement: true
            }
        };
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
        this.getInstanceI = function (key, mode, objectStoreName, DBName, version) {
            if (mode === void 0) { mode = _this.mainObjectStore.mode; }
            if (objectStoreName === void 0) { objectStoreName = _this.mainObjectStore.name; }
            if (DBName === void 0) { DBName = _this.mainDB.name; }
            if (version === void 0) { version = _this.mainDB.version; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Get transaction object
                        return [4 /*yield*/, this.getTransactionI(DBName, version, objectStoreName, mode).then(function (tx) {
                                var record = tx.objectStore(objectStoreName).get(key);
                                // error
                                record.onerror = function (e) {
                                    return Promise.reject("Could not get instance. Here the err: " + e);
                                };
                                // success
                                record.onsuccess = function (e) {
                                    return Promise.resolve(record.result);
                                };
                            })];
                        case 1:
                            // Get transaction object
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.getInstanceWithConditionI = function () {
        };
        /**
         * Gets all items of an object store
         * @param objectStoreName Name of object store
         * @param version Version number
         */
        this.getInstancesI = function (objectStoreName, DBName, version, mode) {
            if (objectStoreName === void 0) { objectStoreName = _this.mainObjectStore.name; }
            if (DBName === void 0) { DBName = _this.mainDB.name; }
            if (version === void 0) { version = _this.mainDB.version; }
            if (mode === void 0) { mode = _this.mainObjectStore.mode; }
            // Get transaction object
            _this.getTransactionI(DBName, version, objectStoreName, mode);
        };
        /**************************************************** */
        /* CREATE */
        /**************************************************** */
        /**
         * Adds a database to indexedDB
         */
        this.addDBI = function (DBName) {
            if (DBName === void 0) { DBName = _this.mainDB.name; }
            _this.getDBI(DBName, 1);
            indexedDB.databases().then(function (dbs) {
                for (var i = 0; i < dbs.length; i++) {
                    // If the database was added
                    if (dbs[i].name === DBName)
                        return true;
                }
            });
            return false;
        };
        /**
         * Creates a store object
         * @returns
         */
        this.addEntityI = function (DBName, version, objectStoreName, storeOptions, mode, options) {
            if (DBName === void 0) { DBName = _this.mainDB.name; }
            if (version === void 0) { version = _this.mainDB.version; }
            if (objectStoreName === void 0) { objectStoreName = _this.mainObjectStore.name; }
            if (mode === void 0) { mode = _this.mainObjectStore.mode; }
            if (options === void 0) { options = _this.mainObjectStore.options; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getDBI(DBName, version)];
                        case 1:
                            (_a.sent()).createObjectStore(objectStoreName, options);
                            // Test if the entity has been added
                            this.getTransactionI(DBName, version, objectStoreName, mode).then(function (tx) {
                                if (tx.objectStoreNames.contains(objectStoreName))
                                    return true;
                            });
                            return [2 /*return*/, false];
                    }
                });
            });
        };
        this.createInstanceI = function (DBName, version, objectStoreName, mode, value) {
            if (DBName === void 0) { DBName = _this.mainDB.name; }
            if (version === void 0) { version = _this.mainDB.version; }
            if (objectStoreName === void 0) { objectStoreName = _this.mainObjectStore.name; }
            if (mode === void 0) { mode = _this.mainObjectStore.mode; }
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getEntityI(DBName, version, objectStoreName, mode).then(function (entity) {
                                // is autoIncrement true?
                                if (_this.mainObjectStore.options.autoIncrement) {
                                    entity.add(value);
                                }
                                // TODO Handle index management?
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**************************************************** */
        /* UPDATE */
        /**************************************************** */
        /**
         *
         * @param DBName Name of database
         * @param version Version number
         */
        this.updateDatabaseI = function (DBName, version) {
            if (DBName === void 0) { DBName = _this.mainDB.name; }
            if (version === void 0) { version = _this.mainDB.version; }
        };
        /**
         * Updates object store
         */
        this.updateEntityI = function () {
        };
        /**
         * Updates an item in an object store
         */
        this.updateInstanceI = function (key, value, mode, objectStoreName, DBName, version) {
            if (mode === void 0) { mode = _this.mainObjectStore.mode; }
            if (objectStoreName === void 0) { objectStoreName = _this.mainObjectStore.name; }
            if (DBName === void 0) { DBName = _this.mainDB.name; }
            if (version === void 0) { version = _this.mainDB.version; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // TODO Use getEntityI() instead?
                        // Get transaction object
                        return [4 /*yield*/, this.getTransactionI(DBName, version, objectStoreName, mode).then(function (tx) {
                                var record = tx.objectStore(objectStoreName).put(value, key);
                                // error
                                record.onerror = function (e) {
                                    return Promise.reject("Could not create instance. Here the err: " + e);
                                };
                                // success
                                record.onsuccess = function (e) {
                                    return Promise.resolve(true);
                                };
                            })];
                        case 1:
                            // TODO Use getEntityI() instead?
                            // Get transaction object
                            _a.sent();
                            return [2 /*return*/, Promise.reject(false)];
                    }
                });
            });
        };
        /**************************************************** */
        /* DELETE */
        /**************************************************** */
        this.deleteDBI = function (DBName) {
        };
        this.deleteEntityI = function (key, mode, objectStoreName, DBName, version) {
            if (mode === void 0) { mode = _this.mainObjectStore.mode; }
            if (objectStoreName === void 0) { objectStoreName = _this.mainObjectStore.name; }
            if (DBName === void 0) { DBName = _this.mainDB.name; }
            if (version === void 0) { version = _this.mainDB.version; }
        };
        this.deleteInstanceI = function (key, mode, objectStoreName, DBName, version) {
            if (mode === void 0) { mode = _this.mainObjectStore.mode; }
            if (objectStoreName === void 0) { objectStoreName = _this.mainObjectStore.name; }
            if (DBName === void 0) { DBName = _this.mainDB.name; }
            if (version === void 0) { version = _this.mainDB.version; }
            _this.getEntityI(DBName, version, objectStoreName, mode).then(function (entity) {
                entity.delete(key);
            });
            _this.getInstanceI(key, mode, objectStoreName, DBName, version).then(function (result) {
                if (result) {
                    return Promise.resolve(true);
                }
            });
            return Promise.reject(false);
        };
        /**************************************************** */
        /* HELPER METHODS */
        /**************************************************** */
        /**
         * Establishes a connection to a database
         * @param DBName Name of database
         * @param version Version number
         */
        this.establishConnectionI = function (DBName, version) {
            if (DBName === void 0) { DBName = _this.mainDB.name; }
            if (version === void 0) { version = _this.mainDB.version; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, indexedDB.open(DBName, version)];
                });
            });
        };
        this.getDBI = function (DBName, version) {
            if (DBName === void 0) { DBName = _this.mainDB.name; }
            if (version === void 0) { version = _this.mainDB.version; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.establishConnectionI(DBName, version).then(function (request) {
                            // If failed
                            request.onerror = function () {
                                Promise.reject(new Error("Could not establish connection"));
                            };
                            // If the database needs an upgrade
                            request.onupgradeneeded = function (e) {
                                return request.result;
                            };
                            return request.result;
                        })];
                });
            });
        };
        /**
         * Gets a transaction object. With that we can manipulate an object store (entity)
         */
        this.getTransactionI = function (DBName, version, objectStoreName, mode) {
            if (mode === void 0) { mode = _this.mainObjectStore.mode; }
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    // Get database
                    return [2 /*return*/, this.getDBI(DBName, version).then(function (db) {
                            return db.transaction(objectStoreName = _this.mainObjectStore.name, mode = _this.mainObjectStore.mode);
                        })];
                });
            });
        };
        this.getEntityI = function (DBName, version, objectStoreName, mode) {
            if (mode === void 0) { mode = _this.mainObjectStore.mode; }
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.getTransactionI(DBName, version, objectStoreName, mode).then(function (tx) {
                            return Promise.resolve(tx.objectStore(objectStoreName));
                        })];
                });
            });
        };
        /**************************************************** */
        /* SYNCHRONIZATION */
        /**************************************************** */
        /**
         * Overwrites data in indexedDB with that provided by the web storage
         */
        this.syncWithWebStorageI = function () {
        };
        /**
         * Overwrites data in indexedDB witht that provided by the server
         */
        this.syncWithServerI = function () {
        };
        /***
         * Overwrites data in indexedDB with that provided by the server
         */
        this.syncWithFileI = function () {
        };
    }
    /**
     *
     * @param mainDB Default database
     * @param mainDBVersion Version of default database
     */
    lssi.prototype.constructur = function (mainDB, mainDBVersion, mainObjectStoreName, mode) {
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
    };
    return lssi;
}());
export default lssi;
