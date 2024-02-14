import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { PiTreeStructureFill } from "react-icons/pi";
import { TbChartDonutFilled, TbEdit, TbPlaylistAdd } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { RiBankFill } from "react-icons/ri";
import { LuQrCode } from "react-icons/lu";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { MdLibraryAdd, MdDeleteForever } from "react-icons/md";
import { BiSolidSortAlt, BiFilterAlt } from "react-icons/bi";
import { IoFilterCircle } from "react-icons/io5";
import Text from "../../elements/text";
import "./dashboard_styles.css";
import BrandLogo from "../../../assets/brand_logo";
import SheildLogo from "../../../assets/sheild_logo";
import pieChart from "../../../assets/pie-chart.png";
import graphChart from "../../../assets/business-chart.png";
import timelineChart from "../../../assets/timeline.png";
import scatterChart from "../../../assets/scatter-graph.png";
import userCard from "../../../assets/id-card.png";
import bank from "../../../assets/museum.png";
import creditCard from "../../../assets/credit-card.png";
import qrPayment from "../../../assets/qr-code.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

const welcomeText = "Transactions Store".split("");
const carouselCardOneIcons = ["Store", "Manage", "Analyze"];
const carouselCardTwoIcons = ["Profile", "Banks", "UPI", "Credit Cards"];
const carouselCardThreeIcons = ["Add", "Delete", "Sort", "Filter"];

const NewUserDashBoard = () => {
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
    <div className="new-user-dashboard-container">
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
      <div className="new-user-info-dashboard">
        <Text
          content="Futuristic Dashboard"
          m="0"
          weight="600"
          size="26px"
          color="#4527A0"
        />
        <Text
          content="Your financial saga unfolds on our dashboard, Conquer the heights of spending, and follow the rhythmic beats of monthly transaction graphs."
          m="0 5px"
          color="#202020"
        />
        <div className="new-user-dashboard-chart-images-container">
          <img
            src={pieChart}
            alt="dashboard-charts"
            className="new-user-dashboard-chart-images"
          />
          <img
            src={graphChart}
            alt="dashboard-charts"
            className="new-user-dashboard-chart-images"
          />
          <img
            src={timelineChart}
            alt="dashboard-charts"
            className="new-user-dashboard-chart-images"
          />
          <img
            src={scatterChart}
            alt="dashboard-charts"
            className="new-user-dashboard-chart-images"
          />
        </div>
      </div>
      <div className="new-user-info-transactions">
        <Text
          content="Seameless Transactions"
          m="0"
          weight="600"
          size="26px"
          color="#FFC107"
        />
        <Text
          content="Seamlessly handle transactions: Add, Update, Delete with ease. Sort, Filter, and Search in a snap!"
          m="0 5px"
          color="#202020"
        />
        <div className="new-user-info-transaction-timeline-container">
          <div>
            <TbPlaylistAdd className="new-user-info-transaction-timeline-icon" />
            <Text
              content="Create"
              m="0"
              color="#202020"
              weight="600"
              position="absolute"
            />
          </div>
          <div className="new-user-info-transaction-timeline-lines"></div>
          <div className="new-user-edit-timeline-icon">
            <TbEdit className="new-user-info-transaction-timeline-icon" />
            <Text
              content="Edit"
              m="0"
              color="#202020"
              weight="600"
              position="absolute"
            />
          </div>
          <div className="new-user-info-transaction-timeline-lines"></div>
          <div className="new-user-view-timeline-icon">
            <GrFormView className="new-user-info-transaction-timeline-icon" />
            <Text
              content="View"
              m="0"
              color="#202020"
              weight="600"
              position="absolute"
            />
          </div>
          <div className="new-user-info-transaction-timeline-lines"></div>
          <div className="new-user-sort-timeline-icon">
            <BiFilterAlt className="new-user-info-transaction-timeline-icon" />
            <Text
              content="Filter"
              m="0"
              color="#202020"
              weight="600"
              position="absolute"
            />
          </div>
        </div>
      </div>
      <div className="new-user-info-account">
        <Text
          content="Secured Account"
          m="0"
          weight="600"
          size="26px"
          color="#1565C0"
        />
        <Text
          content="Master your finances with our secure Accounts Hub – control your identity seamlessly, managing your payemnt information within a fortress of empowerment."
          m="0 5px"
          color="#202020"
        />
        <div className="new-user-dashboard-chart-images-container">
          <img
            src={userCard}
            alt="dashboard-charts"
            className="new-user-dashboard-account-images"
          />
          <img
            src={bank}
            alt="dashboard-charts"
            className="new-user-dashboard-account-images"
          />
          <img
            src={creditCard}
            alt="dashboard-charts"
            className="new-user-dashboard-account-images"
          />
          <img
            src={qrPayment}
            alt="dashboard-charts"
            className="new-user-dashboard-account-images"
          />
        </div>
      </div>
    </div>
  );
};

export default NewUserDashBoard;
