import type { SizeTokens } from 'tamagui';
import { View, getTokenValue } from 'tamagui';
import { Avatar } from './components/Avatar';
import React, { useState } from 'react';

const items = [1, 2, 3, 4, 5];

/** ------ EXAMPLE ------ */
export function AvatarsGrouped() {
  return (
    <View gap="$6">
      <AvatarGroup
        size="$3"
        items={items.map((index) => (
          <Item
            size="$3"
            imageUrl={`https://i.pravatar.cc/150?img=${index + 1}`}
          />
        ))}
      />
      <AvatarGroup
        size="$6"
        items={items.map((index) => (
          <Item
            size="$6"
            imageUrl={`https://i.pravatar.cc/150?img=${index + 1}`}
          />
        ))}
      />
    </View>
  );
}

function AvatarGroup({
  size,
  items,
}: {
  size: SizeTokens;
  items: React.ReactNode[];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <View
      flexDirection="row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {items.map((item, index) => (
        <View
          key={index}
          zIndex={index}
          marginLeft={
            index !== 0 ? -(getTokenValue(size as any) ?? 20) * 1.5 : undefined
          }
          animation="bouncy"
          x={0}
          {...(hovered && {
            x: index * 8,
          })}
        >
          {item}
        </View>
      ))}
    </View>
  );
}

AvatarsGrouped.fileName = 'AvatarsGrouped';

function Item({ imageUrl, size }: { imageUrl: string; size: SizeTokens }) {
  return (
    <Avatar size={size}>
      <Avatar.Content circular>
        <Avatar.Image src={imageUrl} />
        <Avatar.Fallback backgroundColor="$background" />
      </Avatar.Content>
    </Avatar>
  );
}
