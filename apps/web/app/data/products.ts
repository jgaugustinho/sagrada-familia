export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  maxInstallments: number;
  imageUrl: string;
  hoverImageUrl: string;
  imageAlt: string;
}

export const PIX_DISCOUNT_RATE = 0.05;

export const DUMMY_PRIMARY_IMAGE = 'https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=800&h=800&q=80';
export const DUMMY_HOVER_IMAGE = 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&h=800&q=80';

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

export const bestSellerProducts: Product[] = [
  {
    id: 'prod-sagrada-familia-30cm',
    slug: 'imagem-sagrada-familia-resina-30cm',
    name: 'Imagem Sagrada Família em Resina Importada 30cm',
    price: 189.9,
    originalPrice: 239.9,
    maxInstallments: 6,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Imagem Sagrada Família em Resina Importada 30cm'
  },
  {
    id: 'prod-terco-sao-bento-madeira',
    slug: 'terco-sao-bento-madeira-nobre',
    name: 'Terço de São Bento em Madeira Nobre com Entremeio Dourado',
    price: 49.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Terço de São Bento em Madeira Nobre com Entremeio Dourado'
  },
  {
    id: 'prod-biblia-pastoral-capa-dura',
    slug: 'biblia-sagrada-edicao-pastoral',
    name: 'Bíblia Sagrada Edição Pastoral Letra Grande Capa Dura',
    price: 94.9,
    originalPrice: 119.9,
    maxInstallments: 3,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Bíblia Sagrada Edição Pastoral Letra Grande Capa Dura'
  },
  {
    id: 'prod-nossa-senhora-aparecida-25cm',
    slug: 'imagem-nossa-senhora-aparecida-resina-25cm',
    name: 'Imagem Nossa Senhora Aparecida Manto Azul em Resina 25cm',
    price: 150.0,
    maxInstallments: 3,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Imagem Nossa Senhora Aparecida Manto Azul em Resina 25cm'
  },
  {
    id: 'prod-vela-votiva-sete-dias',
    slug: 'vela-votiva-perfumada-sete-dias',
    name: 'Vela Votiva Perfumada de 7 Dias Sagrada Família no Copo',
    price: 29.9,
    originalPrice: 36.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Vela Votiva Perfumada de 7 Dias Sagrada Família no Copo'
  },
  {
    id: 'prod-crucifixo-sao-damiao',
    slug: 'crucifixo-de-parede-sao-damiao',
    name: 'Crucifixo de Parede São Damião em Madeira Maciça 35cm',
    price: 129.9,
    maxInstallments: 4,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Crucifixo de Parede São Damião em Madeira Maciça 35cm'
  },
  {
    id: 'prod-sao-miguel-arcanjo-25cm',
    slug: 'imagem-sao-miguel-arcanjo-25cm',
    name: 'Imagem São Miguel Arcanjo Pintura Clássica em Resina 25cm',
    price: 169.9,
    originalPrice: 215.0,
    maxInstallments: 5,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Imagem São Miguel Arcanjo Pintura Clássica em Resina 25cm'
  },
  {
    id: 'prod-capelinha-nossa-senhora-gracas',
    slug: 'capelinha-madeira-nossa-senhora-das-gracas',
    name: 'Capelinha de Madeira com Imagem Nossa Senhora das Graças',
    price: 89.9,
    maxInstallments: 3,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Capelinha de Madeira com Imagem Nossa Senhora das Graças'
  },
  {
    id: 'prod-santa-teresinha-20cm',
    slug: 'imagem-santa-teresinha-resina-20cm',
    name: 'Imagem Santa Teresinha do Menino Jesus em Resina 20cm',
    price: 119.9,
    originalPrice: 149.9,
    maxInstallments: 4,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Imagem Santa Teresinha do Menino Jesus em Resina 20cm'
  },
  {
    id: 'prod-escapulario-porta-sagrada-familia',
    slug: 'escapulario-de-porta-sagrada-familia',
    name: 'Escapulário de Porta Sagrada Família em Madeira e Resina',
    price: 59.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Escapulário de Porta Sagrada Família em Madeira e Resina'
  }
];
