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
  createUserAccessRecords,
  getContentAccessCount,
} from "./utils/content.util.js";

describe("Article List API", function () {
  let testUser;

  beforeEach(async () => {
    testUser = await createTestUser({
      email: "articlelist@test.com",
    });
  });

  afterEach(async () => {
    await deleteTestUserContentAccess();
    await deleteTestArticles();
    await deleteTestUser();
  });

  it("Should get articles list with default pagination", async () => {
    const result = await supertest(web)
      .get("/api/articles")
      .set("Authorization", "Bearer session-key-test");

    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.success).toBe(true);
    expect(result.body.data.articles).toBeDefined();
    expect(Array.isArray(result.body.data.articles)).toBe(true);
    expect(result.body.data.articles.length).toBe(10);

    // Check pagination info
    expect(result.body.data.paging).toBeDefined();
    expect(result.body.data.paging.page).toBe(1);
    expect(result.body.data.paging.total_items).toBe(15);
    expect(result.body.data.paging.total_pages).toBe(2);

    // Check article structure
    const article = result.body.data.articles[0];
    expect(article.id).toBeDefined();
    expect(article.title).toBeDefined();
    expect(article.content).toBeDefined();
    expect(article.thumbnail).toBeDefined();
    expect(article.created_at).toBeDefined();
  });

  it("Should get articles list with custom pagination", async () => {
    const result = await supertest(web)
      .get("/api/articles?page=2&size=5")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.success).toBe(true);
    expect(result.body.data.articles.length).toBe(5);
    expect(result.body.data.paging.page).toBe(2);
    expect(result.body.data.paging.total_items).toBe(15);
    expect(result.body.data.paging.total_pages).toBe(3);
  });

  it("Should handle page beyond available pages", async () => {
    const result = await supertest(web)
      .get("/api/articles?page=5&size=10")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.success).toBe(true);
    expect(result.body.data.articles.length).toBe(0);
    expect(result.body.data.paging.page).toBe(5);
    expect(result.body.data.paging.total_items).toBe(15);
    expect(result.body.data.paging.total_pages).toBe(2);
  });

  it("Should validate pagination parameters", async () => {
    // Test invalid page (less than 1)
    const result1 = await supertest(web)
      .get("/api/articles?page=0")
      .set("Authorization", "Bearer session-key-test");

    expect(result1.status).toBe(400);

    // Test invalid size (greater than 100)
    const result2 = await supertest(web)
      .get("/api/articles?size=150")
      .set("Authorization", "Bearer session-key-test");

    expect(result2.status).toBe(400);

    // Test non-numeric page
    const result3 = await supertest(web)
      .get("/api/articles?page=abc")
      .set("Authorization", "Bearer session-key-test");

    expect(result3.status).toBe(400);
  });

  it("Should use default values for missing pagination parameters", async () => {
    const result = await supertest(web)
      .get("/api/articles")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.paging.page).toBe(1); // default page
    expect(result.body.data.articles.length).toBe(10); // all articles fit in default size (10)
  });

  it("Should handle large pagination size correctly", async () => {
    const result = await supertest(web)
      .get("/api/articles?size=100")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.articles.length).toBe(15); // Should return all 5 articles
    expect(result.body.data.paging.total_pages).toBe(1);
  });

  it("Should reject request without authentication", async () => {
    const result = await supertest(web).get("/api/articles");

    expect(result.status).toBe(401);
  });

  it("Should handle pagination with exact page boundary", async () => {
    const result = await supertest(web)
      .get("/api/articles?page=1&size=5")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.articles.length).toBe(5);
    expect(result.body.data.paging.page).toBe(1);
    expect(result.body.data.paging.total_pages).toBe(3);
  });
});

