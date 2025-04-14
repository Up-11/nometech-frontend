import type { InjectionKey, Ref } from 'vue'
import type { IAuthProvider, IRateType } from './types'

export const authKey = Symbol() as InjectionKey<IAuthProvider>

export const typesKey = Symbol() as InjectionKey<Ref<IRateType[]>>
