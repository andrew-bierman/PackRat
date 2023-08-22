import { Image } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Avatar({ src }: { src: string }) {
  return (
    <>
      {src ? (
        <Image
          source={{ uri: src }}
          alt="Profile Image"
          borderRadius={50}
          size={100}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      ) : (
        <MaterialCommunityIcons
          name="account-circle"
          size={100}
          color="grey"
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: "center",
          }}
        />
      )}
    </>
  );
}
