import React from 'react';
import { Text } from 'react-native';
import { CustomCard } from '../card';
import { RStack } from '@packrat/ui';

interface DetailsComponent {
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
}: DetailsComponent) => {
  const renderDetails = () => {
    switch (type) {
      case 'pack':
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
              // destination={null}
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
              content={<>{additionalComps}</>}
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
        return null;
    }
  };

  return <RStack style={{ width: '100%' }}>{renderDetails()}</RStack>;
};
