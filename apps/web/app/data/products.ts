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

export const seasonalProducts: Product[] = [
  {
    id: 'prod-natal-presepio-11-pecas',
    slug: 'presepio-natal-resina-11-pecas-20cm',
    name: 'Presépio de Natal Completo 11 Peças em Resina Pintura Clássica 20cm',
    price: 389.9,
    originalPrice: 469.9,
    maxInstallments: 10,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Presépio de Natal Completo 11 Peças em Resina Pintura Clássica 20cm'
  },
  {
    id: 'prod-natal-casa-iluminada',
    slug: 'casa-sagrada-familia-natal-iluminada',
    name: 'Casa da Sagrada Família Iluminada em Madeira Rústica para Presépio',
    price: 229.9,
    maxInstallments: 6,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Casa da Sagrada Família Iluminada em Madeira Rústica para Presépio'
  },
  {
    id: 'prod-natal-menino-jesus-manjedoura',
    slug: 'menino-jesus-na-manjedoura-resina-18cm',
    name: 'Menino Jesus na Manjedoura em Resina com Palha Natural 18cm',
    price: 119.9,
    originalPrice: 149.9,
    maxInstallments: 4,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Menino Jesus na Manjedoura em Resina com Palha Natural 18cm'
  },
  {
    id: 'prod-natal-coroa-advento-velas',
    slug: 'coroa-do-advento-com-quatro-velas-liturgicas',
    name: 'Coroa do Advento Aramada Dourada com 4 Velas Litúrgicas',
    price: 139.9,
    maxInstallments: 4,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Coroa do Advento Aramada Dourada com 4 Velas Litúrgicas'
  },
  {
    id: 'prod-natal-sagrada-familia-perolada',
    slug: 'imagem-sagrada-familia-natal-acabamento-perolado',
    name: 'Imagem Sagrada Família Acabamento Perolado com Detalhes em Ouro 25cm',
    price: 199.9,
    originalPrice: 249.9,
    maxInstallments: 6,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Imagem Sagrada Família Acabamento Perolado com Detalhes em Ouro 25cm'
  },
  {
    id: 'prod-natal-guirlanda-porta',
    slug: 'guirlanda-natalina-sagrada-familia-porta',
    name: 'Guirlanda Natalina com Medalhão da Sagrada Família para Porta 35cm',
    price: 149.9,
    maxInstallments: 5,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Guirlanda Natalina com Medalhão da Sagrada Família para Porta 35cm'
  },
  {
    id: 'prod-natal-livro-novena',
    slug: 'livro-novena-de-natal-em-familia',
    name: 'Livro Novena de Natal em Família — Orações e Reflexões do Advento',
    price: 24.9,
    originalPrice: 32.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Livro Novena de Natal em Família — Orações e Reflexões do Advento'
  },
  {
    id: 'prod-natal-enfeite-arvore-estrelas',
    slug: 'kit-enfeites-arvore-natal-simbolos-cristaos',
    name: 'Kit 6 Enfeites de Árvore de Natal em Madeira com Símbolos Cristãos',
    price: 69.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Kit 6 Enfeites de Árvore de Natal em Madeira com Símbolos Cristãos'
  },
  {
    id: 'prod-natal-vela-aromatizada-mirra',
    slug: 'vela-perfumada-natal-incenso-e-mirra',
    name: 'Vela Aromática de Natal Essência de Incenso e Mirra no Vidro',
    price: 54.9,
    originalPrice: 69.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Vela Aromática de Natal Essência de Incenso e Mirra no Vidro'
  },
  {
    id: 'prod-natal-toalha-mesa-belem',
    slug: 'trilho-de-mesa-natalino-estrela-de-belem',
    name: 'Trilho de Mesa Natalino Bordado Estrela de Belém em Algodão 1,80m',
    price: 114.9,
    maxInstallments: 3,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Trilho de Mesa Natalino Bordado Estrela de Belém em Algodão 1,80m'
  }
];

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

