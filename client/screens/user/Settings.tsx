import { useSelector } from "react-redux";
import Avatar from "~/components/Avatar";
import { Ionicons } from "@expo/vector-icons";
import { XStack, YStack } from "@tamagui/stacks";
import { H4, H5 } from "@tamagui/text";
import { Button } from "@tamagui/button";
import { Label } from "@tamagui/label";
import { Select } from "@tamagui/select";
import { Input } from "tamagui";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function Settings() {
  const [user, setUser] = useState(useSelector((state) => state.auth.user));

  const handleChange = ({ target }) => {
    setUser((prev) => ({ ...prev, [target.id]: target.value }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChange({ target: { id: "profileImage", value: result.uri } });
    }
  };

  const removeProfileImage = () => {
    handleChange({ target: { id: "profileImage", value: null } });
  };

  return (
    <YStack
      space="$3"
      style={{
        width: "fit-content",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <XStack alignItems="center" space="$2">
        <Avatar src={user.profileImage} />
        <YStack>
          <H4>Profile Picture</H4>
          <XStack space="$2" alignItems="flex-end">
            <Button
              icon={<Ionicons name="cloud-upload-outline" size={24} />}
              color="white"
              style={{ backgroundColor: "#0284c7" }}
              onPress={pickImage}
            >
              Upload
            </Button>
            <Button onPress={removeProfileImage}>Remove</Button>
          </XStack>
        </YStack>
      </XStack>
      <XStack space="$3">
        <YStack>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </YStack>
        <YStack>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" value={user.lastName} onChange={handleChange} />
        </YStack>
      </XStack>
      <YStack>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={user.email} onChange={handleChange} />
      </YStack>
      <YStack>
        <H5>Preferred units</H5>
        <XStack space>
          <YStack space="$2" flexGrow={1}>
            <Label>Weather: </Label>
            <CustomSelect
              items={["celsius", "fahrenheit"]}
              value={user.preferredWeatherUnit}
              onChange={(value) =>
                handleChange({ target: { id: "preferredWeather", value } })
              }
            />
          </YStack>
          <YStack space="$2" flexGrow={1}>
            <Label>Weight: </Label>
            <CustomSelect
              items={["lb", "oz", "kg", "g"]}
              value={user.preferredWeatherUnit}
              onChange={(value) =>
                handleChange({ target: { id: "preferredWeight", value } })
              }
            />
          </YStack>
        </XStack>
      </YStack>
      <Button color="white" style={{ backgroundColor: "#0284c7" }}>
        Save
      </Button>
    </YStack>
  );
}

const CustomSelect = ({ onChange, value, items }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          {items.map((item, i) => (
            <Select.Item index={i} key={item} value={item}>
              <Select.ItemText>{item.toUpperCase()}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
};
