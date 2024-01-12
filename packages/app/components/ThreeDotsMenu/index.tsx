import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePack } from '../../store/packsStore';
import { useRouter } from 'expo-router';
import { deleteTrip } from '../../store/tripsStore';
import { MoreHorizontal } from '@tamagui/lucide-icons';
import { Adapt, Button, Popover, YStack } from 'tamagui';

import { useDeleteTrips } from '../../hooks/trips';
// import { deleteTrip } from '../../store/tripsStore';
export function ThreeDotsMenu({ data, titleRef, setEditTitle }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { deleteTrips } = useDeleteTrips();
  return (
    <Popover size="$5" allowFlip placement="bottom">
      <Popover.Trigger asChild backgroundColor="transparent">
        <Button icon={MoreHorizontal} />
      </Popover.Trigger>
      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame>
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Adapt>
      <Popover.Content
        borderWidth={1}
        padding={4}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        <Popover.Close asChild>
          <YStack space="$1">
            <Button
              onPress={() => {
                setEditTitle(true);
                if (titleRef.current) {
                  titleRef.current.style =
                    'font-size:20px !important;font-weight:bold;color: #22c67c; border:1px solid black;';
                }
              }}
            >
              Edit
            </Button>
            <Button
              onPress={() => {
                if (data.type === 'pack') {
                  dispatch(
                    deletePack({
                      id: data._id,
                    }),
                  );
                } else {
                  dispatch(deleteTrip(data._id));
                }
                router.replace('/feed');
              }}
            >
              Delete
            </Button>
          </YStack>
        </Popover.Close>
      </Popover.Content>
    </Popover>
  );
}
