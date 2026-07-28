const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const W = 1290, H = 2796, SLIDES = 3;
  await page.setViewport({ width: W, height: H * SLIDES });
  await page.goto(`file://${path.join(__dirname, 'ios-promo.html').replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));

  for (let i = 0; i < SLIDES; i++) {
    const name = `ios-example-${i + 1}.png`;
    await page.screenshot({
      path: path.join(__dirname, '..', 'examples', name),
      clip: { x: 0, y: i * H, width: W, height: H },
    });
    console.log(`Exported: ${name}`);
  }
  await browser.close();
  console.log('Done!');
})();
