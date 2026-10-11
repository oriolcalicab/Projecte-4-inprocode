import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { LoginPage } from "./LoginPage";

const { useAuthMock } = vi.hoisted(() => ({ useAuthMock: vi.fn() }));

vi.mock("../useAuth", () => ({
  useAuth: useAuthMock,
}));

const login = vi.fn();

function renderLogin() {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
}

describe("Feature: Login", () => {
  beforeEach(() => {
    login.mockReset();
    useAuthMock.mockReturnValue({ user: null, loading: false, login });
  });

  /**
    Scenario: The email is missing
     Given the login form is empty
     When I press "Entra"
     Then I see that the email is missing
     And no login is attempted
  */
  it("asks for the email when the form is empty", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByRole("button", { name: "Entra" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Escriu el correu.");
    expect(login).not.toHaveBeenCalled();
  });

  /**
    Scenario: Wrong credentials
     Given I write an email and a password
     When Firebase rejects them
     Then I see a clear error message
  */
  it("shows an error when the credentials are wrong", async () => {
    login.mockRejectedValue(new FirebaseError("auth/invalid-credential", "x"));
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText("Correu"), "admin@exemple.com");
    await user.type(screen.getByLabelText("Contrasenya"), "malament");
    await user.click(screen.getByRole("button", { name: "Entra" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Correu o contrasenya incorrectes."
    );
  });

  /**
    Scenario: Correct credentials
     Given I write my email and my password
     When I press "Entra"
     Then the login is attempted with those values
  */
  it("logs in with the written email and password", async () => {
    login.mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText("Correu"), "admin@exemple.com");
    await user.type(screen.getByLabelText("Contrasenya"), "secret123");
    await user.click(screen.getByRole("button", { name: "Entra" }));

    expect(login).toHaveBeenCalledWith("admin@exemple.com", "secret123");
  });
});