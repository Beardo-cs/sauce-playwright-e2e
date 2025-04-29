# Sauce Demo E2E Testing with Playwright

## Overview

This project demonstrates a complete suite of end-to-end (E2E) tests for [Sauce Labs Demo](https://www.saucedemo.com/) using [Playwright](https://playwright.dev/). The test suite covers:

- Login and Checkout flow (Functional Test)
- Accessibility Testing (a11y) using `@axe-core/playwright`
- Visual Regression Testing with built-in Playwright screenshot comparisons

---

## Prerequisites

### Software Requirements
- Node.js v16+ (v18 recommended)
- npm v8+ or yarn v1.22+
- Git v2.30+

### Browser Dependencies
- Chromium-based browser (Chrome v100+ or Edge v100+)
- Firefox v95+
- WebKit (Safari engine) v16+

### Testing Libraries
- Playwright v1.30+ (installed via npm)
- @axe-core/playwright v4.5+ (for accessibility testing)
- @playwright/test framework

### Development Environment
- Visual Studio Code (recommended with Playwright extension)
- Terminal access (for running commands)
- 4GB RAM minimum (8GB recommended)
- 1GB free disk space

### Operating System Support
- Windows 10/11
- macOS Monterey (12.0) or later
- Ubuntu 20.04+ or other major Linux distributions

All browser dependencies will be automatically installed when running `npx playwright install`.

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

Application credentials and test data are defined in:

- `constants/testdata.json`

```json
{
  "userName": "standard_user",
  "password": "secret_sauce",
  "firstName": "Test",
  "lastName": "User",
  "postalCode": "12345",
  "invaliduserName": "test",
  "Invalidpassword": "test"
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

## CI/CD Integration

This project includes CI/CD pipeline configurations for automated testing on each code push and pull request.

### GitHub Actions Workflow

The repository contains GitHub Actions workflows that automatically execute the test suite:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
        
      - name: Run Playwright tests
        run: npm run headless-test
        
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Pipeline Features

- **Automated Testing**: All tests run automatically on code changes
- **Cross-Browser Testing**: Tests execute across multiple browsers
- **Artifact Preservation**: Test reports are saved as pipeline artifacts
- **Scheduled Testing**: Optional nightly test runs to catch regressions

### Integration with Test Management

Test results can be integrated with popular test management tools through API connections in the CI/CD pipeline.

---

## Test Coverage

### Login, Add Products, Checkout
- Navigate to Swag Labs
- Perform Login
- Sort, Validate, and Add Products to Cart
- Proceed with Checkout

### Accessibility Checks
- Login Page
- All Items Page
- Cart Page
- Checkout Page
- Full E2E Flow (with soft assert for accessibility)

### Visual Testing
- Login Screenshot
- All Items Screenshot
- Cart Screenshot
- Checkout Completion Screenshot

---

## Project Structure

```
├── pages/
│   ├── login.page.ts
│   ├── allitems.page.ts
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
│   │   ├── 04-allitems-complete-chrome-darwin.png
├── package.json
├── playwright.config.ts
├── .github/
│   ├── workflows/
│   │   └── playwright.yml
└── README.md
```

---

## Reporting

To open Playwright's built-in test report after any test run:

```
npx playwright show-report
```

## Repository and Demo

- **Repository**: [https://github.com/beardo-cs/sauce-playwright-e2e](https://github.com/beardo-cs/sauce-playwright-e2e)
- **Demo Recording**: [View Demo](https://www.youtube.com/watch?v=example)
- **Test Cases Link**: [View Sheet](https://docs.google.com/spreadsheets/d/19Y6AVa4oe8AaX_R5k_BG9TpuhcaC11PL-DjqC-POAC0/edit?usp=sharing)