# LocalSessionStorageAPI

# Contents

- [Introduction](#introduction)

localSessionStorageAPI is an API that simplifies the CRUD operations with the localStorage and sessionStorage

The class can handle both sessionStorage and localStorage.

# Introduction {#introduction}

---

The goal of LocalSessionStorageAPI (lss) is to lessen the requests to a . Frequent retrieval of data will be instead delegated to localStorage. Only the data that is scarcely used or will be handled by a server API.

### Purpose

## Documentation

---

## Terminology

---

Here are the explanation for terms that are used in the code. From here on the api is abbreviated as '**llsv**' which stands for vanilla LocalSessionStorageAPI.

| Term     | Explanation                                      |
| -------- | :----------------------------------------------- |
| Entity   | An entity is an object that contains properties. |
| Instance | An instance is                                   |
| Property | A property defines a part of an entity.          |

### Examples

<details>
<summary>Entity</summary>
<p>If we take a Book as entity then it could have props such as 'title', 'pages', 'language', 'author_name', 'author_prename' and so on.</p>
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
</details>

## Functioning

---

How does the API work?

properties is a listing of all the properties that the entity has.
The first items are prefixed with a zero. They contain the settings for the api.

### Entities

Entities such as persons, employees, products, books and so on begin with {1-9}.{nameOfEntity}. </br>
All the instances of the entities are then further prefixed with a point and a number starting with 1

To keep track of the entities we have 'entitiesEnum'. 'entitiesEnum' lists all the entities that we have.

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
