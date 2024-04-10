import { useRouter } from '@packrat/crosspath';
import { YStack, RText, RButton } from '@packrat/ui';

export const PasswordResetAlert = () => {
  const router = useRouter();

  return (
    <YStack
      style={{
        backgroundColor: 'rgba(52, 168, 154, 0.7)',
        padding: 24,
        borderRadius: 8,
        textAlign: 'center',
      }}
    >
      <RText style={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>
        Password reset completed successfully!
      </RText>
      <RText
        style={{
          color: 'white',
          marginTop: 8,
          fontWeight: 'normal',
          marginBottom: 16,
          fontSize: 16,
        }}
      >
        You can now use your new password.
      </RText>

      <RButton
        style={{
          width: 160,
          margin: 'auto',
        }}
        onClick={() => router.push('/sign-in')}
      >
        Sign In
      </RButton>
    </YStack>
  );
};
