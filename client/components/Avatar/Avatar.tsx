import { RImage } from '@packrat/ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Avatar({
  src,
  size = 100,
}: {
  src: string;
  size?: number;
}) {
  const style = {
    width: size,
    height: size,
    borderRadius: 50,
  };

  if (!src) {
    return (
      <MaterialCommunityIcons
        name="account-circle"
        size={size}
        color="grey"
        style={{
          ...style,
          alignSelf: 'center',
        }}
      />
    );
  }

  return (
    <RImage
      source={{ uri: src }}
      alt="Profile Image"
      borderRadius={50}
      style={style}
    />
  );
}
