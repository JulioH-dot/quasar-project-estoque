<template>
    <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlerForgotPassword">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="email"
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
          <q-btn
            label="Back"
            color="dark"
            class="full-width"
            rounded
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  setup () {
    const { sendPasswordRestEmail } = useAuthUser()

    const email = ref('')

    const handlerForgotPassword = async () => {
      await sendPasswordRestEmail(email.value)
      alert(`Password reset send to: ${email.value}`)
    }

    return {
      email,
      handlerForgotPassword
    }
  }
})
</script>