export const specialOfferProducts: Product[] = [
  {
    id: 'prod-oferta-nossa-senhora-gracas-30cm',
    slug: 'imagem-nossa-senhora-das-gracas-resina-30cm',
    name: 'Imagem Nossa Senhora das Graças em Resina Pintura Dourada 30cm',
    price: 159.9,
    originalPrice: 219.9,
    maxInstallments: 5,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Imagem Nossa Senhora das Graças em Resina Pintura Dourada 30cm'
  },
  {
    id: 'prod-oferta-terco-cristal-perola',
    slug: 'terco-cristal-tcheco-perola-banhado-ouro',
    name: 'Terço em Cristal e Pérola com Entremeio Nossa Senhora Aparecida',
    price: 64.9,
    originalPrice: 89.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Terço em Cristal e Pérola com Entremeio Nossa Senhora Aparecida'
  },
  {
    id: 'prod-oferta-biblia-jerusalem-capa-couro',
    slug: 'biblia-de-jerusalem-capa-luxo-ziper',
    name: 'Bíblia de Jerusalém Edição Especial Capa Sintética com Zíper',
    price: 149.9,
    originalPrice: 189.9,
    maxInstallments: 5,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Bíblia de Jerusalém Edição Especial Capa Sintética com Zíper'
  },
  {
    id: 'prod-oferta-mandala-espirito-santo',
    slug: 'mandala-divino-espirito-santo-mdf-30cm',
    name: 'Mandala Divino Espírito Santo em Madeira e Resina para Parede 30cm',
    price: 79.9,
    originalPrice: 109.9,
    maxInstallments: 3,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Mandala Divino Espírito Santo em Madeira e Resina para Parede 30cm'
  },
  {
    id: 'prod-oferta-sao-jose-operario-20cm',
    slug: 'imagem-sao-jose-operario-po-de-marmore-20cm',
    name: 'Imagem São José com o Menino Jesus em Pó de Mármore 20cm',
    price: 134.9,
    originalPrice: 169.9,
    maxInstallments: 4,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Imagem São José com o Menino Jesus em Pó de Mármore 20cm'
  },
  {
    id: 'prod-oferta-camiseta-sao-bento',
    slug: 'camiseta-catolica-medalha-sao-bento-algodao',
    name: 'Camiseta Católica Medalha de São Bento 100% Algodão Estonada',
    price: 69.9,
    originalPrice: 89.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Camiseta Católica Medalha de São Bento 100% Algodão Estonada'
  },
  {
    id: 'prod-oferta-pia-agua-benta',
    slug: 'pia-de-agua-benta-parede-anjo-resina',
    name: 'Pia de Água Benta de Parede Sagrada Família em Resina Clássica',
    price: 44.9,
    originalPrice: 59.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Pia de Água Benta de Parede Sagrada Família em Resina Clássica'
  },
  {
    id: 'prod-oferta-medalha-sao-miguel',
    slug: 'escapulario-medalha-sao-miguel-arcanjo-aco',
    name: 'Colar Escapulário São Miguel Arcanjo em Aço Inox Dourado',
    price: 54.9,
    originalPrice: 74.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Colar Escapulário São Miguel Arcanjo em Aço Inox Dourado'
  },
  {
    id: 'prod-oferta-caneca-santa-teresinha',
    slug: 'caneca-porcelana-santa-teresinha-chuva-de-rosas',
    name: 'Caneca de Porcelana Santa Teresinha Chuva de Rosas 325ml',
    price: 39.9,
    originalPrice: 54.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Caneca de Porcelana Santa Teresinha Chuva de Rosas 325ml'
  },
  {
    id: 'prod-oferta-kit-velas-votivas',
    slug: 'kit-3-velas-votivas-devoção-mariana',
    name: 'Kit com 3 Velas Votivas Perfumadas Títulos de Nossa Senhora',
    price: 49.9,
    originalPrice: 69.9,
    maxInstallments: 2,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Kit com 3 Velas Votivas Perfumadas Títulos de Nossa Senhora'
  }
];

