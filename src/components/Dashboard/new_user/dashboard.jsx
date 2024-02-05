import React from "react";
import { motion } from "framer-motion";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { PiTreeStructureFill } from "react-icons/pi";
import { TbChartDonutFilled } from "react-icons/tb";
import Text from "../../elements/text";
import "./dashboard_styles.css";
import BrandLogo from "../../../assets/brand_logo";

const welcomeText = "Transactions Store".split("");
const carouselCardIcons = ["Store", "Manage", "Analyze"];

const NewUserDashBoard = () => {
  const Icon = (props) => {
    const { type } = props;
    switch (type) {
      case carouselCardIcons[0]:
        return <HiClipboardDocumentList className="new-user-carousel-icon" />;
      case carouselCardIcons[1]:
        return <PiTreeStructureFill className="new-user-carousel-icon" />;
      case carouselCardIcons[2]:
        return <TbChartDonutFilled className="new-user-carousel-icon" />;
      default:
        return null;
    }
  };
  return (
    <div className="new-user-dashboard-container">
      <div className="new-user-carousel-container">
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
                    fontSize: "32px",
                    fontWeight: 800,
                  }}
                  transition={{
                    delay: i / 25,
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
                transition={{ delay: 0.9 }}
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
              delay: 1,
            }}
          >
            {carouselCardIcons.map((eachIcon) => (
              <div key={eachIcon} className="new-user-cards-icon-sub-container">
                <Icon type={eachIcon} />
                <Text
                  content={eachIcon}
                  color="#ffffff"
                  m="0"
                  weight="600"
                  size="20px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewUserDashBoard;
