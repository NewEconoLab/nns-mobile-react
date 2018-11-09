/*!
* O3 DApp JavaScript SDK
* Version: 0.0.1
* Created: Friday June 29 2018.
* https://o3.network
*
* Copyright 2018 O3 Labs, Inc.
* The O3 DApp JavaScript SDK is freely distributable under the MIT license.
*
*/
let callbackHandler = null
const _sendMessage = function(command, data) {
  var message = {
    command: command,
    data: data
  }
  if (typeof window.O3AndroidInterface !== 'undefined') {
    window.O3AndroidInterface.messageHandler(JSON.stringify(message))
  } else {
    try {
      window.webkit.messageHandlers.sendMessageHandler.postMessage(message)
    } catch (err) {
      o3.callback(null)
    }
  }
}
const o3 = {
  init: function(callback) {
    callbackHandler = callback
    _sendMessage('init')
  },

  //This is the method that both iOS and Android will call after the operation finished.
  callback: function(response) {
    callbackHandler(response)
  },

  getDeviceInfo: function() {
    _sendMessage('getDeviceInfo')
  },

  requestToConnect: function() {
    _sendMessage('requestToConnect', window.location.href)
  },

  getPlatform: function() {
    _sendMessage('getPlatform')
  },

  getAccounts: function() {
    _sendMessage('getAccounts')
  },

  isAppAvailable: function() {
    _sendMessage('isAppAvailable')
  },

  getBalances: function() {
    _sendMessage('getBalances')
  },
  //TODO finish this
  requestToSend: function() {},

  verifySession: function(sessionID) {
    _sendMessage('verifySession', sessionID)
  },

  requestToSignRawTransaction: function(unsignedRawTransaction) {
    _sendMessage('requestToSign', unsignedRawTransaction)
  }
}
window.o3 = o3
window.o3.VERSION = '0.0.1'
