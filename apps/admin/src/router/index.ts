import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import DashboardOverviewView from '@/views/DashboardOverviewView.vue';
import LoginView from '@/views/LoginView.vue';
import ModulePlaceholderView from '@/views/ModulePlaceholderView.vue';
import ProductFormPlaceholderView from '@/views/ProductFormPlaceholderView.vue';
import ProductsView from '@/views/ProductsView.vue';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    section?: string;
    activeNav?: string;
    parentRoute?: {
      label: string;
      name: string;
    };
  }
}

const router = createRouter( {
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Entrar'
      }
    },
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardOverviewView,
          meta: { title: 'Visão Geral', section: 'Principal' }
        },
        {
          path: 'produtos',
          name: 'products',
          component: ProductsView,
          meta: { title: 'Produtos', section: 'Catálogo' }
        },
        {
          path: 'produtos/novo',
          name: 'product-create',
          component: ProductFormPlaceholderView,
          meta: {
            title: 'Novo Produto',
            section: 'Catálogo',
            activeNav: 'products',
            parentRoute: { label: 'Produtos', name: 'products' }
          }
        },
        {
          path: 'produtos/:id/editar',
          name: 'product-edit',
          component: ProductFormPlaceholderView,
          meta: {
            title: 'Editar Produto',
            section: 'Catálogo',
            activeNav: 'products',
            parentRoute: { label: 'Produtos', name: 'products' }
          }
        },
        {
          path: 'categorias',
          name: 'categories',
          component: ModulePlaceholderView,
          props: { moduleKey: 'categories' },
          meta: { title: 'Categorias', section: 'Catálogo' }
        },
        {
          path: 'atributos',
          name: 'attributes',
          component: ModulePlaceholderView,
          props: { moduleKey: 'attributes' },
          meta: { title: 'Atributos', section: 'Catálogo' }
        },
        {
          path: 'pedidos',
          name: 'orders',
          component: ModulePlaceholderView,
          props: { moduleKey: 'orders' },
          meta: { title: 'Pedidos', section: 'Comercial' }
        },
        {
          path: 'clientes',
          name: 'clients',
          component: ModulePlaceholderView,
          props: { moduleKey: 'clients' },
          meta: { title: 'Clientes', section: 'Comercial' }
        },
        {
          path: 'cupons',
          name: 'coupons',
          component: ModulePlaceholderView,
          props: { moduleKey: 'coupons' },
          meta: { title: 'Cupons', section: 'Comercial' }
        },
        {
          path: 'relatorios',
          name: 'reports',
          component: ModulePlaceholderView,
          props: { moduleKey: 'reports' },
          meta: { title: 'Relatórios', section: 'Gestão' }
        },
        {
          path: 'configuracoes',
          name: 'settings',
          component: ModulePlaceholderView,
          props: { moduleKey: 'settings' },
          meta: { title: 'Configurações', section: 'Gestão' }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'dashboard' }
    }
  ]
} );

router.afterEach( ( to ) => {
  const pageTitle = typeof to.meta.title === 'string' ? to.meta.title : '';
  document.title = pageTitle ? `${ pageTitle } — Painel Sagrada Família` : 'Painel Sagrada Família';
} );

export default router;
