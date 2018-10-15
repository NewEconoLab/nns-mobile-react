import common from "@/store/common";
export class O3Tool
{
    public static signcall: any;

    /**
     * 初始化 O3 SDK
     */
    public static init()
    {        
        o3.init(response => this.callbackHandler2(response))
    }

    /**
     * sign
     */
    // tslint:disable-next-line:member-ordering
    public static sign(call) {
        this.signcall = call;
        o3.requestToSignRawTransaction(
            "8000000001e72d286979ee6cb1b7e65dfddfb2e384100b8d148e7758de42e4168b71792c6040420f0000000000fa24cb94ad5c416c95e2fb94d6556db7683426ac"
        )
    }
    
  public static callbackHandler2(response) {
    if (response == null) {
        alert("无数据")
        return false;
    } else {
      if (response.command === 'init') {
        o3.requestToConnect()
      } else if (response.command === 'requestToConnect') {
        o3.getAccounts()
      } else if (response.command === 'getAccounts') {
        common.address = response.data.accounts[0].neo.address;
        common.publicKey = response.data.accounts[0].neo.publicKey;
        common.getregisteraddressbalance();
        common.getnep5balanceofaddress();
        this.sign(data=>{alert(data)});
      } else if (response.command === 'requestToSign') {
        if (!response.data) {
          return false
        }else{
            alert(response.data.signatureData);
            this.signcall(response.data.signatureData);
        }

      }
      return true;
    }
  }

}