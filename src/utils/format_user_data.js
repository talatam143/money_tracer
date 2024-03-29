import {
  bankRawData,
  creditCardsRawData,
  upiRawData,
  bankIconData,
} from "./raw_data";
import bankImage from "../assets/bank.png";
import upiImage from "../assets/upi.png";

export const formatUserData = (data) => {
  const tempData = {};
  if (data?.bankDetails) {
    let bankDetails = data?.bankDetails.map((eachBank) => {
      let filteredData = bankRawData.filter(
        (eachData) => eachData.title === eachBank
      );
      let filteredIcon = bankIconData.filter(
        (eachData) => eachData.title === eachBank
      );
      if (filteredData.length > 0) {
        return {
          name: eachBank,
          imageUrl: filteredData[0].imageUrl,
          iconUrl: filteredIcon?.[0]?.imageUrl,
        };
      } else {
        return { name: eachBank, imageUrl: bankImage, noImage: true };
      }
    });
    tempData.bankDetails = bankDetails;
  }
  if (data?.creditCards) {
    let creditCardsDetails = data?.creditCards.map((eachCredit) => {
      let filteredData = creditCardsRawData.filter(
        (eachData) => eachData.title === eachCredit
      );
      if (filteredData.length > 0) {
        return { name: eachCredit };
      } else {
        return { name: eachCredit };
      }
    });
    tempData.creditCardsDetails = creditCardsDetails;
  }
  if (data?.upiDetails) {
    let upiDetails = data?.upiDetails.map((eachUPI) => {
      let filteredData = upiRawData.filter(
        (eachData) => eachData.title === eachUPI
      );
      if (filteredData.length > 0) {
        return { name: eachUPI, imageUrl: filteredData[0].imageUrl };
      } else {
        return { name: eachUPI, imageUrl: upiImage, noImage: true };
      }
    });
    tempData.upiDetails = upiDetails;
  }
  return tempData;
};
