import {
  IoGameController,
  IoMusicalNotes,
  IoFastFood,
  IoHammerSharp,
  IoSchool,
  IoGiftSharp,
  IoBicycle,
} from "react-icons/io5";
import {
  BiSolidCameraMovie,
  BiSolidBank,
  BiSolidCategoryAlt,
} from "react-icons/bi";
import {
  GiPerspectiveDiceSixFacesRandom,
  GiSofa,
  GiAutoRepair,
  GiClothes,
  GiGasStove,
} from "react-icons/gi";
import {
  MdSportsSoccer,
  MdLocalGroceryStore,
  MdLiquor,
  MdPets,
  MdCleaningServices,
} from "react-icons/md";
import { LuPlugZap } from "react-icons/lu";
import { HiHomeModern, HiMiniTrash } from "react-icons/hi2";
import { BsCashCoin, BsFillTaxiFrontFill } from "react-icons/bs";
import { FaHandsHoldingChild, FaHotel } from "react-icons/fa6";
import { LiaLifeRingSolid } from "react-icons/lia";
import { RiMedicineBottleFill, RiGasStationFill } from "react-icons/ri";
import { HiReceiptTax } from "react-icons/hi";
import { IoMdTrain } from "react-icons/io";
import { FaCar, FaParking, FaPlaneDeparture, FaWater } from "react-icons/fa";
import { TbWavesElectricity } from "react-icons/tb";
import { GrInternetExplorer } from "react-icons/gr";

const largeSize = "60px";
const mediumSize = "32px";

