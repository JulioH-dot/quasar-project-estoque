<template>
  <q-page padding>
    <div class="row justify-center">
     <div class="col-12 text-center">
      <p class="text-h6">
        Form Products
      </p>
     </div>
     <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-input
        label="Name"
        v-model="form.name"
        :rules="[val => (val && val.length > 0) || 'Name is required']"
      />
      <q-editor
        v-model="form.description"
        min-height="5rem"
      />
      <q-input
        label="Image"
        stack-label
        v-model="img"
        type="file"
        accept="image/*"
      />
      <q-input
        label="Amount"
        v-model="form.amount"
        :rules="[val => !!val || 'Amount is required']"
        type="number"
      />
      <q-input
        label="Price"
        v-model="form.price"
        lazy-rules
        :rules="[val => !!val || 'Price is required']"
        prefix="R$"
      />
      <q-select
        v-model="form.category_id"
        :options="optionsCategory"
        label="Category"
        option-value="id"
        option-label="name"
        map-options
        emit-value
        :rules="[val => !!val || 'Category is required']"
      />
      <q-btn
        :label="isUpdate ? 'Update' : 'Save'"
        color="primary"
        class="full-width"
        rounded
        dense
        type="submit"
      />
      <q-btn
        label="Cancel"
        color="dark"
        class="full-width"
        rounded
        flat
        :to="{ name: 'product' }"
      />
     </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'PageFormProducts',

  setup () {
    const table = 'product'
    const router = useRouter()
    const { post, getById, update, list, uploadImg } = useApi()
    const route = useRoute()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdate = computed(() => route.params.id)

    let products = {}
    const optionsCategory = ref([])
    const img = ref([])

    onMounted(() => {
      handleListCategory()
      if (isUpdate.value) {
        handleGetProducts(isUpdate.value)
      }
    })

    const form = ref({
      name: '',
      description: '',
      amount: 0,
      price: 0,
      category_id: '',
      img_url: ''
    })

    const handleListCategory = async () => {
      optionsCategory.value = await list('category')
    }

    const handleSubmit = async () => {
      try {
        if (img.value.length > 0) {
          const imgUrl = await uploadImg(img.value[0], 'bucket-my-product')
          form.value.img_url = imgUrl
        }
        if (isUpdate.value) {
          await update(table, {
            ...form.value
          })

          notifySuccess('Update Successfully')
        } else {
          await post(table, form.value)
          notifySuccess('Saved Successfully')
        }

        router.push({ name: 'product' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetProducts = async (id) => {
      try {
        products = await getById(table, id)
        form.value = products
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      handleSubmit,
      isUpdate,
      optionsCategory,
      img,
      form
    }
  }
})
</script>
