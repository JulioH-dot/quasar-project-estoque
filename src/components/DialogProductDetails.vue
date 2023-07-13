<template>
  <q-dialog
    :full-width="$q.platform.is.mobile"
    :model-value="show"
    @before-hide="handleClose"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Details
        </div>
      </q-card-section>
      <q-card-section v-if="product.img_url">
         <q-img :src="product.img_url" :ratio="4/3" style="min-width: 400px" />
      </q-card-section>
      <q-card-section>
        <div class="text-h6">
          {{ product.name }}
        </div>
        <div class="text-subtitle2">
          {{ formatCurrency(product.price) }}
        </div>
        <div class="text-body2" v-html="product.description"></div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" outline v-close-popup />
        <q-btn
          v-if="brand.phone"
          label="Buy on Whatsapp"
          icon="mdi-whatsapp"
          color="green-7"
          @click="handleSendWhatsapp"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { openURL } from 'quasar'
import { formatCurrency } from 'src/utils/Format'
import useApi from 'src/composables/useApi'

export default defineComponent({
  name: 'DialogProductDetails',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const msg = 'Olá fiquei insteressado pelo produto: '
    const { brand } = useApi()

    const handleClose = () => {
      emit('hideDialog')
    }

    const handleSendWhatsapp = () => {
      const link = encodeURI(`https://api.whatsapp.com/send?phone=55${brand.value.phone}&text=${msg} - ${props.product.name} - ${formatCurrency(props.product.price)}`)
      openURL(link)
    }

    return {
      formatCurrency,
      handleSendWhatsapp,
      handleClose,
      brand
    }
  }
})
</script>
