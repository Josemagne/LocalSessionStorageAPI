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

<h2>Functioning</h2>
How does the API work?

properties is a listing of all the properties that the entity has.
The first items are prefixed with a zero. They contain the settings for the api.

<h3>Entities</h3>
Entities such as persons, employees, products, books and so on begin with {1-9}entity{nameOfEntity}.
We can have entities between 1 to 9 that are prefixed with 1-9.
All the instances of the entities are then further prefixed with a point and a number starting with 1
The properties of an entity are saved in the second prefix 0.
- E.g.) For Video Games: 2.0: "title": "Minecraft", "language":"English", "price":5,"currency":"usd"'

To keep track of the entities we have '0entitiesEnum'. 0EntitiesEnum lists all the entities that we have.

- E.g.) "book": "1", "person": "2", "employee": "3", "customer": "4" ...
  Note that each key must be a string. We do that to use the JSON.parse() and JSON.stringify().

### Handling Strings

Web storage allows us only to store strings. To efficiently convert the strings to objects we use `JSON.parse()` and `JSON.stringify()`

## Best Practises

---

sessionStorage should be used for data that is sensible and not

### Use localStorage

## References

---

Here are resources to get sophisticated with web storage:

<ul>
- <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">Web Storage API by MDN</a>
</ul>

<div id="testing">
<h2>Testing</h2>
To test the API we use cypress. The helper functions are tested with jest.
GitLabCI runs the tests on a pipeline.
</div>

## Q&A

---

### Why not use asynchronous functions?

### Why not use the name of the entity as index instead of a number?

This would mean a slight increase of storage occupation since all the instances must also be prefixed with with the string of the entity name.
In terms of the API we would not need to find out the id of the entity.
A number instead takes slightlly less space. We want to fill the web storage with as much entries as possible therefore we decide against the processing comfort for the time being.

## Improvements

---

Do you have improvements to the api? The project is still in development. If you have something that you

- [ ] Create Exceptions for specific errors. That enhances debugging.

- [ ] Write better documentation.

- [ ] Add a private method that tests if the keys of the objects are strings. This helps to keep consistency and avoiding errors. </br> [MDN example](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#example_replacer_as_a_function)

- [ ] Only require storageChoice at the instanciation of of the class. </br> To create an entity we must invoke the method `addEntity()`
