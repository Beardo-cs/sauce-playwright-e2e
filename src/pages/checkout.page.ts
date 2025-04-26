import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async performCheckout(totalPrice: number, firstName: string, secondName: string, postalCode: number) {
    await this.page.click('[data-test="checkout"]');
    await this.page.fill('[data-test="firstName"]', 'QA');
    await this.page.fill('[data-test="lastName"]', 'Tester');
    await this.page.fill('[data-test="postalCode"]', '12345');
    await this.page.click('[data-test="continue"]');

    const itemTotalText = await this.page.locator('.summary_subtotal_label').innerText();
    const itemTotal = parseFloat(itemTotalText.replace('Item total: $', ''));

    expect(itemTotal).toBeCloseTo(totalPrice, 2);
    console.log(`Expected Total: $${totalPrice.toFixed(2)} | Checkout Total: $${itemTotal.toFixed(2)}`);

    await this.page.click('[data-test="finish"]');
    await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
  }
}
