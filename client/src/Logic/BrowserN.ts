export const showNotification = (title: string, message: string, userName: string, userProfile: string) => {
    if (!("Notification" in window)) {
        console.error("This browser does not support desktop notifications.");
        return;
    }

    if (Notification.permission === "granted") {
        new Notification(`${userName} - ${title}`, {
            body: message,
            icon: userProfile || "/assets/notification-icon.png" // Use user's profile photo or default icon
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(`${userName} - ${title}`, {
                    body: message,
                    icon: userProfile || "/assets/notification-icon.png"
                });
            }
        });
    }
};
