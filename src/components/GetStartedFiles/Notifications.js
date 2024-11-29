import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/GetStartedFiles/Notifications.module.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/posts/new-posts`);
                setNotifications(response.data.notifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, []);

    const viewDogProfile = (notification) => {
        if (notification.postType === 'lost') {
            navigate('/lost-dog-profile', { state: notification });
        } else if (notification.postType === 'found') {
            navigate('/found-dog-profile', { state: notification });
        }
    };

    return (
        <div className={styles.notificationsWrapper}>
            <h2 className={styles.notificationsTitle}>Notifications</h2>
            <ul className={styles.notificationsList}>
                {notifications.map((notification) => (
                    <li key={notification._id} onClick={() => viewDogProfile(notification)} className={styles.notificationsListItem}>
                        <div className={styles.notificationsDetails}>
                            <img
                                src={`${process.env.REACT_APP_BASE_URL}${notification.imagePath}`} // Dynamically set the image URL
                                alt={notification.name}
                                className={styles.notificationsImage}
                            />
                            <div>
                                <span className={styles.notificationsType}>
                                    {notification.postType === 'lost' ? 'Lost Dog' : 'Found Dog'}
                                </span>
                                <span className={styles.notificationsName}> {notification.name} </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
