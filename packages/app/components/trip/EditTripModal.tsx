import useTheme from 'app/hooks/useTheme';
import { BaseModal, Form, FormInput, RStack, RText } from '@packrat/ui';

export const EditTripModal = () => {

  return (
    <BaseModal
      title="Add Item"
      trigger="Add Item"
      footerButtons={[
        {
          label: 'Cancel',
          color: '#B22222',
          onClick: (_, closeModal) => closeModal(),
        },
      ]}
      footerComponent={undefined}
    >
     <RText>TripModal</RText>
    </BaseModal>
  );
};
