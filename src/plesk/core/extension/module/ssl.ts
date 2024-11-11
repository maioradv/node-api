import { ExtesionModule } from "../model";

export class SslExt extends ExtesionModule {

  async installLetsEncrypt(domainId:number,email:string) {
    const res = await this._form('/modules/sslit/index.php/index/install',{
      validateWww: 'false',
      validateWebMail: 'false',
      validateMail: 'false',
      validateDane: 'false',
      validateWildcard: 'false',
      "productSettings[description]":'',
      "productSettings[registrationEmail]":email,
      id: `${domainId}`,
      vendorId: 'letsencrypt.letsencrypt',
      productId: 'base',
      validateDomain: 'true',
    })
    return res.ok
  }
}