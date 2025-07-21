'use client'
import userGlobalStore, { IuserGlobalStore } from "@/app/store/user-Store";
import React from "react";

function Account() {
  const { user } = userGlobalStore() as IuserGlobalStore;
  return <div>{user?.email}</div>;
}

export default Account;
