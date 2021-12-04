# LocalSessionStorageAPI class

---

# Contents

</br>

### Properties

</br>

<details>
<summary>entities</summary>
<p>'entities' is an object that keeps track of the data during the session.</p>
</details></br>

<details>
<summary>storageChoice</summary>
<p>'storageChoice' is a variable that holds the kind of storage that will be used as standard.</p>
<p>We can set it at instanciation of the class.</p>
</details>

</br>

### Instanciation

</br>

### Genesis

At the instanciation of the class LocalSessionStorageAPI we define the following properties:

### Entities

At the instanciation of the class

<dl>
<dt>0entitiesEnum</dt>
<dd>
Listing of entites </br>

```javascript
if (!storage.getItem("0numberOfEntities")) {
  storage.setItem("0numberOfEntities", "1");
}
```

</dd>
</dl>
- Listing of entities: '0entitiesEnum':

- Number of entities: ''0numberOfEntities'
- number of instances: '{1-9}.0numberOfInstances'
- The properties of the entity: '{1-9}.0propertiesType

</br>

## Methods

</br>

Both localStorage and sessionStorage access the same methods. To indicate with which of the two to interact with we give a last argument. We pass either 'localStorage' or 'sessionStorage'.
By default we interact with localStorage because the data will persist.
