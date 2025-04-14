import { AuthService } from '@/api/auth/auth.service'
import { initialUser } from '@/lib/data'
import type { IUser } from '@/lib/types'
import Cookies from 'js-cookie'
import { computed, ref } from 'vue'

export const useAuth = () => {
  const user = ref<IUser>(initialUser)
  const accessToken = ref<string | null>(null)
  const isLoading = ref<boolean>(true)

  const isLoggedIn = computed(() => user.value.id !== null)

  const userId = computed(() => user.value.id)

  const setAuthData = (newUser: IUser | null, token: string) => {
    user.value = newUser === null ? initialUser : newUser
    accessToken.value = token

    if (newUser && token) {
      Cookies.set('accessToken', token)
      localStorage.setItem('user', JSON.stringify(newUser))
    } else {
      Cookies.remove('accessToken')
      localStorage.removeItem('user')
    }
  }
  const mutateAuthData = (newUserData: IUser) => {
    user.value = newUserData
    localStorage.setItem('user', JSON.stringify(newUserData))
  }

  const logout = (cb?: () => void) => {
    AuthService.logout()
    setAuthData(initialUser, '')
    cb?.()
  }
  const initializeAuth = () => {
    const token = Cookies.get('accessToken')
    const storedUser = localStorage.getItem('user')

    if (token && storedUser) {
      const NewUser = JSON.parse(storedUser)
      setAuthData(NewUser, token)
      return true
    } else {
      logout()
      return false
    }
  }

  return {
    user,
    accessToken,
    isLoading,
    isLoggedIn,
    userId,
    setAuthData,
    mutateAuthData,
    logout,
    initializeAuth,
  }
}
