import { Computer, Gamepad2, Tv, Coffee, Popcorn, Package, Menu } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import LevelUpGamingLogoSmall from "@/assets/images/Level-Up-Gaming-Logo-Small.jpeg";
import Image from "next/image";
import AuthButtons from "./AuthButtonsForNavbar";

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
      url: "/services",
      items: [
        {
          title: "PC GAMES",
          description: "Experience lightning-fast gaming with our top-tier PC rigs.",
          icon: <Computer className="size-5 shrink-0" />,
          url: "/services",
        },
        {
          title: "PS5",
          description: "Dive into next-gen worlds with our cutting-edge PlayStation setups.",
          icon: <Gamepad2 className="size-5 shrink-0" />,
          url: "/services",
        },
        {
          title: "NETFLIX & CHILL",
          description: "Unwind in style with our immersive movie sanctuary and premium loungers.",
          icon: <Tv className="size-5 shrink-0" />,
          url: "/services",
        },
        {
          title: "RENTALS",
          description: "Flexible gaming station rentals tailored to your schedule and needs.",
          icon: <Package className="size-5 shrink-0" />,
          url: "/services",
        },
      ],
    },
    {
      title: "CAFETERIA",
      url: "/cafe",
      items: [
        {
          title: "SNACKS & DRINKS",
          description: "Power up with our delicious snacks and refreshing beverages.",
          icon: <Popcorn className="size-5 shrink-0" />,
          url: "/cafe",
        },
        {
          title: "LEVEL UP CAFETERIA",
          description: "Your ultimate fuel stop for gaming sessions and chillouts alike.",
          icon: <Coffee className="size-5 shrink-0" />,
          url: "/cafe",
        },
      ],
    },
    {
      title: "CONTACT",
      url: "/contact",
      description: "Reach out to our team for any queries or support.",
    },
  ],
  auth = {
    login: { title: "LOGIN", url: "/login" },
    signup: { title: "SIGNUP", url: "/signup" },
  },
}: NavbarProps) => {
  return (
    <section className="py-4">
      <div className="container  mx-auto max-w-7xl px-4">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
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
          <div className="flex size-fit gap-2">
            <AuthButtons />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
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
      </div>
    </section>
  );
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
        className="bg-background hover:bg-muted hover:text-accent-foreground group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
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
      className="hover:bg-muted hover:text-accent-foreground flex select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };
