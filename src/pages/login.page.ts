import { Page,Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByText('Login');
    this.errorToast = page.locator("[data-test='error']");
  }

  async navigateToSwagLabs(URL: string) {
    await this.page.goto(URL);
  }
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async validateErrorToastMessage() {
    return await this.errorToast.textContent();
  }
}