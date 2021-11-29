<h1>LocalSessionStorageAPI</h1>
<p>localSessionStorageAPI is an API that simplifies the CRUD operations with the localStorage and sessionStorage</p>

<p>The class can handle both sessionStorage and localStorage.</p>

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

</div>
<div id="instanciation">
<h2>Instanciation</h2>
<p>At the instanciation of the class LocalSessionStorageAPI we create the following items:</p>
<ul>
<li>numberOfInstances: '0numberOfInstances</li>
<li>numberOfEntities: '0numberOfEntities</li>
<li>Listing of entities: '0entitiesEnum'</li>
</ul>

</div>
<div id="methods">
<h2>Methods</h2>
<p>Both localStorage and sessionStorage access the same methods. To indicate with which of the two to interact with we give a last argument. With 'true' as last argument we interact with sessionStorage and with 'false' we interact with localStorage.</p>
<p>By default we interact with localStorage because the data will persist.</p>
<p>This does not apply for the helper functions.</p>
<p>If the parameter 'storage' is not specified then we select localStorage by default. </p>
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
<li>E.g.) For Video Games: 2.0: 'title:Minecraft, language:English,price:5,currency:usd'</li>

<p>To keep track of the entities we have '0entitiesEnum'. 0EntitiesEnum lists all the entities that we have.</p>
<li>E.g.) '1:employee,2:product,3:book,4:configuration,5:date, ...</li>

</div>

<div id="amendments">
<h2>Amendments</h2>
<p>Are there ways to improve the API?</p>
<h3>improvements</h3>
<ul>
<li>Grouping the entities</li>
<p>If we want to delete all items that are derived from an entity we must know their id. Instead of using an array we could use a span like 1-300 instead of an array that contains 300 numbers.</p>
</ul>
</div>
