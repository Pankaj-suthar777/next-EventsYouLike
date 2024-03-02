"use client";

import { UserButton } from "@clerk/nextjs";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const menusForAdmin = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Events",
      path: "/admin/events",
    },
    {
      title: "Bookings",
      path: "/admin/bookings",
    },
    {
      title: "Users",
      path: "/admin/users",
    },
    {
      title: "Reports",
      path: "/admin/reports",
    },
  ];

  const menusForUser = [
    {
      title: "Home",
      path: "/",
    },

    {
      title: "Bookings",
      path: "/bookings",
    },
  ];

  const router = useRouter();
  const pathName = usePathname();
  const isPrivateRoute = !["/sign-in", "/sign-out"].includes(pathName);
  const [menuToShow, setMenuToShow] = useState<any[]>([]);

  async function getUserData() {
    try {
      const response = await axios.get("/api/current-user");
      console.log("response", response.data);
      if (response.data.user.isAdmin) {
        setMenuToShow(menusForAdmin);
        setIsAdmin(true);
      } else {
        setMenuToShow(menusForUser);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="bg-gray-200 h-screen lg:px-20 px-5">
      {isPrivateRoute && (
        <div className="bg-white flex justify-between items-center shadow p-3">
          <h1 className="text-gray-600 font-semibold text-2xl">
            EventsYouLike
          </h1>
          <div className="flex gap-5">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">Profile</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions">
                {menuToShow.map((menu) => (
                  <DropdownItem
                    key={menu.title}
                    onClick={() => {
                      router.push(menu.path);
                    }}
                  >
                    {menu.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      )}
      <div className="p-3">{children}</div>
    </div>
  );
};

export default LayoutProvider;
