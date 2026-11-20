import { allDevotionOptions, catalogCategories, DUMMY_HOVER_IMAGE, DUMMY_PRIMARY_IMAGE, getCategoryBySlug, getCategoryMedia } from '@/data/categories';

export { DUMMY_HOVER_IMAGE, DUMMY_PRIMARY_IMAGE };

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  maxInstallments: number;
  isNew?: boolean;
  imageUrl: string;
  hoverImageUrl: string;
  imageAlt: string;
}

export type HomeSectionTag = 'best-seller' | 'seasonal' | 'special-offer' | 'new-arrival';

export interface CatalogProduct extends Product {
  categorySlug: string;
  categoryLabel: string;
  subCategorySlug: string;
  subCategoryLabel: string;
  devotionSlug: string;
  devotionLabel: string;
  attributes: Record<string, string[]>;
  salesRank: number;
  createdOrder: number;
  isSeasonalNatal: boolean;
  homeSection?: HomeSectionTag;
}

export interface SeasonalCampaign {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  to: string;
  endsAt: string;
  products: Product[];
}

export interface ScenarioHotspot {
  x: number;
  y: number;
}

export interface DevotionScenario {
  id: string;
  eyebrow: string;
  title: string;
  imageUrl: string;
  imageAlt: string;
  hotspots?: ScenarioHotspot[];
  products: Product[];
}

export interface FeaturedIconSlide {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  ctaLabel: string;
  to: string;
  imageUrl: string;
  imageAlt: string;
}

interface CuratedProductSeed {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  maxInstallments: number;
  isNew?: boolean;
  categorySlug: string;
  subCategorySlug: string;
  devotionSlug: string;
  attributes: Record<string, string[]>;
  salesRank: number;
  isSeasonalNatal?: boolean;
  homeSection?: HomeSectionTag;
  mediaVariant?: number;
}

export const PIX_DISCOUNT_RATE = 0.05;

export const formatCurrency = ( value: number ): string => {
  return new Intl.NumberFormat( 'pt-BR', {
    style: 'currency',
    currency: 'BRL'
  } ).format( value );
};

export const getPixPrice = ( price: number ): number => {
  return +( price * ( 1 - PIX_DISCOUNT_RATE ) ).toFixed( 2 );
};

export const getInstallmentPrice = ( price: number, maxInstallments: number ): number => {
  return +( price / maxInstallments ).toFixed( 2 );
};

export const getDiscountPercentage = ( price: number, originalPrice?: number ): number | null => {
  if ( originalPrice === undefined || originalPrice <= price ) {
    return null;
  }

  return Math.round( ( ( originalPrice - price ) / originalPrice ) * 100 );
};

const devotionLabelBySlug = new Map( allDevotionOptions.map( ( opt ) => [ opt.slug, opt.label ] ) );

const createCuratedProduct = ( seed: CuratedProductSeed, createdOrder: number ): CatalogProduct => {
  const category = getCategoryBySlug( seed.categorySlug );
  const subCategory = category?.subCategories.find( ( item ) => item.slug === seed.subCategorySlug );
  const media = getCategoryMedia( seed.categorySlug, seed.mediaVariant ?? 0 );

  return {
    id: seed.id,
    slug: seed.slug,
    name: seed.name,
    price: seed.price,
    originalPrice: seed.originalPrice,
    maxInstallments: seed.maxInstallments,
    isNew: seed.isNew,
    imageUrl: media.imageUrl,
    hoverImageUrl: media.hoverImageUrl,
    imageAlt: seed.name,
    categorySlug: seed.categorySlug,
    categoryLabel: category?.label ?? seed.categorySlug,
    subCategorySlug: seed.subCategorySlug,
    subCategoryLabel: subCategory?.label ?? seed.subCategorySlug,
    devotionSlug: seed.devotionSlug,
    devotionLabel: devotionLabelBySlug.get( seed.devotionSlug ) ?? 'Sagrada Família',
    attributes: seed.attributes,
    salesRank: seed.salesRank,
    createdOrder,
    isSeasonalNatal: Boolean( seed.isSeasonalNatal ),
    homeSection: seed.homeSection
  };
};

