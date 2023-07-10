<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlerPasswordReset">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="password"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send reset email"
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageResetPassword',
  setup () {
    const { resetPassword } = useAuthUser()

    const router = useRouter()

    const password = ref('')

    const handlerPasswordReset = async () => {
      await resetPassword(password.value)
      router.push({ name: 'login' })
    }

    return {
      handlerPasswordReset,
      password
    }
  }
})
</script>
