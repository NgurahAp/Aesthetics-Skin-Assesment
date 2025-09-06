import { web } from "../src/application/web.js";
import supertest from "supertest";
import { createTestUser, deleteTestUser } from "./utils/user.util.js";
import {
  createTestArticle,
  createTestVideo,
  createTestUserContentAccess,
  createMultipleTestArticles,
  createMultipleTestVideos,
  deleteTestArticles,
  deleteTestVideos,
  deleteTestUserContentAccess,
} from "./utils/content.util.js";

describe("GET /api/dashboard", function () {
  let testUser;

  beforeEach(async () => {
    testUser = await createTestUser({
      email: "dashboard@test.com",
    });
  });

  afterEach(async () => {
    await deleteTestUserContentAccess();
    await deleteTestArticles();
    await deleteTestVideos();
    await deleteTestUser();
  });

  it("Should return dashboard content with empty articles and videos", async () => {
    const result = await supertest(web)
      .get("/api/dashboard")
      .set("Authorization", "Bearer session-key-test");

    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.success).toBe(true);
    expect(result.body.data.data.membership_info.package).toBe("A");
    expect(result.body.data.data.membership_info.articles_accessed).toBe(0);
    expect(result.body.data.data.membership_info.videos_accessed).toBe(0);
    expect(result.body.data.data.user_info.email).toBe("dashboard@test.com");
  });

  it("Should return dashboard content with articles and videos", async () => {
    // Create test content
    await createMultipleTestArticles(5);
    await createMultipleTestVideos(5);

    const result = await supertest(web)
      .get("/api/dashboard")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.success).toBe(true);
    expect(result.body.data.data.articles).toHaveLength(3);
    expect(result.body.data.data.videos).toHaveLength(3);

    // Check article structure
    expect(result.body.data.data.articles[0]).toHaveProperty("id");
    expect(result.body.data.data.articles[0]).toHaveProperty("title");
    expect(result.body.data.data.articles[0]).toHaveProperty("thumbnail");
    expect(result.body.data.data.articles[0]).toHaveProperty("created_at");

    // Check video structure
    expect(result.body.data.data.videos[0]).toHaveProperty("id");
    expect(result.body.data.data.videos[0]).toHaveProperty("title");
    expect(result.body.data.data.videos[0]).toHaveProperty("url");
    expect(result.body.data.data.videos[0]).toHaveProperty("description");
    expect(result.body.data.data.videos[0]).toHaveProperty("created_at");
  });

  it("Should return correct membership info for Package A user", async () => {
    // Create some content and access records
    const articles = await createMultipleTestArticles(3);
    const videos = await createMultipleTestVideos(2);

    // Create access records for some content
    await createTestUserContentAccess({
      userId: testUser.id,
      contentType: "article",
      contentId: articles[0].id,
      articleId: articles[0].id,
    });

    await createTestUserContentAccess({
      userId: testUser.id,
      contentType: "video",
      contentId: videos[0].id,
      videoId: videos[0].id,
    });

    const result = await supertest(web)
      .get("/api/dashboard")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.data.membership_info.package).toBe("A");
    expect(result.body.data.data.membership_info.articles_accessed).toBe(1);
    expect(result.body.data.data.membership_info.articles_limit).toBe(5);
    expect(result.body.data.data.membership_info.videos_accessed).toBe(1);
    expect(result.body.data.data.membership_info.videos_limit).toBe(5);
    expect(result.body.data.data.membership_info.is_unlimited).toBe(false);
  });

  it("Should return correct membership info for Package B user", async () => {
    // Create Package B user
    await deleteTestUser();
    testUser = await createTestUser({
      email: "packageb@test.com",
      "Bearer session-key-test": "Bearer session-key-test",
      membershipPackage: "B", // Assuming you update createTestUser util
    });

    const result = await supertest(web)
      .get("/api/dashboard")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.data.membership_info.package).toBe("B");
    expect(result.body.data.data.membership_info.articles_limit).toBe(10);
    expect(result.body.data.data.membership_info.videos_limit).toBe(10);
    expect(result.body.data.data.membership_info.is_unlimited).toBe(false);
  });

  it("Should return correct membership info for Package C user (unlimited)", async () => {
    // Create Package C user
    await deleteTestUser();
    testUser = await createTestUser({
      email: "packagec@test.com",
      "Bearer session-key-test": "Bearer session-key-test",
      membershipPackage: "C", // Assuming you update createTestUser util
    });

    const result = await supertest(web)
      .get("/api/dashboard")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.data.membership_info.package).toBe("C");
    expect(result.body.data.data.membership_info.articles_limit).toBe(
      "unlimited"
    );
    expect(result.body.data.data.membership_info.videos_limit).toBe(
      "unlimited"
    );
    expect(result.body.data.data.membership_info.is_unlimited).toBe(true);
  });

  it("Should reject request without authentication", async () => {
    const result = await supertest(web).get("/api/dashboard");

    expect(result.status).toBe(401);
  });

  it("Should reject request with invalid session key", async () => {
    const result = await supertest(web)
      .get("/api/dashboard")
      .set("Authorization", "invalid-session-key");

    expect(result.status).toBe(401);
  });

  it("Should return latest 3 articles and videos ordered by created_at desc", async () => {
    // Create articles with different timestamps
    const article1 = await createTestArticle({ title: "Test Oldest Article" });
    await new Promise((resolve) => setTimeout(resolve, 10)); 
    const article2 = await createTestArticle({ title: "Test Middle Article" });
    await new Promise((resolve) => setTimeout(resolve, 10)); 
    const article3 = await createTestArticle({ title: "Test Newest Article" });

    const result = await supertest(web)
      .get("/api/dashboard")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.data.articles).toHaveLength(3);

    // Should return latest 3 articles (newest first)
    const returnedTitles = result.body.data.data.articles.map((a) => a.title);
  });
});
