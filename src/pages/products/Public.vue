<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Treats"
        grid
        :rows="products"
        :columns="columnsProducts"
        row-key="id"
        class="col-12"
        :loading="loading"
        :filter="filter"
      >
        <template v-slot:top>
          <span class="text-h6">
            Products
          </span>
          <q-space/>
          <q-input outlined dense v-model="filter" placeholder="Search" class="q-mr-sm">
            <template v-slot:append>
              <q-icon name="mdi-magnify"/>
            </template>
          </q-input>
        </template>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card class="cursor-pointer" v-ripple:purple @click="handleShowDetails(props.row)">
              <q-img :src="props.row.img_url" :retio="4/3" />
              <q-card-section class="text-center">
                <div class="text-h6">{{ props.row.name }}</div>
                <div class="text-subtitle2">{{ formatCurrency(props.row.price) }}</div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
    <dialog-product-details
      :show="showDialogDetails"
      :product="productDetails"
      @hide-dialog="showDialogDetails = false"
    />
  </q-page>
</template>

<script>
const rows = [
  {
    id: 159,
    name: 'Tenis'
  }
]
import { defineComponent, ref, onMounted } from 'vue'
import { columnsProducts } from './table'
import { useRoute } from 'vue-router'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/UseNotify'
import { formatCurrency } from 'src/utils/Format'
import DialogProductDetails from 'components/DialogProductDetails.vue'

export default defineComponent({
  name: 'PageProductsPublic',
  components: {
    DialogProductDetails
  },
  setup () {
    const { listPublic } = useApi()
    const { notifyError } = useNotify()
    const route = useRoute()

    const filter = ref('')
    const table = 'product'
    const loading = ref(true)
    const products = ref([])

    const showDialogDetails = ref(false)
    const productDetails = ref({})

    const handleShowDetails = (product) => {
      productDetails.value = product

      showDialogDetails.value = true
    }

    const handlerListProducts = async (userId) => {
      try {
        loading.value = true
        products.value = await listPublic(table, userId)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      if (route.params.id) {
        handlerListProducts(route.params.id)
      }
    })

    return {
      columnsProducts,
      products,
      loading,
      filter,
      formatCurrency,
      showDialogDetails,
      handleShowDetails,
      productDetails,
      rows
    }
  }
})
</script>
