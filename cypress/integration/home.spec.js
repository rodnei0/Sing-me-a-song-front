describe("Home page", () => {
    afterEach(() => {
        cy.request("POST", "http://localhost:5000/e2e/truncate", {})
    })

    it("should create a recommendation given a valid youtube link", () => {
        const recommendation = {
            name: "Melhor eu ir",
            youtubeLink: "https://www.youtube.com/watch?v=zKAAFsovtM4",
        }

        cy.visit("http://localhost:3000/");
        cy.get("#name").type(recommendation.name);
        cy.get("#link").type(recommendation.youtubeLink);
        cy.intercept("GET", `http://localhost:5000/recommendations`).as("getRecommendations");
        cy.get("#button").click();
        cy.wait("@getRecommendations")

        cy.contains(recommendation.name);
    })

    it("should increase by one the recommendation score", () => {
        cy.request("POST", "http://localhost:5000/e2e/seed", {})

        cy.visit("http://localhost:3000/");
        cy.intercept("GET", `http://localhost:5000/recommendations`).as("getRecommendations");
        cy.get("#arrowUp").click()
        cy.wait("@getRecommendations")
        
        cy.get("#score").contains('1');
    })

    it("should decrease by one the recommendation score", () => {
        cy.request("POST", "http://localhost:5000/e2e/seed", {})
        
        cy.visit("http://localhost:3000/");
        cy.intercept("GET", `http://localhost:5000/recommendations`).as("getRecommendations");
        cy.get("#arrowDown").click()
        cy.wait("@getRecommendations")
        
        cy.get("#score").contains('-1');
    })
});