describe("Home page", () => {
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
});