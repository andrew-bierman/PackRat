import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePack } from "../../store/singlePackStore";
import { CustomCard } from "../card";

export const DetailsComponent = ({ type, data, additionalComps, link }) => {
  const renderDetails = () => {
    switch (type) {
      case "pack":
        // Add pack-specific logic here
        return (
          <>
            <CustomCard
              title={data?.name}
              link={link}
              content={
                <>
                  {data?.description && <Text>Description: {data?.description}</Text>}
                  {
                    <Text>Owner:                      
                      <Link style={{color:'red'}} href={'/profile/' + data?.owner_id?._id}>
                      {data?.owner_id?.name}
                     </Link>
                     </Text>

                  }
                 
                  {additionalComps}
                </>
              }
              footer={data?.details}
              type = "pack"
            />
          </>
        );
      case "trip":
        // Add trip-specific logic here
        return (
          <>
                  <CustomCard
              title={data?.name}
              link={link}
              content={
                <>
                  {data?.description && <Text>Description: {data?.description}</Text>}
                  {data?.destination && <Text>Destination: {data?.destination}</Text>}
                  {
                    <Text>Owner:                      <Link style={{color:'red'}} href={'/profile/' + data?.owner_id?._id}>
                      {data?.owner_id?.name}
                     </Link>
                     </Text>

                  }
                  {additionalComps}
                </>
              }
              destination={data?.destination}
              footer={data?.details}
              type = "trip"
            />
            {/* <View>
              <Text>{data?.title}</Text>
            </View>
            <View>
              <Text>{data?.details}</Text>
            </View> */}
          </>
        );
      case "item":
        // Add item-specific logic here
        return (
          <>
            <View>
              <Text>{data.name}</Text>
            </View>
            <View>
              <Text>{data.description}</Text>
            </View>
          </>
        );
      default:
        // Handle unknown types
        return null;
    }
  };

  return <View>{renderDetails()}</View>;
};
