import type { Component } from 'vue';
import { BadgePercent, BookOpen, Crown, Cross, Flame, Frame, Gem, Gift, HandHeart, LayoutGrid, Shirt, Sparkles, TreePine } from '@lucide/vue';

export const DUMMY_PRIMARY_IMAGE = 'https://images.unsplash.com/photo-1548625361-58a9b86aa83b?auto=format&fit=crop&w=800&h=800&q=80';
export const DUMMY_HOVER_IMAGE = 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&h=800&q=80';

export interface CatalogOption {
  slug: string;
  label: string;
}

export interface CatalogFeaturedBanner {
  title: string;
  description: string;
  imageUrl: string;
}

export interface CatalogAttributeDefinition {
  id: string;
  title: string;
  display: 'checkbox' | 'pill';
  options: CatalogOption[];
  megaMenuFeatured?: CatalogFeaturedBanner;
}

export interface CatalogCategoryDefinition {
  slug: string;
  label: string;
  eyebrow: string;
  description: string;
  icon: Component;
  ctaLabel: string;
  basePriceRange: [ number, number ];
  subCategoryGroupTitle: string;
  subCategories: CatalogOption[];
  subCategoryFeatured: CatalogFeaturedBanner;
  megaMenuGroupOrder: string[];
  attributeGroups: CatalogAttributeDefinition[];
}

export interface DevotionGroupDefinition {
  title: string;
  items: CatalogOption[];
  featured: CatalogFeaturedBanner;
}

export interface DevotionCategoryDefinition {
  slug: string;
  label: string;
  icon: Component;
  ctaLabel: string;
  groups: DevotionGroupDefinition[];
}

export interface MixedCollectionDefinition {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: Component;
  ctaLabel: string;
  to?: string;
}

const slugify = ( value: string ): string => {
  return value
    .normalize( 'NFD' )
    .replace( /[\u0300-\u036f]/g, '' )
    .toLowerCase()
    .replace( /&/g, 'e' )
    .replace( /[^a-z0-9]+/g, '-' )
    .replace( /^-+|-+$/g, '' );
};

const opt = ( label: string, slug?: string ): CatalogOption => ( {
  label,
  slug: slug ?? slugify( label )
} );

