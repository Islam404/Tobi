
class APiUtils
{
constructor(request){
this.request = request
let ID;
this.ID = ID;

}

    async  getInboxListIds()
     {  
        const ListResponse =  await  this.request.get("https://getnada.com/api/v1/inboxes/tobitesting@getnada.com",
        {
        } );
        const JsonListResponse = await ListResponse.json();
        this.ID = JsonListResponse.msgs[0].uid;  
     return this.ID;
     
    }

    

    async GetOTP()
   {  
      await this.getInboxListIds();
 
      const MsgResponse =  await  this.request.get("https://getnada.com/api/v1/messages/html/"+this.ID,
      {
      } );
      const TxtMsgResponse = await MsgResponse.text();
      let OTP = TxtMsgResponse.substr(229,5);
      console.log("OTP is "+ OTP);
      let firstL = OTP[0];
      let secondL = OTP[1];
      let thirdL = OTP[2];
      let fourthL = OTP[3];
      let fifthL = OTP[4];
    return OTP;
   }



}

module.exports= {APiUtils};
