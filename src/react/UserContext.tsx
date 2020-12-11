import React, {createContext, Dispatch, SetStateAction} from "react";
import {IFavorite, IUser} from "./types/types";

interface IUserContext {
    user: IUser | undefined,
    setUser: (user: IUser | undefined) => void,
    favoriteIds: number[],
    setFavoriteIds: Dispatch<SetStateAction<number[]>>,
    fetchFavoriteIds: () => void;
}

const defaultValue: IUserContext = {
    user: undefined,
    setUser: () => {},
    favoriteIds: [],
    setFavoriteIds: () => {},
    fetchFavoriteIds: () => null,
}

export const UserContext = React.createContext(defaultValue);