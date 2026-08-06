const request = require("supertest");
const app = require("./src/server");

describe("Todo API", () => {
  test("GET / retourne le message principal", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Todo API opérationnelle",
    });
  });

  test("GET /health retourne ok", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
    });
  });

  test("une route inconnue retourne 404", async () => {
    const response = await request(app).get("/route-inconnue");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      error: "Route introuvable",
    });
  });
});