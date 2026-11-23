import { catalogCategories, DUMMY_HOVER_IMAGE, DUMMY_PRIMARY_IMAGE, getCategoryImageUrls } from '@/data/categories';
import { catalogProducts, devotionScenarios, formatCurrency, type CatalogProduct, type Product } from '@/data/products';

export interface ProductMediaItem {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface ProductVariationOption {
  id: string;
  label: string;
  swatchHex?: string;
  swatchAccentHex?: string;
  priceDelta: number;
  skuSuffix: string;
  inStock: boolean;
  dimensions?: string;
  weight?: string;
  imageId?: string;
}

export interface ProductVariationGroup {
  id: string;
  label: string;
  type: 'swatch' | 'pill';
  options: ProductVariationOption[];
}

export interface ProductTechnicalSpec {
  label: string;
  value: string;
}

export interface ProductEditorialDetail {
  product: CatalogProduct;
  sku: string;
  shortDescription: string;
  fullDescriptionParagraphs: string[];
  media: ProductMediaItem[];
  variationGroups: ProductVariationGroup[];
  baseSpecs: ProductTechnicalSpec[];
  careInstructions: string[];
}

export interface ShippingMethodOption {
  id: string;
  carrier: string;
  service: string;
  deliveryWindow: string;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  badge?: string;
  note?: string;
}

export interface ShippingQuoteResult {
  cepFormatted: string;
  cityLabel: string;
  remainingForFreeShipping: number;
  options: ShippingMethodOption[];
}

interface FlagshipOverride {
  sku: string;
  media: ProductMediaItem[];
  variationGroups: ProductVariationGroup[];
  baseSpecs: ProductTechnicalSpec[];
}

export const FREE_SHIPPING_THRESHOLD = 249;

const DUMMY_SHORT_DESCRIPTION = 'Peça selecionada com curadoria especial pela Sagrada Família, unindo acabamento refinado, durabilidade e beleza atemporal para o seu lar ou para presentear.';

const DUMMY_FULL_DESCRIPTION_PARAGRAPHS = [
  'Desenvolvida com atenção aos detalhes e materiais de alta qualidade, esta peça foi escolhida para levar harmonia, significado e beleza ao ambiente ou compor um presente especial em momentos marcantes.',
  'Seu acabamento cuidadoso garante excelente apresentação e durabilidade no uso cotidiano. Cada pedido passa por conferência individual antes do envio para chegar em perfeitas condições até você.'
];

const DUMMY_CARE_INSTRUCTIONS = [
  'Limpar suavemente com pano seco ou espanador macio, evitando produtos químicos abrasivos.',
  'Conservar em local arejado e protegido da incidência direta e prolongada do sol.',
  'Em caso de dúvidas sobre conservação específica, fale com nossa Consultoria Sacra.'
];

const CATEGORY_SKU_PREFIX: Record<string, string> = {
  'imagens': 'IMG',
  'tercos': 'TER',
  'biblias-e-livros': 'BIB',
  'decoracao': 'DEC',
  'camisetas': 'CAM',
  'acessorios': 'ACE',
  'velas': 'VEL',
  'presentes': 'PRE'
};

const SHARED_GALLERY_POOL = [
  'https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1559005446-facbaebc2537?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1564965176772-f7ad1035e947?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1744339700395-fa286ae4c7e6?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1565401185984-5d1ebde111de?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85'
];

const FLAGSHIP_OVERRIDES: Record<string, FlagshipOverride> = {
  'imagem-sagrada-familia-resina-30cm': {
    sku: 'SF-IMG-030',
    media: [
      {
        id: 'sf-30-front',
        url: 'https://images.unsplash.com/photo-1559005446-facbaebc2537?auto=format&fit=crop&w=1000&q=85',
        alt: 'Imagem Sagrada Família em Resina Importada — Vista frontal em pintura clássica',
        caption: 'Acabamento Pintura Clássica com filetes dourados'
      },
      {
        id: 'sf-30-gold',
        url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1000&q=85',
        alt: 'Imagem Sagrada Família em Resina — Acabamento Ouro Envelhecido',
        caption: 'Variação Ouro Envelhecido sob iluminação acolhedora'
      },
      {
        id: 'sf-30-ivory',
        url: 'https://images.unsplash.com/photo-1564965176772-f7ad1035e947?auto=format&fit=crop&w=1000&q=85',
        alt: 'Imagem Sagrada Família em Resina — Acabamento Marfim Sacro',
        caption: 'Acabamento Marfim Sacro com pátina suave'
      },
      {
        id: 'sf-30-altar',
        url: 'https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=1000&q=85',
        alt: 'Imagem Sagrada Família composta em oratório residencial',
        caption: 'Proporção pensada para oratórios e salas de estar'
      },
      {
        id: 'sf-30-detail',
        url: 'https://images.unsplash.com/photo-1744339700395-fa286ae4c7e6?auto=format&fit=crop&w=1000&q=85',
        alt: 'Detalhe da escultura e proteção para envio seguro',
        caption: 'Curadoria com embalagem tripla anti-impacto'
      }
    ],
    variationGroups: [
      {
        id: 'acabamento',
        label: 'Acabamento',
        type: 'swatch',
        options: [
          {
            id: 'pintura-classica',
            label: 'Pintura Clássica',
            swatchHex: '#7A5B32',
            swatchAccentHex: '#D4B679',
            priceDelta: 0,
            skuSuffix: 'PC',
            inStock: true,
            imageId: 'sf-30-front'
          },
          {
            id: 'ouro-envelhecido',
            label: 'Ouro Envelhecido',
            swatchHex: '#89692C',
            swatchAccentHex: '#E5CA8C',
            priceDelta: 20,
            skuSuffix: 'OE',
            inStock: true,
            imageId: 'sf-30-gold'
          },
          {
            id: 'marfim-sacro',
            label: 'Marfim Sacro',
            swatchHex: '#EDE6D6',
            swatchAccentHex: '#C5B08B',
            priceDelta: 10,
            skuSuffix: 'MS',
            inStock: true,
            imageId: 'sf-30-ivory'
          }
        ]
      },
      {
        id: 'tamanho',
        label: 'Altura da Escultura',
        type: 'pill',
        options: [
          {
            id: '20cm',
            label: '20 cm',
            priceDelta: -40,
            skuSuffix: '20',
            inStock: true,
            dimensions: '20 cm × 11 cm × 8 cm',
            weight: '480 g'
          },
          {
            id: '30cm',
            label: '30 cm',
            priceDelta: 0,
            skuSuffix: '30',
            inStock: true,
            dimensions: '30 cm × 16 cm × 11 cm',
            weight: '920 g'
          },
          {
            id: '40cm',
            label: '40 cm',
            priceDelta: 90,
            skuSuffix: '40',
            inStock: true,
            dimensions: '40 cm × 21 cm × 14 cm',
            weight: '1,65 kg'
          },
          {
            id: '50cm',
            label: '50 cm',
            priceDelta: 170,
            skuSuffix: '50',
            inStock: false,
            dimensions: '50 cm × 26 cm × 17 cm',
            weight: '2,40 kg'
          }
        ]
      }
    ],
    baseSpecs: [
      { label: 'Material', value: 'Resina importada de alta densidade' },
      { label: 'Acabamento', value: 'Pintura artesanal com base aveludada' },
      { label: 'Dimensões', value: '30 cm × 16 cm × 11 cm' },
      { label: 'Peso aproximado', value: '920 g' }
    ]
  }
};

const getDefaultSpecsForCategory = ( product: CatalogProduct ): { dimensions: string; weight: string; material: string; finish: string } => {
  switch ( product.categorySlug ) {
    case 'imagens':
      return {
        dimensions: '25 cm × 13 cm × 10 cm',
        weight: '780 g',
        material: 'Resina sacra selecionada de alta definição',
        finish: 'Pintura artesanal com proteção acetinada'
      };
    case 'tercos':
      return {
        dimensions: '44 cm de comprimento · Contas 8 mm',
        weight: '65 g',
        material: 'Contas selecionadas com elos metálicos reforçados',
        finish: 'Entremeio e crucifixo com banho protetor'
      };
    case 'biblias-e-livros':
      return {
        dimensions: '21 cm × 14 cm × 3,5 cm',
        weight: '890 g',
        material: 'Capa resistente e papel editorial de alta legibilidade',
        finish: 'Impressão nítida com marcador de cetim'
      };
    case 'decoracao':
      return {
        dimensions: '30 cm × 22 cm × 2 cm',
        weight: '520 g',
        material: 'Madeira nobre tratada e detalhes em resina',
        finish: 'Verniz fosco acetinado e suporte de fixação'
      };
    case 'camisetas':
      return {
        dimensions: 'Altura 71 cm × Largura 53 cm',
        weight: '240 g',
        material: '100% Algodão fio 30.1 penteado pré-encolhido',
        finish: 'Estampa em silk de toque zero e gola reforçada'
      };
    case 'acessorios':
      return {
        dimensions: 'Corrente 45 cm · Pingente 2,2 cm',
        weight: '38 g',
        material: 'Liga nobre antialérgica com banho protetor',
        finish: 'Polimento fino com verniz antioxidante'
      };
    case 'velas':
      return {
        dimensions: '15 cm × 7,5 cm (diâmetro)',
        weight: '420 g',
        material: 'Parafina pura refinada, cera vegetal e pavio de algodão',
        finish: 'Copo de vidro resistente ao calor com rótulo sacro'
      };
    default:
      return {
        dimensions: '18 cm × 14 cm × 10 cm',
        weight: '450 g',
        material: 'Materiais selecionados com curadoria artesanal',
        finish: 'Acabamento fino pronto para presentear'
      };
  }
};

const buildFallbackVariationGroups = ( product: CatalogProduct ): ProductVariationGroup[] => {
  switch ( product.categorySlug ) {
    case 'imagens':
      return [
        {
          id: 'acabamento',
          label: 'Acabamento',
          type: 'swatch',
          options: [
            { id: 'pintura-classica', label: 'Pintura Clássica', swatchHex: '#7A5B32', swatchAccentHex: '#D4B679', priceDelta: 0, skuSuffix: 'PC', inStock: true },
            { id: 'ouro-envelhecido', label: 'Ouro Envelhecido', swatchHex: '#89692C', swatchAccentHex: '#E5CA8C', priceDelta: 15, skuSuffix: 'OE', inStock: true }
          ]
        },
        {
          id: 'tamanho',
          label: 'Altura',
          type: 'pill',
          options: [
            { id: '20cm', label: '20 cm', priceDelta: -25, skuSuffix: '20', inStock: true, dimensions: '20 cm × 10 cm × 8 cm', weight: '460 g' },
            { id: '25cm', label: '25 cm', priceDelta: 0, skuSuffix: '25', inStock: true, dimensions: '25 cm × 13 cm × 10 cm', weight: '780 g' },
            { id: '35cm', label: '35 cm', priceDelta: 55, skuSuffix: '35', inStock: true, dimensions: '35 cm × 18 cm × 13 cm', weight: '1,25 kg' }
          ]
        }
      ];
    case 'camisetas':
      return [
        {
          id: 'cor',
          label: 'Cor da Peça',
          type: 'swatch',
          options: [
            { id: 'off-white', label: 'Off-White Linho', swatchHex: '#F4EFE4', priceDelta: 0, skuSuffix: 'OW', inStock: true },
            { id: 'areia', label: 'Areia Sacra', swatchHex: '#CBB896', priceDelta: 0, skuSuffix: 'AR', inStock: true },
            { id: 'marrom-cafe', label: 'Marrom Café', swatchHex: '#3E321D', priceDelta: 0, skuSuffix: 'MC', inStock: true }
          ]
        },
        {
          id: 'tamanho',
          label: 'Tamanho',
          type: 'pill',
          options: [
            { id: 'p', label: 'P', priceDelta: 0, skuSuffix: 'P', inStock: true, dimensions: 'Altura 68 cm × Largura 50 cm', weight: '210 g' },
            { id: 'm', label: 'M', priceDelta: 0, skuSuffix: 'M', inStock: true, dimensions: 'Altura 71 cm × Largura 53 cm', weight: '230 g' },
            { id: 'g', label: 'G', priceDelta: 0, skuSuffix: 'G', inStock: true, dimensions: 'Altura 74 cm × Largura 56 cm', weight: '250 g' },
            { id: 'gg', label: 'GG', priceDelta: 0, skuSuffix: 'GG', inStock: true, dimensions: 'Altura 77 cm × Largura 59 cm', weight: '270 g' }
          ]
        }
      ];
    default:
      return [];
  }
};

const buildFallbackMedia = ( product: CatalogProduct ): ProductMediaItem[] => {
  const categoryUrls = getCategoryImageUrls( product.categorySlug );
  const candidates = [
    product.imageUrl,
    product.hoverImageUrl,
    ...categoryUrls,
    ...SHARED_GALLERY_POOL,
    DUMMY_PRIMARY_IMAGE,
    DUMMY_HOVER_IMAGE
  ];

  const uniqueUrls: string[] = [];
  for ( const url of candidates ) {
    if ( url && !uniqueUrls.includes( url ) ) {
      uniqueUrls.push( url );
    }
    if ( uniqueUrls.length >= 5 ) {
      break;
    }
  }

  const captions = [
    `${ product.categoryLabel } · Curadoria Sagrada Família`,
    'Vista complementar de acabamento e proporções',
    `Inspiração devocional: ${ product.devotionLabel }`,
    'Detalhe preparado para ambientes de oração',
    'Embalagem protetora pronta para envio seguro'
  ];

  return uniqueUrls.map( ( url, index ) => ( {
    id: `${ product.id }-media-${ index + 1 }`,
    url,
    alt: `${ product.name } — Foto ${ index + 1 }`,
    caption: captions[ index ]
  } ) );
};

const SCENARIO_CATEGORY_MATCHERS: { pattern: RegExp; categorySlug: string }[] = [
  { pattern: /b[íi]blia/i, categorySlug: 'biblias-e-livros' },
  { pattern: /vela/i, categorySlug: 'velas' },
  { pattern: /ter[çc]o/i, categorySlug: 'tercos' },
  { pattern: /escapul[áa]rio/i, categorySlug: 'acessorios' },
  { pattern: /crucifixo/i, categorySlug: 'decoracao' }
];

const createScenarioCatalogProduct = ( scenarioProduct: Product, scenarioTitle: string ): CatalogProduct => {
  const categorySlug = SCENARIO_CATEGORY_MATCHERS.find( ( item ) => item.pattern.test( scenarioProduct.name ) )?.categorySlug ?? 'imagens';
  const category = catalogCategories.find( ( item ) => item.slug === categorySlug );
  const devotionSlug = scenarioTitle.toLowerCase().includes( 'bento' ) ? 'sao-bento' : 'sagrada-familia';
  const devotionLabel = devotionSlug === 'sao-bento' ? 'São Bento' : 'Sagrada Família';

  return {
    ...scenarioProduct,
    categorySlug,
    categoryLabel: category?.label ?? 'Artigos Sacros',
    subCategorySlug: category?.subCategories[ 0 ]?.slug ?? categorySlug,
    subCategoryLabel: category?.subCategories[ 0 ]?.label ?? 'Seleção Especial',
    devotionSlug,
    devotionLabel,
    attributes: {},
    salesRank: 15,
    createdOrder: 15,
    isSeasonalNatal: devotionSlug === 'sagrada-familia'
  };
};

const resolveCatalogProductBySlug = ( slug: string ): CatalogProduct | null => {
  const fromCatalog = catalogProducts.find( ( item ) => item.slug === slug );
  if ( fromCatalog ) {
    return fromCatalog;
  }

  for ( const scenario of devotionScenarios ) {
    const match = scenario.products.find( ( item ) => item.slug === slug );
    if ( match ) {
      return createScenarioCatalogProduct( match, scenario.title );
    }
  }

  return null;
};

export const getProductDetailBySlug = ( slug: string ): ProductEditorialDetail | null => {
  const product = resolveCatalogProductBySlug( slug );
  if ( !product ) {
    return null;
  }

  const flagship = FLAGSHIP_OVERRIDES[ slug ];
  const defaults = getDefaultSpecsForCategory( product );
  const prefix = CATEGORY_SKU_PREFIX[ product.categorySlug ] ?? 'ART';
  const numericCode = String( ( product.createdOrder * 17 + 104 ) % 900 + 100 );

  return {
    product,
    sku: flagship?.sku ?? `SF-${ prefix }-${ numericCode }`,
    shortDescription: DUMMY_SHORT_DESCRIPTION,
    fullDescriptionParagraphs: DUMMY_FULL_DESCRIPTION_PARAGRAPHS,
    media: flagship?.media ?? buildFallbackMedia( product ),
    variationGroups: flagship?.variationGroups ?? buildFallbackVariationGroups( product ),
    baseSpecs: flagship?.baseSpecs ?? [
      { label: 'Material', value: defaults.material },
      { label: 'Acabamento', value: defaults.finish },
      { label: 'Dimensões', value: defaults.dimensions },
      { label: 'Peso aproximado', value: defaults.weight }
    ],
    careInstructions: DUMMY_CARE_INSTRUCTIONS
  };
};

export const getSimilarProducts = ( product: CatalogProduct, limit = 8 ): CatalogProduct[] => {
  const sameCategory = catalogProducts.filter(
    ( item ) => item.id !== product.id && item.categorySlug === product.categorySlug
  );

  sameCategory.sort( ( a, b ) => {
    const aSameSub = a.subCategorySlug === product.subCategorySlug ? 0 : 1;
    const bSameSub = b.subCategorySlug === product.subCategorySlug ? 0 : 1;
    return aSameSub - bSameSub || a.salesRank - b.salesRank;
  } );

  if ( sameCategory.length >= limit ) {
    return sameCategory.slice( 0, limit );
  }

  const fallbackPool = catalogProducts.filter(
    ( item ) => item.id !== product.id && item.categorySlug !== product.categorySlug
  );

  return [ ...sameCategory, ...fallbackPool ].slice( 0, limit );
};

export const getPopularProducts = ( product: CatalogProduct, excludeIds: Set<string>, limit = 8 ): CatalogProduct[] => {
  const candidates = catalogProducts.filter(
    ( item ) => item.id !== product.id && !excludeIds.has( item.id )
  );

  candidates.sort( ( a, b ) => {
    const aBestSeller = a.homeSection === 'best-seller' ? 0 : 1;
    const bBestSeller = b.homeSection === 'best-seller' ? 0 : 1;
    return aBestSeller - bBestSeller || a.salesRank - b.salesRank;
  } );

  return candidates.slice( 0, limit );
};

interface CepRegionProfile {
  cityLabel: string;
  pacPrice: number;
  pacDays: string;
  carrierPrice: number;
  carrierDays: string;
  sedexPrice: number;
  sedexDays: string;
}

const CEP_REGION_BY_PREFIX: Record<string, CepRegionProfile> = {
  0: { cityLabel: 'São Paulo e Região - SP', pacPrice: 16.9, pacDays: '3 a 5 dias úteis', carrierPrice: 21.9, carrierDays: '2 a 4 dias úteis', sedexPrice: 27.9, sedexDays: '1 a 2 dias úteis' },
  1: { cityLabel: 'Interior de São Paulo - SP', pacPrice: 18.9, pacDays: '4 a 6 dias úteis', carrierPrice: 23.9, carrierDays: '3 a 4 dias úteis', sedexPrice: 31.9, sedexDays: '2 a 3 dias úteis' },
  2: { cityLabel: 'Rio de Janeiro e Região - RJ', pacPrice: 19.9, pacDays: '4 a 6 dias úteis', carrierPrice: 24.9, carrierDays: '3 a 5 dias úteis', sedexPrice: 33.9, sedexDays: '2 a 3 dias úteis' },
  3: { cityLabel: 'Belo Horizonte e Região - MG', pacPrice: 19.9, pacDays: '4 a 6 dias úteis', carrierPrice: 24.9, carrierDays: '3 a 5 dias úteis', sedexPrice: 34.5, sedexDays: '2 a 3 dias úteis' },
  4: { cityLabel: 'Salvador e Nordeste - BA', pacPrice: 27.9, pacDays: '7 a 10 dias úteis', carrierPrice: 34.9, carrierDays: '5 a 7 dias úteis', sedexPrice: 49.9, sedexDays: '3 a 5 dias úteis' },
  5: { cityLabel: 'Recife e Nordeste - PE', pacPrice: 29.9, pacDays: '8 a 11 dias úteis', carrierPrice: 36.9, carrierDays: '6 a 8 dias úteis', sedexPrice: 54.9, sedexDays: '3 a 5 dias úteis' },
  6: { cityLabel: 'Fortaleza e Norte/Nordeste - CE', pacPrice: 32.9, pacDays: '9 a 12 dias úteis', carrierPrice: 39.9, carrierDays: '6 a 9 dias úteis', sedexPrice: 59.9, sedexDays: '4 a 6 dias úteis' },
  7: { cityLabel: 'Brasília e Centro-Oeste - DF', pacPrice: 22.9, pacDays: '5 a 7 dias úteis', carrierPrice: 27.9, carrierDays: '4 a 5 dias úteis', sedexPrice: 38.9, sedexDays: '2 a 4 dias úteis' },
  8: { cityLabel: 'Curitiba e Região - PR', pacPrice: 14.9, pacDays: '2 a 4 dias úteis', carrierPrice: 18.9, carrierDays: '2 a 3 dias úteis', sedexPrice: 24.9, sedexDays: '1 a 2 dias úteis' },
  9: { cityLabel: 'Porto Alegre e Sul - RS', pacPrice: 18.9, pacDays: '4 a 6 dias úteis', carrierPrice: 22.9, carrierDays: '3 a 4 dias úteis', sedexPrice: 31.9, sedexDays: '2 a 3 dias úteis' }
};

export const formatCep = ( rawValue: string ): string => {
  const digits = rawValue.replace( /\D/g, '' ).slice( 0, 8 );
  if ( digits.length <= 5 ) {
    return digits;
  }

  return `${ digits.slice( 0, 5 ) }-${ digits.slice( 5 ) }`;
};

export const calculateMockShipping = ( rawCep: string, orderSubtotal: number ): ShippingQuoteResult | null => {
  const digits = rawCep.replace( /\D/g, '' );
  if ( digits.length !== 8 ) {
    return null;
  }

  const firstDigit = digits.charAt( 0 );
  const profile = CEP_REGION_BY_PREFIX[ firstDigit ] ?? CEP_REGION_BY_PREFIX[ '0' ]!;
  const unlockedFreeShipping = orderSubtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max( 0, +( FREE_SHIPPING_THRESHOLD - orderSubtotal ).toFixed( 2 ) );

  return {
    cepFormatted: `${ digits.slice( 0, 5 ) }-${ digits.slice( 5 ) }`,
    cityLabel: profile.cityLabel,
    remainingForFreeShipping,
    options: [
      {
        id: 'pac',
        carrier: 'Correios PAC',
        service: 'Envio Econômico',
        deliveryWindow: profile.pacDays,
        price: unlockedFreeShipping ? 0 : profile.pacPrice,
        originalPrice: unlockedFreeShipping ? profile.pacPrice : undefined,
        isFree: unlockedFreeShipping,
        badge: unlockedFreeShipping ? 'Frete Grátis' : undefined,
        note: unlockedFreeShipping
          ? `Liberado em compras acima de ${ formatCurrency( FREE_SHIPPING_THRESHOLD ) }`
          : 'Rastreamento completo até a entrega'
      },
      {
        id: 'transportadora',
        carrier: 'Transportadora Protegida',
        service: 'Entrega Especializada',
        deliveryWindow: profile.carrierDays,
        price: profile.carrierPrice,
        isFree: false,
        note: 'Manuseio cuidadoso para esculturas e peças frágeis'
      },
      {
        id: 'sedex',
        carrier: 'Correios SEDEX',
        service: 'Envio Expresso',
        deliveryWindow: profile.sedexDays,
        price: profile.sedexPrice,
        isFree: false,
        badge: 'Mais rápido',
        note: 'Prioridade na postagem e trânsito acelerado'
      }
    ]
  };
};
