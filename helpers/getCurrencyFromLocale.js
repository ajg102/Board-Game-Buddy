import * as Localization from "expo-localization";

export const getCurrencyFromLocale = (locale = Localization.locale) => {
  switch (locale) {
    case "en":
      return "currency-usd";
    case "en-au":
      return "currency-usd";
    case "en-ca":
      return "currency-usd";
    case "en-gb":
      return "currency-gbp";
    case "en-us":
      return "currency-usd";
    default:
      return "currency-usd";
  }
};
