import React from 'react';
import { Text } from 'react-native';
import { CustomCard } from '../card';
import { RStack } from '@packrat/ui';

interface IDetailsComponent {
  type: string;
  data: any; // Need type for this
  isLoading: boolean;
  error: Error;
  additionalComps: React.JSX.Element;
  link: string;
}

export const DetailsComponent = ({
  type,
  data,
  isLoading,
  error,
  additionalComps,
  link,
}: IDetailsComponent) => {
  const renderDetails = () => {
    switch (type) {
      case 'pack':
        // Add pack-specific logic here
        return (
          <>
            <CustomCard
              data={data}
              title={data?.name}
              link={link}
              content={
                <>
                  {data?.description && (
                    <RStack>
                      <Text>Description: {data?.description}</Text>
                    </RStack>
                  )}

                  {additionalComps}
                </>
              }
              footer={data?.details}
              destination={null}
              type="pack"
            />
          </>
        );
      case 'trip':
        // Add trip-specific logic here
        return (
          <>
            <CustomCard
              data={data}
              title={data?.name}
              link={link}
              content={
                <>
                  {additionalComps}
                </>
              }
              destination={data?.destination}
              footer={data?.details}
              type="trip"
            />
          </>
        );
      case 'item':
        // Add item-specific logic here
        return (
          <>
            <RStack>
              <Text>{data.name}</Text>
            </RStack>
            <RStack>
              <Text>{data.description}</Text>
            </RStack>
          </>
        );
      default:
        // Handle unknown types
        return null;
    }
  };

  return <RStack>{renderDetails()}</RStack>;
};
