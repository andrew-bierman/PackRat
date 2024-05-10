import React, { useState } from 'react';
import {
  BaseModal,
  Form,
  FormInput,
  FormSelect,
  RInput,
  RStack,
  RText,
} from '@packrat/ui';
import { useRouter } from 'app/hooks/router';
import { format, intervalToDuration } from 'date-fns';
// import { addTrip } from '../../store/tripsStore';
import { useAddTrip } from 'app/hooks/trips';
import { useGetPhotonDetails } from 'app/hooks/destination';

// import { Picker } from '@react-native-picker/picker';
import { DropdownComponent } from '../Dropdown';
import { addTripForm } from '@packrat/validations/src/validations/tripRoutesValidator';
import { useFormSubmitTrigger } from '@packrat/ui/src/form';
import { useUserPackById } from 'app/hooks/packs';
import { formatCreateTripValuesForAPI } from 'app/utils/tripUtils';

interface SaveTripContainerProps {
  tripStore: any;
}

const isPublicOptions = ['For me only', 'Public'].map((key, index) => ({
  label: key,
  value: String(index),
}));

export const SaveTripContainer = ({ tripStore }: SaveTripContainerProps) => {
  const { addTrip, isSuccess, data: response } = useAddTrip();
  const [formRef, submitTrigger] = useFormSubmitTrigger();
  const router = useRouter();
  const selectedPack = useUserPackById();

  const handleCreateTrip = async (closeModal, values) => {
    const data = {
      ...formatCreateTripValuesForAPI(tripStore),
      ...values,
    };

    addTrip(data);
    closeModal();
  };
  if (isSuccess && response) {
    router.push(`/trip/${response.id}`);
  }

  return (
    <BaseModal
      title="Save Trip"
      trigger="Save Trip"
      footerButtons={[
        {
          label: 'Save',
          color: "#6F9CDE",
          onClick: (_, closeModal) => submitTrigger(closeModal),
        },
      ]}
    >
      <Form
        validationSchema={addTripForm}
        ref={formRef}
        onSubmit={handleCreateTrip}
        defaultValues={{ is_public: '0' }}
      >
        <RStack style={{ gap: 8 }}>
          <FormInput placeholder="Trip Name" name="name" />
          <FormInput placeholder="Trip Description" name="description" />
          <>
            {/* <Text mt={4}>Duration</Text>
          <Input
            placeholder="Number of nights"
            min={0}
            max={100}
            onChange={(event) => setNumberOfNights(event.target.value)}
          />

          <HStack mt={4}>

            <Input placeholder="Trip Start Date" onChange={event => setStartDate(event.target.value)} />
            <Input placeholder="Trip End Date" onChange={event => setEndDate(event.target.value)} ml={4} />
          </HStack>

          <View style={{ marginTop: 20, marginBottom: 20 }}>

            <Picker
              style={{ height: 30, borderRadius: 5, borderColor: "rgb(212, 212, 212)", color: "rgb(23, 23, 23)", backgroundColor: "rgba(0, 0, 0, 0)" }}
              selectedValue={isPublic}
              onValueChange={handleValueChange}>
              <Picker.Item label="Yes" value="true" />
              <Picker.Item label="For me only" value="false" />
            </Picker>

          </View>

            <Input
              placeholder="Trip Start Date"
              onChange={(event) => setStartDate(event.target.value)}
            />
            <Input
              placeholder="Trip End Date"
              onChange={(event) => setEndDate(event.target.value)}
              ml={4}
            />
          </HStack> */}

            <FormSelect
              options={isPublicOptions}
              placeholder="Is Public"
              name="is_public"
              style={{ marginTop: 4, marginBottom: 4 }}
              width={150}
            />
          </>
          {tripStore?.weather ? (
            <>
              <RText>Trip Weather</RText>
              <RText>
                Temparature - {tripStore?.weather?.main?.temp}, Humidity -{' '}
                {tripStore?.weather?.main?.humidity}
              </RText>
            </>
          ) : null}
          <RStack style={{ flexDirection: 'row' }}>
            <RText>Pack - </RText>
            <RText>{selectedPack?.name}</RText>
          </RStack>
          <RStack style={{ flexDirection: 'row' }}>
            <RText>Trip Location - </RText>
            <RText>{tripStore?.destination}</RText>
          </RStack>
          {tripStore.duration ? (
            <>
              <RStack style={{ flexDirection: 'row' }}>
                <RText>Selected Date Range - </RText>
                <RText>
                  {tripStore.duration.startDate} - {tripStore.duration.endDate}
                </RText>
              </RStack>
              <RStack style={{ flexDirection: 'row' }}>
                <RText>Duration {'(Number of nights) - '} </RText>
                <RText>{tripStore.duration.numberOfNights}</RText>
              </RStack>
            </>
          ) : null}
        </RStack>
      </Form>
    </BaseModal>
  );
};
