import LocalSessionStorageAPI from "../../LocalSessionStorageAPI";
describe("should have items in localStorage", () => {
  beforeEach(() => {
    cy.visit("https://www.google.com");
  });

  it("Initiate the API", () => {

    let propsType = {
      "name": "string",
      "age": "number"
    }

    let test = new LocalSessionStorageAPI("persons", propsType);

    expect(localStorage.getItem('name')).to.be("string");

  })
});
