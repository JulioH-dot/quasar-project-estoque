<template>
  <q-page padding>
   <p class="text-body1">Thanks for Register</p>
   <p class="text-body1">Please confirm your email to finish registering: <strong>{{ $route.query.email }}</strong></p>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmailConfirmation',
  setup () {
    return {

    }
  }
})
</script>
