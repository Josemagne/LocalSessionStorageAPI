# LocalSessionStorageAPI

# Contents

- [Introduction](#introduction)

localSessionStorageAPI is an API that simplifies the CRUD operations with the localStorage and sessionStorage

The class can handle both sessionStorage and localStorage.

# Introduction {#introduction}

---

### Purpose

The primary purpose of lssv is to manage the state in complex web applications.

Its second functionality is to be a link between indexedDB and the web storage.

### Get Started

First import the module:

```typescript
import lssv from "lssv";
```

Then create an object. You can specify the standard storage type the object will use throughout its life time. If you do not specify any storage type then **localStorage** is choosen as standard:

```typescript
const l = new lssv();
```

Once we have created the object the storage type will look like this:

| Key              | Value |
| ---------------- | :---- |
| numberOfEntities | 0     |
| entitiesEnum     | {}    |

Let's create an entity that symbolizes a person. For that we must pass arguments for **entityName** and **entityProps** in the the method **addEntity()**.

**entityProps** is an object where the keys are the name of the properties such as 'name', 'prename', 'age' and 'location' and the values are strings inform us of the type such as 'string', 'number' or 'object'.

If a property is not necessary then we simply append a question mark at the end of its name. Here is an example how we add a new entity:

```typescript
const entityProps = {
  name: "string",
  prename: "string",
  age: "number",
  "location?": {
    city: "string",
    county: "string",
    state: "string",
  },
};

l.addEntity("persons", entityProps);
```

After we added the entity the storage type will look like this:

| Key                 | Value                                    |
| ------------------- | :--------------------------------------- |
| numberOfEntities    | 0                                        |
| entitiesEnum        | {}                                       |
| 1.propertiesType    | { name: "string", ..., "location?": ...} |
| 1.necessaryProps    | {name: "string" ... }                    |
| 1.optionalProps     | { "location?": ... }                     |
| 1.numberOfInstances | 0                                        |

```typescript

```

## Documentation

---

### Terminology

---

Here are the explanation for terms that are used in the code. From here on the api is abbreviated as '**llsv**' which stands for vanilla LocalSessionStorageAPI.

| Term          | Explanation                                                      |
| ------------- | :--------------------------------------------------------------- |
| Entity        | An entity is an object that contains properties.                 |
| Instance      | An instance is                                                   |
| Property      | A property defines a part of an entity.                          |
| storageObject | An object is a simple JavaScript object.                         |
| LSSEvent      | A custom event that fire if a instance related method is invoked |

### Details

<details>
<summary>Entity</summary>
<p>If we take a Book as entity then it could have props such as 'title', 'pages', 'language', 'author_name', 'author_prename' and so on.</p>
<p>The possible types for an entity are: number, string and object</p>
<p>Here object stands for an JS object but it also could be an array.</p>

</details>

<details>
<summary>Instance</summary>
<p>
Instance | An instance is an object with the blueprint of the entity. | The entity Book could have an instance as follows:

```javascript
 {title: "Pinocchio", author: "Carlo Collodi", pages: "200"}`
```

</p>
</details>

<details>
<summary>Property</summary>
<p>A book could have the properties 'title', 'author', 'pages'</p>
<p>To denote that a property is optional we simple put a question mark at the end.</p>
<p>E.g.</p>

```javascript
{"location?": {
"city?": "string",
"county?": "string",
"state?": "string"
}}

```

<p>
The possible types for the values are either string, Object, string[] or number[]:
It can only be one of the aforementioned.
</p>

```typescript
[key: string]: string | Object | string[] | number[]
```

If we speak of 'kind' we mean if the property is necessary id est whether it must be specified. We speak of 'type' for a property then we mean what is commonly understood for a type e.g. 'string', 'number' and so on.

</details>

<details>
<summary>storageObject</summary>
<p>A storageObject is a simple JavaScript object that is transformed with JSON.stringify() and then stored in a web storage.</p>
<p>If you want to keep track of the storageObjects simply name your variables the same as your keys</p>
<p>E.g.</p>

```Javascript
let clickedDisplayBtn = {clickedDisplayBtn: false}
```

The web storage will then hold it:

| Key               | Value                      |
| :---------------- | :------------------------- |
| clickedDisplayBtn | {clickedDisplayBtn: false} |

</details>

<details>
<summary>LSSVEvent</summary>
<p>LSSVEvent extends the interface CustomEvent.</p>
<p>Each time we call a function that is related to an entity then we fire an LSSVEvent. LSSEvent contains</p>
<p>E.g.</p>

```javascript
import { createInstance } from "lssv";

createInstance("persons", { name: "Tailor" });
```

</details>

### lssv vs lssi

#### Terminology

Here a comparison of terms for web storage and indexedDB:

| web storage | indexedDB    |
| :---------- | :----------- |
| Entity      | Object Store |
| Instance    | Object       |

## Functioning

---

How does the API work?

## Best Practises

---

### Event driven lssv

If using lssv with events in a framework it is advised to pass only data that does not change often. The web storage is not RAM but its performance is acceptable if the timespan between write (setItem()) and read (getItem()) is reasonable.

For example you shouldn't use lssv for events such as mousemouve but instead for mousedown with mouseup.

#### Functioning

Each time we invoke createInstance(), updateInstance() or deleteInstance() we trigger an LSSVEvent.

### No permenant storage

Web storage is not a permenant solution for your data. For this we have databases or the file system. The web storage is intended for small amounts of data.

### Naming Convention

If you are using a framework (library) like React.js then you can store variables in a web storage. To access a storageObject

## Migrations

lssv can be used to migrate data on the web storage to indexedDB.

## References

---

Here are resources to get sophisticated with web storage:

- [Web Storage API by MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

## Q&A

---

### How does lssv store data?

### What type of data should we store in the web storage?

You should store meta data and 'inconsistent' data. With 'inconsistent' we mean data that won't persist for too long. This is specially true for sessionStorage but localStorage is good enough for stuff like settings for your app.

RAM, web storage, (indexedDB || server database)

E.g. You could use the web storage to load the data temporarily with input from the user and transfer it then for persistent availability in a server database or indexedDB.

## Improvements

---

Do you have improvements to the api? The project is still in development. If you have something that you
