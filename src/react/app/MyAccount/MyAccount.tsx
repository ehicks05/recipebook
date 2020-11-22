import React from "react";
import Hero from "../../components/Hero";
import { IUser } from "../../types/types";

interface IProps {
  user: IUser | undefined;
}

function MyAccount({ user }: IProps) {
  return <Hero title={"Edit Your Account"} subtitle={user?.displayName} />;
}

export default MyAccount;
