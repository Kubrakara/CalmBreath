import { NotificationProvider } from "@/context/NotificationsContext";
import "../global.css";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";
import { savePushTokenToFirestore } from "@/utils/savePushTokenToFirestore";
import { SafeAreaProvider } from "react-native-safe-area-context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("✅ Push token alındı:", token);
        savePushTokenToFirestore(token); // ⬅️ direkt Firestore'a yaz
      })
      .catch((err) => {
        console.error("❌ Push token alınamadı:", err);
      });
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("✅ Push token alındı:", token);
      })
      .catch((err) => {
        console.error("❌ Push token alınamadı:", err);
      });
  }, []);

  return (
    <NotificationProvider>
      <SafeAreaProvider>
        <StatusBar />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </NotificationProvider>
  );
}
