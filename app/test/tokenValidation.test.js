const request = require("supertest");
const app = require("../app");

describe("token validation", () => {
  test("It should response with Unauthorized code", done => {
    request(app)
      .get("/auth/list")
      //.set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTXIuIExlw7NuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpMk9adDIzbldxWnFOX0txQ2o4VERDQUtLaHZFcEhjWFpaYVpkcjVBPXM5Ni1jIiwidXNlciI6dHJ1ZSwiYWRtaW4iOnRydWUsInN1cGVyYWRtaW4iOnRydWUsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9mYWNlYm9vay1idXNpbmVzcy1tYW5hZ2UtYjY3OTQiLCJhdWQiOiJmYWNlYm9vay1idXNpbmVzcy1tYW5hZ2UtYjY3OTQiLCJhdXRoX3RpbWUiOjE2NDI1MzIyMjksInVzZXJfaWQiOiJIalcyYmhOWHJ5Y3hERk5ZOGVoRjdKbHdDYUIyIiwic3ViIjoiSGpXMmJoTlhyeWN4REZOWThlaEY3Smx3Q2FCMiIsImlhdCI6MTY0MjUzMjIyOSwiZXhwIjoxNjQyNTM1ODI5LCJlbWFpbCI6InJvbGVvbm1AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDIwNzE2MDMyMDQwNDMwNzk0NTIiXSwiZW1haWwiOlsicm9sZW9ubUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.ZzzVKIj7SsJMdihpnnXJ4rVn0RyWrblAttetvd3x9SU9jzZRQ-mtU2XhWhJETQu7UnIB4bCRcSrIe1iPrhhqP7rqkHOcy0QF2xODe6lJU6HnpwZsA1YQD4nX4_CM-8743ByviWzqN6DzFjc5kYatueka2aKW_PG8yJWEn7kKGGsE18ZKsvsPr-474ZNN-rwJVI39q6LauweT13FUqDahwaVwmMsJaSnUV3G-b0nkAN662GjOqg66WrdHpgZ2nFcKd3R7I8dMPTd4b-pbDEsbkehTjm-lRSIHhDrsXbluQsLfYLayj6F0ma8SopIPTqnSJT-Pw1ypJr7d-5vfqR2fMg')
      .then(response => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
    test("It should response with token expired", done => {
    request(app)
      .get("/auth/list")
      .set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTXIuIExlw7NuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpMk9adDIzbldxWnFOX0txQ2o4VERDQUtLaHZFcEhjWFpaYVpkcjVBPXM5Ni1jIiwidXNlciI6dHJ1ZSwiYWRtaW4iOnRydWUsInN1cGVyYWRtaW4iOnRydWUsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9mYWNlYm9vay1idXNpbmVzcy1tYW5hZ2UtYjY3OTQiLCJhdWQiOiJmYWNlYm9vay1idXNpbmVzcy1tYW5hZ2UtYjY3OTQiLCJhdXRoX3RpbWUiOjE2NDI1MzIyMjksInVzZXJfaWQiOiJIalcyYmhOWHJ5Y3hERk5ZOGVoRjdKbHdDYUIyIiwic3ViIjoiSGpXMmJoTlhyeWN4REZOWThlaEY3Smx3Q2FCMiIsImlhdCI6MTY0MjUzMjIyOSwiZXhwIjoxNjQyNTM1ODI5LCJlbWFpbCI6InJvbGVvbm1AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDIwNzE2MDMyMDQwNDMwNzk0NTIiXSwiZW1haWwiOlsicm9sZW9ubUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.ZzzVKIj7SsJMdihpnnXJ4rVn0RyWrblAttetvd3x9SU9jzZRQ-mtU2XhWhJETQu7UnIB4bCRcSrIe1iPrhhqP7rqkHOcy0QF2xODe6lJU6HnpwZsA1YQD4nX4_CM-8743ByviWzqN6DzFjc5kYatueka2aKW_PG8yJWEn7kKGGsE18ZKsvsPr-474ZNN-rwJVI39q6LauweT13FUqDahwaVwmMsJaSnUV3G-b0nkAN662GjOqg66WrdHpgZ2nFcKd3R7I8dMPTd4b-pbDEsbkehTjm-lRSIHhDrsXbluQsLfYLayj6F0ma8SopIPTqnSJT-Pw1ypJr7d-5vfqR2fMg')
      .then(response => {
        expect(response.statusCode).toBe(401);
        done();
      });
  });
});