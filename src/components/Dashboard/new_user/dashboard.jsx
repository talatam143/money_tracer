import React from "react";
import { motion } from "framer-motion";
import "./dashboard_styles.css";
import BrandLogo from "../../../assets/brand_logo";

const welcomeText = "Transactions Store".split("");

const NewUserDashBoard = () => {
  return (
    <div className="new-user-dashboard-container">
      <div className="new-user-carousel-container">
        <div className="new-user-carousel-card-container">
          <div className="new-user-card-header">
            <div className="new-user-welcome-text-container">
              {welcomeText.map((el, i) => (
                <motion.span
                  initial={{ opacity: 0, fontSize: "0px", fontWeight: 0 }}
                  animate={{ opacity: 1, fontSize: "30px", fontWeight: 800 }}
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
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="dashboard-logo-container"
            >
              <BrandLogo />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserDashBoard;
