import { DUMMY_PRIMARY_IMAGE } from '@/data/products';

export interface CustomerTestimonial {
  id: string;
  authorName: string;
  authorLocation: string;
  authorAvatarUrl: string;
  rating: number;
  quote: string;
  productName: string;
  productSlug: string;
  productImageUrl: string;
}

export const customerTestimonials: CustomerTestimonial[] = [
  {
    id: 'test-maria-helena',
    authorName: 'Maria Helena Oliveira',
    authorLocation: 'Belo Horizonte, MG',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
    rating: 5,
    quote: 'Comprei a imagem da Sagrada Família para o altar da minha sala e me emocionei com a delicadeza do rosto e da pintura. Veio tão bem embalada com plástico bolha e caixa reforçada que chegou sem um único arranhão.',
    productName: 'Imagem Sagrada Família em Resina Importada 30cm',
    productSlug: 'imagem-sagrada-familia-resina-30cm',
    productImageUrl: DUMMY_PRIMARY_IMAGE
  },
  {
    id: 'test-carlos-eduardo',
    authorName: 'Carlos Eduardo Souza',
    authorLocation: 'Curitiba, PR',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
    rating: 5,
    quote: 'O Crucifixo de São Damião tem um acabamento em madeira impecável, muito acima do que eu esperava. Presenteei meus pais nas bodas de prata e todos ficaram encantados com a presença da peça na sala.',
    productName: 'Crucifixo de Parede São Damião em Madeira Maciça 35cm',
    productSlug: 'crucifixo-de-parede-sao-damiao',
    productImageUrl: DUMMY_PRIMARY_IMAGE
  },
  {
    id: 'test-ana-beatriz',
    authorName: 'Ana Beatriz Mendes',
    authorLocation: 'Campinas, SP',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
    rating: 5,
    quote: 'Tinha receio de comprar imagem sacra pela internet e quebrar no caminho, mas o cuidado da loja com a embalagem me surpreendeu. O manto azul de Nossa Senhora Aparecida é rico em detalhes dourados.',
    productName: 'Imagem Nossa Senhora Aparecida Manto Azul em Resina 25cm',
    productSlug: 'imagem-nossa-senhora-aparecida-resina-25cm',
    productImageUrl: DUMMY_PRIMARY_IMAGE
  },
  {
    id: 'test-joao-pedro',
    authorName: 'João Pedro Almeida',
    authorLocation: 'Recife, PE',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
    rating: 5,
    quote: 'A Bíblia Edição Pastoral tem letra realmente confortável para leitura diária e capa muito resistente. O envio foi super rápido e o atendimento pelo WhatsApp tirou todas as minhas dúvidas na hora.',
    productName: 'Bíblia Sagrada Edição Pastoral Letra Grande Capa Dura',
    productSlug: 'biblia-sagrada-edicao-pastoral',
    productImageUrl: DUMMY_PRIMARY_IMAGE
  },
  {
    id: 'test-lucia-fernandes',
    authorName: 'Lúcia Fernandes Costa',
    authorLocation: 'Goiânia, GO',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
    rating: 5,
    quote: 'Adquiri a imagem de São Miguel Arcanjo para o cantinho de oração da nossa família. As asas e a pintura clássica são de encher os olhos, e o preço com desconto no PIX valeu muito a pena.',
    productName: 'Imagem São Miguel Arcanjo Pintura Clássica em Resina 25cm',
    productSlug: 'imagem-sao-miguel-arcanjo-25cm',
    productImageUrl: DUMMY_PRIMARY_IMAGE
  },
  {
    id: 'test-roberto-lima',
    authorName: 'Roberto César Lima',
    authorLocation: 'Porto Alegre, RS',
    authorAvatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&crop=faces&q=80',
    rating: 5,
    quote: 'O Terço de São Bento em madeira nobre é firme, leve na mão e muito bem montado. Já é a terceira compra que faço na Sagrada Família para presentear afilhados e amigos da paróquia.',
    productName: 'Terço de São Bento em Madeira Nobre com Entremeio Dourado',
    productSlug: 'terco-sao-bento-madeira-nobre',
    productImageUrl: DUMMY_PRIMARY_IMAGE
  }
];
