import { BsCart4 } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import { GoListOrdered } from "react-icons/go";

export const appNavbarMenuDropdown = [
  {
    id: 1,
    logo: <BsCart4 />,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    logo: <RiUserSettingsLine />,
    name: "Account Settings",
    href: "/account",
  },
  {
    id: 3,
    logo: <GoListOrdered />,
    name: "My Orders",
    href: "/order",
  },
];
