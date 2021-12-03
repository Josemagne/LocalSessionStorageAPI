import LocalSessionStorageAPI from "../../LocalSessionStorageAPI";
describe("should have items in localStorage", () => {
    beforeEach(() => {
        cy.visit("https://www.google.com");
    });

    it("Should insert items in localStorage", () => {

        let propsType = {
            "name": "string",
            "age": "number"
        }

        let test = new LocalSessionStorageAPI("persons", propsType);

        expect(test.createInstance("persons", propsType)).to.be("string");

    })
});
