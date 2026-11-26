export type ProductStatus = 'active' | 'draft' | 'archived';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface AdminSubCategoryOption {
  slug: string;
  label: string;
}

export interface AdminCategoryOption {
  slug: string;
  label: string;
  subCategories: AdminSubCategoryOption[];
}

export interface AdminProduct {
  id: string;
  sku: string;
  name: string;
  slug: string;
  imageUrl: string;
  categorySlug: string;
  categoryLabel: string;
  subCategorySlug: string;
  subCategoryLabel: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: ProductStatus;
  variationCount: number;
  variationSummary?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductStatusMeta {
  value: ProductStatus;
  label: string;
  badgeClass: string;
  dotClass: string;
}

export interface StockStatusMeta {
  value: StockStatus;
  label: string;
  shortLabel: string;
  badgeClass: string;
  dotClass: string;
}

export const LOW_STOCK_THRESHOLD = 5;
export const PIX_DISCOUNT_RATE = 0.05;

export const adminCategories: AdminCategoryOption[] = [
  {
    slug: 'imagens',
    label: 'Imagens',
    subCategories: [
      { slug: 'presepios', label: 'Presépios' },
      { slug: 'sagrada-familia', label: 'Sagrada Família' },
      { slug: 'nossa-senhora', label: 'Nossa Senhora' },
      { slug: 'santos-de-devocao', label: 'Santos de Devoção' },
      { slug: 'anjos', label: 'Anjos' }
    ]
  },
  {
    slug: 'tercos',
    label: 'Terços',
    subCategories: [
      { slug: 'tercos-tradicionais', label: 'Terços Tradicionais' },
      { slug: 'tercos-de-pulso', label: 'Terços de Pulso' },
      { slug: 'rosarios', label: 'Rosários' },
      { slug: 'dezenas', label: 'Dezenas' },
      { slug: 'tercos-infantis', label: 'Terços Infantis' }
    ]
  },
  {
    slug: 'biblias-e-livros',
    label: 'Bíblias & Livros',
    subCategories: [
      { slug: 'espiritualidade', label: 'Espiritualidade' },
      { slug: 'familia-e-casais', label: 'Família e Casais' },
      { slug: 'santos-e-biografias', label: 'Santos e Biografias' },
      { slug: 'catequese', label: 'Catequese' },
      { slug: 'oracoes-e-novenas', label: 'Orações e Novenas' }
    ]
  },
  {
    slug: 'decoracao',
    label: 'Decoração',
    subCategories: [
      { slug: 'enfeites-de-porta', label: 'Enfeites de Porta' },
      { slug: 'mandalas', label: 'Mandalas' },
      { slug: 'crucifixos-de-parede', label: 'Crucifixos de Parede' },
      { slug: 'capelinhas', label: 'Capelinhas' },
      { slug: 'quadros', label: 'Quadros' }
    ]
  },
  {
    slug: 'camisetas',
    label: 'Camisetas',
    subCategories: [
      { slug: 'santissima-trindade', label: 'Santíssima Trindade' },
      { slug: 'nossa-senhora', label: 'Nossa Senhora' },
      { slug: 'santos', label: 'Santos' },
      { slug: 'frases-biblicas', label: 'Frases Bíblicas' }
    ]
  },
  {
    slug: 'acessorios',
    label: 'Acessórios',
    subCategories: [
      { slug: 'pulseiras', label: 'Pulseiras' },
      { slug: 'escapularios', label: 'Escapulários de Porta e Pessoal' },
      { slug: 'medalhas', label: 'Medalhas' },
      { slug: 'correntes', label: 'Correntes' }
    ]
  },
  {
    slug: 'velas',
    label: 'Velas',
    subCategories: [
      { slug: 'velas-de-7-dias', label: 'Velas de 7 Dias' },
      { slug: 'velas-votivas', label: 'Velas Votivas (Palito)' },
      { slug: 'velas-perfumadas', label: 'Velas Perfumadas' }
    ]
  },
  {
    slug: 'presentes',
    label: 'Presentes',
    subCategories: [
      { slug: 'canecas', label: 'Canecas' },
      { slug: 'chaveiros', label: 'Chaveiros' },
      { slug: 'marcadores-de-pagina', label: 'Marcadores de Página' }
    ]
  }
];

export const PRODUCT_STATUS_META: Record<ProductStatus, ProductStatusMeta> = {
  active: {
    value: 'active',
    label: 'Publicado',
    badgeClass: 'border-emerald-600/30 bg-emerald-500/10 text-emerald-800',
    dotClass: 'bg-emerald-600'
  },
  draft: {
    value: 'draft',
    label: 'Rascunho',
    badgeClass: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-800',
    dotClass: 'bg-indigo-600'
  },
  archived: {
    value: 'archived',
    label: 'Arquivado',
    badgeClass: 'border-slate-400/50 bg-slate-200/75 text-slate-700',
    dotClass: 'bg-slate-500'
  }
};

export const STOCK_STATUS_META: Record<StockStatus, StockStatusMeta> = {
  in_stock: {
    value: 'in_stock',
    label: 'Em estoque',
    shortLabel: 'Em estoque',
    badgeClass: 'border-emerald-600/25 bg-emerald-500/10 text-emerald-800',
    dotClass: 'bg-emerald-600'
  },
  low_stock: {
    value: 'low_stock',
    label: 'Estoque baixo',
    shortLabel: 'Baixo',
    badgeClass: 'border-amber-600/35 bg-amber-500/15 text-amber-900',
    dotClass: 'bg-amber-600'
  },
  out_of_stock: {
    value: 'out_of_stock',
    label: 'Esgotado',
    shortLabel: 'Esgotado',
    badgeClass: 'border-destructive/35 bg-destructive/10 text-destructive',
    dotClass: 'bg-destructive'
  }
};

interface MockProductSeed {
  id: string;
  sku: string;
  name: string;
  slug: string;
  imageUrl: string;
  categorySlug: string;
  subCategorySlug: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: ProductStatus;
  variationCount: number;
  variationSummary?: string;
  createdDaysAgo: number;
  updatedDaysAgo: number;
}

const IMG = {
  resinaClassica: 'https://images.unsplash.com/photo-1559005446-facbaebc2537?auto=format&fit=crop&w=400&q=80',
  natal: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=400&q=80',
  escultura: 'https://images.unsplash.com/photo-1564965176772-f7ad1035e947?auto=format&fit=crop&w=400&q=80',
  tercoMadeira: 'https://images.unsplash.com/photo-1561738506-604920ddde0b?auto=format&fit=crop&w=400&q=80',
  tercoCristal: 'https://images.unsplash.com/photo-1569845177077-2a37322a60c7?auto=format&fit=crop&w=400&q=80',
  biblia: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=400&q=80',
  livros: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80',
  parede: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
  ambiente: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=400&q=80',
  camiseta1: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
  camiseta2: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
  acessorio1: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80',
  acessorio2: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
  vela1: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=400&q=80',
  vela2: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?auto=format&fit=crop&w=400&q=80',
  presente1: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=400&q=80',
  presente2: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=400&q=80'
};

const DAY_MS = 86_400_000;
const MINUTE_MS = 60_000;

const daysAgoIso = ( daysAgo: number, baseMs: number, offsetMinutes = 0 ): string => {
  return new Date( baseMs - daysAgo * DAY_MS - offsetMinutes * MINUTE_MS ).toISOString();
};

const MOCK_SEEDS: MockProductSeed[] = [
  {
    id: 'prod-01',
    sku: 'SF-IMG-001',
    name: 'Imagem Sagrada Família em Resina Importada 30cm',
    slug: 'imagem-sagrada-familia-resina-30cm',
    imageUrl: IMG.resinaClassica,
    categorySlug: 'imagens',
    subCategorySlug: 'sagrada-familia',
    price: 189.9,
    originalPrice: 239.9,
    stock: 18,
    status: 'active',
    variationCount: 3,
    variationSummary: 'Pintura Clássica, Ouro Envelhecido, Marfim Sacro',
    createdDaysAgo: 120,
    updatedDaysAgo: 1
  },
  {
    id: 'prod-02',
    sku: 'SF-TER-002',
    name: 'Terço de São Bento em Madeira Nobre com Entremeio Dourado',
    slug: 'terco-sao-bento-madeira-nobre',
    imageUrl: IMG.tercoMadeira,
    categorySlug: 'tercos',
    subCategorySlug: 'tercos-tradicionais',
    price: 49.9,
    stock: 34,
    status: 'active',
    variationCount: 2,
    variationSummary: 'Imbuia Escura, Nogueira Clara',
    createdDaysAgo: 95,
    updatedDaysAgo: 2
  },
  {
    id: 'prod-03',
    sku: 'SF-BIB-003',
    name: 'Bíblia Sagrada Edição Pastoral Letra Grande Capa Dura',
    slug: 'biblia-sagrada-edicao-pastoral',
    imageUrl: IMG.biblia,
    categorySlug: 'biblias-e-livros',
    subCategorySlug: 'espiritualidade',
    price: 94.9,
    originalPrice: 119.9,
    stock: 4,
    status: 'active',
    variationCount: 2,
    variationSummary: 'Marrom Café, Bordô Litúrgico',
    createdDaysAgo: 140,
    updatedDaysAgo: 3
  },
  {
    id: 'prod-04',
    sku: 'SF-IMG-004',
    name: 'Imagem Nossa Senhora Aparecida Manto Azul em Resina 25cm',
    slug: 'imagem-nossa-senhora-aparecida-resina-25cm',
    imageUrl: IMG.natal,
    categorySlug: 'imagens',
    subCategorySlug: 'nossa-senhora',
    price: 150.0,
    stock: 12,
    status: 'active',
    variationCount: 0,
    createdDaysAgo: 64,
    updatedDaysAgo: 4
  },
  {
    id: 'prod-05',
    sku: 'SF-VEL-005',
    name: 'Vela Votiva Perfumada de 7 Dias Sagrada Família no Copo',
    slug: 'vela-votiva-perfumada-sete-dias',
    imageUrl: IMG.vela1,
    categorySlug: 'velas',
    subCategorySlug: 'velas-de-7-dias',
    price: 29.9,
    originalPrice: 36.9,
    stock: 42,
    status: 'active',
    variationCount: 3,
    variationSummary: 'Mirra & Incenso, Lavanda Suave, Sem Perfume',
    createdDaysAgo: 45,
    updatedDaysAgo: 5
  },
  {
    id: 'prod-06',
    sku: 'SF-DEC-006',
    name: 'Crucifixo de Parede São Damião em Madeira Maciça 35cm',
    slug: 'crucifixo-de-parede-sao-damiao',
    imageUrl: IMG.parede,
    categorySlug: 'decoracao',
    subCategorySlug: 'crucifixos-de-parede',
    price: 129.9,
    stock: 2,
    status: 'active',
    variationCount: 2,
    variationSummary: '25cm, 35cm',
    createdDaysAgo: 82,
    updatedDaysAgo: 6
  },
  {
    id: 'prod-07',
    sku: 'SF-IMG-007',
    name: 'Presépio de Natal Completo 11 Peças em Resina Clássica 20cm',
    slug: 'presepio-natal-resina-11-pecas-20cm',
    imageUrl: IMG.natal,
    categorySlug: 'imagens',
    subCategorySlug: 'presepios',
    price: 389.9,
    originalPrice: 469.9,
    stock: 0,
    status: 'active',
    variationCount: 2,
    variationSummary: 'Pintura Clássica, Acabamento Perolado',
    createdDaysAgo: 28,
    updatedDaysAgo: 6
  },
  {
    id: 'prod-08',
    sku: 'SF-IMG-008',
    name: 'Imagem São Miguel Arcanjo Pintura Clássica em Resina 25cm',
    slug: 'imagem-sao-miguel-arcanjo-25cm',
    imageUrl: IMG.escultura,
    categorySlug: 'imagens',
    subCategorySlug: 'santos-de-devocao',
    price: 169.9,
    originalPrice: 215.0,
    stock: 9,
    status: 'active',
    variationCount: 0,
    createdDaysAgo: 53,
    updatedDaysAgo: 8
  },
  {
    id: 'prod-09',
    sku: 'SF-DEC-009',
    name: 'Capelinha de Madeira com Imagem Nossa Senhora das Graças',
    slug: 'capelinha-madeira-nossa-senhora-das-gracas',
    imageUrl: IMG.ambiente,
    categorySlug: 'decoracao',
    subCategorySlug: 'capelinhas',
    price: 89.9,
    stock: 15,
    status: 'active',
    variationCount: 0,
    createdDaysAgo: 70,
    updatedDaysAgo: 10
  },
  {
    id: 'prod-10',
    sku: 'SF-IMG-010',
    name: 'Imagem Santa Teresinha do Menino Jesus em Resina 20cm',
    slug: 'imagem-santa-teresinha-resina-20cm',
    imageUrl: IMG.resinaClassica,
    categorySlug: 'imagens',
    subCategorySlug: 'santos-de-devocao',
    price: 119.9,
    originalPrice: 149.9,
    stock: 3,
    status: 'active',
    variationCount: 0,
    createdDaysAgo: 105,
    updatedDaysAgo: 11
  },
  {
    id: 'prod-11',
    sku: 'SF-ACE-011',
    name: 'Escapulário de Porta Sagrada Família em Madeira e Resina',
    slug: 'escapulario-de-porta-sagrada-familia',
    imageUrl: IMG.acessorio2,
    categorySlug: 'acessorios',
    subCategorySlug: 'escapularios',
    price: 59.9,
    stock: 22,
    status: 'active',
    variationCount: 0,
    createdDaysAgo: 38,
    updatedDaysAgo: 12
  },
  {
    id: 'prod-12',
    sku: 'SF-TER-012',
    name: 'Terço em Cristal e Pérola com Entremeio Nossa Senhora Aparecida',
    slug: 'terco-cristal-tcheco-perola-banhado-ouro',
    imageUrl: IMG.tercoCristal,
    categorySlug: 'tercos',
    subCategorySlug: 'rosarios',
    price: 64.9,
    originalPrice: 89.9,
    stock: 14,
    status: 'active',
    variationCount: 2,
    variationSummary: 'Pérola Branca, Cristal Champagne',
    createdDaysAgo: 21,
    updatedDaysAgo: 14
  },
  {
    id: 'prod-13',
    sku: 'SF-BIB-013',
    name: 'Bíblia de Jerusalém Edição Especial Capa Sintética com Zíper',
    slug: 'biblia-de-jerusalem-capa-luxo-ziper',
    imageUrl: IMG.biblia,
    categorySlug: 'biblias-e-livros',
    subCategorySlug: 'espiritualidade',
    price: 149.9,
    originalPrice: 189.9,
    stock: 0,
    status: 'active',
    variationCount: 0,
    createdDaysAgo: 62,
    updatedDaysAgo: 15
  },
  {
    id: 'prod-14',
    sku: 'SF-DEC-014',
    name: 'Mandala Divino Espírito Santo em Madeira e Resina para Parede 30cm',
    slug: 'mandala-divino-espirito-santo-mdf-30cm',
    imageUrl: IMG.parede,
    categorySlug: 'decoracao',
    subCategorySlug: 'mandalas',
    price: 79.9,
    originalPrice: 109.9,
    stock: 11,
    status: 'active',
    variationCount: 2,
    variationSummary: 'Branco Provençal, Dourado Antigo',
    createdDaysAgo: 19,
    updatedDaysAgo: 17
  },
  {
    id: 'prod-15',
    sku: 'SF-CAM-015',
    name: 'Camiseta Católica Medalha de São Bento 100% Algodão Estonada',
    slug: 'camiseta-catolica-medalha-sao-bento-algodao',
    imageUrl: IMG.camiseta1,
    categorySlug: 'camisetas',
    subCategorySlug: 'santos',
    price: 69.9,
    originalPrice: 89.9,
    stock: 27,
    status: 'active',
    variationCount: 6,
    variationSummary: 'P/M/G/GG em Marrom Café e Off-White',
    createdDaysAgo: 44,
    updatedDaysAgo: 18
  },
  {
    id: 'prod-16',
    sku: 'SF-CAM-016',
    name: 'Camiseta Sagrada Família de Nazaré Algodão Penteado Areia',
    slug: 'camiseta-sagrada-familia-bege-minimalista',
    imageUrl: IMG.camiseta2,
    categorySlug: 'camisetas',
    subCategorySlug: 'santissima-trindade',
    price: 79.9,
    stock: 5,
    status: 'active',
    variationCount: 4,
    variationSummary: 'P, M, G, GG',
    createdDaysAgo: 16,
    updatedDaysAgo: 19
  },
  {
    id: 'prod-17',
    sku: 'SF-ACE-017',
    name: 'Colar Escapulário São Miguel Arcanjo em Aço Inox Dourado',
    slug: 'escapulario-medalha-sao-miguel-arcanjo-aco',
    imageUrl: IMG.acessorio1,
    categorySlug: 'acessorios',
    subCategorySlug: 'medalhas',
    price: 54.9,
    originalPrice: 74.9,
    stock: 19,
    status: 'active',
    variationCount: 0,
    createdDaysAgo: 58,
    updatedDaysAgo: 21
  },
  {
    id: 'prod-18',
    sku: 'SF-PRE-018',
    name: 'Caneca de Porcelana Santa Teresinha Chuva de Rosas 325ml',
    slug: 'caneca-porcelana-santa-teresinha-chuva-de-rosas',
    imageUrl: IMG.presente1,
    categorySlug: 'presentes',
    subCategorySlug: 'canecas',
    price: 39.9,
    originalPrice: 54.9,
    stock: 25,
    status: 'active',
    variationCount: 0,
    createdDaysAgo: 73,
    updatedDaysAgo: 22
  },
  {
    id: 'prod-19',
    sku: 'SF-VEL-019',
    name: 'Kit com 3 Velas Votivas Perfumadas Títulos de Nossa Senhora',
    slug: 'kit-3-velas-votivas-devocao-mariana',
    imageUrl: IMG.vela2,
    categorySlug: 'velas',
    subCategorySlug: 'velas-perfumadas',
    price: 49.9,
    originalPrice: 69.9,
    stock: 3,
    status: 'active',
    variationCount: 0,
    createdDaysAgo: 31,
    updatedDaysAgo: 24
  },
  {
    id: 'prod-20',
    sku: 'SF-IMG-020',
    name: 'Imagem Nossa Senhora de Guadalupe em Resina Importada 30cm',
    slug: 'imagem-nossa-senhora-de-guadalupe-resina-30cm',
    imageUrl: IMG.escultura,
    categorySlug: 'imagens',
    subCategorySlug: 'nossa-senhora',
    price: 219.9,
    originalPrice: 259.9,
    stock: 7,
    status: 'active',
    variationCount: 2,
    variationSummary: 'Policromia Artesanal, Filetes em Ouro',
    createdDaysAgo: 12,
    updatedDaysAgo: 25
  },
  {
    id: 'prod-21',
    sku: 'SF-TER-021',
    name: 'Terço de São Miguel Arcanjo em Contas de Hematita Grafite',
    slug: 'terco-hematita-sao-miguel-arcanjo',
    imageUrl: IMG.tercoCristal,
    categorySlug: 'tercos',
    subCategorySlug: 'tercos-tradicionais',
    price: 59.9,
    stock: 16,
    status: 'active',
    variationCount: 0,
    createdDaysAgo: 14,
    updatedDaysAgo: 27
  },
  {
    id: 'prod-22',
    sku: 'SF-BIB-022',
    name: 'Bíblia Sagrada da Família Capa Dura com Folha Dourada e Mapas',
    slug: 'biblia-da-familia-capa-dura-dourada',
    imageUrl: IMG.livros,
    categorySlug: 'biblias-e-livros',
    subCategorySlug: 'familia-e-casais',
    price: 169.9,
    originalPrice: 199.9,
    stock: 8,
    status: 'active',
    variationCount: 0,
    createdDaysAgo: 34,
    updatedDaysAgo: 33
  },
  {
    id: 'prod-23',
    sku: 'SF-ACE-023',
    name: 'Pulseira Medalha Milagrosa com Pérolas e Banho de Ouro 18k',
    slug: 'pulseira-nossa-senhora-das-gracas-banho-ouro',
    imageUrl: IMG.acessorio1,
    categorySlug: 'acessorios',
    subCategorySlug: 'pulseiras',
    price: 69.9,
    stock: 2,
    status: 'active',
    variationCount: 2,
    variationSummary: '17cm (P/M), 19cm (G)',
    createdDaysAgo: 48,
    updatedDaysAgo: 39
  },
  {
    id: 'prod-24',
    sku: 'SF-PRE-024',
    name: 'Kit Lembrancinha de Batismo com Dezena e Marcador em Linho',
    slug: 'kit-lembrancinha-batismo-dezena-marcador',
    imageUrl: IMG.presente2,
    categorySlug: 'presentes',
    subCategorySlug: 'marcadores-de-pagina',
    price: 118.0,
    stock: 0,
    status: 'active',
    variationCount: 3,
    variationSummary: 'Kit 10 un., Kit 20 un., Kit 30 un.',
    createdDaysAgo: 88,
    updatedDaysAgo: 46
  },
  {
    id: 'prod-25',
    sku: 'SF-IMG-025',
    name: 'Anjo da Guarda Infantil em Resina Pintura Suave 15cm',
    slug: 'anjo-da-guarda-infantil-resina-15cm',
    imageUrl: IMG.resinaClassica,
    categorySlug: 'imagens',
    subCategorySlug: 'anjos',
    price: 92.9,
    stock: 10,
    status: 'draft',
    variationCount: 2,
    variationSummary: 'Azul Celeste, Rosa Nude',
    createdDaysAgo: 5,
    updatedDaysAgo: 2
  },
  {
    id: 'prod-26',
    sku: 'SF-TER-026',
    name: 'Dezena de Bolso Nossa Senhora de Fátima em Madeira e Metal',
    slug: 'dezena-bolso-nossa-senhora-fatima',
    imageUrl: IMG.tercoMadeira,
    categorySlug: 'tercos',
    subCategorySlug: 'dezenas',
    price: 27.9,
    stock: 40,
    status: 'draft',
    variationCount: 0,
    createdDaysAgo: 9,
    updatedDaysAgo: 5
  },
  {
    id: 'prod-27',
    sku: 'SF-BIB-027',
    name: 'Livro Tratado da Verdadeira Devoção à Santíssima Virgem — Luxo',
    slug: 'livro-tratado-da-verdadeira-devocao-capa-luxo',
    imageUrl: IMG.livros,
    categorySlug: 'biblias-e-livros',
    subCategorySlug: 'santos-e-biografias',
    price: 49.9,
    originalPrice: 64.9,
    stock: 4,
    status: 'draft',
    variationCount: 0,
    createdDaysAgo: 22,
    updatedDaysAgo: 13
  },
  {
    id: 'prod-28',
    sku: 'SF-DEC-028',
    name: 'Quadro Sagrado Coração de Jesus em Moldura Dourada 40x50cm',
    slug: 'quadro-sagrado-coracao-moldura-dourada',
    imageUrl: IMG.ambiente,
    categorySlug: 'decoracao',
    subCategorySlug: 'quadros',
    price: 179.9,
    stock: 6,
    status: 'draft',
    variationCount: 2,
    variationSummary: 'Moldura Dourada, Moldura Carvalho',
    createdDaysAgo: 40,
    updatedDaysAgo: 35
  },
  {
    id: 'prod-29',
    sku: 'SF-CAM-029',
    name: 'Camiseta Baby Look Nossa Senhora das Graças Off-White',
    slug: 'camiseta-baby-look-nossa-senhora-gracas',
    imageUrl: IMG.camiseta2,
    categorySlug: 'camisetas',
    subCategorySlug: 'nossa-senhora',
    price: 74.9,
    stock: 0,
    status: 'draft',
    variationCount: 4,
    variationSummary: 'P, M, G, GG',
    createdDaysAgo: 61,
    updatedDaysAgo: 52
  },
  {
    id: 'prod-30',
    sku: 'SF-VEL-030',
    name: 'Vela Litúrgica do Advento Conjunto com 4 Unidades Coloridas',
    slug: 'vela-liturgica-advento-conjunto-quatro-unidades',
    imageUrl: IMG.vela2,
    categorySlug: 'velas',
    subCategorySlug: 'velas-votivas',
    price: 68.0,
    stock: 1,
    status: 'draft',
    variationCount: 0,
    createdDaysAgo: 74,
    updatedDaysAgo: 64
  },
  {
    id: 'prod-31',
    sku: 'SF-PRE-031',
    name: 'Chaveiro Medalha de São Bento em Couro Legítimo e Latão',
    slug: 'chaveiro-medalha-sao-bento-couro-latao',
    imageUrl: IMG.presente2,
    categorySlug: 'presentes',
    subCategorySlug: 'chaveiros',
    price: 34.9,
    stock: 29,
    status: 'draft',
    variationCount: 2,
    variationSummary: 'Couro Caramelo, Couro Tabaco',
    createdDaysAgo: 85,
    updatedDaysAgo: 78
  },
  {
    id: 'prod-32',
    sku: 'SF-IMG-032',
    name: 'Imagem São José Operário em Pó de Mármore 20cm (Edição Anterior)',
    slug: 'imagem-sao-jose-operario-po-de-marmore-20cm',
    imageUrl: IMG.escultura,
    categorySlug: 'imagens',
    subCategorySlug: 'santos-de-devocao',
    price: 134.9,
    stock: 0,
    status: 'archived',
    variationCount: 0,
    createdDaysAgo: 180,
    updatedDaysAgo: 96
  },
  {
    id: 'prod-33',
    sku: 'SF-TER-033',
    name: 'Terço Infantil Colorido em Silicone Macio Anjinho da Guarda',
    slug: 'terco-infantil-silicone-anjinho-da-guarda',
    imageUrl: IMG.tercoCristal,
    categorySlug: 'tercos',
    subCategorySlug: 'tercos-infantis',
    price: 32.9,
    stock: 13,
    status: 'archived',
    variationCount: 2,
    variationSummary: 'Azul Pastel, Rosa Claro',
    createdDaysAgo: 165,
    updatedDaysAgo: 108
  },
  {
    id: 'prod-34',
    sku: 'SF-BIB-034',
    name: 'Guia Catequético da Primeira Eucaristia — Edição 2024',
    slug: 'guia-catequetico-primeira-eucaristia-2024',
    imageUrl: IMG.livros,
    categorySlug: 'biblias-e-livros',
    subCategorySlug: 'catequese',
    price: 38.9,
    stock: 3,
    status: 'archived',
    variationCount: 0,
    createdDaysAgo: 210,
    updatedDaysAgo: 120
  },
  {
    id: 'prod-35',
    sku: 'SF-CAM-035',
    name: 'Camiseta Evangelizadora Frases Bíblicas Salmo 23 Preta',
    slug: 'camiseta-frases-biblicas-salmo-23-preta',
    imageUrl: IMG.camiseta1,
    categorySlug: 'camisetas',
    subCategorySlug: 'frases-biblicas',
    price: 64.9,
    stock: 8,
    status: 'archived',
    variationCount: 3,
    variationSummary: 'M, G, GG',
    createdDaysAgo: 195,
    updatedDaysAgo: 134
  },
  {
    id: 'prod-36',
    sku: 'SF-ACE-036',
    name: 'Corrente Veneziana Banhada a Ouro 18k 50cm para Medalhas',
    slug: 'corrente-veneziana-banho-ouro-50cm',
    imageUrl: IMG.acessorio2,
    categorySlug: 'acessorios',
    subCategorySlug: 'correntes',
    price: 84.9,
    stock: 21,
    status: 'archived',
    variationCount: 2,
    variationSummary: '45cm, 50cm',
    createdDaysAgo: 240,
    updatedDaysAgo: 150
  }
];

export const getCategoryBySlug = ( slug: string ): AdminCategoryOption | undefined => {
  return adminCategories.find( ( category ) => category.slug === slug );
};

export const getSubCategoryBySlug = ( categorySlug: string, subCategorySlug: string ): AdminSubCategoryOption | undefined => {
  return getCategoryBySlug( categorySlug )?.subCategories.find( ( sub ) => sub.slug === subCategorySlug );
};

export const createMockProducts = (): AdminProduct[] => {
  const baseMs = Date.now();

  return MOCK_SEEDS.map( ( seed, index ) => {
    const category = getCategoryBySlug( seed.categorySlug );
    const subCategory = getSubCategoryBySlug( seed.categorySlug, seed.subCategorySlug );

    return {
      id: seed.id,
      sku: seed.sku,
      name: seed.name,
      slug: seed.slug,
      imageUrl: seed.imageUrl,
      categorySlug: seed.categorySlug,
      categoryLabel: category?.label ?? seed.categorySlug,
      subCategorySlug: seed.subCategorySlug,
      subCategoryLabel: subCategory?.label ?? seed.subCategorySlug,
      price: seed.price,
      originalPrice: seed.originalPrice,
      stock: seed.stock,
      status: seed.status,
      variationCount: seed.variationCount,
      variationSummary: seed.variationSummary,
      createdAt: daysAgoIso( seed.createdDaysAgo, baseMs, ( index * 47 ) % 600 ),
      updatedAt: daysAgoIso( seed.updatedDaysAgo, baseMs, ( index * 73 ) % 360 )
    };
  } );
};

export const findMockProductById = ( id: string ): AdminProduct | undefined => {
  return createMockProducts().find( ( item ) => item.id === id );
};

export const getStockStatus = ( stock: number ): StockStatus => {
  if ( stock <= 0 ) {
    return 'out_of_stock';
  }

  if ( stock <= LOW_STOCK_THRESHOLD ) {
    return 'low_stock';
  }

  return 'in_stock';
};

export const getDiscountPercentage = ( price: number, originalPrice?: number ): number | null => {
  if ( originalPrice === undefined || originalPrice <= price ) {
    return null;
  }

  return Math.round( ( ( originalPrice - price ) / originalPrice ) * 100 );
};

export const getPixPrice = ( price: number ): number => {
  return +( price * ( 1 - PIX_DISCOUNT_RATE ) ).toFixed( 2 );
};

const currencyFormatter = new Intl.NumberFormat( 'pt-BR', {
  style: 'currency',
  currency: 'BRL'
} );

const shortDateFormatter = new Intl.DateTimeFormat( 'pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
} );

