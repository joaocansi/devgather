import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import React from "react";
import { Avatar } from "@heroui/avatar";
import Image from "next/image";

import { ThemeSwitch } from "./theme-switch";

type NavbarProps = {
  session: any;
};

export default function Navbar({ session }: NavbarProps) {
  const menuItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Communities",
      href: "/communities",
    },
    {
      name: "Projects",
      href: "/projects",
    },
  ];

  return (
    <HeroUINavbar>
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand className="gap-1">
          <Image alt="dev.gather" height={18} src="/logo.png" width={18} />
          <p className="font-bold text-inherit">
            Dev<span className="text-primary">.Gather</span>
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Communities
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Projects
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitch />
        <NavbarItem>
          {session ? (
            <Avatar isBordered size="sm" src={session.user.image} />
          ) : (
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
}
