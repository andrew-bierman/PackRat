import React, { type JSX, type FC } from 'react';
import { BaseModal } from '../modal';
import { type BaseModalProps } from '../modal/BaseModal';
import { View } from 'tamagui';
import { Form, FormInput } from '../form';
import { Dimensions, FlatList, ScrollView } from 'react-native';

interface ItemPickerOverlayProps {
  modalProps: Omit<BaseModalProps, 'footerButtons'>;
  data: any[];
  ListEmptyComponent: (params: { item: any }) => JSX.Element;
  renderItem: (params: { item: any }) => JSX.Element;
  onSearchChange: (search: string) => void;
  searchTerm: string;
  title: string;
  saveBtnText?: string;
  onSave?: () => void;
}
export const ItemPickerOverlay: FC<ItemPickerOverlayProps> = ({
  modalProps,
  searchTerm,
  onSearchChange,
  saveBtnText = 'Done',
  onSave = () => {},
  ListEmptyComponent,
  data,
  renderItem,
}) => {
  const windowHeight = Dimensions.get('window').height;

  return (
    <BaseModal
      {...modalProps}
      footerButtons={[
        {
          label: saveBtnText,
          color: '#0A84FF',
          onClick: (_, closeModal) => {
            onSave();
            closeModal();
          },
        },
      ]}
      footerComponent={undefined}
    >
      <View
        style={{
          paddingVertical: 10,
          minWidth: 320,

          width: '100vw',
          paddingBottom: 10,
          maxWidth: 760,
          height: windowHeight * 0.8,
          flexDirection: 'column',
        }}
      >
        <Form defaultValues={{ search: searchTerm }}>
          <FormInput
            onChange={(e) => onSearchChange((e.target as any).value)}
            autoFocus
            style={{ marginBottom: 16 }}
            name="search"
          />
        </Form>
        <ScrollView>
          <FlatList
            data={data}
            horizontal={false}
            stickyHeaderHiddenOnScroll={false}
            ItemSeparatorComponent={() => (
              <View style={{ height: 12, width: '100%' }} />
            )}
            ListEmptyComponent={ListEmptyComponent}
            keyExtractor={(item, index) => `${item?.id}_${item?.type}_${index}`} // Ensure unique keys
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={2}
          />
        </ScrollView>
      </View>
    </BaseModal>
  );
};
