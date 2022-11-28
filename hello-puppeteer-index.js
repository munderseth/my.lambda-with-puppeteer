const sleep = (secs) => {
    return new Promise((resolve) => {
        setTimeout(resolve, secs*1000)
    });
}

async function main (payload, context) {
    console.log("STARTING ...")
    var browser = null;
    if (process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined) {
        var chromium = require('chrome-aws-lambda');
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            timeout: 30000
        });
    }
    else {
        var puppeteer = require('puppeteer');
        var headless = process.env.HEADLESS === "false";
        browser = await puppeteer.launch({headless: headless});
    }

    const page = await browser.newPage();
    await page.goto('https://google.com');
    sleep(2);
    browser.close();
    console.log("ENDING...")
}

exports.handler = async (event, context) => {

    await main(event, context.clientContext);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        log: context.logStreamName,
    };
    return response;
};

//main();  // Run locally