const puptt = require('puppeteer');

const start = async () => {
    console.log('hello');
    const browser = await puptt.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://www.zhihuishu.com/");
    await page.waitForSelector('#notLogin');
    await page.click('#notLogin');

    await page.waitForSelector('#lUsername');
    await page.waitForSelector('#lPassword');
    await page.type('#lUsername', '###');
    await page.type('#lPassword', '###');

    console.log('hello');
    await page.waitForSelector('.wall-sub-btn', { visible: true });

    // 获取元素的坐标
    const element = await page.$('.wall-sub-btn');
    const boundingBox = await element.boundingBox();

    if (boundingBox) {
        const x = boundingBox.x + boundingBox.width / 2;
        const y = boundingBox.y + boundingBox.height / 2;

        console.log(`Element found at x: ${x}, y: ${y}`);

        // 模拟自然的鼠标移动和悬停
        await page.mouse.move(x, y, { steps: 10 });
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 500) + 500)); // 随机等待500-1000毫秒

        // 模拟点击
        await page.mouse.down();
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 100) + 50)); // 随机等待50-150毫秒
        await page.mouse.up();

        console.log('Clicked the button');

        // 等待验证码或其他操作
        await new Promise(resolve => setTimeout(resolve, 2000)); // 等待2秒

        // 截图检查页面状态
        await page.screenshot({ path: 'after_click.png' });
    } else {
        console.log('Element not found or not visible');
    }

    
};

start();