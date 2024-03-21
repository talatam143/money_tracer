function importAll(r) {
  let images = {};
  // eslint-disable-next-line array-callback-return
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const bankLogos = importAll(
  require.context("../assets/bank logos", false, /\.(svg)$/)
);

const bankIcons = importAll(
  require.context("../assets/bank icons", false, /\.(svg)$/)
);

const upiLogos = importAll(
  require.context("../assets/upi logos", false, /\.(png)$/)
);

export const bankIconData = Object.keys(bankIcons).map((logoFileName) => {
  return {
    title: logoFileName.replace(".svg", ""),
    imageUrl: bankIcons[logoFileName],
  };
});

export const bankRawData = Object.keys(bankLogos).map((logoFileName) => {
  return {
    title: logoFileName.replace(".svg", ""),
    imageUrl: bankLogos[logoFileName],
  };
});

export const upiRawData = Object.keys(upiLogos).map((logoFileName) => {
  return {
    title: logoFileName.replace(".png", ""),
    imageUrl: upiLogos[logoFileName],
  };
});

export const creditCardsRawData = [
  {
    title: "Axis Bank MY ZONE Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/08/Axis-Bank-MY-ZONE.png",
  },
  {
    title: "HDFC Bank MoneyBack Plus Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/10/HDFC-Bank-MoneyBack-Credit-Card.png",
  },
  {
    title: "AU Bank LIT Credit Card",
    imageUrl: "https://cardinsider.com/wp-content/uploads/2022/07/AU-LIT.png",
  },
  {
    title: "Cashback SBI Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2022/09/CASHBACK-SBI-Card.png",
  },
  {
    title: "SBI SimplyCLICK Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/SBI-SimplyCLICK-credit-card.png-1.webp",
  },
  {
    title: "Axis Bank ACE Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/Axis-Bank-ACE-Credit-Card.png",
  },
  {
    title: "American Express SmartEarn Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/American-Express-SmartEarn-Credit-Card.png",
  },
  {
    title: "IDFC FIRST Classic Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/IDFC-FIRST-Classic-Credit-Card.png-1.webp",
  },
  {
    title: "Flipkart Axis Bank Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/08/flipkart-axis-bank-credit-card.png.webp",
  },
  {
    title: "Amazon Pay ICICI Bank Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/06/amazon-pay.png",
  },
  {
    title: "Myntra Kotak Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2023/05/Kotak-Myntra-Credit-Card.png",
  },
  {
    title: "American Express Membership Rewards® Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/American-Express-Membership-RewardsCredit-Card.png",
  },
  {
    title: "Axis Bank SELECT Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/08/Axis-Bank-Select-card.png",
  },
  {
    title: "Axis Bank Privilege Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/Axis-Bank-Privilege-Credit-Card-1.png",
  },
  {
    title: "IDFC FIRST Select Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/08/IDFC-First-select-credit-card.png",
  },
  {
    title: "HDFC Bank Regalia Gold Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2023/03/Regalia-Gold-Credit-Card.png",
  },
  {
    title: "SBI Prime Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/06/SBI-Prime-Credit-Card.png",
  },
  {
    title: "Bank of Baroda (BoB) Eterna Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/bank-of-baroda-eterna-credit-card-2.png",
  },
  {
    title: "HDFC Bank Millennia Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/09/HDFC-Bank-Millennia-Credit-Card.png.webp",
  },
  {
    title: "Axis Bank Magnus Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/08/Axis-Bank-Magnus-Credit-Card.png",
  },
  {
    title: "American Express Platinum Charge Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/American-Express-Platinum-Card.png-1.webp",
  },
  {
    title: "HDFC Bank INFINIA Credit Card Metal Edition",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/HDFC-Bank-Infinia-Credit-Card..png",
  },
  {
    title: "Standard Chartered Ultimate Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/06/Standard-Chartered-Ultimate-Credit-Card-1.png",
  },
  {
    title: "ICICI Bank Emeralde Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/ICICI-Emeralde-Credit-Card.png",
  },
  {
    title: "SBI ELITE Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/06/SBI-Elite-Credit-card.png",
  },
  {
    title: "HDFC Bank Diners Club Black Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/HDFC-Bank-Diners-Club-Black.png",
  },
  {
    title: "Axis Bank Vistara Infinite Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/08/Axis-Bank-Vistara-Infinite-card.png",
  },
  {
    title: "Club Vistara IDFC First Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2023/07/Club-Vistara-IDFC-First-Credit-Card.png",
  },
  {
    title: "6E Rewards XL – Indigo Kotak Bank Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/12/6E-Rewards-XL-Indigo-Kotak-Credit-Card.jpg",
  },
  {
    title: "Air India SBI Signature Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/Air-India-SBI-Signature-credit-card.png",
  },
  {
    title: "IRCTC SBI Card Premier",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/IRCTC-SBI-Card-Premier.png",
  },
  {
    title: "American Express Platinum Travel Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/06/PlatinumTravel1.png",
  },
  {
    title: "IDFC HPCL First Power Plus Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2023/04/First-power-plus.png",
  },
  {
    title: "IndianOil Kotak Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2023/03/IndianOil-Kotak-Credit-Card-1.png",
  },
  {
    title: "BPCL SBI Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/BPCL-SBI-Card.png",
  },
  {
    title: "ICICI Bank HPCL Super Saver Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/ICICI-hpcl-super-saver-credit-card.png",
  },
  {
    title: "Standard Chartered Super Value Titanium Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/Standard-Chartered-Super-Value-Titanium-Credit-Card-Benefits.png",
  },
  {
    title: "Swiggy HDFC Bank Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2023/07/Swiggy-HDFC-Bank-Credit-Card.png",
  },
  {
    title: "EazyDiner Indusind Bank Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2022/07/EazyDiner-Indusind-Bank-Credit-Card.png",
  },
  {
    title: "BookMyShow RBL Bank Play Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2022/10/BookMyShow-RBL-Bank-Play-Credit-Card.png",
  },
  {
    title: "PVR Kotak Platinum Credit Card",
    imageUrl:
      "https://cardinsider.com/wp-content/uploads/2021/07/PVR-Kotak-Platinum-Credit-Card.png",
  },
];

export const allRawData = {
  bankRawData: bankRawData.map((data) => {
    return data.title;
  }),
  creditCardsRawData: creditCardsRawData.map((data) => {
    return data.title;
  }),
  upiRawData: upiRawData.map((data) => {
    return data.title;
  }),
};
