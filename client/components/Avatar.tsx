import { Image } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Avatar({
  src,
  size = 100,
}: {
  src: string;
  size?: number;
}) {
  return (
    <>
      {src ? (
        <Image
          source={{ uri: src }}
          alt="Profile Image"
          borderRadius={50}
          style={{ width: size, height: size, borderRadius: 50 }}
        />
      ) : (
        <MaterialCommunityIcons
          name="account-circle"
          size={size}
          color="grey"
          style={{
            width: size,
            height: size,
            borderRadius: 50,
            alignSelf: 'center',
          }}
        />
      )}
    </>
  );
}
