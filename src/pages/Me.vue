<template>
  <q-page class="flex flex-center">
   <div v-if="user" @click="verify">
      <p>Hello {{ userApresent }} !!</p>
   </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'PageMe',
  setup () {
    const { user } = useAuthUser()

    const userApresent = user._rawValue.email

    return {
      user,
      userApresent
    }
  }
})
</script>
