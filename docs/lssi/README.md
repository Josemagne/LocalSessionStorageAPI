# LocalSessionStorage indexedDB API

lssi is an API that facilitates the interaction between indexedDB and the developer.
lssi fits well together with lssv.

## Terminology

lssi is shorthand for lss. 'i' stands for indexedDB.

## Must Read

For the time being lssi can't manage indexing the records in an object store by itself. 'autoIncrement' is therefore set to true by default

## Naming Convetion

Each method of the class lssi end with 'I'. We do this to distinguish the methods of lssv with the ones of lssi.

## Best practises

### One lssi object for each object store / entity

When you create an object store you should always declare which object store it is associated with.

Here an example for an entity 'persons'

```js
const personsI = new lssi("persons", 1, "personsStore", "readwrite");
```

For the object 'personsI' you do not longer need to specify which object store you want. You can now use the CRUD operations with the minimum amount of arguments!

<details>
<summary>READ/GET: Get me the person with the identity "3"</summary>

```js
personsI.getInstance("3");
```

</details>

## References

- [w3.org]()
- [mdn docs]()
- [Pillip Walton at Google] (https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/indexeddb-best-practices)
