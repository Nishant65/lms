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

  // get all students
  xit("should provide all students info", async () => {
    const student1 = await request.post("/users/student").send({
      name: "raj"
    });
    expect(student1.status).toBe(201);
    expect(student1.body).toBeDefined();
    //console.log(student1.body);

    const student2 = await request.post("/users/student").send({
      name: "rahul"
    });
    expect(student2.status).toBe(201);
    expect(student2.body).toBeDefined();
    // console.log(student2.body);
    const student3 = await request.post("/users/student").send({
      name: "priya"
    });
    expect(student3.status).toBe(201);
    expect(student3.body).toBeDefined();
    // console.log(student3.body);
    const response = await request.get("/users/student");
    // console.log(response.body);
    expect(response.status).toBe(200);
  });

  // get all loans
  xit("should provide all loans info ", async () => {
    const book1 = await request.post("/books").send({
      author: "author1",
      title: "title1",
      isbn: "3255"
    });
    //console.log(book1.body);
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();

    const student1 = await request.post("/users/student").send({
      name: "rahul"
    });
    // console.log(student1.body);
    expect(student1.status).toBe(201);
    expect(student1.body).toBeDefined();

    const loan1 = await request.post("/users/loan").send({
      //bookId: "627a55946ea4ef8a86ce578d",
      bookId: book1.body.id,
      studentId: student1.body.id,
      outDate: 2022 - 5 - 19
    });
    //console.log(loan1.body);
    expect(loan1.status).toBe(201);
    expect(loan1.body).toBeDefined();

    const response = await request.get("/users/loan").query({});
    expect(response.status).toBe(200);
  });

  // get student by id
  xit("should provide the student info matched by id", async () => {
    const student1 = await request.post("/users/student").send({
      name: "paras"
    });
    expect(student1.status).toBe(200);
    expect(student1.body).toBeDefined();

    const unique_Id = student1.body.id;
    const response = await request.get("/users/student/" + unique_Id);
    expect(response.status).toBe(200);
  });

  // get loan by id
  xit("should provide the loan info  matched by id", async () => {
    const book1 = await request.post("/books").send({
      author: "author1",
      title: "title1",
      isbn: "3255"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();
    //console.log(book1.body);

    const student1 = await request.post("/users/student").send({
      name: "rahul"
    });
    expect(student1.status).toBe(201);
    expect(student1.body).toBeDefined();
    //console.log(student1.body);

    const loan1 = await request.post("/users/loan").send({
      bookId: book1.body.id,
      studentId: student1.body.id,
      outDate: 2022 - 5 - 13
    });
    expect(loan1.status).toBe(201);
    expect(loan1.body).toBeDefined();
    //console.log(loan1.body);

    const unique_id = loan1.body.id;

    const response = await request.get("/users/" + unique_id);
    //console.log(response.body);

    expect(response.status).toBe(200);
  });

  // add new loan
  xit("should add the new loan", async () => {
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
  });

  //update student info by id
  xit("should update the student info matched by id", async () => {
    const student1 = await request.post("/users/student").send({
      name: "rahul"
    });
    expect(student1.status).toBe(201);
    expect(student1.body).toBeDefined();
    //console.log(student1.body);
    const unique_id = student1.body.id;
    console.log("hii");
    const response = await request.post("/users/student/" + unique_id).send({
      name: "raj"
    });
    //console.log(response.body);
    expect(response.status).toBe(201);
  });

  // update loan  info by id
  xit("should update the loan info matched by id", async () => {
    const book1 = await request.post("/books").send({
      author: "author1",
      title: "title1",
      isbn: "3255"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();
    //console.log(book1.body);

    const student1 = await request.post("/users/student").send({
      name: "rahul"
    });
    expect(student1.status).toBe(201);
    expect(student1.body).toBeDefined();
    //console.log(student1.body);

    const loan1 = await request.post("/users/loan").send({
      bookId: book1.body.id,
      studentId: student1.body.id,
      outDate: 9 / 5 / 2022
    });
    expect(loan1.status).toBe(201);
    expect(loan1.body).toBeDefined();
    // console.log(loan1.body);

    const unique_id = loan1.body.id;

    const response = await request.post("/users/loan/" + unique_id).send({
      outDate: 10 / 5 / 2022
    });
    //console.log(response.body);
    expect(response.status).toBe(201);
  });

  // delete loan by id
  xit("should delete the loan", async () => {
    const book1 = await request.post("/books").send({
      author: "author1",
      title: "title1",
      isbn: "3255"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();
    //console.log(book1.body);

    const student1 = await request.post("/users/student").send({
      name: "rahul"
    });
    expect(student1.status).toBe(201);
    expect(student1.body).toBeDefined();
    //console.log(student1.body);
    const loan1 = await request.post("/users/loan").send({
      bookId: book1.body.id,
      studentId: student1.body.id,
      outDate: 9 / 5 / 2022
      //returnDate: 20 / 5 / 2022
    });
    expect(loan1.status).toBe(201);
    expect(loan1.body).toBeDefined();
    //console.log(loan1.body);

    const unique_id = loan1.body.id;

    const response = await request.delete("/users/loan/" + unique_id);

    expect(response.status).toBe(200);
  });
});
