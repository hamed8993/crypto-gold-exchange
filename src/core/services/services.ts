//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

import type { AxiosRequestConfig } from "axios";
import type { SwaggerResponse } from "./config";
import { Http } from "./httpRequest";
//@ts-ignore
import qs from "qs";
import type {
  Claim_referral_history,
  DeleteUser_dataDelete_active_sessionsQueryParams,
  EmailLoginResponse,
  EmailLoginVerify2FAResponse,
  GetAvailableCoins,
  GetDepositCheck,
  GetDepositCheckQueryParams,
  GetDepositHistory,
  GetDepositHistoryQueryParams,
  GetExchangeDataMarketsDetails,
  GetExchangeDataMarketsTypes,
  GetExchangeDataMarketsVolumeCount,
  GetExchange_dataMarkets_detailsQueryParams,
  GetExchangedataMarkets,
  GetExchangedataOrderBookList,
  GetHistoryOrders,
  GetHistoryOrdersQueryParams,
  GetHistoryPositions,
  GetHistoryPositionsQueryParams,
  GetLastLogins,
  GetNews,
  GetReferralCodes,
  GetSettingsGet2FAData,
  GetTicketsDownload_attachmentQueryParams,
  GetTicketsGetTicketData,
  GetTicketsGetTickets,
  GetTicketsQueryParams,
  GetTradingviewHistory,
  GetTradingviewHistoryQueryParams,
  GetUserDataAccountDetails,
  GetUserDataActiveSessions,
  GetUserDataBalance,
  GetWithdrawHistory,
  GetWithdrawHistoryQueryParams,
  Get_deposits_list,
  PostDeposit,
  PostUserDataGenerateRefCodeResponse,
  PostWithdraw,
  PostWithdrawRate,
  RegisterVerifyResponse,
  Success,
} from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const __DEV__ = process.env.NODE_ENV !== "production";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function overrideConfig(
  config?: AxiosRequestConfig,
  configOverride?: AxiosRequestConfig,
): AxiosRequestConfig {
  return {
    ...config,
    ...configOverride,
    headers: {
      ...config?.headers,
      ...configOverride?.headers,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function template(path: string, obj: { [x: string]: any } = {}) {
  Object.keys(obj).forEach((key) => {
    const re = new RegExp(`{${key}}`, "i");
    path = path.replace(re, obj[key]);
  });

  return path;
}

function isFormData(obj: any) {
  // This checks for the append method which should exist on FormData instances
  return (
    (typeof obj === "object" &&
      typeof obj.append === "function" &&
      obj[Symbol.toStringTag] === undefined) ||
    obj[Symbol.toStringTag] === "FormData"
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function objToForm(requestBody: object) {
  if (isFormData(requestBody)) {
    return requestBody;
  }
  const formData = new FormData();

  Object.entries(requestBody).forEach(([key, value]) => {
    value && formData.append(key, value);
  });

  return formData;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function objToUrlencoded(requestBody: object) {
  return qs.stringify(requestBody);
}

/**
 *
 * delete_active_sessions
 */
export const deleteUser_dataDelete_active_sessions = (
  queryParams: DeleteUser_dataDelete_active_sessionsQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.deleteRequest(
    deleteUser_dataDelete_active_sessions.key,
    queryParams,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
deleteUser_dataDelete_active_sessions.key = "/user_data/delete_active_sessions";

/**
 *
 * get error codes json
 */
export const getCodesError = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<{ [x in string | number]: any }>> => {
  return Http.getRequest(
    getCodesError.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getCodesError.key = "/codes/error";

/**
 *
 * get success codes json
 */
export const getCodesSuccess = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<{ [x in string | number]: any }>> => {
  return Http.getRequest(
    getCodesSuccess.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getCodesSuccess.key = "/codes/success";

/**
 *
 * Get deposit history
 */
export const getDepositCheck = (
  queryParams?: GetDepositCheckQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetDepositCheck>> => {
  return Http.getRequest(
    getDepositCheck.key,
    queryParams,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getDepositCheck.key = "/deposit-check";

/**
 *
 * Get deposit history
 */
export const getDepositHistory = (
  queryParams?: GetDepositHistoryQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetDepositHistory>> => {
  return Http.getRequest(
    getDepositHistory.key,
    queryParams,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getDepositHistory.key = "/deposit-history";

/**
 *
 * Exchange Data
 */
export const getExchange_dataMarkets = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetExchangedataMarkets>> => {
  return Http.getRequest(
    getExchange_dataMarkets.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getExchange_dataMarkets.key = "/exchange_data/markets";

/**
 *
 * get all markets details
 */
export const getExchange_dataMarkets_details = (
  queryParams?: GetExchange_dataMarkets_detailsQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetExchangeDataMarketsDetails>> => {
  return Http.getRequest(
    getExchange_dataMarkets_details.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getExchange_dataMarkets_details.key = "/exchange_data/markets_details";

/**
 *
 * get all markets types
 */
export const getExchange_dataMarkets_types = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetExchangeDataMarketsTypes>> => {
  return Http.getRequest(
    getExchange_dataMarkets_types.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getExchange_dataMarkets_types.key = "/exchange_data/markets_types";

/**
 *
 * Exchange Data
 */
export const getExchange_dataOrderbook_list = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetExchangedataOrderBookList>> => {
  return Http.getRequest(
    getExchange_dataOrderbook_list.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getExchange_dataOrderbook_list.key = "/exchange_data/orderbook_list";

/**
 *
 * get all markets volume_count
 */
export const getExchange_dataVolume_count = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetExchangeDataMarketsVolumeCount>> => {
  return Http.getRequest(
    getExchange_dataVolume_count.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getExchange_dataVolume_count.key = "/exchange_data/volume_count";

/**
 *
 * Available coins
 */
export const getGet_available_coins = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetAvailableCoins>> => {
  return Http.getRequest(
    getGet_available_coins.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getGet_available_coins.key = "/get_available_coins";

/**
 *
 * get orders history
 */
export const getHistoryOrders = (
  queryParams?: GetHistoryOrdersQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetHistoryOrders>> => {
  return Http.getRequest(
    getHistoryOrders.key,
    queryParams,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getHistoryOrders.key = "/history/orders";

/**
 *
 * get positions history
 */
export const getHistoryPositions = (
  queryParams?: GetHistoryPositionsQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetHistoryPositions>> => {
  return Http.getRequest(
    getHistoryPositions.key,
    queryParams,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getHistoryPositions.key = "/history/positions";

/**
 *
 * News
 */
export const getNews = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetNews>> => {
  return Http.getRequest(
    getNews.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getNews.key = "/news";

/**
 *
 * get swagger json
 */
export const getSwagger = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<{ [x in string | number]: any }>> => {
  return Http.getRequest(
    getSwagger.key,
    undefined,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getSwagger.key = "/swagger";

/**
 *
 * get tickets
 */
export const getTickets = (
  queryParams?: GetTicketsQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetTicketsGetTickets>> => {
  return Http.getRequest(
    getTickets.key,
    queryParams,
    undefined,
    _CONSTANT3,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getTickets.key = "/tickets";

/**
 *
 * Download a binary file
 */
export const getTicketsDownload_attachment = (
  queryParams: GetTicketsDownload_attachmentQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<string>> => {
  return Http.getRequest(
    getTicketsDownload_attachment.key,
    queryParams,
    undefined,
    _CONSTANT5,
    overrideConfig(_CONSTANT4, configOverride),
  );
};

/** Key is end point string without base url */
getTicketsDownload_attachment.key = "/tickets/download_attachment";

/**
 *
 * get ticket data
 */
export const getTicketsGet_ticket_data = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetTicketsGetTicketData>> => {
  return Http.getRequest(
    getTicketsGet_ticket_data.key,
    undefined,
    undefined,
    _CONSTANT3,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getTicketsGet_ticket_data.key = "/tickets/get_ticket_data";

/**
 *
 * get candles history
 */
export const getTradingviewHistory = (
  queryParams: GetTradingviewHistoryQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetTradingviewHistory>> => {
  return Http.getRequest(
    getTradingviewHistory.key,
    queryParams,
    undefined,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getTradingviewHistory.key = "/tradingview/history";

/**
 *
 * account_details
 */
export const getUser_dataAccount_details = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetUserDataAccountDetails>> => {
  return Http.getRequest(
    getUser_dataAccount_details.key,
    undefined,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUser_dataAccount_details.key = "/user_data/account_details";

/**
 *
 * active_sessions
 */
export const getUser_dataActive_sessions = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetUserDataActiveSessions>> => {
  return Http.getRequest(
    getUser_dataActive_sessions.key,
    undefined,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUser_dataActive_sessions.key = "/user_data/active_sessions";

/**
 *
 * balance
 */
export const getUser_dataBalance = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetUserDataBalance>> => {
  return Http.getRequest(
    getUser_dataBalance.key,
    undefined,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUser_dataBalance.key = "/user_data/balance";

/**
 *
 * claim_referral_history
 */
export const getUser_dataClaim_referral_history = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Claim_referral_history>> => {
  return Http.getRequest(
    getUser_dataClaim_referral_history.key,
    undefined,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUser_dataClaim_referral_history.key = "/user_data/claim_referral_history";

/**
 *
 * claim_referral_rewards
 */
export const getUser_dataClaim_referral_rewards = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.getRequest(
    getUser_dataClaim_referral_rewards.key,
    undefined,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUser_dataClaim_referral_rewards.key = "/user_data/claim_referral_rewards";

/**
 *
 * deposits
 */
export const getUser_dataDeposits = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Get_deposits_list>> => {
  return Http.getRequest(
    getUser_dataDeposits.key,
    undefined,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUser_dataDeposits.key = "/user_data/deposits";

/**
 *
 * get_2fa_Data
 */
export const getUser_dataGet_2fa_Data = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetSettingsGet2FAData>> => {
  return Http.getRequest(
    getUser_dataGet_2fa_Data.key,
    undefined,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUser_dataGet_2fa_Data.key = "/user_data/get_2fa_Data";

/**
 *
 * get_referral_codes
 */
export const getUser_dataGet_referral_codes = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetReferralCodes>> => {
  return Http.getRequest(
    getUser_dataGet_referral_codes.key,
    undefined,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUser_dataGet_referral_codes.key = "/user_data/get_referral_codes";

/**
 *
 * last_logins
 */
export const getUser_dataLast_logins = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetLastLogins>> => {
  return Http.getRequest(
    getUser_dataLast_logins.key,
    undefined,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getUser_dataLast_logins.key = "/user_data/last_logins";

/**
 *
 * Get withdraw history
 */
export const getWithdrawHistory = (
  queryParams?: GetWithdrawHistoryQueryParams,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<GetWithdrawHistory>> => {
  return Http.getRequest(
    getWithdrawHistory.key,
    queryParams,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
getWithdrawHistory.key = "/withdraw-history";

/**
 *
 * Generate address to deposit
 */
export const postDeposit = (
  requestBody: RequestBodyPostDeposit,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<PostDeposit>> => {
  return Http.postRequest(
    postDeposit.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postDeposit.key = "/deposit";

/**
 *
 * email login
 */
export const postLoginEmail_login = (
  requestBody: RequestBodyPostLoginEmailLogin,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<EmailLoginResponse>> => {
  return Http.postRequest(
    postLoginEmail_login.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postLoginEmail_login.key = "/login/email_login";

/**
 *
 * 2fa verification
 */
export const postLoginVerify2fa = (
  requestBody: RequestBodyPostLoginVerify2FA,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<EmailLoginVerify2FAResponse>> => {
  return Http.postRequest(
    postLoginVerify2fa.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postLoginVerify2fa.key = "/login/verify2fa";

/**
 *
 * logout
 */
export const postLogout = (
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postLogout.key,
    undefined,
    undefined,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postLogout.key = "/logout";

/**
 *
 * cancel order
 */
export const postOrderCancel = (
  requestBody: RequestBodyPostOrderCancel,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postOrderCancel.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postOrderCancel.key = "/order/cancel";

/**
 *
 * edit sl and tp of order
 */
export const postOrderEditSl_tp = (
  requestBody: RequestBodyPostOrderEditSLAndTpMargin,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postOrderEditSl_tp.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postOrderEditSl_tp.key = "/order/edit/sl_tp";

/**
 *
 * set long limit
 */
export const postOrderSetLimitLong = (
  requestBody: RequestBodyPostPositionSetLimitLong,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postOrderSetLimitLong.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postOrderSetLimitLong.key = "/order/set/limit/long";

/**
 *
 * set short limit
 */
export const postOrderSetLimitShort = (
  requestBody: RequestBodyPostPositionSetLimitShort,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postOrderSetLimitShort.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postOrderSetLimitShort.key = "/order/set/limit/short";

/**
 *
 * set long market
 */
export const postOrderSetMarketLong = (
  requestBody: RequestBodyPostPositionSetMarketLong,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postOrderSetMarketLong.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postOrderSetMarketLong.key = "/order/set/market/long";

/**
 *
 * set short market
 */
export const postOrderSetMarketShort = (
  requestBody: RequestBodyPostPositionSetMarketShort,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postOrderSetMarketShort.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postOrderSetMarketShort.key = "/order/set/market/short";

/**
 *
 * set fragmented close order
 */
export const postOrderSet_fragmented_close_order = (
  requestBody: RequestBodyPostOrderSetFragmentedCloseOrder,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postOrderSet_fragmented_close_order.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postOrderSet_fragmented_close_order.key = "/order/set_fragmented_close_order";

/**
 *
 * set fragmented close order
 */
export const postOrderSet_group_close_order = (
  requestBody: RequestBodyPostOrderSetGroupCloseOrder,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postOrderSet_group_close_order.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postOrderSet_group_close_order.key = "/order/set_group_close_order";

/**
 *
 * edit sl and tp of position
 */
export const postPositionEditSl_tp_margin = (
  requestBody: RequestBodyPostPositionEditSLAndTPAndMargin,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postPositionEditSl_tp_margin.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postPositionEditSl_tp_margin.key = "/position/edit/sl_tp_margin";

/**
 *
 * send register verification code
 */
export const postRegisterSend_register_code = (
  requestBody: RequestBodyPostRegisterSendRegisterCode,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postRegisterSend_register_code.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postRegisterSend_register_code.key = "/register/send_register_code";

/**
 *
 * verify and register
 */
export const postRegisterVerify = (
  requestBody: RequestBodyPostRegisterVerify,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<RegisterVerifyResponse>> => {
  return Http.postRequest(
    postRegisterVerify.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postRegisterVerify.key = "/register/verify";

/**
 *
 * reset 2fa
 */
export const postSecurityReset_2fa = (
  requestBody: RequestBodyPostSecurityReset2FA,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postSecurityReset_2fa.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postSecurityReset_2fa.key = "/security/reset_2fa";

/**
 *
 * reset password
 */
export const postSecurityReset_password = (
  requestBody: RequestBodyPostSecurityResetPassword,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postSecurityReset_password.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postSecurityReset_password.key = "/security/reset_password";

/**
 *
 * send 2fa reset code
 */
export const postSecuritySend_2fa_reset_code = (
  requestBody: RequestBodyPostSecuritySendPasswordResetCode,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postSecuritySend_2fa_reset_code.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postSecuritySend_2fa_reset_code.key = "/security/send_2fa_reset_code";

/**
 *
 * send password reset code
 */
export const postSecuritySend_password_reset_code = (
  requestBody: RequestBodyPostSecuritySendPasswordResetCode,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postSecuritySend_password_reset_code.key,
    undefined,
    requestBody,
    _CONSTANT1,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postSecuritySend_password_reset_code.key = "/security/send_password_reset_code";

/**
 *
 * create new ticket
 */
export const postTicketsCreate = (
  requestBody: RequestBodyPostTicketsCreate,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postTicketsCreate.key,
    undefined,
    requestBody,
    _CONSTANT3,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postTicketsCreate.key = "/tickets/create";

/**
 *
 * add new reply to ticket
 */
export const postTicketsReply = (
  requestBody: RequestBodyPostTicketsReply,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postTicketsReply.key,
    undefined,
    requestBody,
    _CONSTANT3,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postTicketsReply.key = "/tickets/reply";

/**
 *
 * activate_2fa
 */
export const postUser_dataActivate_2fa = (
  requestBody: RequestBodyPostSettingsActivate2FA,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postUser_dataActivate_2fa.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postUser_dataActivate_2fa.key = "/user_data/activate_2fa";

/**
 *
 * change password
 */
export const postUser_dataChange_password = (
  requestBody: RequestBodyPostSettingsChangePassword,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postUser_dataChange_password.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postUser_dataChange_password.key = "/user_data/change_password";

/**
 *
 * deactivate_2fa
 */
export const postUser_dataDeactivate_2fa = (
  requestBody: RequestBodyPostSettingsDeactivate2FA,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postUser_dataDeactivate_2fa.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postUser_dataDeactivate_2fa.key = "/user_data/deactivate_2fa";

/**
 *
 * generate_ref_code
 */
export const postUser_dataGenerate_ref_code = (
  requestBody: RequestBodyPostUserDataGenerateRefCode,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<PostUserDataGenerateRefCodeResponse>> => {
  return Http.postRequest(
    postUser_dataGenerate_ref_code.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postUser_dataGenerate_ref_code.key = "/user_data/generate_ref_code";

/**
 *
 * send change mail code
 */
export const postUser_dataSend_change_email_code = (
  requestBody: RequestBodyPostSettingsSendChangeMailCode,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postUser_dataSend_change_email_code.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postUser_dataSend_change_email_code.key = "/user_data/send_change_email_code";

/**
 *
 * set_language
 */
export const postUser_dataSet_language = (
  requestBody: RequestBodyPostUserDataSetLanguage,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postUser_dataSet_language.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postUser_dataSet_language.key = "/user_data/set_language";

/**
 *
 * transfer_balance
 */
export const postUser_dataTransfer_balance = (
  requestBody: RequestBodyPostUserDataTransferBalance,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postUser_dataTransfer_balance.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postUser_dataTransfer_balance.key = "/user_data/transfer_balance";

/**
 *
 * verify change mail code
 */
export const postUser_dataVerify_change_email_code = (
  requestBody: RequestBodyPostSettingsVerifyChangeMailCode,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.postRequest(
    postUser_dataVerify_change_email_code.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postUser_dataVerify_change_email_code.key =
  "/user_data/verify_change_email_code";

/**
 *
 * Withdraw crypto
 */
export const postWithdraw = (
  requestBody: RequestBodyPostWithdraw,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<PostWithdraw>> => {
  return Http.postRequest(
    postWithdraw.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postWithdraw.key = "/withdraw";

/**
 *
 * Get withdraw crypto rate
 */
export const postWithdrawRate = (
  requestBody: RequestBodyPostWithdrawRate,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<PostWithdrawRate>> => {
  return Http.postRequest(
    postWithdrawRate.key,
    undefined,
    requestBody,
    _CONSTANT2,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
postWithdrawRate.key = "/withdraw-rate";

/**
 *
 * update ticket
 */
export const putTicketsUpdate = (
  requestBody: RequestBodyPutTicketsUpdate,
  configOverride?: AxiosRequestConfig,
): Promise<SwaggerResponse<Success>> => {
  return Http.putRequest(
    putTicketsUpdate.key,
    undefined,
    requestBody,
    _CONSTANT3,
    overrideConfig(_CONSTANT0, configOverride),
  );
};

/** Key is end point string without base url */
putTicketsUpdate.key = "/tickets/update";
export const _CONSTANT0 = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
export const _CONSTANT1 = [];
export const _CONSTANT2 = [{ accessToken: "GTX_ACCESS" }];
export const _CONSTANT3 = [{ accessToken: "arx-a" }, { deviceToken: "arx-d" }];
export const _CONSTANT4 = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/octet-stream",
  },
};
export const _CONSTANT5 = [{ accessToken: "arx-a" }];
