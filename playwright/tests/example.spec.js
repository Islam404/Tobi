// @ts-check
const { test, expect,request } = require('@playwright/test');
const {ContactUs} = require('../PageObjects/ContactUs');
const {Tobi} = require('../PageObjects/Tobi');
const {DXIDMPO} = require('../PageObjects/DXIDMPO');
const {APiUtils} = require('../util/APiUtils');
let webContext;

test('URL Check', async ({context}) => {
  let page = await context.newPage();
  const tobi = new Tobi(page);
 // const DXIDM = new DXIDMPO();
  await tobi.acceptPageCookies();
  await tobi.verifyTobiResponseContains(
    "I’m TOBi - Vodafone’s chatbotAsk me anything, I’m here to help"
  );
  await tobi.customerAsksTobi ("hi");
  await tobi.verifyTobiResponseContains("Hello! I’m here to answer questions about Vodafone. Just tell me in a few words what you need help with");
  await tobi.customerAsksTobi ("i want to ask about new offer");
  await tobi.verifyTobiResponseContains('Moving your mobile service to Vodafone is easy. You just need to give us the right code from your current mobile network provider:PAC: Give us this if you want to bring your current mobile number with you to Vodafone.STAC: Give us this if you want us to give you a new mobile number when you join.Where do I get a PAC or STAC? You need to ask the mobile provider you’re leaving to give you one. When do I give my PAC or STAC to Vodafone? You can give us your PAC or STAC when you’re buying a new phone or SIM only plan with us. Before you check out, you should notice the option which says ‘joining us from another network’ in your basket.Alternatively, if you’ve already bought your phone and/or plan from us, you can use our Keep my number hubOnce the mobile provider you’re leaving has given you your PAC or STAC, it’ll be valid for 30 days.What if I’m joining as a business customer? Small business customers can join in the same way as above.If you’re joining us as a business customer with more than 10 employees, things work a little differently – so we need you to contact your Account Manager. Or, if you have a Vodafone Corporate Online (VCO) account, order as usual and enter your code when prompted.');
  await tobi.verifyURLis(context,'https://www.vodafone.co.uk/my-vodafone-account/keep-my-number',"keep my number");
  await tobi.verifyURLis(context,new RegExp('^https://www.vcol.co.uk'),"Vodafone Corporate Online (VCO)"); //I use reg exp as title keep change
});


test('View-Bills DXIDM Check', async ({page,context,request}) => {

  //const tobi = new Tobi(page);
  const DXIDM = new DXIDMPO(page,request);
 // DXIDM.print();
  await DXIDM.acceptPageCookies();
  await DXIDM.verifyTobiResponseContains(
    "I’m TOBi - Vodafone’s chatbotAsk me anything, I’m here to help"
  );
  await DXIDM.customerAsksTobi ("hi");
  await DXIDM.verifyTobiResponseContains("Hello! I’m here to answer questions about Vodafone. Just tell me in a few words what you need help with");
  await DXIDM.customerAsksTobi ("View my bills"); 
  await DXIDM.DXIDMaLO2Login("07392634751");
  await DXIDM.verifyTobiResponseContains("Let me fetch your billing details.");
  await DXIDM.verifyTobiResponseContains("The current balance on your PAYG account is ");

});




test('API', async ({request}) => {
const getNada = new APiUtils(request);
await getNada.GetOTP();
});


