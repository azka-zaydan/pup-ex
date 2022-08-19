import puppeteer from 'puppeteer'

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const delay = async (min, max) => {
    const sleep_duration = randomIntFromInterval(min, max)
    console.log(`wating for: ${sleep_duration / 1000} seconds`)
    return new Promise((resolve) => {
        setTimeout(resolve, sleep_duration)
    })
}


export const scrapeImages = async (username) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    })
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' })

    // await page.screenshot({ path: 'loginPage.png' })

    await delay(3000, 5000)

    try {
        // delay(3000, 5000)

        const inputFields = await page.$x('//input')
        console.log(inputFields)

        await inputFields[0].focus()
        await page.keyboard.type('azkamediadump2')
        await delay(3000, 5000)

        await inputFields[1].focus()
        await page.keyboard.type('Azkarafif1415')
        await delay(3000, 5000)

        const submitButton = await page.$x('//button[@type="submit"]')
        await submitButton[0].click()

        await delay(3000, 5000)

        await page.goto(`https://www.instagram.com/${username}`, { waitUntil: 'networkidle0' })
        // const notNow = await page.$x('//button[@type="button"]')
        // await notNow[0].click()
        // console.log()

    } catch (err) {
        console.log(err)
    }
    await page.waitForSelector('img', {
        visible: true
    })

    // await page.screenshot({ path: `${username}'s-page.png` })
    await delay(3000, 5000)
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


// const data = await scrapeImages('dagelan')

// console.log(data)