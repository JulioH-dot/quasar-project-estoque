<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlerRegister">
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Nome"
          v-model="form.name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Name is required']"
        />
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Email is required']"
          type="email"
        />
        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules
          :rules="[val => (val && val.length >= 6) || 'Password is required and greater than or equal to 6 characters']"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            outline
            rounded
            size="lg"
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
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageRegister',
  setup () {
    const router = useRouter()
    const { register } = useAuthUser()
    const { notifySuccess, notifyError } = useNotify()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handlerRegister = async () => {
      try {
        await register(form.value)
        notifySuccess('Register successfully')
        router.push({
          name: 'email-confirmation',
          query: {
            email: form.value.email
          }
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handlerRegister
    }
  }
})
</script>
