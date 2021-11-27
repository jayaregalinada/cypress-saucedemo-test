/// <reference types="cypress" />

describe("Initial Activity", () => {
  const baseUrl = "https://www.saucedemo.com/";
  const usernames = [
    "standard_user",
    "problem_user",
    "performance_glitch_user",
  ];
  const loginButton = "[data-test='login-button']";
  const usernameInput = "[data-test='username']";
  const passwordInput = "[data-test='password']";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it("Check username is required error", () => {
    // Arrange // Act // Assert
    cy.get(loginButton).click();
    cy.contains(/Username is required/);
  });

  it("Check password is required error", () => {
    cy.get(usernameInput).type("username");
    cy.get(loginButton).click();
    cy.contains(/Password is required/);
  });

  it("Error in both username and password", () => {
    cy.get(usernameInput).type("username");
    cy.get(passwordInput).type("password");
    cy.get(loginButton).click();
    cy.contains(/Username and password do not match any user in this service/);
  });

  const loginTest = (username) => {
    cy.get(usernameInput).type(username);
    cy.get(passwordInput).type("secret_sauce");
    cy.get(loginButton).click();
  };

  usernames.forEach((username) => {
    it(`Successful login using [${username}] username`, () => {
      loginTest(username);
      cy.url().should("contain", "inventory.html");
    });
  });

  usernames.forEach((username) => {
    it(`Successful logout using [${username}] username`, () => {
      loginTest(username);
      cy.get("#react-burger-menu-btn").click();
      cy.get("#logout_sidebar_link").click();
      cy.url().should("contain", baseUrl);
    });
  });
});