export const newArrivalProducts: Product[] = [
  {
    id: 'prod-novo-nossa-senhora-guadalupe-30cm',
    slug: 'imagem-nossa-senhora-de-guadalupe-resina-30cm',
    name: 'Imagem Nossa Senhora de Guadalupe em Resina Importada 30cm',
    price: 219.9,
    originalPrice: 259.9,
    maxInstallments: 6,
    isNew: true,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Imagem Nossa Senhora de Guadalupe em Resina Importada 30cm'
  },
  {
    id: 'prod-novo-terco-hematita-sao-miguel',
    slug: 'terco-hematita-sao-miguel-arcanjo',
    name: 'Terço de São Miguel Arcanjo em Contas de Hematita Grafite',
    price: 59.9,
    maxInstallments: 2,
    isNew: true,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Terço de São Miguel Arcanjo em Contas de Hematita Grafite'
  },
  {
    id: 'prod-novo-biblia-familia-ilustrada',
    slug: 'biblia-da-familia-capa-dura-dourada',
    name: 'Bíblia Sagrada da Família Capa Dura com Folha Dourada e Mapas',
    price: 169.9,
    originalPrice: 199.9,
    maxInstallments: 5,
    isNew: true,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Bíblia Sagrada da Família Capa Dura com Folha Dourada e Mapas'
  },
  {
    id: 'prod-novo-santo-antonio-20cm',
    slug: 'imagem-santo-antonio-po-de-marmore-20cm',
    name: 'Imagem Santo Antônio com Menino Jesus em Pó de Mármore 20cm',
    price: 144.9,
    maxInstallments: 4,
    isNew: true,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Imagem Santo Antônio com Menino Jesus em Pó de Mármore 20cm'
  },
  {
    id: 'prod-novo-oratorio-madeira-mesa',
    slug: 'oratorio-de-mesa-madeira-nobre-arco',
    name: 'Oratório de Mesa em Madeira Nobre Formato Arco para Imagens até 25cm',
    price: 129.9,
    originalPrice: 159.9,
    maxInstallments: 4,
    isNew: true,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Oratório de Mesa em Madeira Nobre Formato Arco para Imagens até 25cm'
  },
  {
    id: 'prod-novo-camiseta-sagrada-familia',
    slug: 'camiseta-sagrada-familia-bege-minimalista',
    name: 'Camiseta Católica Sagrada Família de Nazaré Algodão Penteado',
    price: 79.9,
    maxInstallments: 2,
    isNew: true,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Camiseta Católica Sagrada Família de Nazaré Algodão Penteado'
  },
  {
    id: 'prod-novo-sao-padre-pio-20cm',
    slug: 'imagem-sao-padre-pio-resina-20cm',
    name: 'Imagem São Padre Pio de Pietrelcina Pintura Artesanal 20cm',
    price: 139.9,
    originalPrice: 174.9,
    maxInstallments: 4,
    isNew: true,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Imagem São Padre Pio de Pietrelcina Pintura Artesanal 20cm'
  },
  {
    id: 'prod-novo-porta-vela-marmore-aparecida',
    slug: 'porta-vela-vidro-nossa-senhora-aparecida',
    name: 'Porta-Vela em Vidro Jateado e Base Dourada Nossa Senhora Aparecida',
    price: 44.9,
    maxInstallments: 2,
    isNew: true,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Porta-Vela em Vidro Jateado e Base Dourada Nossa Senhora Aparecida'
  },
  {
    id: 'prod-novo-livro-tratado-verdadeira-devocao',
    slug: 'livro-tratado-da-verdadeira-devocao-capa-luxo',
    name: 'Livro Tratado da Verdadeira Devoção à Santíssima Virgem — Capa Luxo',
    price: 49.9,
    originalPrice: 64.9,
    maxInstallments: 2,
    isNew: true,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Livro Tratado da Verdadeira Devoção à Santíssima Virgem — Capa Luxo'
  },
  {
    id: 'prod-novo-pulseira-medalha-milagrosa',
    slug: 'pulseira-nossa-senhora-das-gracas-banho-ouro',
    name: 'Pulseira Medalha Milagrosa com Pérolas e Banho de Ouro 18k',
    price: 69.9,
    maxInstallments: 2,
    isNew: true,
    imageUrl: DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: DUMMY_HOVER_IMAGE,
    imageAlt: 'Pulseira Medalha Milagrosa com Pérolas e Banho de Ouro 18k'
  }
];

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
        imageUrl: DUMMY_PRIMARY_IMAGE,
        hoverImageUrl: DUMMY_HOVER_IMAGE,
        imageAlt: 'Imagem Sagrada Família em Resina Clássica 25cm'
      },
      {
        id: 'prod-cenario-biblia-edicao-familia',
        slug: 'biblia-sagrada-edicao-da-familia-capa-dura',
        name: 'Bíblia Sagrada Edição da Família Capa Dura',
        price: 119.9,
        originalPrice: 149.9,
        maxInstallments: 4,
        imageUrl: DUMMY_PRIMARY_IMAGE,
        hoverImageUrl: DUMMY_HOVER_IMAGE,
        imageAlt: 'Bíblia Sagrada Edição da Família Capa Dura'
      },
      {
        id: 'prod-cenario-vela-mesa-sagrada-familia',
        slug: 'vela-perfumada-mesa-sagrada-familia-vidro',
        name: 'Vela Perfumada de Mesa Sagrada Família no Vidro',
        price: 44.9,
        maxInstallments: 2,
        imageUrl: DUMMY_PRIMARY_IMAGE,
        hoverImageUrl: DUMMY_HOVER_IMAGE,
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
        imageUrl: DUMMY_PRIMARY_IMAGE,
        hoverImageUrl: DUMMY_HOVER_IMAGE,
        imageAlt: 'Crucifixo Medalha de São Bento em Madeira Nobre 30cm'
      },
      {
        id: 'prod-cenario-escapulario-porta-sao-bento',
        slug: 'escapulario-porta-sao-bento-oracao-latim',
        name: 'Escapulário de Porta São Bento com Oração em Latim',
        price: 49.9,
        originalPrice: 64.9,
        maxInstallments: 2,
        imageUrl: DUMMY_PRIMARY_IMAGE,
        hoverImageUrl: DUMMY_HOVER_IMAGE,
        imageAlt: 'Escapulário de Porta São Bento com Oração em Latim'
      },
      {
        id: 'prod-cenario-terco-sao-bento-imbuia',
        slug: 'terco-sao-bento-contas-madeira-imbuia',
        name: 'Terço de São Bento em Contas de Madeira Imbuia',
        price: 39.9,
        maxInstallments: 2,
        imageUrl: DUMMY_PRIMARY_IMAGE,
        hoverImageUrl: DUMMY_HOVER_IMAGE,
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
    imageUrl: DUMMY_PRIMARY_IMAGE,
    imageAlt: 'Imagem Sagrada Família em Resina Importada 30cm'
  },
  {
    id: 'icon-slide-crucifixo-sao-damiao',
    subtitle: '† Sinal de Redenção',
    title: 'A cruz que fala ao silêncio da família',
    description: 'Inspirado no ícone diante do qual São Francisco rezou em Assis, o Crucifixo de São Damião em madeira maciça convida à contemplação do Cristo vivo e glorioso.',
    ctaLabel: 'Saiba mais',
    to: '/p/crucifixo-de-parede-sao-damiao',
    imageUrl: DUMMY_PRIMARY_IMAGE,
    imageAlt: 'Crucifixo de Parede São Damião em Madeira Maciça 35cm'
  },
  {
    id: 'icon-slide-capela-aparecida',
    subtitle: '† Refúgio Mariano',
    title: 'Um pequeno santuário para as preces de cada dia',
    description: 'Entalhada em madeira nobre, a Capelinha de Nossa Senhora Aparecida acolhe as intenções da família sob o olhar materno da Padroeira do Brasil.',
    ctaLabel: 'Saiba mais',
    to: '/p/capela-madeira-nossa-senhora-aparecida-17cm',
    imageUrl: DUMMY_PRIMARY_IMAGE,
    imageAlt: 'Capela em Madeira Nossa Senhora Aparecida 17cm'
  },
  {
    id: 'icon-slide-biblia-familia',
    subtitle: '† Luz da Palavra',
    title: 'A herança de fé que atravessa gerações',
    description: 'Com acabamento em capa dura dourada e páginas de registro familiar, a Bíblia da Família reúne pais e filhos em torno da Palavra de Deus.',
    ctaLabel: 'Saiba mais',
    to: '/p/biblia-da-familia-capa-dura-dourada',
    imageUrl: DUMMY_PRIMARY_IMAGE,
    imageAlt: 'Bíblia Sagrada da Família Capa Dura com Folha Dourada e Mapas'
  }
];
