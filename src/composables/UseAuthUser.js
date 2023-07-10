import { ref } from 'vue'
import useSupabase from 'src/boot/supabase'

const user = ref(null)

export default function useAuthUser () {
  const { supabase } = useSupabase()

  const login = async (emailUser, passwordUser) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email: emailUser,
      password: passwordUser
    })
    if (error) throw error

    return user
  }

  const loginWithSocialProvider = async (providerUser) => {
    const { user, error } = await supabase.auth.signInWithOAuth({ provider: providerUser })
    if (error) throw error
    return user
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const isLoggedIn = () => {
    return !!user.value
  }

  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: meta,
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
      }
    )
    if (error) throw error
    return user
  }

  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data)
    if (error) throw error
    return user
  }

  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })
    if (error) throw error
    return user
  }

  const resetPassword = async (newPassword) => {
    const { user, error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
    return user
  }

  return {
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword,
    user
  }
}
