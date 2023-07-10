<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlerPasswordReset">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="password"
          lazy-rules
          :rules="[val => (val && val.length >= 6) || 'Password is required and greater than or equal to 6 characters']"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send new Password"
            color="primary"
            class="full-width"
            outline
            rounded
            size="md"
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageResetPassword',
  setup () {
    const { resetPassword } = useAuthUser()
    const { notifySuccess, notifyError } = useNotify()
    const router = useRouter()

    const password = ref('')

    const handlerPasswordReset = async () => {
      try {
        await resetPassword(password.value)
        notifySuccess('New send password')
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      handlerPasswordReset,
      password
    }
  }
})
</script>
