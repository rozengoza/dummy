"use client";

import { Computer, Gamepad2, Tv, Coffee, Popcorn, Package, Menu } from "lucide-react";
import { SectionContainer } from "./layout/SectionContainer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuLink, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import LevelUpGamingLogoSmall from "@/assets/images/Level-Up-Gaming-Logo-Small.jpeg";
import Image from "next/image";
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store';
import { logout } from "@/lib/feature/auth/authSlice";
import { useDispatch } from 'react-redux';
import { persistor } from '@/lib/store';
import { toast } from "react-hot-toast";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string | StaticImport;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: "/",
    src: LevelUpGamingLogoSmall,
    alt: "Level-Up-Gaming-Logo",
    title: "Level Up Gaming",
  },
  menu = [
    { title: "HOME", url: "/" },
    {
      title: "SERVICES",
      url: "#",
      items: [
        {
          title: "PC GAMES",
          description: "Experience lightning-fast gaming with our top-tier PC rigs.",
          icon: <Computer className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "PS5",
          description: "Dive into next-gen worlds with our cutting-edge PlayStation setups.",
          icon: <Gamepad2 className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "NETFLIX & CHILL",
          description: "Unwind in style with our immersive movie sanctuary and premium loungers.",
          icon: <Tv className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "RENTALS",
          description: "Flexible gaming station rentals tailored to your schedule and needs.",
          icon: <Package className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "CAFETERIA",
      url: "#",
      items: [
        {
          title: "SNACKS & DRINKS",
          description: "Power up with our delicious snacks and refreshing beverages.",
          icon: <Popcorn className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "LEVEL UP CAFETERIA",
          description: "Your ultimate fuel stop for gaming sessions and chillouts alike.",
          icon: <Coffee className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "CONTACT",
      url: "#",
      description: "Reach out to our team for any queries or support.",
    },
  ],
  auth = {
    login: { title: "LOGIN", url: "/login" },
    signup: { title: "SIGNUP", url: "/signup" },
  },
}: NavbarProps) => {
  const dispatch = useDispatch()
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge().then(() => {
      toast.success("Logged out successfully");
    });
  }

  return (
    <SectionContainer as="header" className="py-4">

      {/* Desktop Menu */}
      <nav className="hidden justify-around lg:flex">
        <div className="flex items-center gap-6">
          <a href={logo.url} className="flex items-center gap-2">
            <Image
              src={logo.src}
              width={60}
              height={60}
              alt={logo.alt}
              className="rounded-full object-cover"
            />
          </a>
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {!isAuth ? (
          <div className="flex items-center gap-2" >
            <Button asChild variant="outline" size="sm">
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>
            <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="default" size="sm">
              <a href="/bookings">BOOKINGS</a>
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              LOGOUT
            </Button>

          </div>
        )}
      </nav>
      {/* Mobile Menu */}
      <div className="block lg:hidden">
        <div className="flex items-center justify-between">
          <a href={logo.url} className="flex items-center gap-2">
            <Image src={logo.src} width={100} height={32} alt={logo.alt} />
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <a href={logo.url} className="flex items-center gap-2">
                    <Image src={logo.src} width={100} height={32} alt={logo.alt} />
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-4"
                >
                  {menu.map((item) => renderMobileMenuItem(item))}
                </Accordion>

                <div className="flex flex-col gap-3">
                  <Button asChild variant="outline">
                    <a href={auth.login.url}>{auth.login.title}</a>
                  </Button>
                  <Button asChild>
                    <a href={auth.signup.url}>{auth.signup.title}</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </SectionContainer>
  )
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };