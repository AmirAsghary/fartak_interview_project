const routes = [
  {
    path: '/',
    component: () => import('layouts/DesktopLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'post/:postID', component: () => import('pages/PostView.vue'), props: true }
    ]
  },

  {
    path: '/mobile',
    component: () => import('layouts/MobileLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'post/:postID', component: () => import('pages/PostView.vue'), props: true }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
