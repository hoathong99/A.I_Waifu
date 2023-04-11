import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

const questions = ['Question 1', 'Question 2', 'Question 3'];
const replies: string[] = [];

async function sendMessage(page: puppeteer.Page, message: string) {
    await page.waitForSelector('.message-contents:not(.from-me)', { visible: true });
    await page.type('#user-input', message);
    await page.keyboard.press('Enter');
}

async function waitReply(page: puppeteer.Page) {
    await page.waitForSelector('.message-contents:not(.from-me)');
}

async function scrapeReplies(page: puppeteer.Page) {
    const html = await page.content();
    const $ = cheerio.load(html);
    $('.message-contents:not(.from-me)').each((index, element) => {
        replies.push($(element).text());
    });
}

(async () => {
    const browser = await puppeteer.launch({ 
        headless: false,
        userDataDir: 'C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User Data\\Default',
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    });
    const page = await browser.newPage();
    await page.goto('https://beta.character.ai/chat?char=RQrrOj-UNdEV2_PC5D03US-27MZ7EUtaRH_husjbRQA');
    // const element = await page.waitForSelector('#AcceptButton');
    // console.log(element);
    // await page.waitForTimeout(20000);
    // await page.type('#user-input', "hello");

    // for (const question of questions) {
    //     await sendMessage(page, question);
    //     // await waitReply(page);
    //     // await scrapeReplies(page);
    //     await page.waitForTimeout(10000); // delay between questions
    // }
    //   console.log(replies);
    //   await browser.close();
    console.log(page);
})();
