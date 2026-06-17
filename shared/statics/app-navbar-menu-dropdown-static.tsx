import { BsCart4 } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import { GoListOrdered } from "react-icons/go";
import { GiFruitBowl } from "react-icons/gi";

export const appNavbarMenuDropdown = [
  {
    id: 1,
    logo: <BsCart4 />,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    logo: <GiFruitBowl />,
    name: "Products",
    href: "/products",
  },
  {
    id: 3,
    logo: <RiUserSettingsLine />,
    name: "Account Settings",
    href: "/account",
  },
  {
    id: 4,
    logo: <GoListOrdered />,
    name: "My Orders",
    href: "/order",
  },
];
