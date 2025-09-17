// Custom hook in react: 
// functions that use built-in hooks (like useSate, useEffect)
// to encapsulate and reuse stateful logic across components.
import { useState, useEffect } from "react";
import { UserStats, UserInfo } from "../types";

export const useGame = () => {
    const [userStats, setUserStats] = useState<UserStats>({
        score: 0,
        diamonds: 10
    });

    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: null,
        loading: true
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/api/init'); //Reddit endpoint that gives the user info
                const data = await response.json();
                
                setUserInfo({ // update state with parsed data
                    username: data.username,
                    loading: false
                });
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                
                setUserInfo({
                    username: null,
                    loading: false
                });
            }
        };
        void fetchUserInfo();
    }, []);
    
    return {
        userStats,
        userInfo
    };
};