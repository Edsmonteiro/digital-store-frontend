import { test, expect } from '@playwright/test';

const screenshotPath = (name) => `docs/screenshots/${name}.png`;

test('home mostra carrossel, três coleções e oito produtos', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Coleções em destaque' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Produtos em alta' })).toBeVisible();
  await expect(page.locator('.collection-card')).toHaveCount(3);
  await expect(page.locator('.home-content .product-card')).toHaveCount(8);
  await page.screenshot({ path: screenshotPath('home'), fullPage: true });
  await page.locator('.main-nav').getByRole('link', { name: 'Produtos', exact: true }).click();
  await expect(page).toHaveURL(/\/products$/);
  await page.getByRole('link', { name: /Tênis Street Move/ }).click();
  await expect(page).toHaveURL(/\/product\/1$/);
  await expect(page.getByRole('heading', { name: 'Tênis Street Move' })).toBeVisible();
});

test('pesquisa pela query string e filtros preservam a navegação', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Buscar produtos').fill('street');
  await page.getByLabel('Buscar produtos').press('Enter');
  await expect(page).toHaveURL(/\/products\?filter=street/);
  await expect(page.getByText(/Busca: “street”/)).toBeVisible();
  await expect(page.locator('.catalog-results .product-card').first()).toBeVisible();
  await page.getByLabel('Calçados', { exact: true }).check();
  await expect(page).toHaveURL(/category=Cal%C3%A7ados/);
  await expect(page.getByRole('heading', { name: /produto encontrado/ })).toBeVisible();
  await expect(page.locator('.main-nav a.active')).toHaveText('Categorias');
  await page.screenshot({ path: screenshotPath('products'), fullPage: true });
});

test('galeria, seleção de opções e compra demonstrativa funcionam', async ({ page }) => {
  await page.goto('/product/1');
  const featuredImage = page.locator('.gallery-stage img');
  const firstImage = await featuredImage.getAttribute('src');
  await expect(page.getByRole('button', { name: 'Imagem anterior' })).toBeDisabled();
  await page.getByRole('button', { name: 'Próxima imagem' }).click();
  await expect(featuredImage).not.toHaveAttribute('src', firstImage);
  await page.getByRole('button', { name: 'Próxima imagem' }).click();
  await expect(page.getByRole('button', { name: 'Próxima imagem' })).toBeDisabled();
  await page.getByRole('button', { name: 'Imagem anterior' }).click();
  await page.getByRole('button', { name: 'Mostrar imagem 1' }).click();
  await expect(featuredImage).toHaveAttribute('src', firstImage);
  await page.getByRole('button', { name: 'Selecionar tamanho 40' }).click();
  await page.getByRole('button', { name: 'Selecionar cor #dad2c8' }).click();
  await expect(page.getByRole('button', { name: 'Selecionar tamanho 40' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('button', { name: 'Selecionar cor #dad2c8' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'COMPRAR' }).click();
  await expect(page.getByRole('heading', { name: 'Meu carrinho' })).toBeVisible();
  await expect(page.getByRole('dialog').getByText('Tênis Street Move')).toBeVisible();
  await page.getByRole('button', { name: 'Fechar carrinho' }).click();
  await page.screenshot({ path: screenshotPath('product-view'), fullPage: true });
});

test('imagens carregam e não há erros de console nas três páginas', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  for (const route of ['/', '/products', '/product/1']) {
    await page.goto(route);
    await page.locator('img').first().waitFor();
    await page.waitForTimeout(500);
    const brokenImages = await page.locator('img').evaluateAll((images) => images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    expect(brokenImages, `Imagens quebradas em ${route}`).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test('as três páginas não criam rolagem horizontal nos seis tamanhos solicitados', async ({ page }) => {
  for (const width of [1440, 1366, 1024, 768, 390, 375]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/products', '/product/1']) {
      await page.goto(route);
      await expect(page.locator('#conteudo')).toBeVisible();
      const dimensions = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }));
      expect(dimensions.document, `Rolagem horizontal em ${route}, viewport ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
    }
  }
});
