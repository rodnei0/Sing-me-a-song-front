import createBody from "./factories/createBodyFactory";

describe("Top page", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:5000/e2e/truncate", {});
    });
    afterEach(() => {
        cy.request("POST", "http://localhost:5000/e2e/truncate", {});
    });

    it("should return a random recommendation", () => {
        const recommendation = createBody();
        cy.request("POST", "http://localhost:5000/e2e/seed", recommendation);

        cy.visit("http://localhost:3000/top");
        cy.intercept("GET", "http://localhost:5000/recommendations/top/10").as("getTopRecommendations");
        cy.wait("@getTopRecommendations");
        
        cy.contains(recommendation.name);
    });
});