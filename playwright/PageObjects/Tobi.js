const {test, expect} = require('@playwright/test');


class Tobi
{
    constructor(page){
        let NText = 0;
        this.NText = NText;
        this.page = page;
        this.text = this.page.locator("#message-index-");
        this.textBox = this.page.locator('[name="chat"]');
        this.sendText = this.page.locator('[aria-label="Send message"]');
        
    }


    async verifyURLis(Context,URL,LinkText)
    {

      const [newPage] = await Promise.all([
        Context.waitForEvent('page'),
        await this.page.locator('text='+ LinkText).click(),
       // await this.page.locator('[href*='+LinkText+"]").click(),
       // Opens a new tab
     ]) 
     //await newPage.waitForLoadState();
     await expect(newPage).toHaveURL(URL);

    }



    async sleep(ms) {
        return new Promise(
          resolve => setTimeout(resolve, ms)
        );
      }

    async acceptPageCookies(){
        await this.page.goto('https://www.vodafone.co.uk/contact-us/');
        console.log("before inc "+this.NText);
        // Expect a title "to contain" a substring.
        await expect(this.page).toHaveTitle("How to get in touch with Vodafone");
        //accept cookeis 
        await this.page.locator('#onetrust-accept-btn-handler').click();
        await this.page.waitForLoadState();
    
        }

async verifyTobiResponseContains(TextString){
await expect(await this.page.locator(("#message-index-")+(this.NText))).toContainText(TextString);
 this.NText++;
}

async customerAsksTobi(AskString){

    await this.textBox.type(AskString);
    await this.sendText.click();
    this.NText++;
    }

    async customerClicksOn(buttonString){
        let button = await this.page.locator();
      button = await this.page.locator("ul >> li >> [type = 'button']  >> text =" + buttonString);
     //await this.button.click()
        await button.click();
        this.NText++;
        }
     
}

module.exports= {Tobi};