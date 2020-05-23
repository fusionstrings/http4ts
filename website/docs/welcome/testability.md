---
id: testability
title: Testability
sidebar_label: Testability
---

*Http4ts* abstracts the http related objects. Therefore, `Request` and `Response` are just simple objects with methods that can be safely manipulated in an immutable way. Writing unit tests against handlers or filters is extremely simple. As an example, let's try to write some tests for the following handler:

```ts
const exampleUserInfo = {
  firstName: "Jane",
  lastName: "Doe"
};

async function getUserProfileHandler(req: HttpRequest): Promise<HttpResponse> {
  const authHeader = req.headers["authorization"] as string | undefined;
  if (!authHeader) {
    return res({ status: HttpStatus.UNAUTHORIZED });
  }

  const token = authHeader.toLowerCase().substring("bearer ".length);
  if (token !== "valid-token") {
    return res({ status: HttpStatus.UNAUTHORIZED });
  }

  return res({
    status: HttpStatus.OK,
    body: jsonBody(exampleUserInfo)
  });
}
```

This is an example handler that checks the validity of the token in the `authorization` header and returns `OK` with user info in the body when the token is valid. We can write the following tests for this handler (Tests are written in [Jest](https://jestjs.io/)):

```ts
describe("loginHandler tests", () => {
  it("should return unauthorized when request has no auth header", async () => {
    const request = req("/", "GET", "", {});

    const response = await loginUserHandler(request);

    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it("should return unauthorized when the token is not valid", async () => {
    const headers = {
      authorization: "bearer invalid-token"
    };
    const request = req("/", "GET", "", headers);

    const response = await loginUserHandler(request);

    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it("should return ok with user info when the token is valid", async () => {
    const headers = {
      authorization: "bearer valid-token"
    };
    const request = req("/", "GET", "", headers);

    const response = await loginUserHandler(request);

    const expectedUserInfo = {
      firstName: "Jane",
      lastName: "Doe"
    };

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual(stringBody(JSON.stringify(expectedUserInfo)));
  });
});
```

As you can see in these tests, there is no special or framework-specific preparation needed to write tests. Your tests can focus on the real business logic instead of being littered with lots of noisy setup code.
