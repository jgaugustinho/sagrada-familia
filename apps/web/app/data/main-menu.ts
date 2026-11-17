import type { Component } from 'vue';
import { BadgePercent, BookOpen, Crown, Cross, Flame, Frame, Gem, Gift, HandHeart, LayoutGrid, Shirt, Sparkles, TreePine } from '@lucide/vue';

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

const slugify = ( value: string ): string => {
  return value
    .normalize( 'NFD' )
    .replace( /[\u0300-\u036f]/g, '' )
    .toLowerCase()
    .replace( /&/g, 'e' )
    .replace( /[^a-z0-9]+/g, '-' )
    .replace( /^-+|-+$/g, '' );
};

const sub = ( label: string, slug?: string ): MenuSubItem => ( { label, slug: slug ?? slugify( label ) } );

export const mainMenu: MenuCategory[] = [
  {
    label: 'Promoções',
    slug: 'promocoes',
    icon: BadgePercent,
    ctaLabel: 'Ver promoções',
    groups: []
  },
  {
    label: 'Imagens',
    slug: 'imagens',
    icon: Crown,
    ctaLabel: 'Ver imagens',
    groups: [
      {
        title: 'Por Material',
        items: [ sub( 'Resina' ), sub( 'Gesso' ), sub( 'Madeira' ), sub( 'Pó de Mármore' ) ],
        featured: {
          title: 'Esculturas em Resina e Madeira',
          description: 'Acabamento artesanal em resina, gesso, madeira e pó de mármore.',
          imageUrl: 'https://images.unsplash.com/photo-1559005446-facbaebc2537?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        title: 'Por Tamanho',
        items: [
          sub( 'Miniaturas (até 10cm)', 'miniaturas' ),
          sub( 'Médias (15cm a 30cm)', 'medias' ),
          sub( 'Grandes (acima de 30cm)', 'grandes' ),
          sub( 'Gigantes' )
        ],
        featured: {
          title: 'Para Todos os Espaços',
          description: 'De miniaturas para oratórios pessoais até imagens sacras em tamanho grande.',
          imageUrl: 'https://images.unsplash.com/photo-1564965176772-f7ad1035e947?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        title: 'Especiais',
        items: [
          sub( 'Presépios' ),
          sub( 'Sagrada Família' ),
          sub( 'Nossa Senhora' ),
          sub( 'Santos de Devoção' ),
          sub( 'Anjos' )
        ],
        featured: {
          title: 'Sagrada Família e Santos de Devoção',
          description: 'Imagens especiais e presépios para abençoar o seu lar.',
          imageUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=800&q=80'
        }
      }
    ]
  },
  {
    label: 'Terços',
    slug: 'tercos',
    icon: Cross,
    ctaLabel: 'Ver terços',
    groups: [
      {
        title: 'Por Material',
        items: [ sub( 'Madeira' ), sub( 'Cristal' ), sub( 'Pérola' ), sub( 'Hematita' ) ],
        featured: {
          title: 'Terços em Cristal e Pedras',
          description: 'Contas em madeira nobre, cristal lapidado, pérola e hematita.',
          imageUrl: 'https://images.unsplash.com/photo-1569845177077-2a37322a60c7?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        title: 'Tipos',
        items: [
          sub( 'Terços Tradicionais' ),
          sub( 'Terços de Pulso' ),
          sub( 'Rosários' ),
          sub( 'Dezenas' ),
          sub( 'Terços Infantis' )
        ],
        featured: {
          title: 'Rosários, Dezenas e Pulso',
          description: 'Modelos tradicionais e portáteis para acompanhar sua oração diária.',
          imageUrl: 'https://images.unsplash.com/photo-1561738506-604920ddde0b?auto=format&fit=crop&w=800&q=80'
        }
      }
    ]
  },
  {
    label: 'Bíblias & Livros',
    slug: 'biblias-e-livros',
    icon: BookOpen,
    ctaLabel: 'Ver bíblias & livros',
    groups: [
      {
        title: 'Bíblias',
        items: [
          sub( 'Letra Gigante' ),
          sub( 'Edição Pastoral' ),
          sub( 'Estudo/Jerusalém', 'estudo-jerusalem' ),
          sub( 'Infantis' ),
          sub( 'Zíper' )
        ],
        featured: {
          title: 'Bíblias Sagradas de Estudo e Leitura',
          description: 'Edições com letra gigante, capa com zíper, pastoral e infantil.',
          imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        title: 'Livros por Tema',
        items: [
          sub( 'Espiritualidade' ),
          sub( 'Família e Casais' ),
          sub( 'Santos e Biografias' ),
          sub( 'Catequese' ),
          sub( 'Orações e Novenas' )
        ],
        featured: {
          title: 'Leitura que Alimenta a Fé',
          description: 'Obras de espiritualidade, vida dos santos, família e devocionais.',
          imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80'
        }
      }
    ]
  },
  {
    label: 'Decoração',
    slug: 'decoracao',
    icon: Frame,
    ctaLabel: 'Ver decoração',
    groups: [
      {
        title: 'Parede e Porta',
        items: [
          sub( 'Enfeites de Porta' ),
          sub( 'Mandalas' ),
          sub( 'Crucifixos de Parede' ),
          sub( 'Capelinhas' ),
          sub( 'Quadros' )
        ],
        featured: {
          title: 'Mandalas e Crucifixos de Parede',
          description: 'Proteção e beleza para a entrada e as paredes da sua casa.',
          imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        title: 'Ambientes',
        items: [
          sub( 'Enfeites de Mesa' ),
          sub( 'Água Benta (Pias)', 'agua-benta' ),
          sub( 'Adornos para Berço/Carro', 'adornos-berco-carro' )
        ],
        featured: {
          title: 'Devoção em Cada Ambiente',
          description: 'Adornos de mesa, pias de água benta e proteção para berço e carro.',
          imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80'
        }
      }
    ]
  },
  {
    label: 'Camisetas',
    slug: 'camisetas',
    icon: Shirt,
    ctaLabel: 'Ver camisetas',
    groups: [
      {
        title: 'Público',
        items: [ sub( 'Masculinas' ), sub( 'Femininas (Baby Look)', 'femininas' ), sub( 'Infantis' ) ],
        featured: {
          title: 'Moda Católica para Todos',
          description: 'Modelagens masculinas, baby look e infantis em algodão confortável.',
          imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        title: 'Temas',
        items: [
          sub( 'Santíssima Trindade' ),
          sub( 'Nossa Senhora' ),
          sub( 'Santos' ),
          sub( 'Frases Bíblicas' )
        ],
        featured: {
          title: 'Estampas que Evangelizam',
          description: 'Vista sua devoção a Nossa Senhora, aos santos e à Palavra.',
          imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
        }
      }
    ]
  },
  {
    label: 'Acessórios',
    slug: 'acessorios',
    icon: Gem,
    ctaLabel: 'Ver acessórios',
    groups: [
      {
        title: 'Uso Pessoal',
        items: [
          sub( 'Pulseiras' ),
          sub( 'Escapulários de Porta e Pessoal', 'escapularios' ),
          sub( 'Medalhas' ),
          sub( 'Correntes' )
        ],
        featured: {
          title: 'Pulseiras, Medalhas e Escapulários',
          description: 'Sinais de fé e proteção para usar todos os dias.',
          imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        title: 'Diversos',
        items: [ sub( 'Chaveiros' ), sub( 'Pins/Bótons', 'pins-botons' ), sub( 'Adesivos' ) ],
        featured: {
          title: 'Chaveiros, Pins e Adesivos',
          description: 'Pequenos detalhes devocionais para levar na mochila, chave ou carro.',
          imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
        }
      }
    ]
  },
  {
    label: 'Velas',
    slug: 'velas',
    icon: Flame,
    ctaLabel: 'Ver velas',
    groups: [
      {
        title: 'Tipos',
        items: [
          sub( 'Velas de 7 Dias', 'velas-de-7-dias' ),
          sub( 'Velas Votivas (Palito)', 'velas-votivas' ),
          sub( 'Velas Perfumadas' )
        ],
        featured: {
          title: 'Velas Perfumadas e Votivas',
          description: 'Luz suave e aromas acolhedores para o seu momento de oração.',
          imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        title: 'Ocasiões',
        items: [
          sub( 'Litúrgicas (Advento, Quaresma)', 'liturgicas' ),
          sub( 'Batismo' ),
          sub( 'Primeira Eucaristia' )
        ],
        featured: {
          title: 'Velas Sacramentais e Litúrgicas',
          description: 'Modelos especiais para Batismo, Primeira Eucaristia, Advento e Quaresma.',
          imageUrl: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?auto=format&fit=crop&w=800&q=80'
        }
      }
    ]
  },
  {
    label: 'Presentes',
    slug: 'presentes',
    icon: Gift,
    ctaLabel: 'Ver presentes',
    groups: [
      {
        title: 'Lembranças',
        items: [ sub( 'Canecas' ), sub( 'Chaveiros' ), sub( 'Marcadores de Página', 'marcadores-de-pagina' ) ],
        featured: {
          title: 'Canecas e Lembranças Devocionais',
          description: 'Presentes cheios de significado para demonstrar carinho e fé.',
          imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80'
        }
      },
      {
        title: 'Kits Especiais',
        items: [ sub( 'Kits de Batismo' ), sub( 'Kits de Casamento' ), sub( 'Lembrancinhas para Eventos', 'lembrancinhas' ) ],
        featured: {
          title: 'Kits para Batismo, Casamento e Eventos',
          description: 'Conjuntos especiais prontos para celebrar momentos inesquecíveis.',
          imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80'
        }
      }
    ]
  }
];

export const devocionais: MenuCategory = {
  label: 'Devocionais',
  slug: 'devocionais',
  icon: HandHeart,
  ctaLabel: 'Ver devocionais',
  groups: [
    {
      title: 'Santíssima Trindade',
      items: [
        sub( 'Sagrada Família' ),
        sub( 'Espírito Santo' ),
        sub( 'Jesus Misericordioso' ),
        sub( 'Sagrado Coração de Jesus' ),
        sub( 'Cristo Redentor' )
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
        sub( 'N. Sra. Aparecida', 'aparecida' ),
        sub( 'N. Sra. de Fátima', 'de-fatima' ),
        sub( 'N. Sra. das Graças', 'das-gracas' ),
        sub( 'N. Sra. de Guadalupe', 'de-guadalupe' ),
        sub( 'N. Sra. Desatadora dos Nós', 'desatadora-dos-nos' ),
        sub( 'N. Sra. do Carmo', 'do-carmo' ),
        sub( 'N. Sra. de Nazaré', 'de-nazare' ),
        sub( 'N. Sra. de Lourdes', 'de-lourdes' ),
        sub( 'N. Sra. do Perpétuo Socorro', 'perpetuo-socorro' )
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
        sub( 'São Miguel Arcanjo' ),
        sub( 'São Bento' ),
        sub( 'São José' ),
        sub( 'Santo Antônio' ),
        sub( 'Santa Teresinha' ),
        sub( 'São Francisco de Assis' ),
        sub( 'São Judas Tadeu' ),
        sub( 'Santa Rita de Cássia' ),
        sub( 'São Padre Pio' ),
        sub( 'São Gabriel e São Rafael', 'gabriel-e-rafael' ),
        sub( 'Anjo da Guarda' )
      ],
      featured: {
        title: 'Santos e Anjos de Devoção',
        description: 'Proteção e intercessão dos santos, santas e anjos mais amados.',
        imageUrl: 'https://images.unsplash.com/photo-1746096888794-d71c8d537014?auto=format&fit=crop&w=800&q=80'
      }
    }
  ]
};

const lancamentos: MenuCategory = {
  label: 'Lançamentos',
  slug: 'lancamentos',
  icon: Sparkles,
  ctaLabel: 'Ver lançamentos',
  groups: []
};

const natal2026: MenuCategory = {
  label: 'Natal 2026',
  slug: 'natal-2026',
  icon: TreePine,
  ctaLabel: 'Ver Natal 2026',
  groups: []
};

const verTodos: MenuCategory = {
  label: 'Ver todos',
  slug: 'todos',
  icon: LayoutGrid,
  ctaLabel: 'Ver todos os produtos',
  groups: [],
  to: '/p'
};

/** Ordem do menu "Todas as categorias": Promoções, Lançamentos, Natal 2026, Devocionais, demais categorias, Ver todos. */
export const allCategoriesMenu: MenuCategory[] = [
  ...mainMenu.filter( ( item ) => item.slug === 'promocoes' ),
  lancamentos,
  natal2026,
  devocionais,
  ...mainMenu.filter( ( item ) => item.slug !== 'promocoes' ),
  verTodos
];
