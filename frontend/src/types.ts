export interface IRate {
  id: string
  title: string
  description: string
  price: number
  includes: RateIncludes
  notice: string[]
  type: IRateType
}
export type RateIncludes = {
  speedInMbs: number
  mobile?: {
    amountGb: number
    sms: number
    minutes: number
  }
}
export interface IRateType {
  id: string
  title: string
  description: string
}
export interface IUserData {
  name: string
  address: string
  phone: string
}
export interface IApplication {
  id: string
  rate: IRate
  userData: IUserData
  createdAt: string
}
export interface IApplicationTable {
  id: string
  rate: Partial<IRate>
  userData: IUserData
  createdAt: string
}
