import { Page, test, expect } from "@playwright/test";
import { USER_NAME, PASSWORD, APPLICATION_URL, FIRST_NAME, SECOND_NAME, POSTAL_CODE } from "./constants/app.constant";
import { InventoryPage } from "../pages/inventory.page";
import { CheckoutPage } from "../pages/checkout.page";
import { LoginPage } from "../pages/login.page";

test.describe("Sauce Demo E2E Test with Visual Testing", () => {
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test("Login, Add Products to Cart, and Checkout", async ({ page }) => {
    await test.step("Login to Swag Labs", async () => {
      await loginPage.navigateToSwagLabs(APPLICATION_URL);
      await loginPage.login(USER_NAME, PASSWORD);
      await expect(page).toHaveScreenshot("01-home-after-login.png");
    });

    await test.step("Validate and Add Products to Cart", async () => {
      await inventoryPage.validateProductName();
      await inventoryPage.validatePrice();
      await expect(page).toHaveScreenshot("02-inventory-page.png");

      const totalPrice = await inventoryPage.addProductsToCart();
      await inventoryPage.navigateToCart();
      await expect(page).toHaveScreenshot("03-cart-page.png");

      await checkoutPage.performCheckout(totalPrice, FIRST_NAME, SECOND_NAME, POSTAL_CODE);
      await expect(page).toHaveScreenshot("04-checkout-complete.png");
    });
  });
});
