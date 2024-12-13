import React from 'react';
import {
  Form as OriginalForm,
  FormInput,
  FormSelect as OriginalFormSelect,
  YStack,
  SubmitButton,
} from '@packrat/ui';
import { useRouter } from 'app/hooks/router';
import { useAddTrip } from 'app/hooks/trips';
import { addTripForm } from '@packrat/validations/src/validations/tripRoutesValidator';
import { formatCreateTripValuesForAPI } from 'app/utils/tripUtils';
import { TripDateRangeCard } from './TripCards';
import { getEnumValues } from 'app/utils/getEnumValues';
import { formatTripActivityLabel } from 'app/utils/tripUtils';

const Form: any = OriginalForm;
const FormSelect: any = OriginalFormSelect;

interface TripFormProps {
  tripStore: any;
  dateRange: any;
  setDateRange: (range: any) => void;
  isValid: boolean;
}

const isPublicOptions = ['For me only', 'Public'].map((key, index) => ({
  label: key,
  value: String(index),
}));

export const TripForm = ({
  tripStore,
  dateRange,
  setDateRange,
  isValid,
}: TripFormProps) => {
  const { addTrip, isSuccess, data: response } = useAddTrip();
  const router = useRouter();

  const handleCreateTrip = async (values) => {
    const data = {
      ...formatCreateTripValuesForAPI(tripStore),
      ...values,
    };

    addTrip(data);
  };
  if (isSuccess && response) {
    router.push(`/trip/${response.id}`);
  }

  return (
    <Form
      validationSchema={addTripForm}
      onSubmit={handleCreateTrip}
      defaultValues={{ is_public: '0', activity: ActivityOptions[0].value }}
    >
      <YStack style={{ gap: 16 }}>
        <FormInput placeholder="Trip Name" name="name" />
        <FormInput placeholder="Trip Description" name="description" />
        <TripDateRangeCard dateRange={dateRange} setDateRange={setDateRange} />
        <FormSelect
          options={ActivityOptions}
          label="Activity"
          placeholder="Select Activity"
          fullWidth
          name="activity"
        />
        <FormSelect
          options={isPublicOptions}
          label="Access"
          placeholder="Is Public"
          fullWidth
          name="is_public"
        />
        <SubmitButton disabled={!isValid} onSubmit={handleCreateTrip}>
          Save Trip
        </SubmitButton>
      </YStack>
    </Form>
  );
};

enum TripActivity {
  TRIP = 'trip',
  RUNNING = 'running',
  BIKING = 'biking',
  CAMPING = 'camping',
  FISHING = 'fishing',
  TREKKING = 'trekking',
  ROCK_CLIMBING = 'rock-climbing',
  HIKING = 'hiking',
  SWIMMING = 'swimming',
}

const ActivityOptions = getEnumValues(TripActivity).map((activity) => ({
  label: formatTripActivityLabel(activity.toString()),
  value: activity,
}));
