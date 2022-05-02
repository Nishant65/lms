const supertest = require("supertest");
const { startDBServer, stopDBServer } = require("../../server");
const app = require("../../app");

describe("lms", () => {
  const request = supertest(app);

  beforeAll(async () => {
    await startDBServer();
  });

  afterAll(async () => {
    await stopDBServer();
  });
  // check properties can't be null
  xit("should throw an error if no fields are provided", async () => {
    const response = await request.post("/books").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("properties can't be null");
  });

  // check isbn is provided or not
  xit("should throw an error if isbn is not provided", async () => {
    const response = await request.post("/books").send({
      title: "westcoach",
      author: "rahul"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("isbn should be there");
  });

  // check author is provided or not
  xit("should throw an error if author is not provided", async () => {
    const response = await request.post("/books").send({
      title: "westcoach",
      isbn: "4560"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("author should be provided");
  });

  //check title is provided or not
  xit("should throw an error when title is not provided ", async () => {
    const response = await request.post("/books").send({
      author: "tom",
      isbn: "2322"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("title should be provided");
  });

  xit("should throw an error when title is less than 3 characters ", async () => {
    const response = await request.post("/books").send({
      title: "Th",
      author: "tom",
      isbn: "e263735723273"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "title length must be at least 3 characters long"
    );
  });

  // add the new book
  xit("should add the new book ", async () => {
    const response = await request.post("/books").send({
      author: "thanks you",
      isbn: "123",
      title: "why me"
    });
    expect(response.status).toBe(201);
    console.log(response.body);
    expect(response.body).toBeDefined();
  });

  // get all books
  xit("should get all the books", async () => {
    const response = await request.get("/books");
    expect(response.status).toBe(200);
  });

  // check Isbn should be different
  xit("should throw an error if Isbn is repeated", async () => {
    const response = await request.post("/books").send({
      author: "tom",
      isbn: "2213",
      title: "hello"
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    const response2 = await request.post("/books").send({
      author: "thomas",
      title: "the pool",
      isbn: "2213"
    });
    expect(response2.status).toBe(400);
    expect(response2.body.message).toBe("isbn should be different");
  });

  // update author name with the "id"
  xit("should update the author by id", async () => {
    const response = await request.post("/books").send({
      author: "rahul",
      title: "heroes",
      isbn: "5555"
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    const unique_id = response.body.id;
    const responsenew = await request.put("/books/" + unique_id).send({
      author: "raj"
    });

    expect(responsenew.status).toBe(200);
    expect(responsenew.body.author).toBe("raj");
    expect(responsenew.body.id).toBe(unique_id);
  });

  // update title of the book with the "id"
  xit("should update the title of the book by id", async () => {
    const response = await request.post("/books").send({
      author: "rakul",
      title: "titans",
      isbn: "5005"
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    const unique_id = response.body.id;
    const responsenew = await request.put("/books/" + unique_id).send({
      title: "rise and fall"
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("rise and fall");
    expect(response.body.message).toBe("title is updated");
  });

  // update isbn by id
  xit("should update the isbn by id", async () => {
    const response = await request.post("/books").send({
      author: "suresh",
      title: "titans and demons",
      isbn: "5105"
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();

    const unique_id = response.body.id;
    const responsenew = await request.put("/books/" + unique_id).send({
      isbn: "5105"
    });

    expect(responsenew.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.isbn).toBe("5105");
    expect(responsenew.body.id).toBe(unique_id);
    expect(response.body.message).toBe("isbn is updated");
  });

  // update all properties of book with the "id"
  xit("should update all the book properties by id ", async () => {
    const response = await request.post("/books").send({
      author: "ty",
      isbn: "1238",
      title: "why"
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    const uniqueid = response.body.id;
    const responsenew = await request.put("/books/" + uniqueid).send({
      title: "joy and freedom",
      isbn: "1238",
      author: "harsh",
      id: uniqueid
    });
    expect(responsenew.status).toBe(200);
    expect(responsenew.body).toBeDefined();
    expect(responsenew.body.id).toBe(uniqueid);
    expect(response.body.title).toBe("joy and freedom");
    expect(response.body.isbn).toBe("1238");
    expect(response.body.author).toBe("harsh");
    expect(response.body.message).toBe("books properties is updated");
  });
});
