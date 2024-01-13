"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ListItem } from "./listItem"
import Logo from "../../assets/packrat_icon.png"
import Image from "next/image"
import {
  LogoTitle, appDescription, gettingStartedText,
  navLinkCommunity, navLinkDocumentation,
  navLinkGettingStarted, navLinkInstallation
} from "../../constant"

export function NavigationList() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{gettingStartedText}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image src={Logo} className="h-6 w-6" alt="" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      {LogoTitle}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {appDescription}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href={navLinkGettingStarted.href} title={navLinkGettingStarted.title}>
                {navLinkGettingStarted.description}
              </ListItem>
              <ListItem href={navLinkInstallation.href} title={navLinkInstallation.title}>
                {navLinkInstallation.description}
              </ListItem>
              <ListItem href={navLinkCommunity.href} title={navLinkCommunity.title}>
                {navLinkCommunity.description}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={navLinkDocumentation.href} legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              {navLinkDocumentation.title}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
