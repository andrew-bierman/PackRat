import { faker } from '@faker-js/faker';
import { Check } from '@tamagui/lucide-icons';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import {
  AnimatePresence,
  Avatar,
  Button,
  Text,
  Theme,
  View,
  styled,
} from 'tamagui';

import useTheme from 'app/hooks/useTheme';

const List = styled(FlatList<Message>, {
  backgroundColor: '$background',
  gap: '$3',
});

const avatars = [
  'https://i.pravatar.cc/150?img=6',
  'https://raw.githubusercontent.com/andrew-bierman/PackRat/5a03c7f1161baf5e67d67f71de66d5d59cad37e0/packages/app/assets/bot-svgrepo-com%20(1).svg',
];

const getMessages = (data: Message[]) => data;

type Message = {
  role: 'user' | 'ai';
  content: string;
};

const renderItem = ({
  item: message,
  index,
}: {
  item: Message;
  index: number;
}) => {
  return <ChatItem index={index + 1} key={index} item={message} />;
};
export function ChatList({ data }: { data: Message[] }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages(getMessages(data)); // Reverse the messages array
  }, [data]);

  return (
    <View
      flexDirection="column"
      height={'100%'}
      minWidth="100%"
      $group-window-gtXs={{ height: 700 }}
    >
      <List
        $group-window-gtXs={{
          padding: '$10',
        }}
        data={messages}
        renderItem={renderItem}
        windowSize={2}
      />
    </View>
  );
}

ChatList.fileName = 'ChatList';

function ChatItem({ item, index }: { item: Message; index: number }) {
  const { content, role } = item;
  const itsMe = role === 'user';
  const avatar = itsMe ? avatars[0] : avatars[1];
  const [showMessage, setShowMessage] = useState(false);
  const showDelay = index * 50;
  const [start, setStart] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    // run animations after initial render calms down
    (globalThis.requestIdleCallback || setTimeout)(() => {
      setStart(true);
    });
  }, []);

  useEffect(() => {
    if (!start) return;
    const timeout = setTimeout(() => {
      setShowMessage((prev) => !prev);
    }, showDelay);
    return () => clearTimeout(timeout);
  }, [start, showDelay]);

  return (
    <AnimatePresence>
      {showMessage && (
        <View
          flexDirection={itsMe ? 'row-reverse' : 'row'}
          alignItems="flex-start"
          gap="$4"
          alignSelf={itsMe ? 'flex-end' : 'flex-start'}
          maxWidth="100%"
          minWidth="100%"
          style={{ padding: '5px 5px', background: isDark ? '#333' : 'white' }}
        >
          <Button
            animation="quick"
            // enterStyle={{
            //   opacity: 0,
            //   scale: 0,
            // }}
            size="$5"
            circular
            chromeless
          >
            <View flexDirection="row">
              <Avatar circular size="$5">
                <Avatar.Image
                  // backgroundColor={itsMe ? 'white' : 'gray'}
                  resizeMode="center"
                  source={{ uri: avatar }}
                />
                <Avatar.Fallback backgroundColor="$background" />
              </Avatar>
            </View>
          </Button>
          <View
            flexDirection="column"
            alignItems={itsMe ? 'flex-end' : 'flex-start'}
            gap="$2"
            maxWidth={400}
            justifyContent="center"
            flexShrink={1}
          >
            <Theme name={itsMe ? 'blue' : 'gray'}>
              <View
                backgroundColor="$color2"
                padding="$4"
                paddingVertical="$3"
                borderRadius="$6"
                flexShrink={1}
              >
                <Text
                  fontSize="$3"
                  fontWeight="$3"
                  lineHeight="$3"
                  flexShrink={1}
                >
                  {item.content}
                </Text>
              </View>
            </Theme>
            <View flexDirection={itsMe ? 'row' : 'row-reverse'} gap="$2">
              <Text
                color="$color7"
                fontSize="$3"
                fontWeight="$3"
                lineHeight="$3"
              >
                {/* {4} */}
              </Text>
              {/* <Check size={16} color="green" /> */}
            </View>
          </View>
        </View>
      )}
    </AnimatePresence>
  );
}
