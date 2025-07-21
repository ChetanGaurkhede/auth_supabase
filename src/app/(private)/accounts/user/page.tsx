'use client'
import userGlobalStore, { IuserGlobalStore } from "@/app/store/user-Store";
import React from "react";

function User() {
  const { user } = userGlobalStore() as IuserGlobalStore;
  return <div>{user?.name}</div>;
}

export default User;
