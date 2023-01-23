import React from "react";
import { Container, Hero, T } from "components/core";
import MyAccountComponent from "components/MyAccount/MyAccountComponent";
import { useUser } from "@supabase/auth-helpers-react";
import { api } from "utils/api";
import type { NextPage } from "next";
import RecipeForm from "components/RecipeForm/RecipeForm";

const MyAccount: NextPage = () => {
  return (
    <>
      <RecipeForm />
    </>
  );
};

export default MyAccount;
