import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { PiTreeStructureFill } from "react-icons/pi";
import { TbChartDonutFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { RiBankFill } from "react-icons/ri";
import { LuQrCode } from "react-icons/lu";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { MdLibraryAdd, MdDeleteForever } from "react-icons/md";
import { BiSolidSortAlt } from "react-icons/bi";
import { IoFilterCircle } from "react-icons/io5";
import BrandLogo from "../../../assets/brand_logo";
import SheildLogo from "../../../assets/sheild_logo";
import Text from "../../elements/text";

const welcomeText = "Transactions Store".split("");
const carouselCardOneIcons = ["Store", "Manage", "Analyze"];
const carouselCardTwoIcons = ["Profile", "Banks", "UPI", "Credit Cards"];
const carouselCardThreeIcons = ["Add", "Delete", "Sort", "Filter"];

const UserCarousel = () => {
  const Icon = (props) => {
    const { type } = props;
    switch (type) {
      case carouselCardOneIcons[0]:
        return <HiClipboardDocumentList className="new-user-carousel-icon" />;
      case carouselCardOneIcons[1]:
        return <PiTreeStructureFill className="new-user-carousel-icon" />;
      case carouselCardOneIcons[2]:
        return <TbChartDonutFilled className="new-user-carousel-icon" />;
      case carouselCardTwoIcons[0]:
        return <FaUser className="new-user-carousel-icon" />;
      case carouselCardTwoIcons[1]:
        return <RiBankFill className="new-user-carousel-icon" />;
      case carouselCardTwoIcons[2]:
        return <LuQrCode className="new-user-carousel-icon" />;
      case carouselCardTwoIcons[3]:
        return <BsCreditCard2FrontFill className="new-user-carousel-icon" />;
      case carouselCardThreeIcons[0]:
        return <MdLibraryAdd className="new-user-carousel-icon" />;
      case carouselCardThreeIcons[1]:
        return <MdDeleteForever className="new-user-carousel-icon" />;
      case carouselCardThreeIcons[2]:
        return <BiSolidSortAlt className="new-user-carousel-icon" />;
      case carouselCardThreeIcons[3]:
        return <IoFilterCircle className="new-user-carousel-icon" />;
      default:
        return null;
    }
  };
  return (
    <div className="new-user-carousel-container">
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            translate: ["0%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
          current: {
            shadow: true,
          },
        }}
        modules={[Autoplay, EffectCreative, Pagination]}
        className="dashboard-carousel-swiper"
      >
        <SwiperSlide>
          <div className="new-user-carousel-card-container new-user-card1">
            <div className="new-user-card-header">
              <div className="new-user-welcome-text-container">
                {welcomeText.map((el, i) => (
                  <motion.span
                    initial={{
                      opacity: 0,
                      fontSize: 0,
                      fontWeight: 0,
                    }}
                    animate={{
                      opacity: 1,
                      fontSize: "7.4vw",
                      fontWeight: 800,
                    }}
                    transition={{
                      delay: i / 35,
                      type: "spring",
                      stiffness: 460,
                      damping: 30,
                    }}
                    key={i}
                    className="dashboard-welcome-text"
                  >
                    {el}
                  </motion.span>
                ))}
                <motion.p
                  className="dashboard-welcome-sub-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75 }}
                >
                  Effortless Spending Management and Analysis.
                </motion.p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 560,
                  damping: 20,
                }}
                className="dashboard-logo-container"
              >
                <BrandLogo />
              </motion.div>
            </div>
            <motion.div
              className="new-user-cards-icon-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "linear",
                delay: 0.85,
              }}
            >
              {carouselCardOneIcons.map((eachIcon) => (
                <div
                  key={eachIcon}
                  className="new-user-cards-icon-sub-container"
                >
                  <Icon type={eachIcon} />
                  <Text
                    content={eachIcon}
                    color="#ffffff"
                    m="0"
                    weight="600"
                    size="18px"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="new-user-carousel-card-container new-user-card2">
            <div className="new-user-card-header">
              <Text
                content="Your Account is a fortress in our care, shielded and secure."
                color="#FFFFFF"
                m="0"
                size="20px"
                weight="600"
                lineheight="1.3"
              />
              <SheildLogo width="140" height="75px" />
            </div>
            <div className="new-user-cards-icon-container">
              {carouselCardTwoIcons.map((eachIcon) => (
                <div
                  key={eachIcon}
                  className="new-user-cards-icon-sub-container"
                >
                  <Icon type={eachIcon} />
                  <Text
                    content={eachIcon}
                    color="#ffffff"
                    m="0"
                    weight="600"
                    size="18px"
                  />
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="new-user-carousel-card-container new-user-card3">
            <div className="new-user-card-header">
              <Text
                content="Seamlessly handle transactions: Add, Update, Delete with ease. Sort, Filter, and Search in a snap!"
                color="#202020"
                m="0"
                size="20px"
                weight="600"
                lineheight="1.3"
              />
            </div>
            <div className="new-user-cards-icon-container">
              {carouselCardThreeIcons.map((eachIcon) => (
                <div
                  key={eachIcon}
                  className="new-user-cards-icon-sub-container"
                >
                  <Icon type={eachIcon} />
                  <Text
                    content={eachIcon}
                    color="#202020"
                    m="0"
                    weight="600"
                    size="18px"
                  />
                </div>
              ))}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default UserCarousel;
