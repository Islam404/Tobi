const {test, expect} = require('@playwright/test');
class ContactUs
{


async acceptAndStoreCookies(browser){

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.vodafone.co.uk/contact-us/');
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("How to get in touch with Vodafone");
    //accept cookeis 
    await page.locator('#onetrust-accept-btn-handler').click();
    await page.waitForLoadState();
    //to store storage such cookies  
    await context.storageState({path: 'state.json'});
    return this.webContext=  await browser.newContext({storageState:'state.json'}); 
}

}

module.exports= {ContactUs};