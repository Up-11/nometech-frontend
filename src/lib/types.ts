import type { ComputedRef, Ref } from 'vue'

export interface IUser {
  id: string | null
  email: string | null
}
export interface IRate {
  id: string
  title: string
  description: string
  price: number
  includes: RateIncludes
  notice: string[]
  typeId: string
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
  _count: {
    rates: number
  }
}
export interface IUserData {
  name: string
  address: string
  phone: string
}
export interface IApplication extends IUserData {
  id: string
  rate: IRate
  createdAt: string
}
export interface IApplicationTable extends IUserData {
  id: string
  rate: Partial<IRate>
  createdAt: string
}

export interface IAuthProvider {
  user: Ref<IUser>
  accessToken: Ref<string | null>
  isLoading: Ref<boolean>
  isLoggedIn: ComputedRef<boolean>
  userId: ComputedRef<string | null>
  setAuthData: (newUser: IUser | null, token: string) => void
  mutateAuthData: (newUserData: IUser) => void
  logout: (cb?: () => void) => void
  initializeAuth: () => boolean
}
