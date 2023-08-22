import { Link } from "expo-router";
import { Stack, VStack, Text, Button } from "native-base";
import { Platform } from "react-native";
import UserDataCard from "./UserDataCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LargeCard from "../card/LargeCard";
import { theme } from "../../theme";
import UseTheme from '../../hooks/useTheme';

export default function UserDataContainer({ data, type, userId }) {
  const { enableDarkMode, enableLightMode, isDark, isLight, currentTheme } = UseTheme();
  const [dataState, setDataState] = useState(
    data.length > 0 ? Array(data.length).fill(false) : []
  );
  useEffect(() => {
    setDataState(Array(data.length).fill(false));
  }, [data]);
  const currentUser = useSelector((state) => state.auth.user);

  const typeUppercase = type.charAt(0).toUpperCase() + type.slice(1);

  const typeUppercaseSingular = typeUppercase.slice(0, -1);

  const cardType = type === "packs" ? "pack" : "trip";

  const differentUser = userId && userId !== currentUser._id;

  return (
    <LargeCard
      customStyle={{
        // light transparent grey
        backgroundColor: "rgba(255, 255, 255, 0.1)",

      }}
    >
      <VStack space={5} alignItems="center" flex={1} width="100%" padding={4}>
        <Text fontSize="2xl" fontWeight="bold" color={currentTheme.colors.white} uppercase={true}>
          {differentUser
            ? // ? `${userId}'s ${typeUppercase}`
              `${typeUppercase}`
            : `Your ${typeUppercase}`}
        </Text>
        <Stack
          direction={["column", "column", "column", "row"]}
          space={[4, 4, 4, 2]}
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          width="100%"
          padding={4}
        >
          {data && data.length > 0 ? (
            data?.map((dataItem, index) => (
              <UserDataCard
                key={dataItem._id}
                {...{ ...dataItem }}
                type={cardType}
                state={dataState}
                setState={setDataState}
                index={index}
                differentUser={differentUser}
              />
            ))
          ) : currentUser?._id === userId ? (
            <Link href="/">
              <Button
                _text={{
                  color: currentTheme.colors.white,
                }}
                w={["100%", "100%", "100%", "auto"]}
              >
                {`Create your first ${typeUppercaseSingular}`}
              </Button>
            </Link>
          ) : (
            <></>
          )}
        </Stack>
      </VStack>
    </LargeCard>
  );
}