export const transactionCategories = {
  Entertainment: {
    Games: {
      name: "Games",
      icon: <IoGameController />,
      mediumIcon: <IoGameController style={{ fontSize: mediumSize }} />,
      largeIcon: <IoGameController style={{ fontSize: largeSize }} />,
    },
    Movies: {
      name: "Movies",
      icon: <BiSolidCameraMovie />,
      mediumIcon: <BiSolidCameraMovie style={{ fontSize: mediumSize }} />,
      largeIcon: <BiSolidCameraMovie style={{ fontSize: largeSize }} />,
    },
    Music: {
      name: "Music",
      icon: <IoMusicalNotes />,
      mediumIcon: <IoMusicalNotes style={{ fontSize: mediumSize }} />,
      largeIcon: <IoMusicalNotes style={{ fontSize: largeSize }} />,
    },
    Other: {
      name: "Other",
      icon: <GiPerspectiveDiceSixFacesRandom />,
      mediumIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: mediumSize }} />
      ),
      largeIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: largeSize }} />
      ),
    },
    Sports: {
      name: "Sports",
      icon: <MdSportsSoccer />,
      mediumIcon: <MdSportsSoccer style={{ fontSize: mediumSize }} />,
      largeIcon: <MdSportsSoccer style={{ fontSize: largeSize }} />,
    },
  },
  "Food and drink": {
    "Dining out": {
      name: "Dining out",
      icon: <IoFastFood />,
      mediumIcon: <IoFastFood style={{ fontSize: mediumSize }} />,
      largeIcon: <IoFastFood style={{ fontSize: largeSize }} />,
    },
    Groceries: {
      name: "Groceries",
      icon: <MdLocalGroceryStore />,
      mediumIcon: <MdLocalGroceryStore style={{ fontSize: mediumSize }} />,
      largeIcon: <MdLocalGroceryStore style={{ fontSize: largeSize }} />,
    },
    Liquor: {
      name: "Liquor",
      icon: <MdLiquor />,
      mediumIcon: <MdLiquor style={{ fontSize: mediumSize }} />,
      largeIcon: <MdLiquor style={{ fontSize: largeSize }} />,
    },
    Other: {
      name: "Other",
      icon: <GiPerspectiveDiceSixFacesRandom />,
      mediumIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: mediumSize }} />
      ),
      largeIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: largeSize }} />
      ),
    },
  },
  Home: {
    Electronics: {
      name: "Electronics",
      icon: <LuPlugZap />,
      mediumIcon: <LuPlugZap style={{ fontSize: mediumSize }} />,
      largeIcon: <LuPlugZap style={{ fontSize: largeSize }} />,
    },
    Furniture: {
      name: "Furniture",
      icon: <GiSofa />,
      mediumIcon: <GiSofa style={{ fontSize: mediumSize }} />,
      largeIcon: <GiSofa style={{ fontSize: largeSize }} />,
    },
    "Household supplies": {
      name: "Household supplies",
      icon: <HiHomeModern />,
      mediumIcon: <HiHomeModern style={{ fontSize: mediumSize }} />,
      largeIcon: <HiHomeModern style={{ fontSize: largeSize }} />,
    },
    Maintenance: {
      name: "Maintenance",
      icon: <IoHammerSharp />,
      mediumIcon: <IoHammerSharp style={{ fontSize: mediumSize }} />,
      largeIcon: <IoHammerSharp style={{ fontSize: largeSize }} />,
    },
    Mortgage: {
      name: "Mortgage",
      icon: <BiSolidBank />,
      mediumIcon: <BiSolidBank style={{ fontSize: mediumSize }} />,
      largeIcon: <BiSolidBank style={{ fontSize: largeSize }} />,
    },
    Other: {
      name: "Other",
      icon: <GiPerspectiveDiceSixFacesRandom />,
      mediumIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: mediumSize }} />
      ),
      largeIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: largeSize }} />
      ),
    },
    Pets: {
      name: "Pets",
      icon: <MdPets />,
      mediumIcon: <MdPets style={{ fontSize: mediumSize }} />,
      largeIcon: <MdPets style={{ fontSize: largeSize }} />,
    },
    Rent: {
      name: "Rent",
      icon: <BsCashCoin />,
      mediumIcon: <BsCashCoin style={{ fontSize: mediumSize }} />,
      largeIcon: <BsCashCoin style={{ fontSize: largeSize }} />,
    },
    Services: {
      name: "Services",
      icon: <GiAutoRepair />,
      mediumIcon: <GiAutoRepair style={{ fontSize: mediumSize }} />,
      largeIcon: <GiAutoRepair style={{ fontSize: largeSize }} />,
    },
  },
  Life: {
    Childcare: {
      name: "Childcare",
      icon: <FaHandsHoldingChild />,
      mediumIcon: <FaHandsHoldingChild style={{ fontSize: mediumSize }} />,
      largeIcon: <FaHandsHoldingChild style={{ fontSize: largeSize }} />,
    },
    Clothing: {
      name: "Clothing",
      icon: <GiClothes />,
      mediumIcon: <GiClothes style={{ fontSize: mediumSize }} />,
      largeIcon: <GiClothes style={{ fontSize: largeSize }} />,
    },
    Education: {
      name: "Education",
      icon: <IoSchool />,
      mediumIcon: <IoSchool style={{ fontSize: mediumSize }} />,
      largeIcon: <IoSchool style={{ fontSize: largeSize }} />,
    },
    Gifts: {
      name: "Gifts",
      icon: <IoGiftSharp />,
      mediumIcon: <IoGiftSharp style={{ fontSize: mediumSize }} />,
      largeIcon: <IoGiftSharp style={{ fontSize: largeSize }} />,
    },
    Insurance: {
      name: "Insurance",
      icon: <LiaLifeRingSolid />,
      mediumIcon: <LiaLifeRingSolid style={{ fontSize: mediumSize }} />,
      largeIcon: <LiaLifeRingSolid style={{ fontSize: largeSize }} />,
    },
    "Medical expenses": {
      name: "Medical expenses",
      icon: <RiMedicineBottleFill />,
      mediumIcon: <RiMedicineBottleFill style={{ fontSize: mediumSize }} />,
      largeIcon: <RiMedicineBottleFill style={{ fontSize: largeSize }} />,
    },
    Other: {
      name: "Other",
      icon: <GiPerspectiveDiceSixFacesRandom />,
      mediumIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: mediumSize }} />
      ),
      largeIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: largeSize }} />
      ),
    },
    Taxes: {
      name: "Taxes",
      icon: <HiReceiptTax />,
      mediumIcon: <HiReceiptTax style={{ fontSize: mediumSize }} />,
      largeIcon: <HiReceiptTax style={{ fontSize: largeSize }} />,
    },
  },
  Transportation: {
    Bicycle: {
      name: "Bicycle",
      icon: <IoBicycle />,
      mediumIcon: <IoBicycle style={{ fontSize: mediumSize }} />,
      largeIcon: <IoBicycle style={{ fontSize: largeSize }} />,
    },
    "Bus/train": {
      name: "Bus/train",
      icon: <IoMdTrain />,
      mediumIcon: <IoMdTrain style={{ fontSize: mediumSize }} />,
      largeIcon: <IoMdTrain style={{ fontSize: largeSize }} />,
    },
    Car: {
      name: "Car",
      icon: <FaCar />,
      mediumIcon: <FaCar style={{ fontSize: mediumSize }} />,
      largeIcon: <FaCar style={{ fontSize: largeSize }} />,
    },
    "Gas/fuel": {
      name: "Gas/fuel",
      icon: <RiGasStationFill />,
      mediumIcon: <RiGasStationFill style={{ fontSize: mediumSize }} />,
      largeIcon: <RiGasStationFill style={{ fontSize: largeSize }} />,
    },
    Hotel: {
      name: "Hotel",
      icon: <FaHotel />,
      mediumIcon: <FaHotel style={{ fontSize: mediumSize }} />,
      largeIcon: <FaHotel style={{ fontSize: largeSize }} />,
    },
    Other: {
      name: "Other",
      icon: <GiPerspectiveDiceSixFacesRandom />,
      mediumIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: mediumSize }} />
      ),
      largeIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: largeSize }} />
      ),
    },
    Parking: {
      name: "Parking",
      icon: <FaParking />,
      mediumIcon: <FaParking style={{ fontSize: mediumSize }} />,
      largeIcon: <FaParking style={{ fontSize: largeSize }} />,
    },
    Plane: {
      name: "Plane",
      icon: <FaPlaneDeparture />,
      mediumIcon: <FaPlaneDeparture style={{ fontSize: mediumSize }} />,
      largeIcon: <FaPlaneDeparture style={{ fontSize: largeSize }} />,
    },
    Taxi: {
      name: "Taxi",
      icon: <BsFillTaxiFrontFill />,
      mediumIcon: <BsFillTaxiFrontFill style={{ fontSize: mediumSize }} />,
      largeIcon: <BsFillTaxiFrontFill style={{ fontSize: largeSize }} />,
    },
  },
  Uncategorized: {
    General: {
      name: "General",
      icon: <BiSolidCategoryAlt />,
      mediumIcon: <BiSolidCategoryAlt style={{ fontSize: mediumSize }} />,
      largeIcon: <BiSolidCategoryAlt style={{ fontSize: largeSize }} />,
    },
  },
  Utilities: {
    Cleaning: {
      name: "Cleaning",
      icon: <MdCleaningServices />,
      mediumIcon: <MdCleaningServices style={{ fontSize: mediumSize }} />,
      largeIcon: <MdCleaningServices style={{ fontSize: largeSize }} />,
    },
    Electricity: {
      name: "Electricity",
      icon: <TbWavesElectricity />,
      mediumIcon: <TbWavesElectricity style={{ fontSize: mediumSize }} />,
      largeIcon: <TbWavesElectricity style={{ fontSize: largeSize }} />,
    },
    "Heat/gas": {
      name: "Heat/gas",
      icon: <GiGasStove />,
      mediumIcon: <GiGasStove style={{ fontSize: mediumSize }} />,
      largeIcon: <GiGasStove style={{ fontSize: largeSize }} />,
    },
    Other: {
      name: "Other",
      icon: <GiPerspectiveDiceSixFacesRandom />,
      mediumIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: mediumSize }} />
      ),
      largeIcon: (
        <GiPerspectiveDiceSixFacesRandom style={{ fontSize: largeSize }} />
      ),
    },
    Trash: {
      name: "Trash",
      icon: <HiMiniTrash />,
      mediumIcon: <HiMiniTrash style={{ fontSize: mediumSize }} />,
      largeIcon: <HiMiniTrash style={{ fontSize: largeSize }} />,
    },
    "TV/Phone/Internet": {
      name: "TV/Phone/Internet",
      icon: <GrInternetExplorer />,
      mediumIcon: <GrInternetExplorer style={{ fontSize: mediumSize }} />,
      largeIcon: <GrInternetExplorer style={{ fontSize: largeSize }} />,
    },
    Water: {
      name: "Water",
      icon: <FaWater />,
      mediumIcon: <FaWater style={{ fontSize: mediumSize }} />,
      largeIcon: <FaWater style={{ fontSize: largeSize }} />,
    },
  },
};
