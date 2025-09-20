export enum RoutesName {
  // Authentication routes
  forgetPassword = "/authentication/forget-password",
  login = "/authentication/login",
  register = "/authentication/register",

  // Private routes
  deposit = "/account/deposit",
  changeEmail = "/settings?active=email",
  changePassword = "/settings?active=password",
  changeLanguage = "/account/change-language",
  ordersHistory = "/account/orders-history",
  openOrders = "/account/open-orders",
  openPositions = "/account/open-positions",
  tradesHistory = "/account/trades-history",

  positionsHistory = "/account/positions-history",
  profile = "/account/profile",
  portfolio = "/account/portfolio",
  tfa = "/account/tfa",
  tickets = "/account/tickets",
  transactionsHistory = "/account/transactions-history",
  withdraw = "/account/withdraw",
  lastLogins = "/account/last-logins",
  depositAddress = "/account/deposit-address",

  // Public routes
  dashboard = "/",
  referral = "/referral",
  trade = "/trade",
  support = "/support",
  markets = "/markets",
  settings = "/settings",
  riskDisclosure = "/risk-disclosure",
  terms = "/terms",
  help = "/help",
  tradeRules = "/trade-rules",
  disclaimer = "/disclaimer",
  about = "/about",
}
