# LocalSessionStorageAPI

<p>localSessionStorageAPI is an API that simplifies the CRUD operations with the localStorage and sessionStorage</p>

<p>The class can handle both sessionStorage and localStorage.</p>

<div id="introduction">
## Introduction
<p>The goal of LocalSessionStorageAPI is to lessen the request to the server. Frequent retrieval of data will be instead delegated to localStorage. Only the data that is scarcely used will be handled by a server API.</p>
<h2>Purpose</h2>

</div>

<div id="documentation">
<h2>Documentation</h2>
<div id="terminology">
<h2>Terminology</h2>
<p>Here are the explanation for the terms that are used in the code:</p>
<ul>
<li>Property: A property is part of an object</li>
<p>E.g.) name: Erickson</p>
<li>Entity: An entity is an object that contains properties</li>
<p>If we take a Book as entity then it could have props such as 'title', 'pages', 'language', 'author_name', 'author_prename' and so on</p>
<li>Instance: An instance is an object with the blueprint of the entity</li>
<p>E.g.) The entity Book has an instance with data for its properties</p>
</ul>
<div id="class">
## Class
<h3>Properties</h3>
<li>
#### entitiesList
<p>An array of of entity names</p>
</li>
<li>
#### storageChoice
<p>The default storage if no storage type was specified in the method</p>
</li>
<h3>Methods</h3>
</div>

</div>
<div id="instanciation">
<h2>Instanciation</h2>
### Genesis
<p>At the instanciation of the class LocalSessionStorageAPI we create the following items:</p>
<ul>
<li>Listing of entities: '0entitiesEnum'</li>
### Entities
<li>entity: '{1-9}name'</li>
<li>number of instances: '{1-9}.0numberOfInstances'</li>
<li>The properties of the entity: '{1-9}.0propertiesType</li>
</ul>

</div>
<div id="methods">
<h2>Methods</h2>
<p>Both localStorage and sessionStorage access the same methods. To indicate with which of the two to interact with we give a last argument. We pass either 'localStorage' or 'sessionStorage'.</p>
<p>By default we interact with localStorage because the data will persist.</p>

</div>

<div id="functioning">
<h2>Functioning</h2>
<p>How does the API work?</p>

<p>properties is a listing of all the properties that the entity has.</p>
<p>The first items are prefixed with a zero. They contain the settings for the api.</p>

<h3>Entities</h3>
<p>Entities such as persons, employees, products, books and so on begin with {1-9}entity{nameOfEntity}.</p>
<p>We can have entities between 1 to 9 that are prefixed with 1-9.</p>
<p>All the instances of the entities are then further prefixed with a point and a number starting with 1</p>
<p>The properties of an entity are saved in the second prefix 0.</p>
<li>E.g.) For Video Games: 2.0: "title": "Minecraft", "language":"English", "price":5,"currency":"usd"'</li>

<p>To keep track of the entities we have '0entitiesEnum'. 0EntitiesEnum lists all the entities that we have.</p>
<li>E.g.) "book": "1", "person": "2", "employee": "3", "customer": "4" ...</li>
<p>Note that each key must be a string. We do that to use the JSON.parse() and JSON.stringify().</p>

<h3>Handling strings</h3>
<p>Web storage allows us only to store strings. To efficiently convert the strings to objects we use JSON.parse() and JSON.stringify()</p>

</div>

<div id="bestpractises">
<h2>Best practises</h2>
<!-- TODO Should we have a class for each web storage or handle both with one class? Both APIs are very similar and differentiate themeselves only in their lifetime and scope -->

</div>
</div>

<div id="references">
<h2>References</h2>
<p>Here are resources to get sophisticated with web storage:</p>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">Web Storage API by MDN</a></li>
</ul>
</div>

<div id="testing">
<h2>Testing</h2>
<p>To test the API we use cypress. The helper functions are tested with jest.</p>
<p>GitLabCI runs the tests on a pipeline.</p>
</div>

<div id="qanda">
<h2>Q&A</h2>
<h3>Why not use asynchronous functions?</h3>
<h3>Why not use the name of the entity as index instead of a number?</h3>
<p>This would mean a slight increase of storage occupation since all the instances must also be prefixed with with the string of the entity name.</p>
<p>In terms of the API we would not need to find out the 'entityID'.</p>
<p>A number instead takes slightlly less space. We want to fill the web storage with as much entries as possible therefore we decide against the processing comfort for the time being.</p>

</div>

<div id="improvements">
<h2>Amendments</h2>
<p>Are there ways to improve the API?</p>
<h3>improvements</h3>
<ul>

<li>
Return specifc messages instead of booleans for the asynchronous functions. This makes debugging easier.
</li>

</ul>
</div>
