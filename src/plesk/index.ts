import { PleskApiClient } from "./client";
import { ApiConfigs } from "./config";

export { PleskApiClient }
export type PleskApiConfigs = ApiConfigs

export * from './types'
export * from './error'
export * from './git/types'

export function pleskApiClient(opt:PleskApiConfigs): PleskApiClient {
  return new PleskApiClient(opt)
}