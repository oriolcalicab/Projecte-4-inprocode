import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

const { useAuthMock } = vi.hoisted(() => ({ useAuthMock: vi.fn() }));

vi.mock("../../features/auth/useAuth", () => ({
  useAuth: useAuthMock,
}));

function renderPrivatePage() {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/login" element={<p>Pàgina de login</p>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<p>Panell privat</p>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe("Feature: Protected routes", () => {
  beforeEach(() => {
    useAuthMock.mockReset();
  });

  /**
    Scenario: A visitor without a session is sent to the login
     Given I have not logged in
     When I open a private page
     Then I am redirected to the login page
  */
  it("redirects to the login when there is no session", () => {
    useAuthMock.mockReturnValue({ user: null, loading: false });

    renderPrivatePage();

    expect(screen.getByText("Pàgina de login")).toBeInTheDocument();
    expect(screen.queryByText("Panell privat")).not.toBeInTheDocument();
  });

  /**
    Scenario: A logged-in user sees the private page
     Given I have logged in
     When I open a private page
     Then I see its content
  */
  it("shows the private page when there is a session", () => {
    useAuthMock.mockReturnValue({ user: { email: "admin@exemple.com" }, loading: false });

    renderPrivatePage();

    expect(screen.getByText("Panell privat")).toBeInTheDocument();
  });

  /**
    Scenario: The session is still being checked
     Given Firebase has not answered yet
     When I open a private page
     Then I see a loading message and I am not redirected
  */
  it("shows a loading message while the session is being checked", () => {
    useAuthMock.mockReturnValue({ user: null, loading: true });

    renderPrivatePage();

    expect(screen.getByText("Carregant...")).toBeInTheDocument();
    expect(screen.queryByText("Pàgina de login")).not.toBeInTheDocument();
  });
});