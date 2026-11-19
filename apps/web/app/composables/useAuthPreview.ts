import { computed } from 'vue';

export const useAuthPreview = () => {
  const isLoggedIn = useState<boolean>( 'sf-auth-preview-logged-in', () => false );
  const userName = useState<string>( 'sf-auth-preview-user-name', () => 'Maria' );

  const firstName = computed( () => {
    const trimmed = userName.value.trim();
    if ( !trimmed ) {
      return 'Cliente';
    }

    return trimmed.split( /\s+/ )[ 0 ] ?? 'Cliente';
  } );

  return { isLoggedIn, userName, firstName };
};
