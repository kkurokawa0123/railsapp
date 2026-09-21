import { test, expect } from "@playwright/test";
/* テスト実施手順
cd e2e

npm install -D @playwright/test@1.63.0
npx playwright install chromium
テスト実行
npx playwright test tests/auth.spec.ts --headed
*/

test("認証フローを順番に確認する", async ({ page }) => {
  const email = `test-${Date.now()}@example.com`;
  const password = "Password1234";
  const newPassword = "Password1230";
  const name = email.replace(/@example\.com$/, "");

  // 1. サインアップ
  await page.goto("signup");
  await page.getByLabel("名称", { exact: true }).fill(name);
  await page.getByLabel("Eメールアドレス", { exact: true }).fill(email);
  await page.getByLabel("パスワード", { exact: true }).fill(password);
  await page.getByLabel("パスワード(確認用)", { exact: true }).fill(password);

  const signUpButton = page.getByRole("button", {
    name: "登録",
    exact: true,
  });

  await expect(signUpButton).toBeEnabled();
  await signUpButton.click();

  // サインイン画面へ遷移
  // await expect(page).toHaveURL(/\/railsapp\/signin$/, {
  await expect(page).toHaveURL(/\/signin$/, {
    timeout: 120_000,
  });

  // 2. サインイン
  await page.getByLabel("Eメールアドレス", { exact: true }).fill(email);
  await page.getByLabel("パスワード", { exact: true }).fill(password);

  await page
    .getByRole("button", {
      name: "実行",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL(/\/$/, {
    timeout: 15_000,
  });

  // 3. パスワード変更画面へ移動
  await page
    .getByRole("link", {
      name: "パスワード変更",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL(/\/passwordchange$/, {
    timeout: 10_000,
  });

  await expect(
    page.getByRole("heading", {
      name: "パスワード変更",
      exact: true,
    }),
  ).toBeVisible();

  await page.getByLabel("現在のパスワード", { exact: true }).fill(password);
  await page
    .getByLabel("変更後のパスワード", { exact: true })
    .fill(newPassword);
  await page
    .getByLabel("変更後のパスワード(確認用)", { exact: true })
    .fill(newPassword);
  await page
    .getByRole("button", {
      name: "実行",
      exact: true,
    })
    .click();

  // 4. パスワード変更後、サインイン画面へ戻る
  await expect(page).toHaveURL(/\/signin$/, {
    timeout: 15_000,
  });

  // 5. 新しいパスワードで再ログイン
  await page.getByLabel("Eメールアドレス", { exact: true }).fill(email);
  await page.getByLabel("パスワード", { exact: true }).fill(newPassword);

  await page
    .getByRole("button", {
      name: "実行",
      exact: true,
    })
    .click();

  await expect(page).toHaveURL(/\/$/, {
    timeout: 15_000,
  });
});
