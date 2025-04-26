import { Page, test, expect } from "@playwright/test";
import { USER_NAME, PASSWORD, APPLICATION_URL, FIRST_NAME, SECOND_NAME, POSTAL_CODE } from "./constants/app.constant";
import { InventoryPage } from "../pages/inventory.page";
import { CheckoutPage } from "../pages/checkout.page";
import { LoginPage } from "../pages/login.page";
import { writeFileSync } from "fs";
import { AxeBuilder } from "@axe-core/playwright";

test.describe("Sauce Demo Accessibility Tests", () => {
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;
  let loginPage: LoginPage;

  const checkA11yAndLog = async (page: Page, step: string): Promise<any[]> => {
    const { violations } = await new AxeBuilder({ page }).analyze();
    writeFileSync(`Accessibility/a11y-snapshot-${step}.json`, JSON.stringify(violations, null, 2));
    if (violations.length > 0) {
      console.warn(`Accessibility violations detected on: ${step}`);
      console.table(
        violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.length,
        }))
      );
    } else {
      console.log(`No accessibility issues found on: ${step}`);
    }
    return violations;
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  // Individual page accessibility tests
  test("Login Page Accessibility", async ({ page }) => {
    await loginPage.navigateToSwagLabs(APPLICATION_URL);
    const violations = await checkA11yAndLog(page, "login-page");
    expect(violations, "Accessibility violations on login page").toHaveLength(0);
  });

  test("Inventory Page Accessibility", async ({ page }) => {
    await loginPage.navigateToSwagLabs(APPLICATION_URL);
    await loginPage.login(USER_NAME, PASSWORD);
    const violations = await checkA11yAndLog(page, "inventory-page");
    expect(violations, "Accessibility violations on inventory page").toHaveLength(0);
  });

  test("Cart Page Accessibility", async ({ page }) => {
    await loginPage.navigateToSwagLabs(APPLICATION_URL);
    await loginPage.login(USER_NAME, PASSWORD);
    await inventoryPage.addProductsToCart();
    await inventoryPage.navigateToCart();
    const violations = await checkA11yAndLog(page, "cart-page");
    expect(violations, "Accessibility violations on cart page").toHaveLength(0);
  });

  test("Checkout Page Accessibility", async ({ page }) => {
    await loginPage.navigateToSwagLabs(APPLICATION_URL);
    await loginPage.login(USER_NAME, PASSWORD);
    const totalPrice = await inventoryPage.addProductsToCart();
    await inventoryPage.navigateToCart();
      await checkoutPage.performCheckout(totalPrice, FIRST_NAME, SECOND_NAME, POSTAL_CODE);
    const violations = await checkA11yAndLog(page, "checkout-page");
    expect(violations, "Accessibility violations on checkout page").toHaveLength(0);
  });

  // Full E2E flow with soft assertion
  test("E2E Flow with Accessibility Soft Asserts", async ({ page }) => {
    let allViolations: any[] = [];

    await test.step("Login", async () => {
      await loginPage.navigateToSwagLabs(APPLICATION_URL);
      await loginPage.login(USER_NAME, PASSWORD);
      const v = await checkA11yAndLog(page, "after-login");
      allViolations.push(...v);
    });

    await test.step("Inventory", async () => {
      await inventoryPage.validateProductName();
      await inventoryPage.validatePrice();
      const v = await checkA11yAndLog(page, "inventory-page");
      allViolations.push(...v);
    });

    await test.step("Cart", async () => {
      await inventoryPage.addProductsToCart();
      await inventoryPage.navigateToCart();
      const v = await checkA11yAndLog(page, "cart-page");
      allViolations.push(...v);
    });

    await test.step("Checkout", async () => {
      const totalPrice = await inventoryPage.addProductsToCart();
      await inventoryPage.navigateToCart();
      await checkoutPage.performCheckout(totalPrice, FIRST_NAME, SECOND_NAME, POSTAL_CODE);
      const v = await checkA11yAndLog(page, "checkout-complete");
      allViolations.push(...v);
    });

    expect(allViolations, "Accessibility issues found during full E2E flow").toHaveLength(0);
  });
});
