const supertest = require("supertest");
const { startDBServer, stopDBServer } = require("../../server");
const app = require("../../app");

describe("users", () => {
  const request = supertest(app);

  beforeAll(async () => {
    await startDBServer();
  });

  afterAll(async () => {
    await stopDBServer();
  });

  // get all users
  it("should provide all users ", async () => {
    const user1 = await request.post("/users").send({
      name: "rahul",
      dob: "12/09/1998",
      registered_date: "15/05/2022",
      membership_status: "gold"
    });
    expect(user1.status).toBe(201);
    expect(user1.body).toBeDefined();
    const user2 = await request.post("/users").send({
      name: "raj",
      dob: "12/11/1998",
      registered_date: "15/05/2022",
      membership_status: "silver"
    });
    expect(user2.status).toBe(201);
    expect(user2.body).toBeDefined();

    const response = await request.get("/users").query({});
    expect(response.status).toBe(200);
  });

  // get user by id
  it("should provide the matched by id", async () => {
    const book1 = await request.post("/user").send({
      name: "raj",
      dob: "12/11/1998",
      registered_date: "15/05/2022",
      membership_status: "silver"
    });
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    const unique_id = book1.body.id;
    const response = await request.get("/users" + unique_id);
    expect(response.status).toBe(200);
  });
  // add new user
  it("should add the new user", async () => {
    const response = await request.post("/users").send({
      name: "raj",
      dob: "12/11/1998",
      registered_date: "15/05/2022",
      membership_status: "silver"
    });
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("new user added");
  });

  // update user info by id
  it("should update the info of existed user", async () => {
    const book1 = await request.post("/users").send({
      name: "raj",
      dob: "12/11/1998",
      registered_date: "15/05/2022",
      membership_status: "silver"
    });
    expect(book1.status).toBe(201);
    expect(book1.body).toBeDefined();
    const unique_id = book1.body.id;
  });
});
