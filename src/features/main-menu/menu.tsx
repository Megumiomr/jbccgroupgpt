"use client";

import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MessageCircle,
  PanelLeftClose,
  PanelRightClose,
  Home,
  Lightbulb,
  Sticker,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme/theme-toggle";
import { UserProfile } from "../user-profile";

import { useSession } from "next-auth/react";
import { UpdateIndicator } from "../change-log/update-indicator";
import { useMenuContext } from "./menu-context";

export const MainMenu = () => {
  const { data: session } = useSession();
  const { isMenuOpen, toggleMenu } = useMenuContext();
  return (
    <div className="flex flex-col justify-between p-2">
      <div className="flex gap-5  flex-col  items-center">
        <Button
          onClick={toggleMenu}
          className="rounded-full w-[40px] h-[40px] p-1 text-primary"
          variant={"outline"}
        >
          {isMenuOpen ? <PanelLeftClose /> : <PanelRightClose />}
        </Button>
        <Button
          asChild
          className="rounded-full w-[40px] h-[40px] p-1 text-primary"
          variant={"outline"}
        >
        </Button>
        <Button
          asChild
          className="rounded-full w-[40px] h-[40px] p-2 text-primary"
          variant={"outline"}
        >
          <Link href="/chat" title="新しく会話を始める">
            <Home />
          </Link>
        </Button>
        {session?.user?.isAdmin ? (
          <Button
            asChild
            className="rounded-full w-[40px] h-[40px] p-2 text-primary"
            variant={"outline"}
          >
            <Link href="/option" title="設定">
            <Sticker />
            </Link>
          </Button>
        ) : (
          <></>
        )}

        {session?.user?.isAdmin ? (
          <Button
            asChild
            className="rounded-full w-[40px] h-[40px] p-2 text-primary"
            variant={"outline"}
          >
            <Link href="/reporting" title="レポート">
              <LayoutDashboard />
            </Link>
          </Button>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col gap-2 items-center">
        <ThemeToggle />
        <UserProfile />
      </div>
    </div>
  );
};
