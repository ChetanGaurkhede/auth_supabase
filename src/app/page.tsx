"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import userGlobalStore, { IuserGlobalStore } from "@/app/store/userStore";
import { getcurrentUserFromSupabase } from "./actions/users";
import { LoaderCircle } from "lucide-react";

export default function Home() {
  const [openSheet, setOpensheet] = useState(false);
  const searchParams = useSearchParams();

  const { user, setUser } = userGlobalStore() as IuserGlobalStore;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response: any = await getcurrentUserFromSupabase();
      console.log("Hello");
      if (!response.success) {
        throw new Error(response.error);
      } else {
        setUser(response.data);
      }
    } catch (error) {
      toast.error("An eeror occurd while fetching user data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const [formType, setFormType] = useState<"sign-in" | "sign-up">("sign-in");

  useEffect(() => {
    const form = searchParams.get("form");
    if (form === "sign-up" || form === "sign-in") {
      setFormType(form);
      setOpensheet(true); // auto-open if param exists
    } else {
      setOpensheet(false);
    }
    console.log(user);
  }, [searchParams]);

  const toggleForm = () => {
    const nextForm = formType === "sign-in" ? "sign-up" : "sign-in";
    router.replace(`/?form=${nextForm}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin">
          <LoaderCircle className="text-black w-10 h-10" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className="w-full p-2 bg-gray-800 fixed top-0 left-0">
        <nav className="container flex justify-between items-center m-auto text-white">
          <h1 className="text-xl font-bold">Logo</h1>
          {user && (
            <button
              className="px-4 py-2 bg-white rounded-xl text-gray-800"
              onClick={() => setOpensheet(true)}
            >
              Login
            </button>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-2xl font-bold">Clerk + Supabase</h1>
        </main>

        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          {/* Add your links here */}
        </footer>

        {/* Auth Sheet */}
        <Sheet open={openSheet} onOpenChange={setOpensheet}>
          <SheetContent className="lg:min-w-[500px]">
            <SheetHeader>
              <SheetTitle>
                {formType === "sign-up" ? "Create an Account" : "Welcome Back"}
              </SheetTitle>
            </SheetHeader>

            {formType === "sign-up" ? (
              <SignUp
                routing="hash"
                signInUrl="/?form=sign-in"
                fallbackRedirectUrl="/accounts"
              />
            ) : (
              <SignIn
                routing="hash"
                signUpUrl="/?form=sign-up"
                fallbackRedirectUrl="/accounts"
              />
            )}

            {/* Toggle Link */}
            <div className="mt-4 text-center text-sm text-gray-500">
              {formType === "sign-in" ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={toggleForm}
                    className="text-blue-600 underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={toggleForm}
                    className="text-blue-600 underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
