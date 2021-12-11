# LocalSessionStorageAPI

# Contents

- [Introduction](#introduction)

localSessionStorageAPI is an API that simplifies the CRUD operations with the localStorage and sessionStorage

The class can handle both sessionStorage and localStorage.

# Introduction {#introduction}

---

### Purpose

The primary purpose of LocalSessionStorageAPI (lss) is to lessen the requests to a . Frequent retrieval of data will be instead delegated to localStorage. Only the data that is scarcely used or will be handled by a server API.

lssv can also be used in native web applications. While being offline the user can store his data on the web storage.

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

| Term     | Explanation                                      |
| -------- | :----------------------------------------------- |
| Entity   | An entity is an object that contains properties. |
| Instance | An instance is                                   |
| Property | A property defines a part of an entity.          |
| Object   | An object is a simple JavaScript object.         |

### Examples

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

## Functioning

---

How does the API work?

properties is a listing of all the properties that the entity has.
The first items are prefixed with a zero. They contain the settings for the api.

### Entities

Entities such as persons, employees, products, books and so on begin with {1-9}.{nameOfEntity}. </br>
All the instances of the entities are then further prefixed with a point and a number starting with 1

To keep track of the entities we have 'entitiesEnum'. 'entitiesEnum' is an object where the key is the name of the entity and the value is another object with its properties ("props") and id ("id").

## Best Practises

---

### sessionStorage

sessionStorage should be used for data that is sensible because once the user finished interacting with the browser the data will not persist.

### localStorage

localStorage on the other hand should be used for data that is not sensible because localStorage is persistent and someone else could access the browser and look up the data easily.

An example for a use case would be to store options for the settings of the user.

## References

---

Here are resources to get sophisticated with web storage:

- [Web Storage API by MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

## Q&A

---

### How does lssv store data?

lssv saves each time we add an entity the properties of it. The properties for a person could be:

```javascript
{name: "string", prename: "string"}
```

Each time we store an instance lssv does format the values as an array. The id

## Improvements

---

Do you have improvements to the api? The project is still in development. If you have something that you

- [ ] Create Exceptions for specific errors. That enhances debugging.

- [ ] Write better documentation.

- [ ] Instead of an object, use an array to hold the values while we map the keys to the values with an array that contains the properties

- [ ] Only require storageChoice at the instanciation of of the class. </br> To create an entity we must invoke the method `addEntity()`

- [ ] Restrict the possible arguments of 'entityName' to the ones defined in the web storage.

- [ ] Minify code in the compilation process.

- [ ] Refactor the code that checkInstance() allows multiple types for a property

- [ ] Refactor: migrate param autoIncrement to addEntity()
