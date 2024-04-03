import React from "react";
import { useSelector } from "react-redux";
import { statesEnum } from "../../../utils/enums";
import UserCarousel from "../new_user/carousel";
import Text from "../../elements/text";
import "./charts_styles.css";
import PaymentMethodChart from "./payment_method";
import BankChart from "./banks";
import CategoriesChart from "./categorie";
import ChartsLoader from "./chartsloader";

const Charts = (props) => {
  const { state } = props;
  const chartsStats = useSelector((state) => state.dashboard.charts);

  switch (state) {
    case statesEnum.INITIAL:
    case statesEnum.LOADING:
      return <ChartsLoader />;
    case statesEnum.SUCCESS:
      return (
        <div className="dashboard-charts-container">
          <Text
            content="Analysis"
            align="center"
            weight="600"
            size="25px"
            m="0"
          />
          {chartsStats?.paymentMethodStats ? <PaymentMethodChart /> : null}
          {chartsStats?.bankStats ? <BankChart /> : null}
          {chartsStats?.categoryStats ? <CategoriesChart /> : null}
        </div>
      );
    case statesEnum.ERROR:
      return <UserCarousel />;
    default:
      return null;
  }
};

export default Charts;
