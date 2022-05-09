import createBody from "./factories/createBodyFactory";

describe("Home page", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:5000/e2e/truncate", {});
    })
    afterEach(() => {
        cy.request("POST", "http://localhost:5000/e2e/truncate", {});
    })

    it("should create a recommendation given a valid youtube link", () => {
        const recommendation = createBody();
        cy.request("POST", "http://localhost:5000/e2e/seed", recommendation);

        cy.visit("http://localhost:3000/");
        cy.get("#name").type(recommendation.name);
        cy.get("#link").type(recommendation.youtubeLink);
        cy.intercept("GET", `http://localhost:5000/recommendations`).as("getRecommendations");
        cy.get("#button").click();
        cy.wait("@getRecommendations")

        cy.contains(recommendation.name);
    })

    it("should increase by one the recommendation score", () => {
        const recommendation = createBody();
        cy.request("POST", "http://localhost:5000/e2e/seed", recommendation);

        cy.visit("http://localhost:3000/");
        cy.intercept("GET", `http://localhost:5000/recommendations`).as("getRecommendations");
        cy.get("#arrowUp").click()
        cy.wait("@getRecommendations")
        
        cy.get("#score").contains('1');
    })

    it("should decrease by one the recommendation score", () => {
        const recommendation = createBody();
        cy.request("POST", "http://localhost:5000/e2e/seed", recommendation);
        
        cy.visit("http://localhost:3000/");
        cy.intercept("GET", `http://localhost:5000/recommendations`).as("getRecommendations");
        cy.get("#arrowDown").click()
        cy.wait("@getRecommendations")
        
        cy.get("#score").contains('-1');
    })
});