const curatedSeeds: CuratedProductSeed[] = [
  // Mais Vendidos (Home)
  {
    id: 'prod-sagrada-familia-30cm',
    slug: 'imagem-sagrada-familia-resina-30cm',
    name: 'Imagem Sagrada Família em Resina Importada 30cm',
    price: 189.9,
    originalPrice: 239.9,
    maxInstallments: 6,
    categorySlug: 'imagens',
    subCategorySlug: 'sagrada-familia',
    devotionSlug: 'sagrada-familia',
    attributes: { material: [ 'resina' ], tamanho: [ 'medias', 'grandes' ], acabamento: [ 'pintura-classica' ] },
    salesRank: 1,
    isSeasonalNatal: true,
    homeSection: 'best-seller',
    mediaVariant: 0
  },
  {
    id: 'prod-terco-sao-bento-madeira',
    slug: 'terco-sao-bento-madeira-nobre',
    name: 'Terço de São Bento em Madeira Nobre com Entremeio Dourado',
    price: 49.9,
    maxInstallments: 2,
    categorySlug: 'tercos',
    subCategorySlug: 'tercos-tradicionais',
    devotionSlug: 'sao-bento',
    attributes: { material: [ 'madeira' ], entremeio: [ 'ouro-envelhecido', 'madeira-entalhada' ] },
    salesRank: 2,
    homeSection: 'best-seller',
    mediaVariant: 0
  },
  {
    id: 'prod-biblia-pastoral-capa-dura',
    slug: 'biblia-sagrada-edicao-pastoral',
    name: 'Bíblia Sagrada Edição Pastoral Letra Grande Capa Dura',
    price: 94.9,
    originalPrice: 119.9,
    maxInstallments: 3,
    categorySlug: 'biblias-e-livros',
    subCategorySlug: 'espiritualidade',
    devotionSlug: 'espirito-santo',
    attributes: { edicoes: [ 'edicao-pastoral', 'letra-gigante' ], encadernacao: [ 'capa-dura' ] },
    salesRank: 3,
    homeSection: 'best-seller',
    mediaVariant: 0
  },
  {
    id: 'prod-nossa-senhora-aparecida-25cm',
    slug: 'imagem-nossa-senhora-aparecida-resina-25cm',
    name: 'Imagem Nossa Senhora Aparecida Manto Azul em Resina 25cm',
    price: 150.0,
    maxInstallments: 3,
    categorySlug: 'imagens',
    subCategorySlug: 'nossa-senhora',
    devotionSlug: 'aparecida',
    attributes: { material: [ 'resina' ], tamanho: [ 'medias' ], acabamento: [ 'policromia-artesanal', 'detalhes-em-ouro' ] },
    salesRank: 4,
    homeSection: 'best-seller',
    mediaVariant: 1
  },
  {
    id: 'prod-vela-votiva-sete-dias',
    slug: 'vela-votiva-perfumada-sete-dias',
    name: 'Vela Votiva Perfumada de 7 Dias Sagrada Família no Copo',
    price: 29.9,
    originalPrice: 36.9,
    maxInstallments: 2,
    categorySlug: 'velas',
    subCategorySlug: 'velas-de-7-dias',
    devotionSlug: 'sagrada-familia',
    attributes: { ocasioes: [ 'liturgicas' ], aroma: [ 'mirra-e-incenso' ] },
    salesRank: 5,
    homeSection: 'best-seller',
    mediaVariant: 0
  },
  {
    id: 'prod-crucifixo-sao-damiao',
    slug: 'crucifixo-de-parede-sao-damiao',
    name: 'Crucifixo de Parede São Damião em Madeira Maciça 35cm',
    price: 129.9,
    maxInstallments: 4,
    categorySlug: 'decoracao',
    subCategorySlug: 'crucifixos-de-parede',
    devotionSlug: 'sao-francisco-de-assis',
    attributes: { ambientes: [ 'enfeites-de-mesa' ], material: [ 'madeira-nobre' ] },
    salesRank: 6,
    homeSection: 'best-seller',
    mediaVariant: 0
  },
  {
    id: 'prod-sao-miguel-arcanjo-25cm',
    slug: 'imagem-sao-miguel-arcanjo-25cm',
    name: 'Imagem São Miguel Arcanjo Pintura Clássica em Resina 25cm',
    price: 169.9,
    originalPrice: 215.0,
    maxInstallments: 5,
    categorySlug: 'imagens',
    subCategorySlug: 'santos-de-devocao',
    devotionSlug: 'sao-miguel-arcanjo',
    attributes: { material: [ 'resina' ], tamanho: [ 'medias' ], acabamento: [ 'pintura-classica' ] },
    salesRank: 7,
    homeSection: 'best-seller',
    mediaVariant: 2
  },
  {
    id: 'prod-capelinha-nossa-senhora-gracas',
    slug: 'capelinha-madeira-nossa-senhora-das-gracas',
    name: 'Capelinha de Madeira com Imagem Nossa Senhora das Graças',
    price: 89.9,
    maxInstallments: 3,
    categorySlug: 'decoracao',
    subCategorySlug: 'capelinhas',
    devotionSlug: 'das-gracas',
    attributes: { ambientes: [ 'enfeites-de-mesa' ], material: [ 'madeira-nobre' ] },
    salesRank: 8,
    homeSection: 'best-seller',
    mediaVariant: 1
  },
  {
    id: 'prod-santa-teresinha-20cm',
    slug: 'imagem-santa-teresinha-resina-20cm',
    name: 'Imagem Santa Teresinha do Menino Jesus em Resina 20cm',
    price: 119.9,
    originalPrice: 149.9,
    maxInstallments: 4,
    categorySlug: 'imagens',
    subCategorySlug: 'santos-de-devocao',
    devotionSlug: 'santa-teresinha',
    attributes: { material: [ 'resina' ], tamanho: [ 'medias' ], acabamento: [ 'policromia-artesanal' ] },
    salesRank: 9,
    homeSection: 'best-seller',
    mediaVariant: 0
  },
  {
    id: 'prod-escapulario-porta-sagrada-familia',
    slug: 'escapulario-de-porta-sagrada-familia',
    name: 'Escapulário de Porta Sagrada Família em Madeira e Resina',
    price: 59.9,
    maxInstallments: 2,
    categorySlug: 'acessorios',
    subCategorySlug: 'escapularios',
    devotionSlug: 'sagrada-familia',
    attributes: { diversos: [ 'chaveiros' ], banho: [ 'madeira-e-cordao' ] },
    salesRank: 10,
    homeSection: 'best-seller',
    mediaVariant: 0
  },

  // Natal 2026 (Home)
  {
    id: 'prod-natal-presepio-11-pecas',
    slug: 'presepio-natal-resina-11-pecas-20cm',
    name: 'Presépio de Natal Completo 11 Peças em Resina Pintura Clássica 20cm',
    price: 389.9,
    originalPrice: 469.9,
    maxInstallments: 10,
    categorySlug: 'imagens',
    subCategorySlug: 'presepios',
    devotionSlug: 'sagrada-familia',
    attributes: { material: [ 'resina' ], tamanho: [ 'medias' ], acabamento: [ 'pintura-classica', 'detalhes-em-ouro' ] },
    salesRank: 11,
    isSeasonalNatal: true,
    homeSection: 'seasonal',
    mediaVariant: 2
  },
  {
    id: 'prod-natal-casa-iluminada',
    slug: 'casa-sagrada-familia-natal-iluminada',
    name: 'Casa da Sagrada Família Iluminada em Madeira Rústica para Presépio',
    price: 229.9,
    maxInstallments: 6,
    categorySlug: 'decoracao',
    subCategorySlug: 'capelinhas',
    devotionSlug: 'sagrada-familia',
    attributes: { ambientes: [ 'enfeites-de-mesa' ], material: [ 'madeira-nobre' ] },
    salesRank: 12,
    isSeasonalNatal: true,
    homeSection: 'seasonal',
    mediaVariant: 1
  },
  {
    id: 'prod-natal-menino-jesus-manjedoura',
    slug: 'menino-jesus-na-manjedoura-resina-18cm',
    name: 'Menino Jesus na Manjedoura em Resina com Palha Natural 18cm',
    price: 119.9,
    originalPrice: 149.9,
    maxInstallments: 4,
    categorySlug: 'imagens',
    subCategorySlug: 'presepios',
    devotionSlug: 'sagrada-familia',
    attributes: { material: [ 'resina' ], tamanho: [ 'medias' ], acabamento: [ 'policromia-artesanal' ] },
    salesRank: 13,
    isSeasonalNatal: true,
    homeSection: 'seasonal',
    mediaVariant: 0
  },
  {
    id: 'prod-natal-coroa-advento-velas',
    slug: 'coroa-do-advento-com-quatro-velas-liturgicas',
    name: 'Coroa do Advento Aramada Dourada com 4 Velas Litúrgicas',
    price: 139.9,
    maxInstallments: 4,
    categorySlug: 'velas',
    subCategorySlug: 'velas-votivas',
    devotionSlug: 'sagrada-familia',
    attributes: { ocasioes: [ 'liturgicas' ], aroma: [ 'sem-perfume' ] },
    salesRank: 14,
    isSeasonalNatal: true,
    homeSection: 'seasonal',
    mediaVariant: 1
  },
  {
    id: 'prod-natal-sagrada-familia-perolada',
    slug: 'imagem-sagrada-familia-natal-acabamento-perolado',
    name: 'Imagem Sagrada Família Acabamento Perolado com Detalhes em Ouro 25cm',
    price: 199.9,
    originalPrice: 249.9,
    maxInstallments: 6,
    categorySlug: 'imagens',
    subCategorySlug: 'sagrada-familia',
    devotionSlug: 'sagrada-familia',
    attributes: { material: [ 'resina' ], tamanho: [ 'medias' ], acabamento: [ 'detalhes-em-ouro' ] },
    salesRank: 15,
    isSeasonalNatal: true,
    homeSection: 'seasonal',
    mediaVariant: 1
  },
  {
    id: 'prod-natal-guirlanda-porta',
    slug: 'guirlanda-natalina-sagrada-familia-porta',
    name: 'Guirlanda Natalina com Medalhão da Sagrada Família para Porta 35cm',
    price: 149.9,
    maxInstallments: 5,
    categorySlug: 'decoracao',
    subCategorySlug: 'enfeites-de-porta',
    devotionSlug: 'sagrada-familia',
    attributes: { ambientes: [ 'enfeites-de-mesa' ], material: [ 'resina-e-mdf' ] },
    salesRank: 16,
    isSeasonalNatal: true,
    homeSection: 'seasonal',
    mediaVariant: 0
  },
  {
    id: 'prod-natal-livro-novena',
    slug: 'livro-novena-de-natal-em-familia',
    name: 'Livro Novena de Natal em Família — Orações e Reflexões do Advento',
    price: 24.9,
    originalPrice: 32.9,
    maxInstallments: 2,
    categorySlug: 'biblias-e-livros',
    subCategorySlug: 'oracoes-e-novenas',
    devotionSlug: 'sagrada-familia',
    attributes: { edicoes: [ 'edicao-pastoral' ], encadernacao: [ 'capa-flexivel' ] },
    salesRank: 17,
    isSeasonalNatal: true,
    homeSection: 'seasonal',
    mediaVariant: 1
  },
  {
    id: 'prod-natal-enfeite-arvore-estrelas',
    slug: 'kit-enfeites-arvore-natal-simbolos-cristaos',
    name: 'Kit 6 Enfeites de Árvore de Natal em Madeira com Símbolos Cristãos',
    price: 69.9,
    maxInstallments: 2,
    categorySlug: 'presentes',
    subCategorySlug: 'marcadores-de-pagina',
    devotionSlug: 'sagrada-familia',
    attributes: { kits: [ 'lembrancinhas' ], embalagem: [ 'caixa-presenteavel' ] },
    salesRank: 18,
    isSeasonalNatal: true,
    homeSection: 'seasonal',
    mediaVariant: 1
  },
  {
    id: 'prod-natal-vela-aromatizada-mirra',
    slug: 'vela-perfumada-natal-incenso-e-mirra',
    name: 'Vela Aromática de Natal Essência de Incenso e Mirra no Vidro',
    price: 54.9,
    originalPrice: 69.9,
    maxInstallments: 2,
    categorySlug: 'velas',
    subCategorySlug: 'velas-perfumadas',
    devotionSlug: 'sagrada-familia',
    attributes: { ocasioes: [ 'liturgicas' ], aroma: [ 'mirra-e-incenso' ] },
    salesRank: 19,
    isSeasonalNatal: true,
    homeSection: 'seasonal',
    mediaVariant: 0
  },
  {
    id: 'prod-natal-toalha-mesa-belem',
    slug: 'trilho-de-mesa-natalino-estrela-de-belem',
    name: 'Trilho de Mesa Natalino Bordado Estrela de Belém em Algodão 1,80m',
    price: 114.9,
    maxInstallments: 3,
    categorySlug: 'decoracao',
    subCategorySlug: 'quadros',
    devotionSlug: 'sagrada-familia',
    attributes: { ambientes: [ 'enfeites-de-mesa' ], material: [ 'resina-e-mdf' ] },
    salesRank: 20,
    isSeasonalNatal: true,
    homeSection: 'seasonal',
    mediaVariant: 1
  },

  // Ofertas Especiais (Home)
  {
    id: 'prod-oferta-nossa-senhora-gracas-30cm',
    slug: 'imagem-nossa-senhora-das-gracas-resina-30cm',
    name: 'Imagem Nossa Senhora das Graças em Resina Pintura Dourada 30cm',
    price: 159.9,
    originalPrice: 219.9,
    maxInstallments: 5,
    categorySlug: 'imagens',
    subCategorySlug: 'nossa-senhora',
    devotionSlug: 'das-gracas',
    attributes: { material: [ 'resina' ], tamanho: [ 'medias', 'grandes' ], acabamento: [ 'detalhes-em-ouro' ] },
    salesRank: 21,
    homeSection: 'special-offer',
    mediaVariant: 1
  },
  {
    id: 'prod-oferta-terco-cristal-perola',
    slug: 'terco-cristal-tcheco-perola-banhado-ouro',
    name: 'Terço em Cristal e Pérola com Entremeio Nossa Senhora Aparecida',
    price: 64.9,
    originalPrice: 89.9,
    maxInstallments: 2,
    categorySlug: 'tercos',
    subCategorySlug: 'rosarios',
    devotionSlug: 'aparecida',
    attributes: { material: [ 'cristal', 'perola' ], entremeio: [ 'ouro-envelhecido' ] },
    salesRank: 22,
    homeSection: 'special-offer',
    mediaVariant: 1
  },
  {
    id: 'prod-oferta-biblia-jerusalem-capa-couro',
    slug: 'biblia-de-jerusalem-capa-luxo-ziper',
    name: 'Bíblia de Jerusalém Edição Especial Capa Sintética com Zíper',
    price: 149.9,
    originalPrice: 189.9,
    maxInstallments: 5,
    categorySlug: 'biblias-e-livros',
    subCategorySlug: 'espiritualidade',
    devotionSlug: 'espirito-santo',
    attributes: { edicoes: [ 'estudo-jerusalem', 'ziper' ], encadernacao: [ 'luxo-com-ziper' ] },
    salesRank: 23,
    homeSection: 'special-offer',
    mediaVariant: 0
  },
  {
    id: 'prod-oferta-mandala-espirito-santo',
    slug: 'mandala-divino-espirito-santo-mdf-30cm',
    name: 'Mandala Divino Espírito Santo em Madeira e Resina para Parede 30cm',
    price: 79.9,
    originalPrice: 109.9,
    maxInstallments: 3,
    categorySlug: 'decoracao',
    subCategorySlug: 'mandalas',
    devotionSlug: 'espirito-santo',
    attributes: { ambientes: [ 'enfeites-de-mesa' ], material: [ 'resina-e-mdf' ] },
    salesRank: 24,
    homeSection: 'special-offer',
    mediaVariant: 0
  },
  {
    id: 'prod-oferta-sao-jose-operario-20cm',
    slug: 'imagem-sao-jose-operario-po-de-marmore-20cm',
    name: 'Imagem São José com o Menino Jesus em Pó de Mármore 20cm',
    price: 134.9,
    originalPrice: 169.9,
    maxInstallments: 4,
    categorySlug: 'imagens',
    subCategorySlug: 'santos-de-devocao',
    devotionSlug: 'sao-jose',
    attributes: { material: [ 'po-de-marmore' ], tamanho: [ 'medias' ], acabamento: [ 'pintura-classica' ] },
    salesRank: 25,
    homeSection: 'special-offer',
    mediaVariant: 0
  },
  {
    id: 'prod-oferta-camiseta-sao-bento',
    slug: 'camiseta-catolica-medalha-sao-bento-algodao',
    name: 'Camiseta Católica Medalha de São Bento 100% Algodão Estonada',
    price: 69.9,
    originalPrice: 89.9,
    maxInstallments: 2,
    categorySlug: 'camisetas',
    subCategorySlug: 'santos',
    devotionSlug: 'sao-bento',
    attributes: { publico: [ 'masculinas' ], tamanho: [ 'm', 'g' ], cor: [ 'marrom-cafe' ] },
    salesRank: 26,
    homeSection: 'special-offer',
    mediaVariant: 0
  },
  {
    id: 'prod-oferta-pia-agua-benta',
    slug: 'pia-de-agua-benta-parede-anjo-resina',
    name: 'Pia de Água Benta de Parede Sagrada Família em Resina Clássica',
    price: 44.9,
    originalPrice: 59.9,
    maxInstallments: 2,
    categorySlug: 'decoracao',
    subCategorySlug: 'enfeites-de-porta',
    devotionSlug: 'sagrada-familia',
    attributes: { ambientes: [ 'agua-benta' ], material: [ 'resina-e-mdf' ] },
    salesRank: 27,
    homeSection: 'special-offer',
    mediaVariant: 1
  },
  {
    id: 'prod-oferta-medalha-sao-miguel',
    slug: 'escapulario-medalha-sao-miguel-arcanjo-aco',
    name: 'Colar Escapulário São Miguel Arcanjo em Aço Inox Dourado',
    price: 54.9,
    originalPrice: 74.9,
    maxInstallments: 2,
    categorySlug: 'acessorios',
    subCategorySlug: 'medalhas',
    devotionSlug: 'sao-miguel-arcanjo',
    attributes: { diversos: [ 'pins-botons' ], banho: [ 'aco-inox-dourado' ] },
    salesRank: 28,
    homeSection: 'special-offer',
    mediaVariant: 0
  },
  {
    id: 'prod-oferta-caneca-santa-teresinha',
    slug: 'caneca-porcelana-santa-teresinha-chuva-de-rosas',
    name: 'Caneca de Porcelana Santa Teresinha Chuva de Rosas 325ml',
    price: 39.9,
    originalPrice: 54.9,
    maxInstallments: 2,
    categorySlug: 'presentes',
    subCategorySlug: 'canecas',
    devotionSlug: 'santa-teresinha',
    attributes: { kits: [ 'lembrancinhas' ], embalagem: [ 'caixa-presenteavel' ] },
    salesRank: 29,
    homeSection: 'special-offer',
    mediaVariant: 0
  },
  {
    id: 'prod-oferta-kit-velas-votivas',
    slug: 'kit-3-velas-votivas-devoção-mariana',
    name: 'Kit com 3 Velas Votivas Perfumadas Títulos de Nossa Senhora',
    price: 49.9,
    originalPrice: 69.9,
    maxInstallments: 2,
    categorySlug: 'velas',
    subCategorySlug: 'velas-perfumadas',
    devotionSlug: 'de-fatima',
    attributes: { ocasioes: [ 'liturgicas' ], aroma: [ 'lavanda-suave' ] },
    salesRank: 30,
    homeSection: 'special-offer',
    mediaVariant: 1
  },

  // Lançamentos (Home)
  {
    id: 'prod-novo-nossa-senhora-guadalupe-30cm',
    slug: 'imagem-nossa-senhora-de-guadalupe-resina-30cm',
    name: 'Imagem Nossa Senhora de Guadalupe em Resina Importada 30cm',
    price: 219.9,
    originalPrice: 259.9,
    maxInstallments: 6,
    isNew: true,
    categorySlug: 'imagens',
    subCategorySlug: 'nossa-senhora',
    devotionSlug: 'de-guadalupe',
    attributes: { material: [ 'resina' ], tamanho: [ 'medias', 'grandes' ], acabamento: [ 'policromia-artesanal' ] },
    salesRank: 31,
    homeSection: 'new-arrival',
    mediaVariant: 2
  },
  {
    id: 'prod-novo-terco-hematita-sao-miguel',
    slug: 'terco-hematita-sao-miguel-arcanjo',
    name: 'Terço de São Miguel Arcanjo em Contas de Hematita Grafite',
    price: 59.9,
    maxInstallments: 2,
    isNew: true,
    categorySlug: 'tercos',
    subCategorySlug: 'tercos-tradicionais',
    devotionSlug: 'sao-miguel-arcanjo',
    attributes: { material: [ 'hematita' ], entremeio: [ 'prata-velha' ] },
    salesRank: 32,
    homeSection: 'new-arrival',
    mediaVariant: 0
  },
  {
    id: 'prod-novo-biblia-familia-ilustrada',
    slug: 'biblia-da-familia-capa-dura-dourada',
    name: 'Bíblia Sagrada da Família Capa Dura com Folha Dourada e Mapas',
    price: 169.9,
    originalPrice: 199.9,
    maxInstallments: 5,
    isNew: true,
    categorySlug: 'biblias-e-livros',
    subCategorySlug: 'familia-e-casais',
    devotionSlug: 'sagrada-familia',
    attributes: { edicoes: [ 'letra-gigante' ], encadernacao: [ 'capa-dura' ] },
    salesRank: 33,
    isSeasonalNatal: true,
    homeSection: 'new-arrival',
    mediaVariant: 0
  },
  {
    id: 'prod-novo-santo-antonio-20cm',
    slug: 'imagem-santo-antonio-po-de-marmore-20cm',
    name: 'Imagem Santo Antônio com Menino Jesus em Pó de Mármore 20cm',
    price: 144.9,
    maxInstallments: 4,
    isNew: true,
    categorySlug: 'imagens',
    subCategorySlug: 'santos-de-devocao',
    devotionSlug: 'santo-antonio',
    attributes: { material: [ 'po-de-marmore' ], tamanho: [ 'medias' ], acabamento: [ 'pintura-classica' ] },
    salesRank: 34,
    homeSection: 'new-arrival',
    mediaVariant: 1
  },
  {
    id: 'prod-novo-oratorio-madeira-mesa',
    slug: 'oratorio-de-mesa-madeira-nobre-arco',
    name: 'Oratório de Mesa em Madeira Nobre Formato Arco para Imagens até 25cm',
    price: 129.9,
    originalPrice: 159.9,
    maxInstallments: 4,
    isNew: true,
    categorySlug: 'decoracao',
    subCategorySlug: 'capelinhas',
    devotionSlug: 'sagrada-familia',
    attributes: { ambientes: [ 'enfeites-de-mesa' ], material: [ 'madeira-nobre' ] },
    salesRank: 35,
    homeSection: 'new-arrival',
    mediaVariant: 1
  },
  {
    id: 'prod-novo-camiseta-sagrada-familia',
    slug: 'camiseta-sagrada-familia-bege-minimalista',
    name: 'Camiseta Católica Sagrada Família de Nazaré Algodão Penteado',
    price: 79.9,
    maxInstallments: 2,
    isNew: true,
    categorySlug: 'camisetas',
    subCategorySlug: 'santissima-trindade',
    devotionSlug: 'sagrada-familia',
    attributes: { publico: [ 'femininas', 'masculinas' ], tamanho: [ 'p', 'm', 'g' ], cor: [ 'areia', 'off-white' ] },
    salesRank: 36,
    homeSection: 'new-arrival',
    mediaVariant: 1
  },
  {
    id: 'prod-novo-sao-padre-pio-20cm',
    slug: 'imagem-sao-padre-pio-resina-20cm',
    name: 'Imagem São Padre Pio de Pietrelcina Pintura Artesanal 20cm',
    price: 139.9,
    originalPrice: 174.9,
    maxInstallments: 4,
    isNew: true,
    categorySlug: 'imagens',
    subCategorySlug: 'santos-de-devocao',
    devotionSlug: 'sao-padre-pio',
    attributes: { material: [ 'resina' ], tamanho: [ 'medias' ], acabamento: [ 'policromia-artesanal' ] },
    salesRank: 37,
    homeSection: 'new-arrival',
    mediaVariant: 0
  },
  {
    id: 'prod-novo-porta-vela-marmore-aparecida',
    slug: 'porta-vela-vidro-nossa-senhora-aparecida',
    name: 'Porta-Vela em Vidro Jateado e Base Dourada Nossa Senhora Aparecida',
    price: 44.9,
    maxInstallments: 2,
    isNew: true,
    categorySlug: 'velas',
    subCategorySlug: 'velas-votivas',
    devotionSlug: 'aparecida',
    attributes: { ocasioes: [ 'liturgicas' ], aroma: [ 'sem-perfume' ] },
    salesRank: 38,
    homeSection: 'new-arrival',
    mediaVariant: 0
  },
  {
    id: 'prod-novo-livro-tratado-verdadeira-devocao',
    slug: 'livro-tratado-da-verdadeira-devocao-capa-luxo',
    name: 'Livro Tratado da Verdadeira Devoção à Santíssima Virgem — Capa Luxo',
    price: 49.9,
    originalPrice: 64.9,
    maxInstallments: 2,
    isNew: true,
    categorySlug: 'biblias-e-livros',
    subCategorySlug: 'espiritualidade',
    devotionSlug: 'aparecida',
    attributes: { edicoes: [ 'edicao-pastoral' ], encadernacao: [ 'capa-dura' ] },
    salesRank: 39,
    homeSection: 'new-arrival',
    mediaVariant: 1
  },
  {
    id: 'prod-novo-pulseira-medalha-milagrosa',
    slug: 'pulseira-nossa-senhora-das-gracas-banho-ouro',
    name: 'Pulseira Medalha Milagrosa com Pérolas e Banho de Ouro 18k',
    price: 69.9,
    maxInstallments: 2,
    isNew: true,
    categorySlug: 'acessorios',
    subCategorySlug: 'pulseiras',
    devotionSlug: 'das-gracas',
    attributes: { diversos: [ 'chaveiros' ], banho: [ 'banho-ouro-18k' ] },
    salesRank: 40,
    homeSection: 'new-arrival',
    mediaVariant: 0
  }
];

