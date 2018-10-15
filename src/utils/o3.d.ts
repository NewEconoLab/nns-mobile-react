declare namespace o3 
{
    function callback(response:type):void;
    function init(callback:(response:any)=>{}):void;
    function getDeviceInfo():void;
    function requestToConnect():void;
    function getPlatform():void;
    function getAccounts():void;
    function isAppAvailable():void;
    function getBalances():void;
    function requestToSend():void;
    function verifySession(sessionID:string):void;
    function requestToSignRawTransaction(unsignedRawTransaction:string):void;
}