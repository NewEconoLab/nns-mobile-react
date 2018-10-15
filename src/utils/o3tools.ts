import common from '@/store/common'
export class O3Tool {
  public signData: string // 待签名数据
  public signcall: (response: any) => {} // 签名委托

  /**
   * O3签名方法
   * @param data 待签名数据
   * @param call 接受签名数据的回调
   */
  public sign(data: string, call: (response: any) => {}) {
    this.signcall = call
    o3.requestToSignRawTransaction(data)
  }

  /**
   * 初始化 O3 SDK
   */
  public init(call: (connect: boolean) => {}) {
    o3.init(response => {
      if (response == null) {
        throw new Error('response is undefined')
      } else {
        alert(JSON.stringify(response))
        switch (response.command) {
          case 'init':
            o3.requestToConnect()
            break
          case 'requestToConnect':
            o3.getAccounts()
            break
          case 'getAccounts':
            common.address = response.data.accounts[0].neo.address
            common.publicKey = response.data.accounts[0].neo.publicKey
            call(true)
            break
          case 'requestToSign':
            this.signcall(response.data)
            break
          default:
            break
        }
      }
      return true
    })
  }

  /**
   * 回调
   * @param response 接受o3的返回值
   */
  public callback(response) {
    console.log('response :' + response)
  }
}

export default new O3Tool()
