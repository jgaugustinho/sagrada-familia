import { allDevotionOptions, catalogCategories, devotionCategory, getCategoryBySlug, mixedCollections, type CatalogOption } from '@/data/categories';
import { catalogProducts, type CatalogProduct } from '@/data/products';

export type CatalogFilterOption = CatalogOption;
export type { CatalogProduct };

export interface CatalogAttributeGroup {
  id: string;
  title: string;
  display: 'checkbox' | 'pill';
  options: CatalogFilterOption[];
}

export interface CatalogBreadcrumbItem {
  label: string;
  to?: string;
}

export interface CatalogContext {
  mode: 'single' | 'mixed';
  slug: string;
  subslug?: string;
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbTrail: CatalogBreadcrumbItem[];
  primaryFilterTitle: string;
  primaryFilterOptions: CatalogFilterOption[];
  attributeGroups: CatalogAttributeGroup[];
  showDevotionFilter: boolean;
  devotionOptions: CatalogFilterOption[];
  initialPrimarySelection: string[];
  initialAttributeSelections: Record<string, string[]>;
  initialDevotionSelection: string[];
  products: CatalogProduct[];
}

const allCategoryFilterOptions: CatalogFilterOption[] = catalogCategories.map( ( cat ) => ( {
  slug: cat.slug,
  label: cat.label
} ) );

const filterMixedCollection = ( slug: string, items: CatalogProduct[] ): CatalogProduct[] => {
  switch ( slug ) {
    case 'promocoes':
      return items.filter( ( item ) => item.originalPrice !== undefined && item.originalPrice > item.price );
    case 'mais-vendidos':
      return [ ...items ].sort( ( a, b ) => a.salesRank - b.salesRank ).slice( 0, 36 );
    case 'lancamentos':
      return items.filter( ( item ) => item.isNew );
    case 'natal-2026':
      return items.filter( ( item ) => item.isSeasonalNatal );
    default:
      return items;
  }
};

export const getCatalogContext = ( slug: string, subslug?: string ): CatalogContext => {
  const category = getCategoryBySlug( slug );

  if ( category ) {
    const primaryFilterOptions = category.subCategories;
    const attributeGroups: CatalogAttributeGroup[] = category.attributeGroups.map( ( group ) => ( {
      id: group.id,
      title: group.title,
      display: group.display,
      options: group.options
    } ) );
    const products = catalogProducts.filter( ( item ) => item.categorySlug === slug );

    const initialPrimarySelection: string[] = [];
    const initialAttributeSelections: Record<string, string[]> = {};
    let subLabel: string | undefined;

    if ( subslug ) {
      const matchedSub = primaryFilterOptions.find( ( opt ) => opt.slug === subslug );
      if ( matchedSub ) {
        initialPrimarySelection.push( matchedSub.slug );
        subLabel = matchedSub.label;
      } else {
        for ( const group of attributeGroups ) {
          const matchedAttr = group.options.find( ( opt ) => opt.slug === subslug );
          if ( matchedAttr ) {
            initialAttributeSelections[ group.id ] = [ matchedAttr.slug ];
            subLabel = matchedAttr.label;
            break;
          }
        }
      }
    }

    const breadcrumbTrail: CatalogBreadcrumbItem[] = [
      { label: 'Início', to: '/' },
      { label: category.label, to: subLabel ? `/c/${ category.slug }` : undefined }
    ];

    if ( subLabel ) {
      breadcrumbTrail.push( { label: subLabel } );
    }

    return {
      mode: 'single',
      slug,
      subslug,
      eyebrow: category.eyebrow,
      title: subLabel ? `${ category.label }: ${ subLabel }` : category.label,
      description: category.description,
      breadcrumbTrail,
      primaryFilterTitle: 'Subcategorias',
      primaryFilterOptions,
      attributeGroups,
      showDevotionFilter: false,
      devotionOptions: [],
      initialPrimarySelection,
      initialAttributeSelections,
      initialDevotionSelection: [],
      products
    };
  }

  if ( slug === devotionCategory.slug ) {
    const matchedDevotion = subslug
      ? allDevotionOptions.find( ( opt ) => opt.slug === subslug )
      : undefined;

    const products = matchedDevotion
      ? catalogProducts.filter( ( item ) => item.devotionSlug === matchedDevotion.slug )
      : catalogProducts;

    const categorySlugsInPool = new Set( products.map( ( item ) => item.categorySlug ) );
    const availableCategories = allCategoryFilterOptions.filter( ( opt ) => categorySlugsInPool.has( opt.slug ) );

    const breadcrumbTrail: CatalogBreadcrumbItem[] = [
      { label: 'Início', to: '/' },
      { label: devotionCategory.label, to: matchedDevotion ? `/c/${ devotionCategory.slug }` : undefined }
    ];

    if ( matchedDevotion ) {
      breadcrumbTrail.push( { label: matchedDevotion.label } );
    }

    return {
      mode: 'mixed',
      slug,
      subslug,
      eyebrow: 'Fé & Intercessão',
      title: matchedDevotion ? matchedDevotion.label : devotionCategory.label,
      description: matchedDevotion
        ? `Imagens, terços, velas e artigos sacros dedicados à devoção a ${ matchedDevotion.label }.`
        : 'Escolha pela sua devoção e encontre imagens, terços, livros e velas de diversos santos e títulos marianos.',
      breadcrumbTrail,
      primaryFilterTitle: 'Categorias',
      primaryFilterOptions: availableCategories,
      attributeGroups: [],
      showDevotionFilter: !matchedDevotion,
      devotionOptions: allDevotionOptions,
      initialPrimarySelection: [],
      initialAttributeSelections: {},
      initialDevotionSelection: [],
      products
    };
  }

  const mixed = mixedCollections[ slug ] ?? mixedCollections.todos!;
  const products = filterMixedCollection( slug, catalogProducts );
  const categorySlugsInPool = new Set( products.map( ( item ) => item.categorySlug ) );
  const availableCategories = allCategoryFilterOptions.filter( ( opt ) => categorySlugsInPool.has( opt.slug ) );

  return {
    mode: 'mixed',
    slug,
    subslug,
    eyebrow: mixed.eyebrow,
    title: mixed.title,
    description: mixed.description,
    breadcrumbTrail: [
      { label: 'Início', to: '/' },
      { label: mixed.title }
    ],
    primaryFilterTitle: 'Categorias',
    primaryFilterOptions: availableCategories,
    attributeGroups: [],
    showDevotionFilter: false,
    devotionOptions: [],
    initialPrimarySelection: [],
    initialAttributeSelections: {},
    initialDevotionSelection: [],
    products
  };
};
