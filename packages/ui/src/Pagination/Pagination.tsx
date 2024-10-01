import React, { type FC } from 'react';
import { ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';
import {
  Button,
  Input,
  Button as TButton,
  Text,
  XGroup,
  View,
  type ViewProps,
  XStack,
} from 'tamagui';

interface PaginationProps {
  style?: ViewProps['style'];
  currentPage: number;
  totalPages: number;
  onPressPrevBtn: () => void;
  onPressNextBtn: () => void;
  isPrevBtnDisabled: boolean;
  isNextBtnDisabled: boolean;
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  style,
  isPrevBtnDisabled,
  isNextBtnDisabled,
  onPressPrevBtn,
  onPressNextBtn,
}) => {
  return (
    <XStack gap={8} style={[{ alignItems: 'center' }, style]}>
      <Button
        disabled={isPrevBtnDisabled}
        onPress={onPressPrevBtn}
        size="$3.5"
        icon={<ChevronLeft />}
      >
        Prev
      </Button>
      <Text style={{ fontSize: 16 }}>
        Page {currentPage} of {totalPages}
      </Text>
      <Button
        disabled={isNextBtnDisabled}
        onPress={onPressNextBtn}
        size="$3.5"
        iconAfter={<ChevronRight />}
      >
        Next
      </Button>
    </XStack>
  );
};
