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
  const [isGuestUser, setIsGuestUser] = useState(true);

  async function getUserData() {
    try {
      const response = await axios.get("/api/current-user");
      if (response.data.user.isAdmin) {
        setMenuToShow(menusForAdmin);
        setIsAdmin(true);
        setIsGuestUser(false);
      } else {
        setMenuToShow(menusForUser);
      }
    } catch (error: any) {
      const CurrentRoute = ["/sign-in", "/sign-out"].includes(pathName);
      if (CurrentRoute) {
        return;
      }
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="bg-gray-200 lg:px-20 px-5">
      {isPrivateRoute && (
        <div className="bg-white flex justify-between items-center shadow px-3 py-5">
          <h1
            className="font-semibold cursor-pointer text-blue-900 text-2xl"
            onClick={() => {
              router.push("/");
            }}
          >
            EventsYouLike
          </h1>
          <div className="flex gap-5">
            {isGuestUser ? (
              <Button onClick={() => router.push("/sign-in")}>Login</Button>
            ) : (
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="flat" color="primary" size="sm">
                    Profile
                  </Button>
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
            )}

            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      )}
      <div className="py-3">
        {!isAdmin && pathName.includes("/admin")
          ? "You are not authorized to view this page"
          : children}
      </div>
    </div>
  );
};

export default LayoutProvider;
