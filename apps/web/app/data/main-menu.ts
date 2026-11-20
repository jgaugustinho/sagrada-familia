import type { Component } from 'vue';
import { catalogCategories, devotionCategory, mixedCollections, type CatalogCategoryDefinition, type MixedCollectionDefinition } from '@/data/categories';

export interface MenuSubItem {
  label: string;
  slug: string;
}

export interface MenuFeatured {
  title: string;
  description: string;
  imageUrl: string;
}

export interface MenuGroup {
  title: string;
  items: MenuSubItem[];
  featured: MenuFeatured;
}

export interface MenuCategory {
  label: string;
  slug: string;
  icon: Component;
  ctaLabel: string;
  groups: MenuGroup[];
  /** Rota customizada. Quando ausente, usa `/c/[slug]`. */
  to?: string;
}

export const categoryPath = ( category: MenuCategory ): string => category.to ?? `/c/${ category.slug }`;

const toMenuCategory = ( category: CatalogCategoryDefinition ): MenuCategory => {
  const groups: MenuGroup[] = [];

  for ( const key of category.megaMenuGroupOrder ) {
    if ( key === 'subcategories' ) {
      groups.push( {
        title: category.subCategoryGroupTitle,
        items: category.subCategories,
        featured: category.subCategoryFeatured
      } );
      continue;
    }

    const attr = category.attributeGroups.find( ( item ) => item.id === key );
    if ( attr?.megaMenuFeatured ) {
      groups.push( {
        title: attr.title,
        items: attr.options,
        featured: attr.megaMenuFeatured
      } );
    }
  }

  return {
    label: category.label,
    slug: category.slug,
    icon: category.icon,
    ctaLabel: category.ctaLabel,
    groups
  };
};

const toMixedMenuCategory = ( collection: MixedCollectionDefinition ): MenuCategory => ( {
  label: collection.label,
  slug: collection.slug,
  icon: collection.icon,
  ctaLabel: collection.ctaLabel,
  groups: [],
  to: collection.to
} );

const promocoesMenu = toMixedMenuCategory( mixedCollections.promocoes! );
const lancamentosMenu = toMixedMenuCategory( mixedCollections.lancamentos! );
const natal2026Menu = toMixedMenuCategory( mixedCollections[ 'natal-2026' ]! );
const verTodosMenu = toMixedMenuCategory( mixedCollections.todos! );
const categoryMenus = catalogCategories.map( toMenuCategory );

export const mainMenu: MenuCategory[] = [
  promocoesMenu,
  ...categoryMenus
];

export const devocionais: MenuCategory = {
  label: devotionCategory.label,
  slug: devotionCategory.slug,
  icon: devotionCategory.icon,
  ctaLabel: devotionCategory.ctaLabel,
  groups: devotionCategory.groups
};

/** Ordem do menu "Todas as categorias": Promoções, Lançamentos, Natal 2026, Devocionais, demais categorias, Ver todos. */
export const allCategoriesMenu: MenuCategory[] = [
  promocoesMenu,
  lancamentosMenu,
  natal2026Menu,
  devocionais,
  ...categoryMenus,
  verTodosMenu
];
