const puptt = require('puppeteer');
const start = async () => {
    console.log('hello');
    const browser = await puptt.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://www.zhihuishu.com/");
    await page.waitForSelector('#notLogin');
    page.click('#notLogin');

    await page.waitForSelector('#lUsername');
    await page.waitForSelector('#lPassword');
    await page.type('#lUsername', '###');
    await page.type('#lPassword', '###');
    

   
    console.log('hello');
    await page.waitForSelector('.wall-sub-btn', { visible: true });
    const ele =await page.$('.wall-sub-btn')
    const x = ele.x + ele.width / 2;
    const y = ele.y + ele.height / 2;
    await page.mouse.click(x, y);

    
};

start();