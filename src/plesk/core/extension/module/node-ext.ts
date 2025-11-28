import { ExtesionModule } from "../model";

export class NodeExt extends ExtesionModule {

  async enableDomain(domainId:number,enabled:boolean) {
    const res = await this._post('/modules/nodejs/index.php/api/enable-domain',{
      domainId,
      enabled,
    })
    return res.ok
  }

  async restartDomain(domainId:number) {
    const res = await this._post('/modules/nodejs/index.php/api/restart-domain',{
      domainId,
    })
    return res.ok
  }

  async changeVersion(domainId:number,version:string|number) {
    const res = await this._post('/modules/nodejs/index.php/api/change-version',{
      domainId,
      handlerId:`/opt/plesk/node/${version}/bin/node` // /opt/plesk/node/22/bin/node
    })
    return res.ok
  }

  async changeApplicationPackageManager(domainId:number,pkgManager:'yarn'|'npm') {
    const res = await this._post('/modules/nodejs/index.php/api/change-package-manager',{
      domainId,
      pkgManager,
    })
    return res.ok
  }

  async changeApplicationDocumentRoot(domainId:number,path:string) {
    const res = await this._post('/modules/nodejs/index.php/api/change-document-root',{
      domainId,
      path,
    })
    return res.ok
  }

  async changeApplicationMode(domainId:number,mode:'production'|'development') {
    const res = await this._post('/modules/nodejs/index.php/api/change-application-mode',{
      domainId,
      mode,
    })
    return res.ok
  }

  async changeApplicationPath(domainId:number,path:string) {
    const res = await this._post('/modules/nodejs/index.php/api/change-application-path',{
      domainId,
      path,
    })
    return res.ok
  }

  async changeApplicationStartupFile(domainId:number,startupFile:string) {
    const res = await this._post('/modules/nodejs/index.php/api/change-application-startup-file',{
      domainId,
      startupFile,
    })
    return res.ok
  }
}