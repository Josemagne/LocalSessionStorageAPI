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

        const s = new LocalSessionStorageAPI(localStorage);
    });

    afterEach(() => {
        new LocalSessionStorageAPI().deleteStorage()
    })

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

    afterEach(() => {
        new LocalSessionStorageAPI().deleteStorage()
    })

    it("Should have 10'000 items", () => {


        // Initialize
        let propsType = {
            name: "string",
            prename: "string",
            age: "number",
            place: "string"

        }

        const s = new LocalSessionStorageAPI(localStorage);

        s.addEntity("persons", propsType);

        let errors = 0;
        for (let i = 0; i < 10000; i++) {
            let result = s.createInstance("persons", propsType).then((res) => {
                if (!res) errors++;
            });

        }

        cy.log("the errors are: " + errors.toString())
        expect(Object.keys(localStorage).length).to.be.greaterThan(10000)
    })
})