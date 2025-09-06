import { web } from "../src/application/web.js";
import supertest from "supertest";
import {
  createTestUser,
  deleteTestUser,
} from "./utils/user.util.js";

describe("POST /api/login", function () {
  beforeEach(async () => {
    await createTestUser({
      email: "admin@test.com",
    });
  });
  afterEach(async () => {
    await deleteTestUser();
  });

  it("Should can login with valid credentials", async () => {
    const result = await supertest(web).post("/api/login").send({
      email: "admin@test.com",
      password: "123456",
    });

    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe("admin@test.com");
    expect(result.body.data.session_key).toBeDefined();
  });

  it("Should reject login with invalid email", async () => {
    const result = await supertest(web).post("/api/login").send({
      email: "invalid@gmail.com",
      password: "123456",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("Email or password is wrong");
  });

  it("Should reject login with invalid password", async () => {
    const result = await supertest(web).post("/api/login").send({
      email: "test@test.com",
      password: "00000000",
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBe("Email or password is wrong");
  });
});

describe("POST /api/register", function () {
  afterEach(async () => {
    await deleteTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/register").send({
      full_name: "test",
      email: "test@test.com",
      password: "123456",
    });

    expect(result.status).toBe(201);
    expect(result.body.data.email).toBe("test@test.com");
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject registration with invalid email", async () => {
    const result = await supertest(web).post("/api/register").send({
      full_name: "test",
      email: "invalid-email",
      password: "123456",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toContain("email");
  });

  it("should reject registration with existing email", async () => {
    await createTestUser({ email: "test@test.com" });

    const result = await supertest(web).post("/api/register").send({
      full_name: "test",
      email: "test@test.com",
      password: "123456",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBe("Email already exists");
  });

  it("should reject registration without required fields", async () => {
    const result = await supertest(web).post("/api/register").send({
      password: "123456",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toContain("required");
  });
});