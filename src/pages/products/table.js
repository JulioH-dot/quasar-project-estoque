import { formatCurrency } from 'src/utils/Format'

const columnsProducts = [
  { name: 'img_url', align: 'left', label: 'Image', field: 'img_url', sortable: false },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: true },
  { name: 'price', align: 'left', label: 'Price', field: 'price', format: (val) => formatCurrency(val), sortable: true },
  { name: 'actions', align: 'right', label: 'Actions', field: 'action', sortable: false }
]

export {
  columnsProducts
}
