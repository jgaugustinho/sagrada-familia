export const useCartPreview = () => {
  const cartCount = useState<number>( 'sf-cart-preview-count', () => 0 );
  const pulseTick = useState<number>( 'sf-cart-preview-pulse', () => 0 );

  const addToCart = ( quantity = 1 ) => {
    const safeQuantity = Math.max( 1, Math.floor( quantity ) );
    cartCount.value += safeQuantity;
    pulseTick.value += 1;
  };

  return { cartCount, pulseTick, addToCart };
};
