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

        
        await page.mouse.move(x, y, { steps: 10 });
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 500) + 500)); // 随机等待500-1000毫秒

        
        await page.mouse.down();
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 100) + 50)); // 随机等待50-150毫秒
        await page.mouse.up();

        console.log('Clicked the button');

        //过验证码
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        await page.waitForSelector('.yidun_slider__icon', { visible: true });
        const infor =await page.$('.yidun_slider__icon')
        const boundingBoxinfor = await infor.boundingBox();
        if (boundingBoxinfor) {
            const xinfor = boundingBoxinfor.x + boundingBoxinfor.width / 2;
            const yinfor = boundingBoxinfor.y + boundingBoxinfor.height / 2;
            console.log(`Element found at x: ${xinfor}, y: ${yinfor}`);

            //获取滑块图像
            await page.waitForSelector('.yidun_bg-img')
            const inforimage =await page.$('.yidun_bg-img')
            const imgsrc =await inforimage.getProperty('src')
            const srchuakuai =await imgsrc.jsonValue()
            console.log(src)
            //获取原始图像
            
            const inforimagey =await page.$('.yidun_bg-img')
            const imgsrcy =await inforimagey.getProperty('src')
            const srcy =await imgsrcy.jsonValue()
            console.log(srcy)
            
            await page.mouse.move(xinfor, yinfor, { steps: 10 });
            await new Promise(resolve =>setTimeout(resolve, Math.floor(Math.random() * 500)))
            await page.mouse.down();
        }
        await page.screenshot({ path: 'after_click.png' });
    } else {
        console.log('Element not found or not visible');
    }

    
};

start();