const dateTimeFormatter = new Intl.DateTimeFormat( 'pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
} );

const timeFormatter = new Intl.DateTimeFormat( 'pt-BR', {
  hour: '2-digit',
  minute: '2-digit'
} );

const getLocalDayStartMs = ( date: Date ): number => {
  return new Date( date.getFullYear(), date.getMonth(), date.getDate() ).getTime();
};

export const formatCurrency = ( value: number ): string => {
  return currencyFormatter.format( value );
};

export const formatShortDate = ( isoDate: string ): string => {
  return shortDateFormatter.format( new Date( isoDate ) );
};

export const formatDateTime = ( isoDate: string ): string => {
  return dateTimeFormatter.format( new Date( isoDate ) );
};

export const formatTime = ( isoDate: string ): string => {
  return timeFormatter.format( new Date( isoDate ) );
};

export const formatRelativeTimespan = ( isoDate: string ): string => {
  const todayStart = getLocalDayStartMs( new Date() );
  const targetStart = getLocalDayStartMs( new Date( isoDate ) );
  const diffDays = Math.max( 0, Math.round( ( todayStart - targetStart ) / DAY_MS ) );

  if ( diffDays === 0 ) {
    return 'hoje';
  }

  if ( diffDays === 1 ) {
    return 'ontem';
  }

  if ( diffDays < 30 ) {
    return `há ${ diffDays } dias`;
  }

  const diffMonths = Math.floor( diffDays / 30 );

  if ( diffMonths === 1 ) {
    return 'há 1 mês';
  }

  if ( diffMonths < 12 ) {
    return `há ${ diffMonths } meses`;
  }

  const diffYears = Math.floor( diffDays / 365 );

  return diffYears <= 1 ? 'há 1 ano' : `há ${ diffYears } anos`;
};

export const getProductStatusMeta = ( status: ProductStatus ): ProductStatusMeta => {
  return PRODUCT_STATUS_META[ status ];
};

export const getStockStatusMeta = ( stock: number ): StockStatusMeta => {
  return STOCK_STATUS_META[ getStockStatus( stock ) ];
};
