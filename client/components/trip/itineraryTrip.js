import React, { useState, useEffect } from "react";
import { Box, VStack, Heading, Text, Input, Button } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../../theme";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your backend URL

const Itinerary = () => {
  const [days, setDays] = useState([]);
  const [newDayTitle, setNewDayTitle] = useState("");

  // Function to update the itinerary state with real-time changes from the server
  const handleItineraryUpdate = (updatedItinerary) => {
    setDays(updatedItinerary);
  };

  useEffect(() => {
    // Listen for updates from the server
    socket.on("receive_itinerary", handleItineraryUpdate);

    // Clean up the socket listener on component unmount
    return () => {
      socket.off("receive_itinerary", handleItineraryUpdate);
    };
  }, []);

  // Function to add a new day to the itinerary
  const addDay = () => {
    if (newDayTitle.trim() !== "") {
      const newDay = {
        title: newDayTitle.trim(),
        content: "",
      };

      const updatedItinerary = [...days, newDay];

      // Emit the updated itinerary to the server
      socket.emit("update_itinerary", updatedItinerary);
      setDays(updatedItinerary);
      setNewDayTitle("");
    }
  };

  // Function to update the content of a specific day
  const updateDayContent = (index, content) => {
    const updatedItinerary = days.map((day, i) =>
      i === index ? { ...day, content } : day
    );

    // Emit the updated itinerary to the server
    socket.emit("update_itinerary", updatedItinerary);
    setDays(updatedItinerary);
  };

  return (
    <Box p={2} backgroundColor={"white"} borderRadius={4} w={1260} margin={"auto"}>
      <VStack space={4}>
        <Heading size="sm" mb={4}>
          My Itinerary
        </Heading>
       
        <Box borderWidth={1} p={2} borderRadius="sm">
          <Input
            variant="outline"
            placeholder="Enter new day title..."
            value={newDayTitle}
            onChangeText={setNewDayTitle}
          />
          <Button mt={2} onPress={addDay}>
            <FontAwesome name="plus" size={10} />
          </Button>
        </Box>
        {days.map((day, index) => (
          <Box key={index} borderWidth={1} p={2} borderRadius="sm">
            <Heading size="sm">{day.title}</Heading>
            <Input
              variant="outline"
              mt={2}
              placeholder="Add details..."
              value={day.content}
              onChangeText={(content) => updateDayContent(index, content)}
            />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Itinerary;
