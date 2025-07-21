'use client'
import React, { useEffect, useState } from "react";
import { Iuser } from "../interfaces";
import { getcurrentUserFromSupabase } from "../actions/users";
import { error } from "console";
import toast from "react-hot-toast";
import Header from "@/components/ui/Header";
import userGlobalStore, { IuserGlobalStore } from "../store/user-Store";
import { LoaderCircle } from "lucide-react";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { user, setUser } = userGlobalStore() as IuserGlobalStore;
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const response: any = await getcurrentUserFromSupabase();
      console.log("Hello");
      if (!response.success) {
        throw new Error(response.error);
      } else {
        setUser(response.data);
      }
    } catch (error) {
      toast.error("An eeror occurd while fetching user data");
    } finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  if(loading){
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin"><LoaderCircle className="text-black w-10 h-10" /></div>
      </div>
    )
  }
  return (
    <div>
      <Header />
      <div className="p-4">

      {children}
      </div>
    </div>
  );
}

export default PrivateLayout;
