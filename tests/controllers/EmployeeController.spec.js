const db = require("../../src/database/connection");
const request = require("supertest");
const app = require("../../src/app");
const httpStatus = require("http-status");

describe("EmployeeController", () => {
  it("GET /employees returns all employees", async () => {
    await db("companies").insert({ name: "Abc", email: "a@b.com", id: "Spam" });
    await db("employees").insert({
      name: "Eduardo",
      linkedinProfile: "teste",
      month: "Janeiro",
      rotation: false,
      company_id: "Spam",
    });
    await db("employees").insert({
      name: "Matos",
      linkedinProfile: "testando",
      month: "Fevereiro",
      rotation: true,
      company_id: "Spam",
    });

    const resp = await request(app).get("/employees");

    expect(resp.status).toEqual(httpStatus.OK);
    expect(resp.body).toEqual([{
      id: expect.any(Number),
      company_id: "Spam",
      linkedinProfile: "teste",
      month: "Janeiro",
      name: "Eduardo",
      rotation: 0,
    },{
      id: expect.any(Number),
      name: "Matos",
      linkedinProfile: "testando",
      month: "Fevereiro",
      rotation: 1,
      company_id: "Spam",
    }]);
  });

  it("POST /employees create an employee", async () => {
    await db("companies").insert({ name: "Abc", email: "a@b.com", id: "Spam" });

    const resp = await request(app)
      .post("/employees")
      .set("Authorization", "Spam")
      .send({
        linkedinProfile: "teste",
        month: "Janeiro",
        name: "Eduardo",
        rotation: false,
      });

      expect(resp.status).toEqual(httpStatus.OK);
      expect(resp.body).toEqual({
        id: expect.any(Number),
        company_id: "Spam",
        linkedinProfile: "teste",
        month: "Janeiro",
        name: "Eduardo",
        rotation: false,
      });

      const createdEmployee = await db("employees").first();
      expect(createdEmployee.id).toBe(resp.body.id);
  });

  it("POST /employees create an employee when linkedinProfile is not provided", async () => {
    await db("companies").insert({ name: "Abc", email: "a@b.com", id: "Spam" });

    const resp = await request(app)
      .post("/employees")
      .set("Authorization", "Spam")
      .send({
        month: "Janeiro",
        name: "Eduardo",
        rotation: false,
      });

      expect(resp.status).toEqual(httpStatus.OK);
      expect(resp.body).toEqual({
        id: expect.any(Number),
        company_id: "Spam",
        linkedinProfile: "",
        month: "Janeiro",
        name: "Eduardo",
        rotation: false,
      });
  });

  it("DELETE /employees/:id removes an existing employee", async () => {
    await db("companies").insert({ name: "Abc", email: "a@b.com", id: "Spam" });
    const [ employeeId ] = await db("employees").insert({
      name: "Eduardo",
      linkedinProfile: "teste",
      month: "Janeiro",
      rotation: false,
      company_id: "Spam",
    });

    const resp = await request(app)
      .delete(`/employees/${employeeId}`)
      .set("Authorization", "Spam");

      expect(resp.status).toEqual(httpStatus.NO_CONTENT);
      expect(await db("employees").first()).toBe(undefined);
  });

  it("DELETE /employees/:id returns erorr when employee does not belong to company", async () => {
    await db("companies").insert({ name: "Abc", email: "a@b.com", id: "Spam" });
    const [ employeeId ] = await db("employees").insert({
      name: "Eduardo",
      linkedinProfile: "teste",
      month: "Janeiro",
      rotation: false,
      company_id: "Spam",
    });

    const resp = await request(app)
      .delete(`/employees/${employeeId}`)
      .set("Authorization", "Fish");

      expect(resp.status).toEqual(httpStatus.UNAUTHORIZED);
      expect(resp.body).toEqual({ error: "Operation not permitted." });
      expect(await db("employees").first()).not.toBe(undefined);
  });
});