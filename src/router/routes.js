const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'loginDefault', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', name: 'register', component: () => import('pages/Register.vue') },
      { path: 'email-confirmation', name: 'email-confirmation', component: () => import('pages/EmailConfirmation.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/ResetPassword.vue') },
      { path: 'product-public/:id', name: 'product-public', component: () => import('src/pages/products/Public.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'me', name: 'me', component: () => import('pages/Me.vue') },
      { path: 'category', name: 'category', component: () => import('src/pages/category/ListCategory.vue') },
      { path: 'form-category/:id?', name: 'form-category', component: () => import('src/pages/category/FormCategory.vue') },
      { path: 'product', name: 'product', component: () => import('src/pages/products/ListProducts.vue') },
      { path: 'form-product/:id?', name: 'form-product', component: () => import('src/pages/products/FormProduct.vue') },
      { path: 'form-config/:id?', name: 'form-config', component: () => import('src/pages/config/FormConfig.vue') }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
