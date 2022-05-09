import createBody from "./factories/createBodyFactory";

describe("Random page", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:5000/e2e/truncate", {});
    });
    afterEach(() => {
        cy.request("POST", "http://localhost:5000/e2e/truncate", {});
    });

    it("should return a random recommendation", () => {
        const recommendation = createBody();
        cy.request("POST", "http://localhost:5000/e2e/seed", recommendation);

        cy.visit("http://localhost:3000/random");
        cy.intercept("GET", "http://localhost:5000/recommendations/random").as("getRandomRecommendations");
        cy.wait("@getRandomRecommendations");
        
        cy.contains(recommendation.name);
    });
});