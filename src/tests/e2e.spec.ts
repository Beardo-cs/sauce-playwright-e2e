import { Page, test, expect } from "@playwright/test";
import { USER_NAME, PASSWORD, APPLICATION_URL, FIRST_NAME, SECOND_NAME, POSTAL_CODE } from "./constants/app.constant";
import { InventoryPage } from "../pages/inventory.page";
import { CheckoutPage } from "../pages/checkout.page";
import { LoginPage } from "../pages/login.page";

test.describe("Sauce Demo E2E Test", () => {
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test("Login, Add Products to Cart, and Checkout", async () => {
    await test.step("Login to Swag Labs", async () => {
      await loginPage.navigateToSwagLabs(APPLICATION_URL);
      await loginPage.login(USER_NAME, PASSWORD);
    });

    await test.step("Validate and Add Products to Cart", async () => {
      await inventoryPage.validateProductName();
      await inventoryPage.validatePrice();
      const totalPrice = await inventoryPage.addProductsToCart(); 
      await inventoryPage.navigateToCart();
      await checkoutPage.performCheckout(totalPrice, FIRST_NAME, SECOND_NAME, POSTAL_CODE);
    });
  });
  test("Login with Invalid Password", async () => {
    await test.step("Login to Swag Labs", async () => {
      await loginPage.navigateToSwagLabs(APPLICATION_URL);
      await loginPage.login(USER_NAME, "");
      expect(await loginPage.validateErrorToastMessage()).toBe("Epic sadface: Password is required");
    });
  });

  test("Login with Invalid UserName", async () => {
    await test.step("Login to Swag Labs", async () => {
      await loginPage.navigateToSwagLabs(APPLICATION_URL);
      await loginPage.login("", PASSWORD);
      expect(await loginPage.validateErrorToastMessage()).toBe("Epic sadface: Username is required");
    });
  });

  test("Login with both Invalid UserName & Password", async () => {
    await test.step("Login to Swag Labs", async () => {
      await loginPage.navigateToSwagLabs(APPLICATION_URL);
      await loginPage.login("invalid", "invalid");
      expect(await loginPage.validateErrorToastMessage()).toBe("Epic sadface: Username and password do not match any user in this service");
    });
  });
});
