import { GoHome } from "react-icons/go";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { TiLeaf } from "react-icons/ti";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import { RiMailSendLine } from "react-icons/ri";
import { SlPeople } from "react-icons/sl";
import { GrNotes } from "react-icons/gr";
import { BiStore } from "react-icons/bi";
import { BiBarChart } from "react-icons/bi";

export const sidebarDashboardMenu = [
  {
    id: 1,
    logo: <GoHome />,
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 2,
    logo: <LiaShoppingBagSolid />,
    name: "Orders",
    href: "/dashboard/order",
  },
  {
    id: 3,
    logo: <TiLeaf />,
    name: "Products",
    href: "/dashboard/product",
  },
  {
    id: 4,
    logo: <RiMoneyPoundCircleLine />,
    name: "Promotions",
    href: "/dashboard/promotion",
  },
  {
    id: 5,
    logo: <RiMailSendLine />,
    name: "Mutations",
    href: "/dashboard/mutation",
  },
  {
    id: 6,
    logo: <SlPeople />,
    name: "People",
    href: "/dashboard/people",
  },
  {
    id: 7,
    logo: <GrNotes />,
    name: "Inventory",
    href: "/dashboard/inventory",
  },
  {
    id: 8,
    logo: <BiStore />,
    name: "Store",
    href: "/dashboard/store",
  },
  {
    id: 9,
    logo: <BiBarChart />,
    name: "Reports",
    href: "/dashboard/report",
  },
];
