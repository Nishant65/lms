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

  // get all users
  xit("should provide all users info ", async () => {
    const book1 = await request.post("/books").send({
      author: "author1",
      title: "title1",
      isbn: "3255"
    });
    console.log(book1.body);
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();

    const student1 = await request.post("/users/student").send({
      name: "rahul"
    });
    console.log(student1.body);
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();

    const loan1 = await request.post("/users/loan").send({
      //bookId: "627a55946ea4ef8a86ce578d",
      bookId: book1.body.id,
      studentId: student1.body.id,
      outDate: 2022 - 5 - 19
    });
    console.log(loan1.body);
    expect(loan1.status).toBe(201);
    expect(loan1.body).toBeDefined();

    const response = await request.get("/users").query({});
    expect(response.status).toBe(200);
  });

  // get student by id
  // get loan by id
  xit("should provide the user info  matched by id", async () => {
    const book1 = await request.post("/books").send({
      author: "author1",
      title: "title1",
      isbn: "3255"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();
    console.log(book1.body);

    const student1 = await request.post("/users/student").send({
      name: "rahul"
    });
    expect(student1.status).toBe(201);
    expect(student1.body).toBeDefined();
    console.log(student1.body);

    const loan1 = await request.post("/users/loan").send({
      bookId: book1.body.id,
      studentId: student1.body.id,
      outDate: 2022 - 5 - 13
    });
    expect(loan1.status).toBe(201);
    expect(loan1.body).toBeDefined();
    console.log(loan1.body);

    const unique_id = loan1.body.id;

    const response = await request.get("/users/" + unique_id);
    console.log(response.body);

    expect(response.status).toBe(200);
  });

  // add new user
  xit("should add the new user", async () => {
    const book1 = await request.post("/books").send({
      author: "author1",
      title: "title1",
      isbn: "3255"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();

    const student1 = await request.post("/users").send({
      name: "rahul"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();

    const loan1 = await request.post("/users").send({
      bookId: book1.body._id,
      studentId: student1.body._id,
      outDate: 9 / 5 / 2022,
      returnDate: 20 / 5 / 2022
    });
    expect(loan1.status).toBe(201);
    expect(loan1.body).toBeDefined();
    expect(loan1.body.message).toBe("new user added");
  });

  //update student info by id
  it("should update the info of existing  user", async () => {
    const book1 = await request.post("/books").send({
      author: "author1",
      title: "title1",
      isbn: "3255"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();

    const student1 = await request.post("/users/student").send({
      name: "rahul"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();

    const loan1 = await request.post("/users/loan").send({
      bookId: book1.body.id,
      studentId: student1.body.id,
      outDate: 9 / 5 / 2022
    });
    expect(loan1.status).toBe(201);
    expect(loan1.body).toBeDefined();

    const unique_id = student1.body.id;

    const response = await request.post("/users/" + unique_id).send({
      name: "raj"
    });
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("user data updated");
  });

  // update loan  info by id
  xit("should update the info of existing  user", async () => {
    const book1 = await request.post("/books").send({
      author: "author1",
      title: "title1",
      isbn: "3255"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();

    const student1 = await request.post("/users/student").send({
      name: "rahul"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();

    const loan1 = await request.post("/users/loan").send({
      bookId: book1.body.id,
      studentId: student1.body.id,
      outDate: 9 / 5 / 2022
    });
    expect(loan1.status).toBe(201);
    expect(loan1.body).toBeDefined();

    const unique_id = loan1.body.id;

    const response = await request.post("/users/" + unique_id).send({
      outDate: 10 / 5 / 2022
    });
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("user data updated");
  });

  // delete user by id
  xit("should delete the user ", async () => {
    const book1 = await request.post("/books").send({
      author: "author1",
      title: "title1",
      isbn: "3255"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();

    const student1 = await request.post("/users").send({
      name: "rahul"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();

    const loan1 = await request.post("/users").send({
      bookId: book1.body._id,
      studentId: student1.body._id,
      outDate: 9 / 5 / 2022,
      returnDate: 20 / 5 / 2022
    });
    expect(loan1.status).toBe(201);
    expect(loan1.body).toBeDefined();

    const unique_id = loan1.body.id;

    const response = await request.delete("/users" + unique_id);
    expect(response.status).toBe(200);
  });
});
