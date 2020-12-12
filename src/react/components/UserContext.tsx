import React, { createContext } from "react";
import { IUser } from "../types/types";

interface IUserContext {
    user: IUser | undefined,
    setUser: (user: IUser | undefined) => void
}

const defaultValue: IUserContext = {
    user: undefined,
    setUser: () => {undefined}
}

export const UserContext = React.createContext(defaultValue);