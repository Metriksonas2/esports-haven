import React, {useState} from 'react';
import Notifications from "react-notifications-menu";

const NOTIFICATIONS = [
    {
        image: "/assets/images/avatar.jpg",
        message: "Notification one.",
        detailPage: "/",
        receivedTime: "2h ago"
    },
    {
        image: "/assets/images/avatar.jpg",
        message: "Notification two.",
        detailPage: "/",
        receivedTime: "7h ago"
    },
    {
        image: "/assets/images/avatar.jpg",
        message: "Notification three.",
        detailPage: "/",
        receivedTime: "12h ago"
    },
    {
        image: "/assets/images/avatar.jpg",
        message: "Notification four.",
        detailPage: "/",
        receivedTime: "2h ago"
    },
    {
        image: "/assets/images/avatar.jpg",
        message: "Notification five.",
        detailPage: "/",
        receivedTime: "7h ago"
    },
    {
        image: "/assets/images/avatar.jpg",
        message: "Notification six.",
        detailPage: "/",
        receivedTime: "12h ago"
    },
    {
        image: "/assets/images/avatar.jpg",
        message: "Notification seven.",
        detailPage: "/",
        receivedTime: "2h ago"
    },
    {
        image: "/assets/images/avatar.jpg",
        message: "Notification eight.",
        detailPage: "/",
        receivedTime: "7h ago"
    },
    {
        image: "/assets/images/avatar.jpg",
        message: "Notification nine.",
        detailPage: "/",
        receivedTime: "12h ago"
    },
];

const NotificationBell = () => {
    const [data, setData] = useState(NOTIFICATIONS);

    return (
        <Notifications
            data={data}
            header={{
                title: "Notifications",
                option: { text: "View All", onClick: () => console.log("Clicked") }
            }}
            markAsRead={(data) => {
                console.log(data);
            }}
        />
    );
}

export default NotificationBell;