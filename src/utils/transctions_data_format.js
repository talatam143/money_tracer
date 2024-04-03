export const formatAmountToRupee = (amount) => {
  try {
    let roundedAmount =
      Math.round((Number(amount) + Number.EPSILON) * 100) / 100;

    let roundedAmountString = Math.trunc(roundedAmount).toString();
    let formattedAmountString = "";
    let loopCount = 0;
    let isValidLoop;
    let initialLimits = { a: -3, b: roundedAmountString.length };

    if (roundedAmountString.length > 3) {
      isValidLoop = true;
    } else {
      formattedAmountString = roundedAmountString;
    }

    while (isValidLoop) {
      loopCount += 1;
      if (
        roundedAmountString.slice(initialLimits.a, initialLimits.b).length > 0
      ) {
        formattedAmountString =
          "," +
          roundedAmountString.slice(initialLimits.a, initialLimits.b) +
          formattedAmountString;
        if (loopCount === 1) {
          initialLimits.a -= 2;
          initialLimits.b = -3;
        } else {
          initialLimits.a -= 2;
          initialLimits.b -= 2;
        }
      } else {
        isValidLoop = false;
        if (formattedAmountString[0] === ",") {
          formattedAmountString = formattedAmountString.slice(
            1,
            formattedAmountString.length
          );
        }
      }
    }
    if (roundedAmountString.toString().split(".")[1]) {
      formattedAmountString =
        formattedAmountString +
        "." +
        roundedAmountString.toString().split(".")[1];
    }
    return formattedAmountString;
  } catch (error) {
    return amount;
  }
};

export const formatDate = (data) => {
  let formattedDate = "";
  const dateFormat = new Date(data);
  const UTCFormat = new Date(
    dateFormat.getTime() + dateFormat.getTimezoneOffset() * 60000
  );
  formattedDate =
    UTCFormat.toLocaleDateString("en-GB", {
      day: "numeric",
    }) +
    " " +
    UTCFormat.toLocaleDateString("en-GB", {
      month: "short",
    }) +
    ", " +
    UTCFormat.toLocaleDateString("en-GB", {
      year: "numeric",
    });
  return formattedDate;
};
