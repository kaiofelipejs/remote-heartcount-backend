const db = require("../../src/database/connection");
const request = require("supertest");
const app = require("../../src/app");

describe("CompanyController", () => {
  it("GET /companies returns all companies", async () => {
    await db("companies").insert({ name: "Abc", email: "a@b.com", id: "spam" });
    await db("companies").insert({ name: "Def", email: "c@d.com", id: "foo" });

    const resp = await request(app).get("/companies");

    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual([
      {email: "a@b.com", id: "spam", name: "Abc"},
      {email: "c@d.com", id: "foo", name: "Def"},
    ]);
  });

  it("POST /companies creates a company", async () => {
    const resp = await request(app)
      .post("/companies")
      .send({ name: "Acme", email: "ac@me.com" });

    expect(resp.status).toEqual(200);
    expect(resp.body.id).toHaveLength(8);

    const createdCompany = await db("companies").first();
    expect(createdCompany).toEqual({
      id: resp.body.id,
      name: "Acme",
      email: "ac@me.com",
    });
  });

  it("POST /companies returns error when email or name is not provided", async () => {
    const defaultParams = { name: "Acme", email: "ac@me.com" };
    const requiredParams = ["name", "email"];

    requiredParams.forEach(async requiredParam => {
      const params = {...defaultParams};
      delete params[requiredParam];

      const resp = await request(app)
        .post("/companies")
        .send(params);

      expect(resp.status).toEqual(400);
      expect(resp.body.message).toEqual(`"${requiredParam}" is required`);
    });
  });
});