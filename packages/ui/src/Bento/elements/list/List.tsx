import { faker } from '@faker-js/faker';
import { Phone } from '@tamagui/lucide-icons';
import { useEffect, useState } from 'react';
import type { ColorTokens } from 'tamagui';
import { Avatar, Button, Circle, Separator, Text, View, YGroup } from 'tamagui';

// Define more descriptive status options
const statusOptions = [
  {
    status: 'Available',
    color: 'green',
  },
  {
    status: 'Offline',
    color: 'red',
  },
  {
    status: 'In a Meeting',
    color: 'blue',
  },
  {
    status: 'On Vacation',
    color: 'yellow',
  },
  {
    status: 'Do Not Disturb',
    color: 'orange',
  },
  {
    status: 'Working Remotely',
    color: 'purple',
  },
  {
    status: 'Out for Lunch',
    color: 'pink',
  },
  {
    status: 'Away from Desk',
    color: 'gray',
  },
  {
    status: 'On a Call',
    color: 'teal',
  },
  {
    status: 'Taking a Break',
    color: 'brown',
  },
];

// Function to generate a person with a random descriptive status
const getPersonList = () => {
  const personsList = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
    image: faker.image.avatar(),
  }));
  return personsList;
};

type PersonList = ReturnType<typeof getPersonList>;

export function List() {
  const [personsList, setPersonsList] = useState<PersonList>([]);

  useEffect(() => {
    setPersonsList(getPersonList());
  }, []);
  return (
    <YGroup width="100%" justifyContent="center" alignItems="center">
      <View
        $group-window-gtXs={{
          padding: '$3',
          width: 600,
        }}
        gap="$1.5"
        minWidth="100%"
      >
        {personsList.map((person, i) => (
          <>
            <Item key={person.id} person={person} />
            {i < personsList.length - 1 && <Separator />}
          </>
        ))}
      </View>
    </YGroup>
  );
}

List.fileName = 'List';

function Item({ person }: { person: PersonList[number] }) {
  return (
    <YGroup.Item>
      <View
        flexDirection="row"
        paddingVertical="$2"
        gap="$2"
        $group-window-gtXs={{
          padding: '$4',
          gap: '$4',
        }}
        backgroundColor="$color1"
        alignItems="center"
      >
        <View>
          <Avatar circular size="$4">
            <Avatar.Image resizeMode="cover" src={person.image} />
            <Avatar.Fallback backgroundColor="$background" />
          </Avatar>
          <Circle
            borderWidth={1}
            borderColor="$borderColor"
            right="3%"
            bottom="3%"
            zIndex={1}
            size={12}
            position="absolute"
            backgroundColor={person.status?.color as ColorTokens}
          />
        </View>
        <View flexDirection="column" flexShrink={1} justifyContent="center">
          <Text selectable>{person.name}</Text>
          <Text
            selectable
            fontSize="$2"
            lineHeight="$2"
            fontWeight="$2"
            theme="alt1"
          >
            {person.status?.status}
          </Text>
        </View>
        <Button marginLeft="auto" circular size="$4" scaleIcon={1.5}>
          <Button.Icon>
            <Phone color="green" />
          </Button.Icon>
        </Button>
      </View>
    </YGroup.Item>
  );
}
