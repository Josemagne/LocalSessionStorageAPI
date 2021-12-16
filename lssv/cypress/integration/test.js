import lssv from "../../index";
/* The tests are ordered like in the source code inspired by the abbreviation CRUD. First come the operations that are about storing data (CREATE) and so on.  */
var propsType = {
    name: "string",
    prename: "string",
    age: "number",
    place: "string"
};
beforeEach(function () {
    cy.visit("https://www.google.com");
    cy.log("On page www.google.com");
});
afterEach(function () {
    cy.log("cleared the storage.");
    new lssv().deleteStorage();
});
/* CREATE */
describe("constructor()", function () {
    var s = new lssv(localStorage);
    it("Should contain 'numberOfEntities' in localStorage", function () {
        expect(localStorage.getItem('numberOfEntities')).to.equal("0");
    });
    it("Should contain 'entitiesEnum' in localStorage", function () {
        expect(localStorage.getItem('entitiesEnum')).to.equal("{}");
    });
});
describe("CREATE", function () {
    var s = new lssv(localStorage);
    s.addEntity("persons", propsType);
    s.createInstance("persons", { name: "d", prename: "d", age: "3", place: "dg" });
    it("addEntity()", function () {
        // After adding an entity we should have 1
        expect(localStorage.getItem('numberOfEntities'), "numberOfEntities() should increment by 1").to.be.equal("1");
        var entitiesEnum = localStorage.getItem("entitiesEnum");
        if (entitiesEnum) {
            var parsedEnum = void 0;
            parsedEnum = JSON.parse(entitiesEnum);
            expect(parsedEnum.persons.name, "addEntity() should have added the properties of the entity in 'entitiesEnum'").to.be.equal("string");
        }
    });
    it("createInstance()", function () {
        expect(localStorage.getItem("1.1"), "getEntityID() should return the right item").to.be.equal("d,d,3,dg");
        expect(localStorage.getItem('1.numberOfInstances'), "'numberOfInstances' should be incremented by 1").to.be.equal("1");
    });
});
/* READ */
describe("GET", function () {
    it("getInstance()", function () {
    });
    it("getInstances()", function () {
    });
    it("getWithCondition", function () {
    });
});
/* UPDATE */
describe("UPDATE", function () {
    it("updateEntity", function () {
    });
});
/* HELPER FUNCTIONS */
describe("HELPER FUNCTIONS", function () {
    var s = new lssv(localStorage);
    s.addEntity("persons", propsType);
    s.createInstance("persons", { name: "d", prename: "d", age: "3", place: "dg" });
    it("getNumberOfInstances()", function () {
        expect(localStorage.getItem("numberOfInstances"), "Should have the item set and the value should be 1").to.equal(0);
    });
    it("getNumberOfEntities()", function () {
        expect(localStorage.getItem("numberOfEntities")).to.equal(1);
    });
});
