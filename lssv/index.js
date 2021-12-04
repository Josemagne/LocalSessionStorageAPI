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
var lssv = /** @class */ (function () {
    // initiate
    /**
     * @param storage Type of web storage the object will use by default.
     */
    function lssv(storage) {
        var _this = this;
        if (storage === void 0) { storage = localStorage; }
        /**
         * Object that contains the key of the entity in the key and the type of the value in the value.
         * The object's lifetime is during the runtime of the program.
         */
        // TODO The object is not populated --> populate it
        this.entities = [];
        /**
         * Defines the default web storage choice that we are handling. If no storage is specified in the methods then we use the value of storageChoice
         * The options are either localStorage or sessionStorage.
         * The predefined storage type is localStorage.
         */
        this.storageChoice = localStorage;
        /**
         *
         * @param entityProps The properties of the entity
         * @param storage Which storage to interact with
         */
        this.addEntity = function (entityName, entityProps, storage) {
            /* Collect and process the data */
            if (storage === void 0) { storage = _this.storageChoice; }
            // id
            var id = _this.getNumberOfEntities(storage);
            if (id) {
                // Props of entity
                if (!storage.getItem("".concat(id, ".propertiesType"))) {
                    storage.setItem("".concat(id, ".propertiesType"), JSON.stringify(entityProps));
                }
                // numberOfInstances
                storage.setItem("".concat(id, ".numberOfInstances"), "0");
            }
            // properties
            var properties = JSON.stringify(entityProps);
            /* Insert the data */
            // Name
            storage.setItem("".concat(id, ".entityName"), entityName);
            // numberOfInstances
            storage.setItem("".concat(id, ".numberOfInstances"), "0");
            // propertiesType
            storage.setItem("".concat(id, ".propertiesType"), properties);
            // Once the entity was added then we increment 'numberOfentities
            var before = storage.getItem('numberOfEntities');
            if (before) {
                storage.setItem('numberOfEntities', (parseInt(before) + 1).toString());
            }
            // Add the entity to the class property 'entities'    
            if (id) {
                var newEntity = {
                    name: entityName,
                    id: id,
                    numberOfInstances: 0,
                    props: entityProps
                };
                _this.entities.push(newEntity);
            }
        };
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
        this.createInstance = function (entityName, props, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            return __awaiter(_this, void 0, void 0, function () {
                var entityID, instanceID, values, checkedInstance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            entityID = this.getEntityID(entityName, storage);
                            instanceID = this.getNumberOfInstances(entityName, storage);
                            values = Object.values(props);
                            if (!instanceID) return [3 /*break*/, 2];
                            instanceID++;
                            checkedInstance = this.checkInstance(entityName, values);
                            return [4 /*yield*/, checkedInstance.then(function (value) { return true === value; })];
                        case 1:
                            if (_a.sent()) {
                                // Insert values of instance 
                                storage.setItem("".concat(entityID, ".").concat(instanceID), values.join(','));
                            }
                            // Once we finished inserting the new entity we increment numberOfInstances by one
                            storage.setItem("".concat(entityID, ".numberOfInstances"), (instanceID).toString());
                            return [2 /*return*/, true];
                        case 2: 
                        // If the entity does not exist
                        return [2 /*return*/, false];
                    }
                });
            });
        };
        // TODO finish
        this.createObject = function () {
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
        this.getInstance = function (entityName, id, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            var entityID = _this.getEntityID(entityName, storage);
            if (entityID) {
                var instance = storage.getItem("".concat(entityID, ".").concat(id));
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
        this.getInstances = function (entityName, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            var instances = [];
            var entityID = _this.getEntityID(entityName, storage);
            if (entityID) {
                var numberOfInstances = storage.getItem("".concat(entityID, ".numberOfInstances"));
                if (numberOfInstances)
                    for (var i = 1; i <= parseInt(numberOfInstances); i++) {
                        var instance = storage.getItem("".concat(entityID, ".").concat(i));
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
         * Retrieves instances that fulfill certain conditions
         */
        this.getWithCondition = function (condition) {
        };
        // TODO finish
        this.getObjects = function () {
        };
        /* UPDATE */
        /* Here are all the methods that are related to editing data */
        /**
         * Changes the properties type of an entity.
         * @param entityName Name of entity
         * @param storage Type of web storage
         * @returns Promise Returns a promise based true for success and false for failure.
         */
        this.updateEntity = function (entityName, newProps, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            return __awaiter(_this, void 0, void 0, function () {
                var entityID;
                return __generator(this, function (_a) {
                    entityID = this.getEntityID(entityName, storage);
                    if (entityID) {
                        storage.setItem("".concat(entityID, ".propertiesType"), JSON.stringify(newProps));
                        return [2 /*return*/, true];
                        // TODO Update the class
                    }
                    return [2 /*return*/, false];
                });
            });
        };
        /**
         * Changes the value of the properties for an instance.
         * @param entityName Name of entity
         * @param instanceID ID of instance
         * @param instanceProps New props for the instance
         * @param storage Type of web storage
         * @returns Promise Returns a promise based true for success and false for failure.
         */
        this.updateInstance = function (entityName, instanceID, newProps, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            return __awaiter(_this, void 0, void 0, function () {
                var entityID, instance;
                return __generator(this, function (_a) {
                    entityID = this.getEntityID(entityName, storage);
                    instance = storage.getItem("".concat(entityID, ".").concat(instanceID));
                    // Check if entity exists
                    if (instance) {
                        storage.setItem("".concat(entityID, ".").concat(instanceID), JSON.stringify(newProps));
                        return [2 /*return*/, true];
                    }
                    else
                        return [2 /*return*/, false];
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Updates all the instances of an entity.
         * @param entityName Name of entity
         * @param instanceID ID of instance
         * @param newProps New props for the instances
         * @param storage
         * @returns Promise Returns a promise based true for success and false for failure.
         */
        this.updateInstances = function (entityName, instanceID, newProps, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            return __awaiter(_this, void 0, void 0, function () {
                var entityID, numberOfInstances, i, instance;
                return __generator(this, function (_a) {
                    entityID = this.getEntityID(entityName, storage);
                    numberOfInstances = this.getNumberOfInstances(entityName, storage);
                    if (entityID && numberOfInstances) {
                        for (i = 1; i <= numberOfInstances; i++) {
                            instance = storage.getItem("".concat(entityID, ".").concat(instanceID));
                            // Test if instance exists
                            if (instance) {
                                storage.setItem("".concat(entityID, ".").concat(instanceID), JSON.stringify(newProps));
                                return [2 /*return*/, true];
                            }
                        }
                    }
                    return [2 /*return*/, false];
                });
            });
        };
        this.updateWithCondition = function () {
        };
        // TODO finish
        this.updateObject = function () {
        };
        /* DELETE */
        /* Here are the methods that are related with deleting data */
        /**
         * Deletes all instances of an entity
         * @param entity Entity we want to delete
         */
        this.deleteEntity = function (entityName, storage) {
            if (storage === void 0) { storage = _this.storageChoice = localStorage; }
            var entityID = _this.getEntityID(entityName, storage);
            var numberOfInstances = _this.getNumberOfInstances(entityName, storage);
            var keys = Object.keys(storage);
            if (numberOfInstances) {
                for (var i = 0; i < numberOfInstances; i++) {
                    // TODO finish that
                    if (keys[i])
                        storage.removeItem(keys[i]);
                }
            }
        };
        this.deleteInstance = function () {
        };
        /**
         * Deletes an entire storage
         */
        this.deleteStorage = function (storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            storage.clear();
        };
        /**
         * Deletes certain instances if certain conditions are fulfilled
         */
        this.deleteWithCondition = function () {
        };
        // TODO finish
        this.deleteObject = function () {
        };
        /* MIGRATION */
        // This are the methods that migrate data to the other web storage
        this.migrateEntities = function () {
        };
        this.migrateInstances = function () {
        };
        /* HELPER FUNCTIONS */
        /* Helper functions can be accessed from the localStorage and sessionStorage methods */
        /**
         * Populates 'entities' with data
         */
        this.loadData = function () {
        };
        /**
         * Returns the total number of instances for an entity
         * We have an item with the key 'numberOfInstances' on each entity that stores how much instances an entity has
         */
        this.getNumberOfInstances = function (entityName, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            var id = _this.getEntityID(entityName);
            var result;
            // If the entity exists
            if (id) {
                var item = storage.getItem("".concat(id, ".numberOfInstances"));
                // Check if we got a string and the item thus exists
                if (item) {
                    result = parseInt(item);
                    return result;
                }
            }
            return null;
        };
        /**
         * Returns the number of entities that is stored in 'numberOfEntities'.
         * @param storage Type of web storage
         */
        this.getNumberOfEntities = function (storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            var number = storage.getItem('numberOfEntities');
            if (number) {
                return parseInt(number);
            }
            return null;
        };
        /**
    * Gets the properties of an entity
    * @param entityName Name of entity
    * @param storage Type of web storage
    */
        this.getProperties = function (entityName, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            // Obj that gets returned at the end
            var properties;
            var id = _this.getEntityID(entityName, storage);
            if (id) {
                var stringProps = storage.getItem("".concat(id, ".propertiesType"));
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
         * Gets the id of the entity.
         * @param entityName Name of the entity
         * @param storage Type of web storage
         * @returns ID of the entity
         */
        this.getEntityID = function (entityName, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            var entitiesEnum = storage.getItem("entitiesEnum");
            var entityObj = {};
            if (entitiesEnum) {
                entityObj = JSON.parse(entitiesEnum);
                return entityObj[entityName];
            }
            // The entity does not exist i.e. it was not added
            else
                return null;
        };
        // TODO finish updateProps()
        this.updateProps = function (newProps, oldProps) {
            /**
             * Properties that are in both objects
             */
            var persist = [];
            /**
             * Properties of old object
             */
            var newKeys = Object.keys(newProps);
        };
        // TODO finish
        /**
         * Is only invoked by createInstance() and getObject(). The function gets the keys from 'propsArray' and the values from the specific instance and returns an object
         */
        this.composeInstance = function (entityName, instanceID) {
        };
        /**
         * Is only invoked by createInstance(). Tests if the instance values respect the specification at propertiesType.
         * @param entityName Name of entity
         * @param instanceValues Array with the values of the instance
         * @returns Promise Returns either true or an error message
         */
        this.checkInstance = function (entityName, instanceValues, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            return __awaiter(_this, void 0, void 0, function () {
                var propsArray, propertiesTypes, i;
                return __generator(this, function (_a) {
                    propsArray = [];
                    propertiesTypes = this.getProperties(entityName, storage);
                    if (propertiesTypes) {
                        propsArray = Object.keys(propertiesTypes);
                    }
                    // If the entity does not exist
                    else
                        throw new Error("The entity does not exist");
                    // Check types
                    for (i = 0; i < propsArray.length; i++) {
                        if (propsArray[i] !== typeof instanceValues[i]) {
                            throw new Error("".concat(instanceValues[i], " is not of the type ").concat(propsArray[i]));
                        }
                    }
                    return [2 /*return*/, true];
                });
            });
        };
        // set the choice for the default storage
        this.storageChoice = storage;
        if (storage) {
            // Keep track of entities
            if (!storage.getItem('numberOfEntities')) {
                storage.setItem('numberOfEntities', '0');
            }
            if (!storage.getItem('entitiesEnum')) {
                var entitiesEnum = {};
                storage.setItem('entitiesEnum', JSON.stringify(entitiesEnum));
            }
        }
    }
    return lssv;
}());
export default lssv;
//# sourceMappingURL=index.js.map