const TARGET_PRODUCTS_PER_CATEGORY = 21;

const buildCatalogProducts = (): CatalogProduct[] => {
  const curated = curatedSeeds.map( ( seed, idx ) => createCuratedProduct( seed, idx + 1 ) );
  const generatedFillers: CatalogProduct[] = [];
  let globalIndex = curated.length;

  for ( const category of catalogCategories ) {
    const existingCount = curated.filter( ( item ) => item.categorySlug === category.slug ).length;
    const neededCount = Math.max( 0, TARGET_PRODUCTS_PER_CATEGORY - existingCount );
    const [ minPrice, maxPrice ] = category.basePriceRange;

    for ( let index = 0; index < neededCount; index++ ) {
      const subCategory = category.subCategories[ index % category.subCategories.length ] ?? { slug: category.slug, label: category.label };
      const devotion = allDevotionOptions[ globalIndex % allDevotionOptions.length ] ?? { slug: 'sagrada-familia', label: 'Sagrada Família' };

      const attributes: Record<string, string[]> = {};
      let firstAttrLabel = 'Acabamento Clássico';

      category.attributeGroups.forEach( ( group, groupIdx ) => {
        const primaryOption = group.options[ ( index + groupIdx ) % group.options.length ];
        const secondaryOption = group.options.length > 1 && index % 4 === 0
          ? group.options[ ( index + groupIdx + 1 ) % group.options.length ]
          : undefined;

        const chosen = [ primaryOption?.slug, secondaryOption?.slug ].filter( ( value ): value is string => Boolean( value ) );
        attributes[ group.id ] = Array.from( new Set( chosen ) );

        if ( groupIdx === 0 && primaryOption ) {
          firstAttrLabel = primaryOption.label;
        }
      } );

      const priceRatio = ( ( index * 7 + globalIndex * 3 ) % 17 ) / 16;
      const rawPrice = minPrice + ( maxPrice - minPrice ) * priceRatio;
      const price = Math.floor( rawPrice ) + 0.9;

      const hasDiscount = ( globalIndex + index ) % 3 === 0;
      const discountFactor = 1.18 + ( ( globalIndex % 4 ) * 0.05 );
      const originalPrice = hasDiscount ? Math.ceil( price * discountFactor ) - 0.1 : undefined;

      const isNew = ( globalIndex + index ) % 4 === 1;
      const maxInstallments = price >= 180 ? 6 : price >= 100 ? 4 : price >= 60 ? 3 : 2;
      const salesRank = curated.length + ( ( globalIndex * 13 + index * 5 ) % 140 ) + 1;
      const isSeasonalNatal = globalIndex % 6 === 0 || subCategory.slug === 'presepios' || subCategory.slug === 'sagrada-familia';
      const media = getCategoryMedia( category.slug, index );

      generatedFillers.push( {
        id: `prod-${ category.slug }-${ existingCount + index + 1 }`,
        slug: `${ category.slug }-${ subCategory.slug }-peca-${ existingCount + index + 1 }`,
        name: `${ category.label } ${ subCategory.label } — ${ firstAttrLabel } Artesanal #${ existingCount + index + 1 }`,
        price,
        originalPrice,
        maxInstallments,
        isNew,
        imageUrl: media.imageUrl,
        hoverImageUrl: media.hoverImageUrl,
        imageAlt: `${ category.label } ${ subCategory.label } — ${ firstAttrLabel } Artesanal #${ existingCount + index + 1 }`,
        categorySlug: category.slug,
        categoryLabel: category.label,
        subCategorySlug: subCategory.slug,
        subCategoryLabel: subCategory.label,
        devotionSlug: devotion.slug,
        devotionLabel: devotion.label,
        attributes,
        salesRank,
        createdOrder: globalIndex + 1,
        isSeasonalNatal
      } );

      globalIndex++;
    }
  }

  return [ ...curated, ...generatedFillers ];
};

