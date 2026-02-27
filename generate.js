const puppeteer = require('puppeteer');
const path = require('path');

async function generateInvoiceImage() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlPath = 'file://' + path.join(__dirname, 'invoice.html');
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });

    // 72mm is approx 272-280px at 96dpi. 
    // We use 288px width and deviceScaleFactor 2 to get exactly 576px image.
    // 576px is the standard width for 80mm (72mm printable) printers.
    await page.setViewport({
        width: 288,
        height: 100, // height doesn't matter, we clip later
        deviceScaleFactor: 2
    });

    const bodyHandle = await page.$('body');
    const { width, height } = await bodyHandle.boundingBox();

    console.log(`Optimized Dimensions: ${Math.round(width * 2)}px wide (576 dots)`);

    await page.screenshot({
        path: 'invoice.png',
        clip: {
            x: 0,
            y: 0,
            width: width,
            height: height
        }
    });

    await browser.close();
    console.log('✅ Optimized Image Generated: invoice.png');
}

generateInvoiceImage().catch(err => {
    console.error('Error generating image:', err);
});
