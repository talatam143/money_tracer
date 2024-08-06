import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dialog from '@mui/material/Dialog';
import { IoClose } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import Text from "../../elements/text";
import DashBoardUser from "../../../assets/dashboard_user";

const Navbar = (props) => {
  const { setMonthGroup } = props;
  const navigate = useNavigate();
  const { timeLineGroups, updatedMonth } = useSelector(
    (state) => state.dashboard.transactions
  );
  const userInfo = useSelector((state) => state.auth);
  const [timelineDialog, setTimelineDialog] = useState(false)

  const handleUpdateTimeLine = (value) => {
    setMonthGroup(value)
  }

  return (
    <div className="dashboard-navbar-container">
      <div
        className="dashboard-navbar-user-container"
        onClick={() => navigate("/account")}
      >
        <DashBoardUser width="35px" height="35px" />
        <Text content={`Hi ${userInfo?.name?.split(" ")[0]}`} color="#4527A0" m="0 20px 0 5px" size="22px"
        />
      </div>
      <button onClick={() => setTimelineDialog(true)}><IoCalendarOutline fontSize={24} />{updatedMonth}</button>
      <Dialog
        open={timelineDialog}
      >
        <div className="dashboard-timeline-dialod-title-container">
          <Text content="Select Timeline" color="#4527A0" size="20px" weight="600" m="0" />
          <button onClick={() => setTimelineDialog(false)}><IoClose fontSize={25} /></button>
        </div>
        <div className="dashboard-timeline-dialod-button-container">
          {Object.keys(timeLineGroups).map((eachGroup) =>
            timeLineGroups[eachGroup].map((eachMonth) =>
              <button key={`${eachGroup}-${eachMonth}`} onClick={() => handleUpdateTimeLine(`${eachGroup}-${eachMonth}`)}>
                {eachGroup}-{eachMonth}
              </button>
            ))
          }
          <button onClick={() => handleUpdateTimeLine("0000-00")}>
            All time
          </button>
        </div>

      </Dialog>
    </div>
  );
};

export default Navbar;