export const catalogCategories: CatalogCategoryDefinition[] = [
  {
    slug: 'imagens',
    label: 'Imagens',
    eyebrow: 'Arte Sacra & Escultura',
    description: 'Esculturas selecionadas com reverência e acabamento artesanal para abençoar o seu oratório e fortalecer a oração em família.',
    icon: Crown,
    ctaLabel: 'Ver imagens',
    basePriceRange: [ 89.9, 389.9 ],
    subCategoryGroupTitle: 'Especiais',
    subCategories: [
      opt( 'Presépios' ),
      opt( 'Sagrada Família' ),
      opt( 'Nossa Senhora' ),
      opt( 'Santos de Devoção' ),
      opt( 'Anjos' )
    ],
    subCategoryFeatured: {
      title: 'Sagrada Família e Santos de Devoção',
      description: 'Imagens especiais e presépios para abençoar o seu lar.',
      imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80'
    },
    megaMenuGroupOrder: [ 'material', 'tamanho', 'subcategories' ],
    attributeGroups: [
      {
        id: 'material',
        title: 'Por Material',
        display: 'checkbox',
        options: [ opt( 'Resina' ), opt( 'Gesso' ), opt( 'Madeira' ), opt( 'Pó de Mármore' ) ],
        megaMenuFeatured: {
          title: 'Esculturas em Resina e Madeira',
          description: 'Acabamento artesanal em resina, gesso, madeira e pó de mármore.',
          imageUrl: 'https://images.unsplash.com/photo-1559005446-facbaebc2537?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        id: 'tamanho',
        title: 'Por Tamanho',
        display: 'pill',
        options: [
          opt( 'Miniaturas (até 10cm)', 'miniaturas' ),
          opt( 'Médias (15cm a 30cm)', 'medias' ),
          opt( 'Grandes (acima de 30cm)', 'grandes' ),
          opt( 'Gigantes' )
        ],
        megaMenuFeatured: {
          title: 'Para Todos os Espaços',
          description: 'De miniaturas para oratórios pessoais até imagens sacras em tamanho grande.',
          imageUrl: 'https://images.unsplash.com/photo-1564965176772-f7ad1035e947?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        id: 'acabamento',
        title: 'Acabamento',
        display: 'checkbox',
        options: [
          opt( 'Pintura Clássica' ),
          opt( 'Policromia Artesanal' ),
          opt( 'Detalhes em Ouro' )
        ]
      }
    ]
  },
  {
    slug: 'tercos',
    label: 'Terços',
    eyebrow: 'Oração Diária',
    description: 'Terços, rosários e dezenas em madeira nobre, cristal lapidado, pérola e hematita para acompanhar cada mistério com devoção.',
    icon: Cross,
    ctaLabel: 'Ver terços',
    basePriceRange: [ 29.9, 139.9 ],
    subCategoryGroupTitle: 'Tipos',
    subCategories: [
      opt( 'Terços Tradicionais' ),
      opt( 'Terços de Pulso' ),
      opt( 'Rosários' ),
      opt( 'Dezenas' ),
      opt( 'Terços Infantis' )
    ],
    subCategoryFeatured: {
      title: 'Rosários, Dezenas e Pulso',
      description: 'Modelos tradicionais e portáteis para acompanhar sua oração diária.',
      imageUrl: 'https://images.unsplash.com/photo-1561738506-604920ddde0b?auto=format&fit=crop&w=800&q=80'
    },
    megaMenuGroupOrder: [ 'material', 'subcategories' ],
    attributeGroups: [
      {
        id: 'material',
        title: 'Por Material',
        display: 'checkbox',
        options: [ opt( 'Madeira' ), opt( 'Cristal' ), opt( 'Pérola' ), opt( 'Hematita' ) ],
        megaMenuFeatured: {
          title: 'Terços em Cristal e Pedras',
          description: 'Contas em madeira nobre, cristal lapidado, pérola e hematita.',
          imageUrl: 'https://images.unsplash.com/photo-1569845177077-2a37322a60c7?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        id: 'entremeio',
        title: 'Acabamento do Entremeio',
        display: 'pill',
        options: [
          opt( 'Ouro Envelhecido' ),
          opt( 'Prata Velha' ),
          opt( 'Madeira Entalhada' )
        ]
      }
    ]
  },
  {
    slug: 'biblias-e-livros',
    label: 'Bíblias & Livros',
    eyebrow: 'Palavra & Formação',
    description: 'Edições da Sagrada Escritura e obras de espiritualidade católica selecionadas para nutrir a fé no lar e na catequese.',
    icon: BookOpen,
    ctaLabel: 'Ver bíblias & livros',
    basePriceRange: [ 34.9, 219.9 ],
    subCategoryGroupTitle: 'Livros por Tema',
    subCategories: [
      opt( 'Espiritualidade' ),
      opt( 'Família e Casais' ),
      opt( 'Santos e Biografias' ),
      opt( 'Catequese' ),
      opt( 'Orações e Novenas' )
    ],
    subCategoryFeatured: {
      title: 'Leitura que Alimenta a Fé',
      description: 'Obras de espiritualidade, vida dos santos, família e devocionais.',
      imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80'
    },
    megaMenuGroupOrder: [ 'edicoes', 'subcategories' ],
    attributeGroups: [
      {
        id: 'edicoes',
        title: 'Bíblias',
        display: 'checkbox',
        options: [
          opt( 'Letra Gigante' ),
          opt( 'Edição Pastoral' ),
          opt( 'Estudo/Jerusalém', 'estudo-jerusalem' ),
          opt( 'Infantis' ),
          opt( 'Zíper' )
        ],
        megaMenuFeatured: {
          title: 'Bíblias Sagradas de Estudo e Leitura',
          description: 'Edições com letra gigante, capa com zíper, pastoral e infantil.',
          imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        id: 'encadernacao',
        title: 'Encadernação',
        display: 'pill',
        options: [
          opt( 'Capa Dura' ),
          opt( 'Capa Flexível' ),
          opt( 'Luxo com Zíper' )
        ]
      }
    ]
  },
  {
    slug: 'decoracao',
    label: 'Decoração',
    eyebrow: 'Igreja Doméstica',
    description: 'Crucifixos, capelinhas, mandalas e adornos devocionais que transformam cada ambiente da casa em um refúgio de paz.',
    icon: Frame,
    ctaLabel: 'Ver decoração',
    basePriceRange: [ 44.9, 229.9 ],
    subCategoryGroupTitle: 'Parede e Porta',
    subCategories: [
      opt( 'Enfeites de Porta' ),
      opt( 'Mandalas' ),
      opt( 'Crucifixos de Parede' ),
      opt( 'Capelinhas' ),
      opt( 'Quadros' )
    ],
    subCategoryFeatured: {
      title: 'Mandalas e Crucifixos de Parede',
      description: 'Proteção e beleza para a entrada e as paredes da sua casa.',
      imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
    },
    megaMenuGroupOrder: [ 'subcategories', 'ambientes' ],
    attributeGroups: [
      {
        id: 'ambientes',
        title: 'Ambientes',
        display: 'checkbox',
        options: [
          opt( 'Enfeites de Mesa' ),
          opt( 'Água Benta (Pias)', 'agua-benta' ),
          opt( 'Adornos para Berço/Carro', 'adornos-berco-carro' )
        ],
        megaMenuFeatured: {
          title: 'Devoção em Cada Ambiente',
          description: 'Adornos de mesa, pias de água benta e proteção para berço e carro.',
          imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        id: 'material',
        title: 'Material Principal',
        display: 'pill',
        options: [
          opt( 'Madeira Nobre' ),
          opt( 'Resina & MDF' ),
          opt( 'Metal Dourado' )
        ]
      }
    ]
  },
  {
    slug: 'camisetas',
    label: 'Camisetas',
    eyebrow: 'Moda Católica',
    description: 'Peças em algodão confortável com estampas evangelizadoras inspiradas na Sagrada Família, em Nossa Senhora e nos santos.',
    icon: Shirt,
    ctaLabel: 'Ver camisetas',
    basePriceRange: [ 59.9, 119.9 ],
    subCategoryGroupTitle: 'Temas',
    subCategories: [
      opt( 'Santíssima Trindade' ),
      opt( 'Nossa Senhora' ),
      opt( 'Santos' ),
      opt( 'Frases Bíblicas' )
    ],
    subCategoryFeatured: {
      title: 'Estampas que Evangelizam',
      description: 'Vista sua devoção a Nossa Senhora, aos santos e à Palavra.',
      imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    },
    megaMenuGroupOrder: [ 'publico', 'subcategories' ],
    attributeGroups: [
      {
        id: 'publico',
        title: 'Público',
        display: 'checkbox',
        options: [
          opt( 'Masculinas' ),
          opt( 'Femininas (Baby Look)', 'femininas' ),
          opt( 'Infantis' )
        ],
        megaMenuFeatured: {
          title: 'Moda Católica para Todos',
          description: 'Modelagens masculinas, baby look e infantis em algodão confortável.',
          imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        id: 'tamanho',
        title: 'Tamanho',
        display: 'pill',
        options: [ opt( 'P' ), opt( 'M' ), opt( 'G' ), opt( 'GG' ) ]
      },
      {
        id: 'cor',
        title: 'Cor',
        display: 'pill',
        options: [
          opt( 'Off-White' ),
          opt( 'Areia' ),
          opt( 'Marrom Café' ),
          opt( 'Preto' )
        ]
      }
    ]
  },
  {
    slug: 'acessorios',
    label: 'Acessórios',
    eyebrow: 'Sinais de Fé',
    description: 'Medalhas, escapulários, pulseiras e pequenos lembretes cotidianos da proteção de Deus para usar e presentear.',
    icon: Gem,
    ctaLabel: 'Ver acessórios',
    basePriceRange: [ 24.9, 129.9 ],
    subCategoryGroupTitle: 'Uso Pessoal',
    subCategories: [
      opt( 'Pulseiras' ),
      opt( 'Escapulários de Porta e Pessoal', 'escapularios' ),
      opt( 'Medalhas' ),
      opt( 'Correntes' )
    ],
    subCategoryFeatured: {
      title: 'Pulseiras, Medalhas e Escapulários',
      description: 'Sinais de fé e proteção para usar todos os dias.',
      imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80'
    },
    megaMenuGroupOrder: [ 'subcategories', 'diversos' ],
    attributeGroups: [
      {
        id: 'diversos',
        title: 'Diversos',
        display: 'checkbox',
        options: [
          opt( 'Chaveiros' ),
          opt( 'Pins/Bótons', 'pins-botons' ),
          opt( 'Adesivos' )
        ],
        megaMenuFeatured: {
          title: 'Chaveiros, Pins e Adesivos',
          description: 'Pequenos detalhes devocionais para levar na mochila, chave ou carro.',
          imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        id: 'banho',
        title: 'Banho & Material',
        display: 'pill',
        options: [
          opt( 'Aço Inox Dourado' ),
          opt( 'Banho Ouro 18k' ),
          opt( 'Madeira & Cordão' )
        ]
      }
    ]
  },
  {
    slug: 'velas',
    label: 'Velas',
    eyebrow: 'Luz & Oração',
    description: 'Velas votivas, perfumadas e sacramentais preparadas para iluminar momentos de prece, vigília e celebrações especiais.',
    icon: Flame,
    ctaLabel: 'Ver velas',
    basePriceRange: [ 22.9, 94.9 ],
    subCategoryGroupTitle: 'Tipos',
    subCategories: [
      opt( 'Velas de 7 Dias', 'velas-de-7-dias' ),
      opt( 'Velas Votivas (Palito)', 'velas-votivas' ),
      opt( 'Velas Perfumadas' )
    ],
    subCategoryFeatured: {
      title: 'Velas Perfumadas e Votivas',
      description: 'Luz suave e aromas acolhedores para o seu momento de oração.',
      imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80'
    },
    megaMenuGroupOrder: [ 'subcategories', 'ocasioes' ],
    attributeGroups: [
      {
        id: 'ocasioes',
        title: 'Ocasiões',
        display: 'checkbox',
        options: [
          opt( 'Litúrgicas (Advento, Quaresma)', 'liturgicas' ),
          opt( 'Batismo' ),
          opt( 'Primeira Eucaristia' )
        ],
        megaMenuFeatured: {
          title: 'Velas Sacramentais e Litúrgicas',
          description: 'Modelos especiais para Batismo, Primeira Eucaristia, Advento e Quaresma.',
          imageUrl: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        id: 'aroma',
        title: 'Aroma',
        display: 'pill',
        options: [
          opt( 'Mirra & Incenso' ),
          opt( 'Lavanda Suave' ),
          opt( 'Sem Perfume' )
        ]
      }
    ]
  },
  {
    slug: 'presentes',
    label: 'Presentes',
    eyebrow: 'Lembranças & Kits',
    description: 'Presentes com significado eterno e conjuntos especiais prontos para celebrar Batismo, Primeira Eucaristia e Matrimônio.',
    icon: Gift,
    ctaLabel: 'Ver presentes',
    basePriceRange: [ 32.9, 189.9 ],
    subCategoryGroupTitle: 'Lembranças',
    subCategories: [
      opt( 'Canecas' ),
      opt( 'Chaveiros' ),
      opt( 'Marcadores de Página', 'marcadores-de-pagina' )
    ],
    subCategoryFeatured: {
      title: 'Canecas e Lembranças Devocionais',
      description: 'Presentes cheios de significado para demonstrar carinho e fé.',
      imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80'
    },
    megaMenuGroupOrder: [ 'subcategories', 'kits' ],
    attributeGroups: [
      {
        id: 'kits',
        title: 'Kits Especiais',
        display: 'checkbox',
        options: [
          opt( 'Kits de Batismo' ),
          opt( 'Kits de Casamento' ),
          opt( 'Lembrancinhas para Eventos', 'lembrancinhas' )
        ],
        megaMenuFeatured: {
          title: 'Kits para Batismo, Casamento e Eventos',
          description: 'Conjuntos especiais prontos para celebrar momentos inesquecíveis.',
          imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        id: 'embalagem',
        title: 'Embalagem',
        display: 'pill',
        options: [
          opt( 'Caixa Presenteável' ),
          opt( 'Saquinho de Linho' ),
          opt( 'Avulso' )
        ]
      }
    ]
  }
];

export const devotionCategory: DevotionCategoryDefinition = {
  slug: 'devocionais',
  label: 'Devocionais',
  icon: HandHeart,
  ctaLabel: 'Ver devocionais',
  groups: [
    {
      title: 'Santíssima Trindade',
      items: [
        opt( 'Sagrada Família' ),
        opt( 'Espírito Santo' ),
        opt( 'Jesus Misericordioso' ),
        opt( 'Sagrado Coração de Jesus' ),
        opt( 'Cristo Redentor' )
      ],
      featured: {
        title: 'Devoção a Jesus e à Sagrada Família',
        description: 'Imagens e artigos para a sua devoção ao Pai, ao Filho e ao Espírito Santo.',
        imageUrl: 'https://images.unsplash.com/photo-1744339700395-fa286ae4c7e6?auto=format&fit=crop&w=800&q=80'
      }
    },
    {
      title: 'Nossa Senhora',
      items: [
        opt( 'N. Sra. Aparecida', 'aparecida' ),
        opt( 'N. Sra. de Fátima', 'de-fatima' ),
        opt( 'N. Sra. das Graças', 'das-gracas' ),
        opt( 'N. Sra. de Guadalupe', 'de-guadalupe' ),
        opt( 'N. Sra. Desatadora dos Nós', 'desatadora-dos-nos' ),
        opt( 'N. Sra. do Carmo', 'do-carmo' ),
        opt( 'N. Sra. de Nazaré', 'de-nazare' ),
        opt( 'N. Sra. de Lourdes', 'de-lourdes' ),
        opt( 'N. Sra. do Perpétuo Socorro', 'perpetuo-socorro' )
      ],
      featured: {
        title: 'Títulos de Nossa Senhora',
        description: 'Aparecida, Fátima, Guadalupe e outras devoções marianas para o seu lar.',
        imageUrl: 'https://images.unsplash.com/photo-1565401185984-5d1ebde111de?auto=format&fit=crop&w=800&q=80'
      }
    },
    {
      title: 'Santos, Santas e Anjos',
      items: [
        opt( 'São Miguel Arcanjo' ),
        opt( 'São Bento' ),
        opt( 'São José' ),
        opt( 'Santo Antônio' ),
        opt( 'Santa Teresinha' ),
        opt( 'São Francisco de Assis' ),
        opt( 'São Judas Tadeu' ),
        opt( 'Santa Rita de Cássia' ),
        opt( 'São Padre Pio' ),
        opt( 'São Gabriel e São Rafael', 'gabriel-e-rafael' ),
        opt( 'Anjo da Guarda' )
      ],
      featured: {
        title: 'Santos e Anjos de Devoção',
        description: 'Proteção e intercessão dos santos, santas e anjos mais amados.',
        imageUrl: 'https://images.unsplash.com/photo-1746096888794-d71c8d537014?auto=format&fit=crop&w=800&q=80'
      }
    }
  ]
};

export const allDevotionOptions: CatalogOption[] = devotionCategory.groups.flatMap( ( group ) => group.items );

export const mixedCollections: Record<string, MixedCollectionDefinition> = {
  'promocoes': {
    slug: 'promocoes',
    label: 'Promoções',
    eyebrow: 'Oportunidades Especiais',
    title: 'Promoções & Ofertas',
    description: 'Peças sacras selecionadas com condições especiais para abençoar o seu lar e presentear quem você ama.',
    icon: BadgePercent,
    ctaLabel: 'Ver promoções'
  },
  'mais-vendidos': {
    slug: 'mais-vendidos',
    label: 'Mais Vendidos',
    eyebrow: 'Campeões de Devoção',
    title: 'Mais Vendidos',
    description: 'As peças mais escolhidas pelas famílias católicas para compor oratórios, presentes sacramentais e momentos de oração.',
    icon: Crown,
    ctaLabel: 'Ver mais vendidos'
  },
  'lancamentos': {
    slug: 'lancamentos',
    label: 'Lançamentos',
    eyebrow: 'Novidades no Acervo',
    title: 'Lançamentos',
    description: 'Esculturas, terços, edições bíblicas e adornos recém-chegados com a curadoria artesanal da Sagrada Família.',
    icon: Sparkles,
    ctaLabel: 'Ver lançamentos'
  },
  'natal-2026': {
    slug: 'natal-2026',
    label: 'Natal 2026',
    eyebrow: 'Coleção Sazonal',
    title: 'Natal 2026',
    description: 'Presépios, imagens da Sagrada Família, velas litúrgicas e adornos para celebrar o nascimento de Jesus em família.',
    icon: TreePine,
    ctaLabel: 'Ver Natal 2026'
  },
  'todos': {
    slug: 'todos',
    label: 'Ver todos',
    eyebrow: 'Acervo Completo',
    title: 'Todos os Produtos',
    description: 'Explore todo o catálogo da Sagrada Família reunindo imagens sacras, terços, bíblias, decoração, velas e presentes.',
    icon: LayoutGrid,
    ctaLabel: 'Ver todos os produtos',
    to: '/p'
  }
};

export const getCategoryBySlug = ( slug: string ): CatalogCategoryDefinition | undefined => {
  return catalogCategories.find( ( item ) => item.slug === slug );
};

export const getCategoryImageUrls = ( slug: string ): string[] => {
  const category = getCategoryBySlug( slug );
  if ( !category ) {
    return [];
  }

  const urls: string[] = [];
  for ( const key of category.megaMenuGroupOrder ) {
    if ( key === 'subcategories' ) {
      urls.push( category.subCategoryFeatured.imageUrl );
      continue;
    }

    const attr = category.attributeGroups.find( ( item ) => item.id === key );
    if ( attr?.megaMenuFeatured?.imageUrl ) {
      urls.push( attr.megaMenuFeatured.imageUrl );
    }
  }

  return urls.filter( Boolean );
};

export const getCategoryMedia = ( slug: string, variant = 0 ): { imageUrl: string; hoverImageUrl: string } => {
  const urls = getCategoryImageUrls( slug );
  if ( urls.length === 0 ) {
    return { imageUrl: DUMMY_PRIMARY_IMAGE, hoverImageUrl: DUMMY_HOVER_IMAGE };
  }

  return {
    imageUrl: urls[ variant % urls.length ] ?? DUMMY_PRIMARY_IMAGE,
    hoverImageUrl: urls.length > 1
      ? ( urls[ ( variant + 1 ) % urls.length ] ?? DUMMY_HOVER_IMAGE )
      : DUMMY_HOVER_IMAGE
  };
};
