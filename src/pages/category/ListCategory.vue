<template>
  <q-page padding>
    <div class="row">
      <q-table
        title="Treats"
        :rows="categories"
        :columns="columnsCategory"
        row-key="id"
        class="col-12"
        :loading="loading"
      >
        <template v-slot:top>
          <span class="text-h6">
            Category
          </span>
          <q-space/>
          <q-btn
            v-if="$q.platform.is.desktop"
            dense
            color="primary"
            icon="mdi-plus"
            :to="{ name: 'form-category' }"
          >
            <q-tooltip>
              Add New
            </q-tooltip>
          </q-btn>
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
            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveCategory(props.row)">
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
        :to="{ name: 'form-category' }"
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
import useApi from 'src/composables/useApi'
import useNotify from 'src/composables/UseNotify'
import { useQuasar } from 'quasar'
import { columnsCategory } from './table'

export default defineComponent({
  name: 'PageCategoryList',
  setup () {
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const $q = useQuasar()

    const table = 'category'
    const loading = ref(true)
    const categories = ref([])

    const handlerListCategories = async () => {
      try {
        loading.value = true
        categories.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleRemoveCategory = async (category) => {
      try {
        $q.dialog({
          title: 'Confirm',
          message: `Do you really delete ${category.name}`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, category.id)
          notifySuccess('Successfully deleted')
          handlerListCategories()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (category) => {
      router.push({ name: 'form-category', params: { id: category.id } })
    }

    onMounted(() => {
      handlerListCategories()
    })

    return {
      columnsCategory,
      categories,
      loading,
      handleEdit,
      handleRemoveCategory,
      rows
    }
  }
})
</script>
