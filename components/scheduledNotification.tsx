import * as Notifications from 'expo-notifications';
import {Platform} from "react-native";

export default async function scheduleNotification(title:any, body:any, time:any) {
    const notificationTime = new Date(getNextThursday().getFullYear(), getNextThursday().getMonth(), getNextThursday().getDate(), 16, 0, 0); // Set the time to 4 PM
    const now = new Date();

    if (notificationTime > now) {
        const scheduledNotificationConfig = {
            content: {
                title: `Scheduled Notification`,
                body: 'At Liverpool:',
            },
            trigger: {
                date: notificationTime,
            },
        };

        const notificationId = await Notifications.scheduleNotificationAsync(scheduledNotificationConfig);
        console.log('Scheduled notification with ID:', notificationId);
    } else {
        console.log('Notification time has already passed');
    }
}

function getNextThursday() {
    const currentDate = new Date();
    const daysUntilNextThursday = (4 - currentDate.getDay() + 7) % 7; // Calculate the number of days until next Thursday
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + daysUntilNextThursday);
}



export async function TestInAppNotification() {
    console.log("TestInAppNotification ScheduledNotification.tsx")
    const checkNotificationPermissionAndSchedule = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status === 'granted') {
            console.log('Notification permission is granted');
            await scheduleNotification('Reminder', 'Hello, world!', 10); // Schedule a notification after 10 seconds
        } else {
            console.warn('Notification permission is not granted');
            return false;
        }
    };

    // Android specific code for displaying request permission for notification
    if (Platform.OS === 'android') {
        await setupDefaultNotificationChannel();
    }

    async function setupDefaultNotificationChannel() {
        const channel = await Notifications.getNotificationChannelAsync('default');
        if (channel && channel.sound === null) {
            await Notifications.setNotificationChannelAsync('default', {
                ...channel,
                sound: 'default',
            });
        } else {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'Default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
                sound: 'default',
            });
        }
    }

    async function scheduleNotification(title, body, time) {
        const scheduledNotificationConfig = {
            content: {
                title: `Next event is : Liverpool Chapter`,
                body: 'At Liverpool Bla Bla Bla',
            },
            trigger: {
                seconds: 5,
            },
        };

        const notificationId = await Notifications.scheduleNotificationAsync(scheduledNotificationConfig);
        console.log('Scheduled notification with ID:', notificationId);
    }

    await checkNotificationPermissionAndSchedule();
}