import { useRouter, useNavigation } from "expo-router";

// Get the current route
export function useRoute(router) {
  return router.route;
}

// Navigate to a new screen
export function navigateTo(navigation, route) {
  navigation.push(route);
}

// Go back to the previous screen
export function goBack(navigation) {
  navigation.back();
}

// Check if we can go back
export function canGoBack(navigation) {
    return navigation.canGoBack();
}

// Either go back or navigate to a new screen
export function goBackOrNavigateTo(navigation, route) {
  if (navigation.canGoBack()) {
    navigation.back();
  } else {
    navigation.push(route);
  }
}

// Go back to the first screen in the stack
export function popToTop(navigation) {
  navigation.dispatch({ type: "POP_TO_TOP" }); // OR navigation.push("/")
}

// Replace the current route with a new one
export function replace(navigation, route) {
  navigation.replace(route);
}
