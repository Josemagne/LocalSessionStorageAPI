// import LocalSessionStorageAPI from "../../LocalSessionStorageAPI";
describe("should have items in localStorage", () => {
  beforeEach(() => {
    cy.visit("https://www.google.com");
  });
  it("should have 1name be equal to Orlando", async () => {
    localStorage.setItem("1persons", "1");
    expect(localStorage.getItem("1persons")).to.be

  });
});
