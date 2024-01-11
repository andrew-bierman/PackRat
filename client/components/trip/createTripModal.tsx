import React, { useCallback, useState } from 'react';
import { CustomModal } from '../modal';
import { RInput, RStack, RText } from '@packrat/ui';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { format, intervalToDuration } from 'date-fns';
// import { addTrip } from '../../store/tripsStore';
import { useAddTrip } from '~/hooks/trips';
import { useGetPhotonDetails } from '~/hooks/destination';

// import { Picker } from '@react-native-picker/picker';
import { DropdownComponent } from '../Dropdown';
import useSaveTripContainer from '~/hooks/trips/useCreateTripModal';
const options = [
  { label: 'Public', value: 'true' },
  { label: 'For me only', value: 'false' },
];

const NumberInput = (props) => {
  const { min, max, value, ...otherProps } = props;

  // Custom validation function to enforce positive numbers only
  const validateNumber = (text) => {
    const sanitizedText = text.replace(/[^0-9-]/g, ''); // Allow only numbers and minus sign

    if (sanitizedText === '') {
      return '';
    }

    const number = parseInt(sanitizedText, 10);

    if (isNaN(number) || number < 0) {
      // Check for NaN and negative numbers
      return '';
    }

    if (typeof min !== 'undefined' && number < min) {
      return min.toString();
    }

    if (typeof max !== 'undefined' && number > max) {
      return max.toString();
    }

    return sanitizedText;
  };

  /**
   * Handles the change event of the text input.
   *
   * @param {string} text - The text input value.
   * @return {void}
   */
  const handleChangeText = (text) => {
    const validatedText = validateNumber(text);
    // Pass the sanitized text back to the parent component
    otherProps.onChangeText?.(validatedText);
  };

  return (
    <RInput
      {...otherProps}
      value={value}
      keyboardType="numeric"
      onChangeText={handleChangeText}
    />
  );
};

export const SaveTripContainer = ({ dateRange }) => {
  const {
    isSaveModalOpen,
    setIsSaveModalOpen,
    weatherObject,
    search,
    dropdown,
    setName,
    setDescription,
    isPublic,
    setIsPublic,
    handleCreateTrip,
  } = useSaveTripContainer({ dateRange });

  /* -------------not being used yet------------- */

  /**
   * Handles the change in value.
   *
   * @param {type} itemValue - the new value of the item
   * @return {undefined}
   */
  /* const handleValueChange = (itemValue) => {
    setIsPublic(itemValue);
  }; */

  /**
   * Renders an item for the Picker component.
   *
   * @param {object} item - The item to be rendered.
   * @return {JSX.Element} The rendered Picker.Item component.
   */
  /* const renderItem = ({ item }) => (
    <Picker.Item label={item.label} value={item.value} />
  ); */

  /**
   * Returns the layout information for a given item index.
   *
   * @param {object} _ - placeholder parameter
   * @param {number} index - the index of the item
   * @return {object} - an object containing the layout information
   */
  /* const getItemLayout = (_, index) => ({
    length: 30, // height of each item
    offset: 30 * index, // calculate the offset based on item height
    index,
  }); */

  /* -------------not being used yet------------- */

  return (
    <CustomModal
      title="Save Trip"
      trigger="Save Trip"
      isActive={isSaveModalOpen}
      onTrigger={() => {
        setIsSaveModalOpen(!isSaveModalOpen);
      }}
      footerButtons={[
        {
          label: 'Save',
          onClick: handleCreateTrip,
        },
      ]}
    >
      <RStack>
        <RInput
          placeholder="Trip Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <RInput
          placeholder="Trip Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
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

          <DropdownComponent
            onValueChange={(itemValue) => {
              setIsPublic(itemValue);
            }}
            data={['Public', 'For me only']}
            value={isPublic}
            placeholder="Is Public"
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
          <RText>{dropdown?.currentTrail}</RText>
        </RStack>
        <RStack style={{ flexDirection: 'row' }}>
          <RText>Selected Date Range - </RText>
          <RText>
            {dateRange.startDate
              ? format(dateRange.startDate, 'MM/dd/yyyy')
              : ''}{' '}
            - {dateRange.endDate ? format(dateRange.endDate, 'MM/dd/yyyy') : ''}
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
    </CustomModal>
  );
};
