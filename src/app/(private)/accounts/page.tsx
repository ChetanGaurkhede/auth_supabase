import React from "react";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { getcurrentUserFromSupabase } from "@/app/actions/users";

async function AccountPage() {
  const result = await currentUser();
  const name = result?.firstName + " " + result?.lastName;
  const email = result?.emailAddresses?.[0]?.emailAddress ?? "No email";
  const id = result?.id
  const response = await getcurrentUserFromSupabase()

  return (
    <div className="p-5 ">
      
      <h1>Account page</h1>
      <UserButton fallback="/" afterSwitchSessionUrl="/" />
      <p>{name}</p>
      <p>{email}</p>
      <p>{id}</p>
    </div>
  );
}

export default AccountPage;
