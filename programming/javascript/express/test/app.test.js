import request from 'supertest';
import app from 'app';

describe("Hello World Server", () => {
  test("It should returns status code 200", () => {
    return request(app()).get("/")
      .expect(200);
  });
});
