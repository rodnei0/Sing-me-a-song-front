import faker from "@faker-js/faker";

function createBody() {
    const recommendation = {
        name: faker.random.word(),
        youtubeLink: "https://www.youtube.com/watch?v=zKAAFsovtM4",
    };

    return recommendation;
}

export default createBody;