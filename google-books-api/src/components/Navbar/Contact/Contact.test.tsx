import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./Contact";
import { MemoryRouter } from "react-router-dom";

describe("Contact", () => {
  it("renders the contact form", () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send Message" })
    ).toBeInTheDocument();
  });

  it("accepts user input", () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Message");

    // nameInput.focus();
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    // emailInput.focus();
    fireEvent.change(emailInput, {
      target: { value: "john.doe@exampleemail.com" },
    });
    // messageInput.focus();
    fireEvent.change(messageInput, {
      target: { value: "Hello, this is a test message from John." },
    });

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john.doe@exampleemail.com");
    expect(messageInput).toHaveValue(
      "Hello, this is a test message from John."
    );

    // userEvent.type(screen.getByLabelText("Name"), "John Doe");
    // userEvent.type(screen.getByLabelText("Email"), "john.doe@exampleemail.com");
    // userEvent.type(
    //   screen.getByLabelText("Message"),
    //   "Hello, this is a test message from John."
    // );

    // expect(screen.getByLabelText("Name")).toHaveValue("John Doe");
    // expect(screen.getByLabelText("Email")).toHaveValue(
    //   "john.doe@exampleemail.com"
    // );
    // expect(screen.getByLabelText("Message")).toHaveValue(
    //   "Hello, this is a test message from John."
    // );
  });
});
