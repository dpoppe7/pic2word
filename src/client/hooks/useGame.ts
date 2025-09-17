// Custom hook in react: 
// functions that use built-in hooks (like useSate, useEffect)
// to encapsulate and reuse stateful logic across components.
import { useState } from "react";
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
    
    return {
        userStats,
        userInfo
    };
};