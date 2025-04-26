# Sauce Demo E2E Testing with Playwright

## Overview

This project demonstrates a complete suite of end-to-end (E2E) tests for [Sauce Labs Demo](https://www.saucedemo.com/) using [Playwright](https://playwright.dev/). The test suite covers:

- Login and Checkout flow (Functional Test)
- Accessibility Testing (a11y) using `@axe-core/playwright`
- Visual Regression Testing with built-in Playwright screenshot comparisons

---

## Prerequisites

- Node.js v16+  
- Playwright  
- @axe-core/playwright
- Git

---

## Setup Instructions

### 1. Clone the Repository

Clone the repository and navigate to the project directory:

```
git clone https://github.com/beardo-cs/sauce-playwright-e2e
cd sauce-playwright-e2e
```

### 2. Install Dependencies

Install the required dependencies:

```
npm install
```

### 3. Install Playwright Browsers

Install the necessary browsers for Playwright:

```
npx playwright install
```

---

## Configuration

Application credentials are defined in:

- `constants/testdata.json`

```json
{
  "userName": "standard_user",
  "password": "secret_sauce"
}
```

You can modify this file based on your environment or set up ENV-based configuration as needed.

---

## Test Commands

You can run specific types of tests using these NPM scripts:

| Command | Description |
|:--------|:------------|
| `npm test` | Run all tests in headed mode and view report |
| `npm run visual-test` | Run visual regression tests in headed mode and view report |
| `npm run e2e-test` | Run E2E functional tests in headed mode and view report |
| `npm run accessibility-test` | Run accessibility tests in headed mode and view report |
| `npm run visual-headless-test` | Run visual regression tests in headless mode and view report |
| `npm run e2e-headless-test` | Run E2E functional tests in headless mode and view report |
| `npm run accessibility-headless-test` | Run accessibility tests in headless mode and view report |
| `npm run headless-test` | Run all tests in headless mode and view report |
| `npm run debug-test-dev` | Open Playwright UI mode for interactive debugging |

### NPM Scripts

These are the actual commands configured in package.json:

```json
{
  "scripts": {
    "test": "npx playwright test --headed && npx playwright show-report",
    "headless-test": "npx playwright test && npx playwright show-report",
    "visual-test": "npx playwright test visual.spec.ts --headed && npx playwright show-report",
    "e2e-test": "npx playwright test e2e.spec.ts --headed && npx playwright show-report",
    "accessibility-test": "npx playwright test accessibility.spec.ts --headed && npx playwright show-report",
    "visual-headless-test": "npx playwright test visual.spec.ts && npx playwright show-report",
    "e2e-headless-test": "npx playwright test e2e.spec.ts && npx playwright show-report",
    "accessibility-headless-test": "npx playwright test accessibility.spec.ts && npx playwright show-report",
    "debug-test-dev": "npx playwright test --ui"
  }
}
```

### Manual Commands

#### Headed Mode (Browser Visible)

##### Run Functional E2E Tests in Headed Mode

```
npx playwright test tests/e2e.spec.ts --headed
```

##### Run Accessibility Tests in Headed Mode

```
npx playwright test tests/accessibility.spec.ts --headed
```

##### Run Visual Regression Tests in Headed Mode

```
npx playwright test tests/visual.spec.ts --headed
```

#### Headless Mode (Browser Hidden)

##### Run Functional E2E Tests in Headless Mode

```
npx playwright test tests/e2e.spec.ts
```

##### Run Accessibility Tests in Headless Mode

```
npx playwright test tests/accessibility.spec.ts
```

##### Run Visual Regression Tests in Headless Mode

```
npx playwright test tests/visual.spec.ts
```

Visual snapshots are auto-generated and compared. Review failures via the Playwright HTML report.

---

## Test Coverage

### Login, Add Products, Checkout
- Navigate to Swag Labs
- Perform Login
- Sort, Validate, and Add Products to Cart
- Proceed with Checkout

### Accessibility Checks
- Login Page
- Inventory Page
- Cart Page
- Checkout Page
- Full E2E Flow (with soft assert for accessibility)

### Visual Testing
- Login Screenshot
- Inventory Screenshot
- Cart Screenshot
- Checkout Completion Screenshot

---

## Project Structure

```
├── pages/
│   ├── login.page.ts
│   ├── inventory.page.ts
│   ├── checkout.page.ts
├── tests/
│   ├── e2e.spec.ts
│   ├── accessibility.spec.ts
│   ├── visual.spec.ts
│   ├── constants/
│   │   └── app.constant.ts
│   ├── resources/
│   │   └── testdata.json
│   ├── swagLabsVisual.spec.ts-snapshots/
│   │   ├── 01-home-after-login-chrome-darwin.png
│   │   ├── 02-inventory-page-chrome-darwin.png
│   │   ├── 03-cart-page-chrome-darwin.png
│   │   ├── 04-checkout-complete-chrome-darwin.png
├── package.json
├── playwright.config.ts
└── README.md
```

---

## Reporting

To open Playwright's built-in test report after any test run:

```
npx playwright show-report
```