describe("Article Detail API", function () {
  let testUser;
  let testArticle;

  beforeEach(async () => {
    sessionKey = "article-detail-test-session";
    testUser = await createTestUser({
      email: "articledetail@test.com",
    });
    testArticle = await createTestArticle({
      title: "Test Article Detail",
      content: "This is a detailed test article content",
    });
  });

  afterEach(async () => {
    await deleteTestUserContentAccess();
    await deleteTestArticles();
    await deleteTestVideos();
    await deleteTestUser();
  });

  it("Should get article detail for first time access (Package A)", async () => {
    const result = await supertest(web)
      .get(`/api/articles/${testArticle.id}`)
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.success).toBe(true);
    expect(result.body.data.data.id).toBe(testArticle.id);
    expect(result.body.data.data.title).toBe("Test Article Detail");
    expect(result.body.data.data.content).toBeDefined();
    expect(result.body.data.membership_info.articles_accessed).toBe(1);
    expect(result.body.data.membership_info.articles_limit).toBe(5);

    // Verify access record was created
    const accessCount = await getContentAccessCount(testUser.id, "article");
    expect(accessCount).toBe(1);
  });

  it("Should get article detail for re-access (no quota deduction)", async () => {
    // First access
    await supertest(web)
      .get(`/api/articles/${testArticle.id}`)
      .set("Authorization", "Bearer session-key-test");

    // Second access - should not deduct quota
    const result = await supertest(web)
      .get(`/api/articles/${testArticle.id}`)
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.success).toBe(true);
    expect(result.body.data.membership_info.articles_accessed).toBe(1); // Still 1, not 2

    // Verify only one access record exists
    const accessCount = await getContentAccessCount(testUser.id, "article");
    expect(accessCount).toBe(1);
  });

  it("Should reject access when quota exceeded (Package A)", async () => {
    // Create 5 articles and access them (reach limit)
    const articles = await createMultipleTestArticles(5);
    await createUserAccessRecords(
      testUser.id,
      articles.map((a) => a.id)
    );

    // Try to access new article - should be rejected
    const newArticle = await createTestArticle({
      title: "Should be rejected",
    });

    const result = await supertest(web)
      .get(`/api/articles/${newArticle.id}`)
      .set("Authorization", "Bearer session-key-test");

    console.log(result);
    expect(result.status).toBe(403);
    expect(result.body.errors).toBe("QUOTA_EXCEEDED");
  });

  it("Should allow access for Package B with higher limit", async () => {
    // Create Package B user
    await deleteTestUser();
    testUser = await createTestUser({
      email: "packageb@test.com",
      membershipPackage: "B",
    });

    // Create 6 articles and access them (within Package B limit)
    const articles = await createMultipleTestArticles(6);
    await createUserAccessRecords(
      testUser.id,
      articles.map((a) => a.id)
    );

    const result = await supertest(web)
      .get(`/api/articles/${testArticle.id}`)
      .set("Authorization", "Bearer session-key-test");

    console.log(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.membership_info.articles_accessed).toBe(7); // 6 + 1
    expect(result.body.data.membership_info.articles_limit).toBe(10);
  });

  it("Should allow unlimited access for Package C", async () => {
    // Create Package C user
    await deleteTestUser();
    testUser = await createTestUser({
      email: "packagec@test.com",
      membershipPackage: "C",
    });

    // Create 15 articles and access them (way beyond normal limits)
    const articles = await createMultipleTestArticles(15);
    await createUserAccessRecords(
      testUser.id,
      articles.map((a) => a.id)
    );

    const result = await supertest(web)
      .get(`/api/articles/${testArticle.id}`)
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.membership_info.articles_accessed).toBe(16);
    expect(result.body.data.membership_info.articles_limit).toBe("unlimited");
    expect(result.body.data.membership_info.is_unlimited).toBe(true);
  });

  it("Should return 404 for non-existent article", async () => {
    const result = await supertest(web)
      .get("/api/articles/non-existent-id")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("Article not found");
  });

  it("Should reject request without authentication", async () => {
    const result = await supertest(web).get(`/api/articles/${testArticle.id}`);

    expect(result.status).toBe(401);
  });
});

describe("Video Detail API", function () {
  let testUser;
  let testVideo;

  beforeEach(async () => {
    testUser = await createTestUser({
      email: "videodetail@test.com",
    });
    testVideo = await createTestVideo({
      title: "Test Video Detail",
      description: "This is a detailed test video description",
    });
  });

  afterEach(async () => {
    await deleteTestUserContentAccess();
    await deleteTestArticles();
    await deleteTestVideos();
    await deleteTestUser();
  });

  it("Should get video detail for first time access (Package A)", async () => {
    const result = await supertest(web)
      .get(`/api/videos/${testVideo.id}`)
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.success).toBe(true);
    expect(result.body.data.data.id).toBe(testVideo.id);
    expect(result.body.data.data.title).toBe("Test Video Detail");
    expect(result.body.data.data.url).toBeDefined();
    expect(result.body.data.data.description).toBeDefined();
    expect(result.body.data.membership_info.videos_accessed).toBe(1);
    expect(result.body.data.membership_info.videos_limit).toBe(5);

    // Verify access record was created
    const accessCount = await getContentAccessCount(testUser.id, "video");
    expect(accessCount).toBe(1);
  });

  it("Should get video detail for re-access (no quota deduction)", async () => {
    // First access
    await supertest(web)
      .get(`/api/videos/${testVideo.id}`)
      .set("Authorization", "Bearer session-key-test");

    // Second access - should not deduct quota
    const result = await supertest(web)
      .get(`/api/videos/${testVideo.id}`)
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.success).toBe(true);
    expect(result.body.data.membership_info.videos_accessed).toBe(1); // Still 1, not 2

    // Verify only one access record exists
    const accessCount = await getContentAccessCount(testUser.id, "video");
    expect(accessCount).toBe(1);
  });

  it("Should reject access when quota exceeded (Package A)", async () => {
    // Create 5 videos and access them (reach limit)
    const videos = await createMultipleTestVideos(5);
    await createUserAccessRecords(
      testUser.id,
      [],
      videos.map((v) => v.id)
    );

    // Try to access new video - should be rejected
    const newVideo = await createTestVideo({
      title: "Should be rejected",
    });

    const result = await supertest(web)
      .get(`/api/videos/${newVideo.id}`)
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(403);
    expect(result.body.errors).toBe("QUOTA_EXCEEDED");
  });

  it("Should return 404 for non-existent video", async () => {
    const result = await supertest(web)
      .get("/api/videos/non-existent-id")
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("Video not found");
  });

  it("Should track article and video access separately", async () => {
    // Access some articles
    const articles = await createMultipleTestArticles(3);
    await createUserAccessRecords(
      testUser.id,
      articles.map((a) => a.id)
    );

    // Access the video
    const result = await supertest(web)
      .get(`/api/videos/${testVideo.id}`)
      .set("Authorization", "Bearer session-key-test");

    expect(result.status).toBe(200);
    expect(result.body.data.membership_info.articles_accessed).toBe(3);
    expect(result.body.data.membership_info.videos_accessed).toBe(1);

    // Both should still be within limits
    expect(result.body.data.membership_info.articles_limit).toBe(5);
    expect(result.body.data.membership_info.videos_limit).toBe(5);
  });
});