export const catalogProducts: CatalogProduct[] = buildCatalogProducts();

export const bestSellerProducts: Product[] = catalogProducts.filter( ( item ) => item.homeSection === 'best-seller' );
export const seasonalProducts: Product[] = catalogProducts.filter( ( item ) => item.homeSection === 'seasonal' );
export const specialOfferProducts: Product[] = catalogProducts.filter( ( item ) => item.homeSection === 'special-offer' );
export const newArrivalProducts: Product[] = catalogProducts.filter( ( item ) => item.homeSection === 'new-arrival' );

export const activeSeasonalCampaign: SeasonalCampaign | null = {
  slug: 'natal-2026',
  badge: 'Especial Natal 2026',
  title: 'Prepare o seu Lar para o Natal',
  subtitle: 'Presépios, imagens da Sagrada Família e adornos para celebrar o nascimento de Jesus.',
  ctaLabel: 'Ver coleção de Natal',
  to: '/c/natal-2026',
  endsAt: '2026-12-25T00:00:00-03:00',
  products: seasonalProducts
};

export const devotionScenarios: DevotionScenario[] = [
  {
    id: 'scenario-oratorio-sagrada-familia',
    eyebrow: 'Igreja Doméstica',
    title: 'Oratório da Sagrada Família',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Oratório familiar com imagem da Sagrada Família, Bíblia e vela aromática',
    hotspots: [
      { x: 46, y: 42 },
      { x: 26, y: 68 },
      { x: 70, y: 66 }
    ],
    products: [
      {
        id: 'prod-cenario-imagem-sagrada-familia-25cm',
        slug: 'imagem-sagrada-familia-resina-classica-25cm',
        name: 'Imagem Sagrada Família em Resina Clássica 25cm',
        price: 169.9,
        maxInstallments: 5,
        ...getCategoryMedia( 'imagens', 0 ),
        imageAlt: 'Imagem Sagrada Família em Resina Clássica 25cm'
      },
      {
        id: 'prod-cenario-biblia-edicao-familia',
        slug: 'biblia-sagrada-edicao-da-familia-capa-dura',
        name: 'Bíblia Sagrada Edição da Família Capa Dura',
        price: 119.9,
        originalPrice: 149.9,
        maxInstallments: 4,
        ...getCategoryMedia( 'biblias-e-livros', 0 ),
        imageAlt: 'Bíblia Sagrada Edição da Família Capa Dura'
      },
      {
        id: 'prod-cenario-vela-mesa-sagrada-familia',
        slug: 'vela-perfumada-mesa-sagrada-familia-vidro',
        name: 'Vela Perfumada de Mesa Sagrada Família no Vidro',
        price: 44.9,
        maxInstallments: 2,
        ...getCategoryMedia( 'velas', 0 ),
        imageAlt: 'Vela Perfumada de Mesa Sagrada Família no Vidro'
      }
    ]
  },
  {
    id: 'scenario-devocao-sao-bento',
    eyebrow: 'Fé & Proteção',
    title: 'Devoção a São Bento',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Conjunto devocional de São Bento com crucifixo, escapulário de porta e terço',
    hotspots: [
      { x: 50, y: 34 },
      { x: 28, y: 58 },
      { x: 68, y: 72 }
    ],
    products: [
      {
        id: 'prod-cenario-crucifixo-sao-bento-30cm',
        slug: 'crucifixo-medalha-sao-bento-madeira-nobre-30cm',
        name: 'Crucifixo Medalha de São Bento em Madeira Nobre 30cm',
        price: 109.9,
        maxInstallments: 3,
        ...getCategoryMedia( 'decoracao', 0 ),
        imageAlt: 'Crucifixo Medalha de São Bento em Madeira Nobre 30cm'
      },
      {
        id: 'prod-cenario-escapulario-porta-sao-bento',
        slug: 'escapulario-porta-sao-bento-oracao-latim',
        name: 'Escapulário de Porta São Bento com Oração em Latim',
        price: 49.9,
        originalPrice: 64.9,
        maxInstallments: 2,
        ...getCategoryMedia( 'acessorios', 0 ),
        imageAlt: 'Escapulário de Porta São Bento com Oração em Latim'
      },
      {
        id: 'prod-cenario-terco-sao-bento-imbuia',
        slug: 'terco-sao-bento-contas-madeira-imbuia',
        name: 'Terço de São Bento em Contas de Madeira Imbuia',
        price: 39.9,
        maxInstallments: 2,
        ...getCategoryMedia( 'tercos', 0 ),
        imageAlt: 'Terço de São Bento em Contas de Madeira Imbuia'
      }
    ]
  }
];

