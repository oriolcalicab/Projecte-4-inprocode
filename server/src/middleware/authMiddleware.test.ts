import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Request, Response } from "express";
import { requireAuth } from "./authMiddleware";

const { verifyIdTokenMock } = vi.hoisted(() => ({ verifyIdTokenMock: vi.fn() }));

vi.mock("firebase-admin/auth", () => ({
  getAuth: () => ({ verifyIdToken: verifyIdTokenMock }),
}));

function fakeRequest(authorization?: string) {
  return { headers: { authorization } } as unknown as Request;
}

function fakeResponse() {
  const res = { status: vi.fn(), json: vi.fn() };
  res.status.mockReturnValue(res);
  return res;
}

describe("Feature: API authentication", () => {
  beforeEach(() => {
    verifyIdTokenMock.mockReset();
  });

  /**
    Scenario: A request without token is rejected
     Given a request without the Authorization header
     When it reaches the middleware
     Then the answer is 401
     And the request does not continue
  */
  it("answers 401 when there is no token", async () => {
    const res = fakeResponse();
    const next = vi.fn();

    await requireAuth(fakeRequest(), res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  /**
    Scenario: A request with an invalid token is rejected
     Given a request with a token that Firebase rejects
     When it reaches the middleware
     Then the answer is 401
  */
  it("answers 401 when the token is not valid", async () => {
    verifyIdTokenMock.mockRejectedValue(new Error("invalid"));
    const res = fakeResponse();
    const next = vi.fn();

    await requireAuth(fakeRequest("Bearer abc"), res as unknown as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  /**
    Scenario: A request with a valid token continues
     Given a request with a token that Firebase accepts
     When it reaches the middleware
     Then the request continues
  */
  it("lets the request continue when the token is valid", async () => {
    verifyIdTokenMock.mockResolvedValue({ uid: "123" });
    const res = fakeResponse();
    const next = vi.fn();

    await requireAuth(fakeRequest("Bearer good-token"), res as unknown as Response, next);

    expect(verifyIdTokenMock).toHaveBeenCalledWith("good-token");
    expect(next).toHaveBeenCalled();
  });
});