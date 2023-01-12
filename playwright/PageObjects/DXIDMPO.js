const {test, expect} = require('@playwright/test');
const {Tobi} = require('./Tobi');
const {APiUtils} = require('../util/APiUtils');



    
class DXIDMPO extends Tobi
{
    
    constructor(page,request){
        super(page);
        const OTP = new APiUtils(request);
        this.OTP=OTP; 
        this.NText=this.NText;
        this.DXIDMframe= this.page.frameLocator("[title='login']");
        this.phoneNumber= this.DXIDMframe.locator("#phonenumber");
        this.DXIDMcontinue= this.DXIDMframe.locator("[aria-label='Continue']");
        
    }
print(){

    console.log("print");
}

  async   DXIDMaLO2Login(number){
   
   await this.verifyTobiResponseContains("To make sure I can give you the right information, could you provide your phone number so I can identify what type of account you have with us?");
  await this.customerAsksTobi(number);
  await this.verifyTobiResponseContains("So that I can help you with your bill details, I'll need to do some quick security checks to help keep your account secure. Would you like to continue?");
  await this.customerClicksOn("Yes");
  await this.verifyTobiResponseContains("For this security check, I'll need to take your phone number to send you a security code by text. I'll launch a secure pop-up for you to enter your number now.");
  await this.phoneNumber.fill(number);
  await this.DXIDMcontinue.click();
  await this.sleep(5000);

  let otpNumber = await this.OTP.GetOTP();
  for (let index = 0; index < otpNumber.length; index++) {
  await this.DXIDMframe.locator('#submit-otp-'+index).fill(otpNumber[index]);
    }

await this.DXIDMcontinue.click();
await this.verifyTobiResponseContains("Thanks, that's the security part completed.");
  }
  



}


module.exports= {DXIDMPO};