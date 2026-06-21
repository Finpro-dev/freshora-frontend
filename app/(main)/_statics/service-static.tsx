import { FaLeaf } from "react-icons/fa";
import { GiChemicalDrop } from "react-icons/gi";
import { IoCard } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { HiSwitchHorizontal } from "react-icons/hi";
import { ImHeadphones } from "react-icons/im";

export const serviceStatic = [
  {
    id: 1,
    logo: (
      <FaLeaf className="text-xl sm:text-2xl lg:text-3xl text-brand-emerald-500" />
    ),
    heading: "100% Organic",
    subHeading: "Pure & Natural",
  },
  {
    id: 2,
    logo: (
      <GiChemicalDrop className="text-xl sm:text-2xl lg:text-3xl text-brand-emerald-500" />
    ),
    heading: "No Chemicals",
    subHeading: "Safe for You",
  },
  {
    id: 3,
    logo: (
      <TbTruckDelivery className="text-xl sm:text-2xl lg:text-3xl text-brand-emerald-500" />
    ),
    heading: "Free Delivery",
    subHeading: "Multiple of 5 Orders",
  },
  {
    id: 4,
    logo: (
      <HiSwitchHorizontal className="text-xl sm:text-2xl lg:text-3xl text-brand-emerald-500" />
    ),
    heading: "Easy Return",
    subHeading: "Hassle Free",
  },
  {
    id: 5,
    logo: (
      <ImHeadphones className="text-xl sm:text-2xl lg:text-3xl text-brand-emerald-500" />
    ),
    heading: "24/7 Support",
    subHeading: "We are here to help",
  },
  {
    id: 6,
    logo: (
      <IoCard className="text-xl sm:text-2xl lg:text-3xl text-brand-emerald-500" />
    ),
    heading: "Secure Pay",
    subHeading: "Safe Checkout",
  },
];
