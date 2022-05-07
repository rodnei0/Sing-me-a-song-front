describe("Random page", () => {
    afterEach(() => {
        cy.request("POST", "http://localhost:5000/e2e/truncate", {})
    })

    it("should return a random recommendation", () => {
        cy.request("POST", "http://localhost:5000/e2e/seed", {})

        cy.visit("http://localhost:3000/random");
        
        cy.get("#player").should('not.be.undefined');
    })
});