import CategoryBreadcrumb from '../Breadcrumbs/CategoryBreadcrumb';
import ProductPageBreadcrumb from '../Breadcrumbs/ProductPageBreadcrumb';

const customRoutes = [
  { path: '/categories/:categoryId', breadcrumb: CategoryBreadcrumb } as object,
  { path: '/categories/:categoryId/:productId', breadcrumb: ProductPageBreadcrumb } as object,
  { path: '/catalog/:productId', breadcrumb: ProductPageBreadcrumb } as object,
];

export default customRoutes;
