import { Page, Locator,expect } from "@playwright/test";
import { CheckoutPage } from "./checkout.page";

export class AllitemPage {
  readonly page: Page;
  readonly productContainer: Locator;
  readonly inventoryProductName: Locator;
  readonly inventoryPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productContainer = page.locator('.product_sort_container');
    this.inventoryProductName = page.locator('.inventory_item_name');
    this.inventoryPrice = page.locator('.inventory_item_price');
  }


  async validateProductName() {
    await this.productContainer.selectOption("Name (Z to A)");
    const displayedNames = await this.inventoryProductName.allTextContents();
    const expectedNames = [...displayedNames].sort().reverse();
    expect(displayedNames).toEqual(expectedNames);
  }

  async validatePrice() {
    await this.productContainer.selectOption("Price (high to low)");
    const displayedPrices = await this.inventoryPrice.allTextContents();
    const numericPrices = displayedPrices.map(price => parseFloat(price.replace('$', '')));
    const expectedPrices = [...numericPrices].sort((a, b) => b - a);
    expect(numericPrices).toEqual(expectedPrices);
  }

  async addProductsToCart(): Promise<number> {
    // Fetch all product names displayed on the page
    const displayedNames = await this.inventoryProductName.allTextContents();
  
    let totalPrice = 0;
    const productCards = await this.page.locator('.inventory_item').all();
  
    for (const card of productCards) {
      const productName = await card.locator('.inventory_item_name').innerText();
  
      // Check if the product is in the displayed names list
      if (displayedNames.includes(productName)) {
        const priceText = await card.locator('.inventory_item_price').innerText();
        const price = parseFloat(priceText.replace('$', ''));
        totalPrice += price;
  
        await card.locator('button:has-text("Add to cart")').click();
      }
    }
  
    return totalPrice;
  }
  

  async navigateToCart() {
    await this.page.click('.shopping_cart_link');
  }
}
