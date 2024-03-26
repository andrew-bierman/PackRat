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
import { useAuthUser } from 'app/auth/hooks';
import { addTripForm } from '@packrat/validations/src/validations/tripRoutesValidator';
import { useFormSubmitTrigger } from '@packrat/ui/src/form';
import { usePackId } from 'app/hooks/packs';

interface SaveTripContainerProps {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  weatherObject: any;
  search: any;
  form: any;
}

const isPublicOptions = ['For me only', 'Public'].map((key, index) => ({
  label: key,
  value: String(index),
}));

export const SaveTripContainer = ({
  dateRange,
  weatherObject,
  search,
  form,
}: SaveTripContainerProps) => {
  const user = useAuthUser();
  const [packId] = usePackId();
  // defining dispatch
  const { addTrip, isSuccess, data: response } = useAddTrip();
  const [formRef, submitTrigger] = useFormSubmitTrigger();
  const router = useRouter();

  const geoJSONData = useGetPhotonDetails({
    properties: search?.properties
      ? {
          osm_id: search?.properties?.osm_id,
          osm_type: search?.properties?.osm_type,
        }
      : undefined,
  });

  // create trip
  const handleCreateTrip = async (
    closeModal,
    { name, description, isPublic },
  ) => {
    // duration object
    const startDate = dateRange.startDate
      ? format(dateRange.startDate, 'MM/dd/yyyy')
      : '';
    const endDate = dateRange.endDate
      ? format(dateRange.endDate, 'MM/dd/yyyy')
      : '';
    const numNights =
      dateRange.startDate && dateRange.endDate
        ? intervalToDuration({
            start: dateRange.startDate,
            end: dateRange.endDate,
          }).days
        : '';
    const duration = {
      numberOfNights: numNights,
      startDate,
      endDate,
    };

    const { data: geoJSON } = geoJSONData;

    const data = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      destination: search?.properties?.name,
      geoJSON,
      // trail: dropdown.currentTrail,
      duration: JSON.stringify(duration),
      weather: JSON.stringify(weatherObject),
      owner_id: user?._id,
      packs: packId,
      is_public: isPublic === '1',
    };

    // creating a trip
    console.log('create trip data ->', data);
    addTrip(data);
    closeModal();
  };
  if (isSuccess && response) {
    router.push(`/trip/${response.trip._id}`);
  }
  /**
   * Handles the change in value.
   *
   * @param {type} itemValue - the new value of the item
   * @return {undefined}
   */
  const handleValueChange = (itemValue) => {
    setIsPublic(itemValue);
  };

  /**
   * Renders an item for the Picker component.
   *
   * @param {object} item - The item to be rendered.
   * @return {JSX.Element} The rendered Picker.Item component.
   */
  const renderItem = ({ item }) => (
    <Picker.Item label={item.label} value={item.value} />
  );

  /**
   * Returns the layout information for a given item index.
   *
   * @param {object} _ - placeholder parameter
   * @param {number} index - the index of the item
   * @return {object} - an object containing the layout information
   */
  const getItemLayout = (_, index) => ({
    length: 30, // height of each item
    offset: 30 * index, // calculate the offset based on item height
    index,
  });

  return (
    <BaseModal
      title="Save Trip"
      trigger="Save Trip"
      footerButtons={[
        {
          label: 'Save',
          onClick: (_, closeModal) => submitTrigger(closeModal),
        },
      ]}
    >
      <Form
        validationSchema={addTripForm}
        ref={formRef}
        onSubmit={handleCreateTrip}
        defaultValues={{ isPublic: '0' }}
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
              name="public"
              style={{ marginTop: 4, marginBottom: 4 }}
              width={150}
            />
          </>
          <>
            <RText>Trip Weather</RText>
            <RText>
              Temparature - {weatherObject?.main?.temp}, Humidity -{' '}
              {weatherObject?.main?.humidity}
            </RText>
          </>
          <RStack style={{ flexDirection: 'row' }}>
            <RText>Pack</RText>
            <RText>`Selected Pack Name`</RText>
          </RStack>
          <RStack style={{ flexDirection: 'row' }}>
            <RText>Trip Location - </RText>
            <RText>{search?.properties?.name}</RText>
          </RStack>
          <RStack style={{ flexDirection: 'row' }}>
            <RText>Selected Trail - </RText>
            <RText>{form?.currentTrail}</RText>
          </RStack>
          <RStack style={{ flexDirection: 'row' }}>
            <RText>Selected Date Range - </RText>
            <RText>
              {dateRange.startDate
                ? format(dateRange.startDate, 'MM/dd/yyyy')
                : ''}{' '}
              -{' '}
              {dateRange.endDate ? format(dateRange.endDate, 'MM/dd/yyyy') : ''}
            </RText>
          </RStack>
          <RStack style={{ flexDirection: 'row' }}>
            <RText>Duration {'(Number of nights) - '} </RText>
            {dateRange.startDate && dateRange.endDate && (
              <RText>
                {
                  intervalToDuration({
                    start: dateRange.startDate,
                    end: dateRange.endDate,
                  }).days
                }
              </RText>
            )}
          </RStack>
        </RStack>
      </Form>
    </BaseModal>
  );
};
