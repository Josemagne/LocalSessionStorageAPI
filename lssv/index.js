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
         * Creates an entity
         * @param entityName Name of the entity
         * @param entityProps The properties of the entity
         * @param storage Which storage to interact with
         */
        this.addEntity = function (entityName, entityProps, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    // Check that the entity does not already exist
                    this.checkEntity(entityName, storage).then(function (entityExists) { return __awaiter(_this, void 0, void 0, function () {
                        var entityID, necessaryProps, optionalProps, properties, entitiesEnum, parsedEnum, before_1, newEntity;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (entityExists)
                                        Promise.reject(new Error("The entity already exists!"));
                                    entityID = this.getNumberOfEntities(storage);
                                    if (!entityID) return [3 /*break*/, 10];
                                    // increment id
                                    entityID++;
                                    if (!!storage.getItem("".concat(entityID, ".propertiesType"))) return [3 /*break*/, 2];
                                    return [4 /*yield*/, storage.setItem("".concat(entityID, ".propertiesType"), JSON.stringify(entityProps))];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    necessaryProps = this.ascertainKindOfProps(entityProps, true);
                                    storage.setItem("".concat(entityID, ".necessaryProps"), JSON.stringify(necessaryProps));
                                    optionalProps = this.ascertainKindOfProps(entityProps, false);
                                    storage.setItem("".concat(entityID, ".optionalProps"), JSON.stringify(optionalProps));
                                    // numberOfInstances
                                    return [4 /*yield*/, storage.setItem("".concat(entityID, ".numberOfInstances"), "0")
                                        // properties
                                    ];
                                case 3:
                                    // numberOfInstances
                                    _a.sent();
                                    properties = JSON.stringify(entityProps);
                                    /* Insert the data */
                                    // Name
                                    return [4 /*yield*/, storage.setItem("".concat(entityID, ".entityName"), entityName)];
                                case 4:
                                    /* Insert the data */
                                    // Name
                                    _a.sent();
                                    // numberOfInstances
                                    return [4 /*yield*/, storage.setItem("".concat(entityID, ".numberOfInstances"), "0")];
                                case 5:
                                    // numberOfInstances
                                    _a.sent();
                                    // propertiesType
                                    return [4 /*yield*/, storage.setItem("".concat(entityID, ".propertiesType"), properties)];
                                case 6:
                                    // propertiesType
                                    _a.sent();
                                    entitiesEnum = storage.getItem("entitiesEnum");
                                    if (entitiesEnum) {
                                        parsedEnum = JSON.parse(entitiesEnum);
                                        // Add the properties
                                        parsedEnum[entityName] = { id: entityID, props: entityProps };
                                        // Set the item in the web storage
                                        storage.setItem('entitiesEnum', JSON.stringify(parsedEnum));
                                    }
                                    return [4 /*yield*/, storage.getItem('numberOfEntities')];
                                case 7:
                                    before_1 = _a.sent();
                                    if (!before_1) return [3 /*break*/, 9];
                                    return [4 /*yield*/, storage.setItem('numberOfEntities', (parseInt(before_1) + 1).toString())];
                                case 8:
                                    _a.sent();
                                    _a.label = 9;
                                case 9:
                                    newEntity = {
                                        id: entityID,
                                        props: entityProps
                                    };
                                    this.entities.push(newEntity);
                                    // If we were able to add the entity
                                    return [2 /*return*/, Promise.resolve(true)];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/, Promise.reject(false)];
                });
            });
        };
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
        this.createInstance = function (entityName, props, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            return __awaiter(_this, void 0, void 0, function () {
                var entityID, instanceID, instanceValues;
                var _this = this;
                return __generator(this, function (_a) {
                    entityID = this.getEntityID(entityName, storage);
                    instanceID = this.getNumberOfInstances(entityName, storage);
                    instanceValues = Object.values(props);
                    /* Insert the data into web storage */
                    instanceID.then(function (instance_id) {
                        instance_id++;
                        // Check if the data for the entity is legitimate
                        _this.checkInstance(entityName, props).then(function () {
                            // Insert values of instance 
                            storage.setItem("".concat(entityID, ".").concat(instanceID), instanceValues.join(','));
                        });
                        // Once we finished inserting the new entity we increment numberOfInstances by one
                        storage.setItem("".concat(entityID, ".numberOfInstances"), (instanceID).toString());
                        return true;
                    });
                    // If the entity does not exist
                    return [2 /*return*/, false];
                });
            });
        };
        /**
         * Loop that uses createInstance()
         * @param entityName Name of entity
         * @param props Properties of the instance
         * @param storage Type of web storage
         */
        this.createInstances = function (entityName, props, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            return __awaiter(_this, void 0, void 0, function () {
                var _loop_1, this_1, i;
                return __generator(this, function (_a) {
                    _loop_1 = function (i) {
                        this_1.createInstance(entityName, props[i], storage).then(function (result) {
                            if (false === result) {
                                return false;
                            }
                        })
                            .catch(function (err) {
                            throw new Error("We couldn't insert the instance: " + JSON.stringify(props[i] + " /n Here is the error Code: " + err));
                        });
                    };
                    this_1 = this;
                    for (i = 0; i < props.length; i++) {
                        _loop_1(i);
                    }
                    // If we got here then it means that all instances were created successfully
                    return [2 /*return*/, true];
                });
            });
        };
        // TODO finish
        this.createObject = function () {
        };
        /* READ */
        /* Here are all the methods that are about reading data */
        /**
         * Get all the instances of an entity
         * @param entity Entity whose instances we want to retrieve
         * @param storage What kind of web storage we want to access
         */
        this.getInstances = function (entityName, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            return __awaiter(_this, void 0, void 0, function () {
                var instances, entityID, numberOfInstances, i, instance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            instances = [];
                            entityID = this.getEntityID(entityName, storage);
                            if (!entityID) return [3 /*break*/, 5];
                            numberOfInstances = storage.getItem("".concat(entityID, ".numberOfInstances"));
                            if (!numberOfInstances) return [3 /*break*/, 4];
                            i = 1;
                            _a.label = 1;
                        case 1:
                            if (!(i <= parseInt(numberOfInstances))) return [3 /*break*/, 4];
                            instance = storage.getItem("".concat(entityID, ".").concat(i));
                            if (!instance) return [3 /*break*/, 3];
                            return [4 /*yield*/, instances.push(JSON.parse(instance))];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, instances];
                        case 5: 
                        // If no instances were found
                        return [2 /*return*/, null];
                    }
                });
            });
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
                var entityID, numberOfInstances;
                return __generator(this, function (_a) {
                    entityID = this.getEntityID(entityName, storage);
                    numberOfInstances = this.getNumberOfInstances(entityName, storage);
                    if (entityID && numberOfInstances) {
                        numberOfInstances.then(function (instanceNumber) {
                            for (var i = 1; i <= instanceNumber; i++) {
                                var instance = storage.getItem("".concat(entityID, ".").concat(instanceID));
                                // Test if instance exists
                                if (instance) {
                                    storage.setItem("".concat(entityID, ".").concat(instanceID), JSON.stringify(newProps));
                                    return true;
                                }
                            }
                        });
                        return [2 /*return*/, false];
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
            numberOfInstances.then(function (number) {
                for (var i = 0; i < number; i++) {
                    // TODO finish that
                    if (keys[i])
                        storage.removeItem(keys[i]);
                }
            });
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
        // TODO finish
        this.convertJSON = function () {
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
            return __awaiter(_this, void 0, void 0, function () {
                var id, result, item;
                return __generator(this, function (_a) {
                    id = this.getEntityID(entityName);
                    // If the entity exists
                    if (id) {
                        item = storage.getItem("".concat(id, ".numberOfInstances"));
                        // Check if we got a string and the item thus exists
                        if (item) {
                            result = parseInt(item);
                            return [2 /*return*/, result];
                        }
                    }
                    return [2 /*return*/, Promise.reject(new Error("The entity does not exist."))];
                });
            });
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
                return entityObj[entityName].id.toString();
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
        this.checkEntity = function (entityName, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            return __awaiter(_this, void 0, void 0, function () {
                var entitiesEnum, parsedEnum;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            entitiesEnum = storage.getItem("entitiesEnum");
                            if (!entitiesEnum) return [3 /*break*/, 2];
                            return [4 /*yield*/, JSON.parse(entitiesEnum)];
                        case 1:
                            parsedEnum = _a.sent();
                            // If the entity already exist
                            if (parsedEnum[entityName]) {
                                return [2 /*return*/, Promise.resolve(true)];
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/, false];
                    }
                });
            });
        };
        /**
         * Is only invoked by createInstance(). Tests if the instance values respect the specification at propertiesType.
         * @param entityName Name of entity
         * @param instanceValues Array with the values of the instance
         * @returns Promise Returns either true or an error message
         */
        this.checkInstance = function (entityName, instanceProps, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            return __awaiter(_this, void 0, void 0, function () {
                var entityID, propertiesTypes, necessaryProps, parsedNecessaryProps, keys_instanceProps, keys_necessaryProps, k, j;
                return __generator(this, function (_a) {
                    entityID = this.getEntityID(entityName, storage);
                    propertiesTypes = this.getProperties(entityName, storage);
                    // If the entity does not exist
                    if (!propertiesTypes) {
                        // The entity does not exist
                        Promise.reject(new Error("The entity does not exist"));
                    }
                    necessaryProps = storage.getItem("".concat(entityID, ".necessaryProps"));
                    if (necessaryProps) {
                        parsedNecessaryProps = JSON.parse(necessaryProps);
                        keys_instanceProps = Object.keys(instanceProps);
                        keys_necessaryProps = Object.keys(parsedNecessaryProps);
                        // Check if the length is the same
                        if (keys_instanceProps.length < keys_necessaryProps.length) {
                            return [2 /*return*/, Promise.reject(new Error("Not all necessary properties are given"))];
                        }
                        // The number of properties is the same
                        else {
                            // Check if the name of the props are the same
                            for (k = 0; k < keys_necessaryProps.length; k++) {
                                // If the property does not exist
                                if (parsedNecessaryProps[keys_instanceProps[k]]) {
                                    return [2 /*return*/, Promise.reject(new Error("".concat(parsedNecessaryProps[keys_necessaryProps[k]], " is n")))];
                                }
                            }
                            // Check if the type of the values are the same
                            for (j = 0; j < keys_instanceProps.length; j++) {
                                if (parsedNecessaryProps[keys_necessaryProps[j]] === typeof instanceProps[keys_necessaryProps[j]]) {
                                    return [2 /*return*/, Promise.reject(new Error("".concat(instanceProps[keys_necessaryProps[j]], " is not of the required type")))];
                                }
                            }
                        }
                        return [2 /*return*/, Promise.resolve(true)];
                    }
                    // If everything went fine
                    return [2 /*return*/, Promise.resolve(false)];
                });
            });
        };
        // TODO finish
        // private encryptInstance = async (): Promise<boolean> => {
        // }
        // TODO finish
        // private encryptStorage = async (): Promise<boolean> => {
        // }
        /**
         * Gets either the necessary or optional props of an entity. If 'necessaryProps' is true then it returns the properties of the given entity that must be specified. If 'necessaryProps' is false then we return the optional properties
         * @param entityName Name of entity
         * @param optionalProps Decides if we want the necessaryProps
         * @param storage
         */
        this.getCertainProps = function (entityName, necessaryProps, storage) {
            if (storage === void 0) { storage = _this.storageChoice; }
            var result = {};
            var entityID = _this.getEntityID(entityName);
            if (entityID) {
                // If neccesary props is true
                if (necessaryProps) {
                    var necessaryProps_1 = storage.getItem("".concat(entityID, ".necessaryProps"));
                    if (necessaryProps_1) {
                        result = JSON.parse(necessaryProps_1);
                    }
                }
                // If optional props are requested
                else {
                    var optionalProps = storage.getItem("".concat(entityID, ".optionalProps"));
                    if (optionalProps) {
                        result = JSON.parse(optionalProps);
                    }
                }
            }
            return result;
        };
        /**
         *
         * @param props The properties of an entity
         * @param necessary Decides if we return the necessary properties if true and the optional if false
         */
        this.ascertainKindOfProps = function (props, necessary) {
            /**
             * The requested kind of properties
             */
            var result = {};
            // Keys of the properties
            var keys = Object.keys(props);
            if (necessary) {
                for (var i = 0; i < Object.keys(props).length; i++) {
                    // If the property is an object
                    if (props[keys[i]] instanceof Object) {
                        // If the object property is necessary
                        if (!keys[i].endsWith("?")) {
                            var subProps = _this.getPropsOfObject(props[keys[i]], necessary);
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
        };
        /**
         * Helper method that gets the kind of the properties for an object
         * @param prop The object whose properties is going to be extracted
         * @param necessary Decides if we return only the necessary or optional props
         */
        this.getPropsOfObject = function (subProp, necessary) {
            // The requested object that gets returned
            var result = {};
            var keys = Object.keys(subProp);
            // For the necessary props
            if (necessary) {
                for (var i = 0; i < keys.length; i++) {
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
        };
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
    return lssv;
}());
export default lssv;
