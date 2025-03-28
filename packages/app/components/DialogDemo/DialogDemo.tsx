import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button as OriginalButton,
  Dialog,
  Fieldset,
  Input as OriginalInput,
  Label as OriginalLabel,
  Paragraph,
  TooltipSimple,
  Unspaced,
  XStack as OriginalXStack,
} from 'tamagui';

import { BaseDialog } from '@packrat/ui';
import { SelectDemoItem } from '../select';

const Label: any = OriginalLabel;
const XStack: any = OriginalXStack;
const Button: any = OriginalButton;
const Input: any = OriginalInput;

export const DialogDemo = () => {
  return (
    <BaseDialog
      title="Edit profile"
      description="Make changes to your profile here. Click save when you're done."
      trigger="Show Dialog"
    >
      <>
        <Fieldset gap="$4" horizontal>
          <Label width={160} justifyContent="flex-end" htmlFor="name">
            Name
          </Label>

          <Input flex={1} id="name" defaultValue="Nate Wienert" />
        </Fieldset>

        <Fieldset gap="$4" horizontal>
          <Label width={160} justifyContent="flex-end" htmlFor="username">
            <TooltipSimple label="Pick your favorite" placement="bottom-start">
              <Paragraph>Food</Paragraph>
            </TooltipSimple>
          </Label>

          <SelectDemoItem />
        </Fieldset>
        <XStack alignSelf="flex-end" gap="$4">
          <Dialog.Close displayWhenAdapted asChild>
            <Button theme="alt1" aria-label="Close">
              Save changes
            </Button>
          </Dialog.Close>
        </XStack>
        <Unspaced>
          <Dialog.Close asChild>
            <Button
              position="absolute"
              top="$3"
              right="$3"
              size="$2"
              circular
              icon={
                <MaterialCommunityIcons name="close" size={24} color="black" />
              }
            />
          </Dialog.Close>
        </Unspaced>
      </>
    </BaseDialog>
  );
};
