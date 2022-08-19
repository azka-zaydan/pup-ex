import puppeteer from 'puppeteer'

export const scrapeImages = async (username) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    })
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.goto(`https://www.instagram.com/${username}`, { waitUntil: 'networkidle0' })

    await page.waitForSelector('img', {
        visible: true
    })

    await page.screenshot({ path: `${username}'s-page.png` })
    // console.log(page.url())
    const data = await page.evaluate(() => {
        const images = document.querySelectorAll('img')
        const urls = Array.from(images).map(i => {
            const obj = { src: i.src, alt: i.alt }
            return obj
        })
        return urls
    })


    await browser.close()

    return data

}