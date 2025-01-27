const puptt =require('puppeteer')
const start =async()=>{
     console.log('hello')
    const browser =await puptt.launch({headless:false})
    const page =await browser.newPage()
    
    await page.goto("https://www.zhihuishu.com/")
    
    await page.screenshot({path:'example.png'})
}
start()