export const featuredIconSlides: FeaturedIconSlide[] = [
  {
    id: 'icon-slide-sagrada-familia',
    subtitle: '† O Ícone do Lar',
    title: 'A presença de Nazaré no coração da sua casa',
    description: 'A escultura da Sagrada Família em resina clássica recorda todos os dias a vocação do lar cristão: ser abrigo de oração, paciência e amor mútuo.',
    ctaLabel: 'Saiba mais',
    to: '/p/imagem-sagrada-familia-resina-30cm',
    imageUrl: getCategoryMedia( 'imagens', 0 ).imageUrl,
    imageAlt: 'Imagem Sagrada Família em Resina Importada 30cm'
  },
  {
    id: 'icon-slide-crucifixo-sao-damiao',
    subtitle: '† Sinal de Redenção',
    title: 'A cruz que fala ao silêncio da família',
    description: 'Inspirado no ícone diante do qual São Francisco rezou em Assis, o Crucifixo de São Damião em madeira maciça convida à contemplação do Cristo vivo e glorioso.',
    ctaLabel: 'Saiba mais',
    to: '/p/crucifixo-de-parede-sao-damiao',
    imageUrl: getCategoryMedia( 'decoracao', 0 ).imageUrl,
    imageAlt: 'Crucifixo de Parede São Damião em Madeira Maciça 35cm'
  },
  {
    id: 'icon-slide-capela-aparecida',
    subtitle: '† Refúgio Mariano',
    title: 'Um pequeno santuário para as preces de cada dia',
    description: 'Entalhada em madeira nobre, a Capelinha de Nossa Senhora Aparecida acolhe as intenções da família sob o olhar materno da Padroeira do Brasil.',
    ctaLabel: 'Saiba mais',
    to: '/p/capela-madeira-nossa-senhora-aparecida-17cm',
    imageUrl: getCategoryMedia( 'decoracao', 1 ).imageUrl,
    imageAlt: 'Capela em Madeira Nossa Senhora Aparecida 17cm'
  },
  {
    id: 'icon-slide-biblia-familia',
    subtitle: '† Luz da Palavra',
    title: 'A herança de fé que atravessa gerações',
    description: 'Com acabamento em capa dura dourada e páginas de registro familiar, a Bíblia da Família reúne pais e filhos em torno da Palavra de Deus.',
    ctaLabel: 'Saiba mais',
    to: '/p/biblia-da-familia-capa-dura-dourada',
    imageUrl: getCategoryMedia( 'biblias-e-livros', 0 ).imageUrl,
    imageAlt: 'Bíblia Sagrada da Família Capa Dura com Folha Dourada e Mapas'
  }
];
