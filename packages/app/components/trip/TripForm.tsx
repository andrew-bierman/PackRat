import React from 'react';
import {
  Form as OriginalForm,
  FormInput,
  FormSelect as OriginalFormSelect,
  YStack,
  SubmitButton,
  FormSwitch as OriginalSwitch,
} from '@packrat/ui';
import { useRouter } from 'app/hooks/router';
import { useAddTrip, useEditTrips } from 'app/hooks/trips';
import { tripForm } from '@packrat/validations/src/validations/tripRoutesValidator';
import { formatCreateTripValuesForAPI } from 'app/utils/tripUtils';
import { TripDateRangeCard } from './TripCards';
import { getEnumValues } from 'app/utils/getEnumValues';
import { formatTripActivityLabel } from 'app/utils/tripUtils';
import { type addTripKey } from 'app/screens/trip/createTripStore/store';

const Form: any = OriginalForm;
const FormSelect: any = OriginalFormSelect;
const FormSwitch: any = OriginalSwitch;

interface TripFormProps {
  tripStore: any;
  dateRange: any;
  isDisabled: boolean;
  setDateRange: (range: any) => void;
  initialState?: Partial<Record<addTripKey, any>>;
  tripId?: string;
}

export const TripForm = ({
  tripStore,
  dateRange,
  setDateRange,
  initialState,
  tripId,
  isDisabled,
}: TripFormProps) => {
  const { addTrip, isSuccess, data: response } = useAddTrip();
  const { editTrips, isLoading: isSaving } = useEditTrips();
  const router = useRouter();

  const handleCreateTrip = async (values) => {
    const data = {
      ...formatCreateTripValuesForAPI(tripStore),
      ...values,
    };

    tripId ? editTrips({ id: tripId, ...data }) : addTrip(data);
  };
  if (isSuccess && response) {
    router.push(`/trip/${response.id}`);
  }

  return (
    <Form
      validationSchema={tripForm}
      onSubmit={handleCreateTrip}
      defaultValues={{
        name: initialState?.name,
        description: initialState?.description,
        is_public: initialState?.is_public,
        activity: initialState?.activity || ActivityOptions[0]?.value,
      }}
    >
      <YStack style={{ gap: 16 }}>
        <FormInput placeholder="Trip Name" name="name" />
        <FormInput
          multiline
          rows={3}
          placeholder="Trip Description"
          name="description"
        />
        <TripDateRangeCard dateRange={dateRange} setDateRange={setDateRange} />
        <FormSelect
          options={ActivityOptions}
          label="Activity"
          placeholder="Select Activity"
          fullWidth
          name="activity"
        />
        <FormSwitch labelLeft="Visible For Everyone" name="is_public" />
        <SubmitButton
          disabled={isDisabled || isSaving}
          onSubmit={handleCreateTrip}
        >
          Save Trip
        </SubmitButton>
      </YStack>
    </Form>
  );
};

export enum TripActivity {
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
