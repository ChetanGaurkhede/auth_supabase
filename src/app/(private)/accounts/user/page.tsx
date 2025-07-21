"use client";
import userGlobalStore, { IuserGlobalStore } from "@/app/store/userStore";
import React from "react";

function User() {
  const { user } = userGlobalStore() as IuserGlobalStore;
  console.log(user);
  return <div>{user?.name}</div>;
}

export default User;
