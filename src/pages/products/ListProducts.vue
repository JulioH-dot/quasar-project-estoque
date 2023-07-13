<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Treats"
        :rows="products"
        :columns="columnsProducts"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">
            Products
          </span>
          <q-btn
            label="My Store"
            dense
            size="sm"
            class="q-ml-sm"
            icon="mdi-store"
            color="primary"
            @click="handleGoToStore"
          />
          <q-btn
            label="Copy Link"
            dense
            size="sm"
            class="q-ml-sm"
            icon="mdi-content-copy"
            color="primary"
            @click="handleCopyPublicUrl"
          />
          <q-space/>
          <q-btn
            v-if="$q.platform.is.desktop"
            dense
            color="primary"
            icon="mdi-plus"
            :to="{ name: 'form-product' }"
          >
            <q-tooltip>
              Add New
            </q-tooltip>
          </q-btn>
        </template>
        <template v-slot:body-cell-img_url="props">
          <q-td :props="props">
            <q-avatar v-if="props.row.img_url">
              <img :src="props.row.img_url">
            </q-avatar>
            <q-avatar v-else color="grey" text-color="white" icon="mdi-image-off" />
          </q-td>
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn
              icon="mdi-pencil-outline"
              color="info"
              dense
              size="sm"
              @click="handleEdit(props.row)"
            >
              <q-tooltip>
                Edit
              </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveProducts(props.row)">
              <q-tooltip>
                Delete
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
      v-if="$q.platform.is.mobile"
        fab
        icon="mdi-plus"
        color="primary"
        :to="{ name: 'form-product' }"
      />
    </q-page-sticky>
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
import { useRouter } from 'vue-router'
import { useQuasar, openURL, copyToClipboard } from 'quasar'
import { columnsProducts } from './table'
import useAuthUser from 'src/composables/UseAuthUser'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageProductsList',
  setup () {
    const { listPublic, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const $q = useQuasar()

    const { user } = useAuthUser()

    const table = 'product'
    const loading = ref(true)
    const products = ref([])

    const handlerListProducts = async () => {
      try {
        loading.value = true
        products.value = await listPublic(table, user.value.id)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGoToStore = () => {
      const idUser = user.value.id
      const link = router.resolve({ name: 'product-public', params: { id: idUser } })
      // router.push({ name: 'product-public', params: { id: idUser } })
      openURL(window.origin + link.href)
    }

    const handleCopyPublicUrl = () => {
      const idUser = user.value.id
      const link = router.resolve({ name: 'product-public', params: { id: idUser } })
      const externalLink = window.origin + link.href
      copyToClipboard(externalLink)
        .then(() => {
          notifySuccess('Successfully copied')
        })
        .catch(() => {
          notifyError('Error copied link')
        })
    }

    const handleRemoveProducts = async (products) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `Do you really delete ${products.name}`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, products.id)
          notifySuccess('Successfully deleted')
          handlerListProducts()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (products) => {
      router.push({ name: 'form-product', params: { id: products.id } })
    }

    onMounted(() => {
      console.log('user', user)
      handlerListProducts()
    })

    return {
      columnsProducts,
      products,
      loading,
      handleEdit,
      handleRemoveProducts,
      handleCopyPublicUrl,
      handleGoToStore,
      rows
    }
  }
})
</script>
