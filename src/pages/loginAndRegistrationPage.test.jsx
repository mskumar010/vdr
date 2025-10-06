import userEvent from "@testing-library/user-event";
import { render, expect, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import Login from "./loginAndRegistrationPage";

describe("loginAndRegistrationTests", () => {
  it("login", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", { name: /Healthcare Professional/i })
    );
    expect(
      screen.getByText(/What type of healthcare professional are you?/i)
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /doctor/i }));
    expect(
      screen.getByText(/Welcome Back | Healthcare Professional | Doctor/i)
    ).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "example@g.com");
    await user.type(passInput, "example@g");
    await user.click(loginButton);

    // const dashboard = await screen.findByTestId('dashboard');
    expect(dashboard).toBeInTheDocument();

    const error = screen.queryByText(/error/i);
    expect(error).not.toBeInTheDocument();
  });
});
