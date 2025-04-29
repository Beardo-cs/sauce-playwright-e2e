import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async performCheckout(totalPrice: number, firstName: string, secondName: string, postalCode: string) {
    await this.page.click('[data-test="checkout"]');
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', secondName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
    await this.page.click('[data-test="continue"]');

    const itemTotalText = await this.page.locator('.summary_subtotal_label').innerText();
    const itemTotal = parseFloat(itemTotalText.replace('Item total: $', ''));

    expect(itemTotal).toBeCloseTo(totalPrice, 2);
    console.log(`Expected Total: $${totalPrice.toFixed(2)} | Checkout Total: $${itemTotal.toFixed(2)}`);

    await this.page.click('[data-test="finish"]');
    await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
  }
}
