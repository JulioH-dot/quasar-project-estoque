<template>
  <q-page padding>
   <p class="text-body1">Thanks for Register</p>
   <p class="text-body1">Please confirm your email to finish registering: <strong>{{ $route.query.email }}</strong></p>
   <div class="row justify-center">
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
      <q-btn
      label="Back to login"
      color="dark"
      class="full-width"
      :to="{ name: 'login' }"
    />
    </div>
   </div>
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
