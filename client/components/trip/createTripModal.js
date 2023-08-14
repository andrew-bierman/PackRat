import React, { useState } from "react";
import { Platform, View } from "react-native";
import { CustomModal } from "../modal";
import { Input, VStack, HStack, Text, Select } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { format, intervalToDuration } from "date-fns";
import { addTrip } from "../../store/tripsStore";
import { api } from "../../constants/api";

// import { Picker } from '@react-native-picker/picker';
import { DropdownComponent } from "../Dropdown";
import axios from "~/config/axios";

const options = [
  { label: "Yes", value: "true" },
  { label: "For me only", value: "false" },
];

const NumberInput = (props) => {
  const { min, max, value, ...otherProps } = props;

  // Custom validation function to enforce positive numbers only
  const validateNumber = (text) => {
    const sanitizedText = text.replace(/[^0-9-]/g, ""); // Allow only numbers and minus sign

    if (sanitizedText === "") {
      return "";
    }

    const number = parseInt(sanitizedText, 10);

    if (isNaN(number) || number < 0) {
      // Check for NaN and negative numbers
      return "";
    }

    if (typeof min !== "undefined" && number < min) {
      return min.toString();
    }

    if (typeof max !== "undefined" && number > max) {
      return max.toString();
    }

    return sanitizedText;
  };

  const handleChangeText = (text) => {
    const validatedText = validateNumber(text);
    // Pass the sanitized text back to the parent component
    otherProps.onChangeText && otherProps.onChangeText(validatedText);
  };

  return (
    <Input
      {...otherProps}
      value={value}
      keyboardType="numeric"
      onChangeText={handleChangeText}
    />
  );
};

export const SaveTripContainer = ({ dateRange }) => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const weatherObject = useSelector((state) => state.weather.weatherObject);
  const search = useSelector((state) => state.search.selectedSearchResult);
  const dropdown = useSelector((state) => state.dropdown);
  const user = useSelector((state) => state.auth.user);
  const packId = useSelector((state) => state.trips.newTrip.packId);

  console.log("- note for me", packId);
  console.log("search in save trip container ->", search);
  console.log("selected in dateRange ->", dateRange);

  // defining dispatch
  const dispatch = useDispatch();

  // trip info states value
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [numberOfNights, setNumberOfNights] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  const [isPublic, setIsPublic] = useState("");

  // create trip
  const handleCreateTrip = async () => {
    // duration object
    const startDate = dateRange.startDate
      ? format(dateRange.startDate, "MM/dd/yyyy")
      : "";
    const endDate = dateRange.endDate
      ? format(dateRange.endDate, "MM/dd/yyyy")
      : "";
    const numNights =
      dateRange.startDate && dateRange.endDate
        ? intervalToDuration({
            start: dateRange.startDate,
            end: dateRange.endDate,
          }).days
        : "";
    const duration = {
      numberOfNights: numNights,
      startDate,
      endDate,
    };

    console.log("old rag", search);

    const { data: geoJSON } = await axios.get(
      `${api}/osm/photonDetails/${search.properties.osm_type}/${search.properties.osm_id}`
    );
    // main object
    const data = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      destination: search.properties.name,
      geoJSON,
      // trail: dropdown.currentTrail,
      duration: JSON.stringify(duration),
      weather: JSON.stringify(weatherObject),
      owner_id: user?._id,
      packs: packId,
      is_public: isPublic,
    };

    // creating a trip
    console.log("create trip data ->", data);
    dispatch(addTrip(data));
    setIsSaveModalOpen(!isSaveModalOpen);
  };

  const handleValueChange = (itemValue) => {
    setIsPublic(itemValue);
  };

  const renderItem = ({ item }) => (
    <Picker.Item label={item.label} value={item.value} />
  );

  const getItemLayout = (_, index) => ({
    length: 30, // height of each item
    offset: 30 * index, // calculate the offset based on item height
    index,
  });

  return (
    <CustomModal
      title="Save Trip"
      trigger="Save Trip"
      isActive={isSaveModalOpen}
      onTrigger={() => setIsSaveModalOpen(!isSaveModalOpen)}
      footerButtons={[
        {
          label: "Save",
          onClick: handleCreateTrip,
        },
      ]}
    >
      <VStack>
        <Input
          placeholder="Trip Name"
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          placeholder="Trip Description"
          mt={4}
          onChange={(event) => setDescription(event.target.value)}
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
            onValueChange={(itemValue) =>
              setIsPublic(itemValue == "Yes" ? true : false)
            }
            data={["Yes", "For me only"]}
            value={isPublic}
            placeholder="Is Public"
            style={{ marginTop: 4, marginBottom: 4 }}
            width={150}
          />
          {/* <Select
            minWidth="full"
            placeholder="Is Public"
            mt={4}
            mb={4}
            onValueChange={(itemValue) => setIsPublic(itemValue)}
          >
            <Select.Item label="Yes" value="true" />
            <Select.Item label="For me only" value="false" />

          </Select> */}
        </>
        <>
          <Text>Trip Weather</Text>
          <Text>
            Temparature - {weatherObject?.main?.temp}, Humidity -{" "}
            {weatherObject?.main?.humidity}
          </Text>
        </>
        <HStack>
          <Text>Pack</Text>
          <Text>`Selected Pack Name`</Text>
        </HStack>
        <HStack>
          <Text>Trip Location - </Text>
          <Text>{search?.properties?.name}</Text>
        </HStack>
        <HStack>
          <Text>Selected Trail - </Text>
          <Text>{dropdown?.currentTrail}</Text>
        </HStack>
        <HStack>
          <Text>Selected Date Range - </Text>
          <Text>
            {dateRange.startDate
              ? format(dateRange.startDate, "MM/dd/yyyy")
              : ""}{" "}
            - {dateRange.endDate ? format(dateRange.endDate, "MM/dd/yyyy") : ""}
          </Text>
        </HStack>
        <HStack>
          <Text>Duration {`(Number of nights) - `} </Text>
          {dateRange.startDate && dateRange.endDate && (
            <Text>
              {
                intervalToDuration({
                  start: dateRange.startDate,
                  end: dateRange.endDate,
                }).days
              }
            </Text>
          )}
        </HStack>
      </VStack>
    </CustomModal>
  );
};
