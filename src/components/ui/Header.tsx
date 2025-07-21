import { Iuser } from "@/app/interfaces";
import userGlobalStore, { IuserGlobalStore } from "@/app/store/user-Store";
import { Contact, Crown, Home, Menu, User } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation"; // ✅ App Router (Correct)

const userNav = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "User",
    url: "/accounts/user",
    icon: <User />,
  },
  {
    title: "Contact us",
    url: "/",
    icon: <Contact />,
  },
];

const adminNav = [
  {
    title: "Home",
    url: "/",
    icon: <Home />,
  },
  {
    title: "User",
    url: "/account/user",
    icon: <User />,
  },
  {
    title: "Contact us",
    url: "/",
    icon: <Contact />,
  },
  {
    title: "Admin",
    url: "/",
    icon: <Crown />,
  },
];

function Header() {
  const { user } = userGlobalStore() as IuserGlobalStore;
  const [showMobile, setShowmobile] = useState(false);
  const Navlist = user?.is_admin ? adminNav : userNav;
  const pathName = usePathname();
  const router = useRouter();

  return (
    <header className="bg-black">
      <nav className="max-w-6xl m-auto flex justify-between items-center p-5">
        <div className="log text-3xl font-semibold text-white">LOGO</div>
        <div className="flex items-center gap-6">
          <h3 className="text-white">{user?.name}</h3>
          <Menu
            className="text-white h-7 w-7 cursor-pointer"
            onClick={() => setShowmobile(true)}
          />
        </div>
      </nav>
      <Sheet open={showMobile} onOpenChange={setShowmobile}>
        <SheetTrigger asChild></SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Hello {user?.name}</SheetTitle>
            <SheetDescription>Welcome back to here</SheetDescription>
          </SheetHeader>

          <div>
            <ul className="flex flex-col gap-7 p-4">
              {Navlist.map((nav, index) => {
                return (
                  <li
                    key={index}
                    className={`flex items-center gap-3 ${
                      pathName === nav.url && "text-green-400"
                    }`}
                    onClick={() => router.push(nav.url)}
                  >
                    {" "}
                    <span>{nav.icon}</span>
                    {nav.title}
                  </li>
                );
              })}
            </ul>
          </div>

          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Header;
