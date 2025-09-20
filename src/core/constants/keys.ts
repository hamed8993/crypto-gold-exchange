const isLocal = !process.env.NEXT_PUBLIC_BASE_URL?.includes("https");

// const domainSplitted = process.env.NEXT_PUBLIC_BASE_URL?.replace(
//   "https://",
//   ".",
// ).split(".");

export const persistKeys = {
  GOLDFINO_ACCESS_TOKEN: `${isLocal ? "local" : "MAIN"}_GOLDFINO_ACCESS_TOKEN`,
  GOLDFINO_DEVICE_TOKEN: `${isLocal ? "local" : "MAIN"}_GOLDFINO_DEVICE_TOKEN`,
  GOLDFINO_FAVORITES: `${isLocal ? "local" : "MAIN"}_GOLDFINO_FAVORITES`,
  GOLDFINO_LOGIN_TOKEN: `${isLocal ? "local" : "MAIN"}_GOLDFINO_L_TOKEN`,
  GOLDFINO_THEME: `${isLocal ? "local" : "MAIN"}_GOLDFINO_THEME`,
  GOLDFINO_USERID: "GOLDFINO_USERID",
  GOLDFINO_VISIBILITY: "GOLDFINO_VISIBILITY",
  GOLDFINO_REFERRAL: `GOLDFINO_REFERRAL`,
};
