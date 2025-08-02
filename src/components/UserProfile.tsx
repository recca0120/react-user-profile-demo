import React from 'react';
import useSWR from 'swr';
import './UserProfile.css';
import { User } from '../types/user';

interface UserProfileProps {
    userId: string;
}

const fetcher = (url: string): Promise<User> => 
    fetch(url).then(res => {
        if (!res.ok) {
            throw new Error('Failed to fetch user data');
        }
        return res.json();
    });

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
    const { data: user, error, isLoading } = useSWR<User>(
        `/api/user/${userId}`,
        fetcher
    );

    if (isLoading) {
        return (
            <div className="user-profile loading">
                <p>載入中...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-profile error">
                <p>錯誤: {error.message}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="user-profile">
                <p>找不到使用者資料</p>
            </div>
        );
    }

    return (
        <div className="user-profile">
            <div className="profile-header">
                <img src={user.avatar} alt={user.name} className="avatar" />
                <div className="user-info">
                    <h2 className="user-name">{user.name}</h2>
                    <p className="user-email">{user.email}</p>
                    <p className="user-location">📍 {user.location}</p>
                    <p className="join-date">📅 加入於 {user.joinDate}</p>
                </div>
            </div>

            <div className="profile-bio">
                <h3>關於我</h3>
                <p>{user.bio}</p>
            </div>

            <div className="profile-stats">
                <div className="stat">
                    <span className="stat-value">{user.followers}</span>
                    <span className="stat-label">粉絲</span>
                </div>
                <div className="stat">
                    <span className="stat-value">{user.following}</span>
                    <span className="stat-label">追蹤中</span>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;