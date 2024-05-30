import { useState } from 'react';
import { Text } from 'react-native';
import { View } from 'tamagui';
import DateRangePickerComponent from 'react-native-daterange-picker';
import moment from 'moment';

const DateRangePicker = () => {
  const [dates, setDates] = useState({ startDate: null, endDate: null });
  return (
    <DateRangePickerComponent
      onChange={setDates}
      endDate={dates.endDate}
      startDate={dates.endDate}
      displayedDate={moment()}
      range
    >
      <Text>Click me!</Text>
    </DateRangePickerComponent>
  );
};

export default DateRangePicker;
