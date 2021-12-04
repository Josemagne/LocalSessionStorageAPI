import LocalSessionStorageAPI from "../../index";

/* The tests are ordered like in the source code inspired by the abbreviation CRUD. First come the operations that are about storing data (CREATE) and so on. The helper functions that do not need web storage API are tested with jest */

/* CREATE */
describe("should have items in localStorage", () => {
    beforeEach(() => {
        cy.visit("https://www.google.com");


        // Initialize
        let propsType = {
            name: "string",
            prename: "string",
            age: "number",
            place: "string"

        }

        const lssv = new LocalSessionStorageAPI(localStorage);
    });

    it("Should contain 'numberOfEntities' in localStorage", () => {
        expect(localStorage.getItem('numberOfEntities')).to.equal("0");
    })

    it("Should contain 'entitiesEnum' in localStorage", () => {
        expect(localStorage.getItem('entitiesEnum')).to.equal("{}");
    })

});



/* HELPER METHODS */


/* Stress Test */

describe("should have 10'000 instances in localStorage", () => {
    beforeEach(() => {
        cy.visit("https://www.google.com");
    });

    it("Should have 10'000 items", () => {

        let propsType = {
            name: "string",
            prename: "string",
            age: "number",
            place: "string"

        }

        const lssv = new LocalSessionStorageAPI(localStorage);

        lssv.addEntity("persons", propsType);

        for (let i = 0; i < 10000; i++) {
            lssv.createInstance("persons", propsType);
        }

        expect(Object.keys(localStorage).length).to.be.greaterThan(10000)
    })
})