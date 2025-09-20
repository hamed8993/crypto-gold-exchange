//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

import {
  QueryClient,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { RequestError, SwaggerResponse } from "./config";

import {
  deleteUser_dataDelete_active_sessions,
  getCodesError,
  getCodesSuccess,
  getDepositCheck,
  getDepositHistory,
  getExchange_dataMarkets,
  getExchange_dataMarkets_details,
  getExchange_dataMarkets_types,
  getExchange_dataOrderbook_list,
  getExchange_dataVolume_count,
  getGet_available_coins,
  getHistoryOrders,
  getHistoryPositions,
  getNews,
  getSwagger,
  getTickets,
  getTicketsDownload_attachment,
  getTicketsGet_ticket_data,
  getTradingviewHistory,
  getUser_dataAccount_details,
  getUser_dataActive_sessions,
  getUser_dataBalance,
  getUser_dataClaim_referral_history,
  getUser_dataClaim_referral_rewards,
  getUser_dataDeposits,
  getUser_dataGet_2fa_Data,
  getUser_dataGet_referral_codes,
  getUser_dataLast_logins,
  getWithdrawHistory,
  postDeposit,
  postLoginEmail_login,
  postLoginVerify2fa,
  postLogout,
  postOrderCancel,
  postOrderEditSl_tp,
  postOrderSetLimitLong,
  postOrderSetLimitShort,
  postOrderSetMarketLong,
  postOrderSetMarketShort,
  postOrderSet_fragmented_close_order,
  postOrderSet_group_close_order,
  postPositionEditSl_tp_margin,
  postRegisterSend_register_code,
  postRegisterVerify,
  postSecurityReset_2fa,
  postSecurityReset_password,
  postSecuritySend_2fa_reset_code,
  postSecuritySend_password_reset_code,
  postTicketsCreate,
  postTicketsReply,
  postUser_dataActivate_2fa,
  postUser_dataChange_password,
  postUser_dataDeactivate_2fa,
  postUser_dataGenerate_ref_code,
  postUser_dataSend_change_email_code,
  postUser_dataSet_language,
  postUser_dataTransfer_balance,
  postUser_dataVerify_change_email_code,
  postWithdraw,
  postWithdrawRate,
  putTicketsUpdate,
} from "./services";
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

export type SwaggerTypescriptMutationDefaultParams<TExtra> = {
  _extraVariables?: TExtra;
  configOverride?: AxiosRequestConfig;
};
type SwaggerTypescriptUseQueryOptions<TData> = Omit<
  UseQueryOptions<SwaggerResponse<TData>, RequestError | Error>,
  "queryKey"
>;

type SwaggerTypescriptUseMutationOptions<TData, TRequest, TExtra> =
  UseMutationOptions<
    SwaggerResponse<TData>,
    RequestError | Error,
    TRequest & SwaggerTypescriptMutationDefaultParams<TExtra>
  >;

type SwaggerTypescriptUseMutationOptionsVoid<TData, TExtra> =
  UseMutationOptions<
    SwaggerResponse<TData>,
    RequestError | Error,
    SwaggerTypescriptMutationDefaultParams<TExtra> | void
  >;

/**
 *
 * delete_active_sessions
 */
export const useDeleteUser_dataDelete_active_sessions = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { queryParams: DeleteUser_dataDelete_active_sessionsQueryParams },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { queryParams, configOverride } = _o || {};

      return deleteUser_dataDelete_active_sessions(queryParams, configOverride);
    },
    ...options,
  });
};

/**
 *
 * get error codes json
 */
export const useGetCodesError = (
  options?: SwaggerTypescriptUseQueryOptions<{ [x in string | number]: any }>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetCodesError.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetCodesError.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getCodesError.key] as QueryKey,
    fun: () => getCodesError(configOverride),
  };
};
useGetCodesError.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<{ [x in string | number]: any }>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetCodesError.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get success codes json
 */
export const useGetCodesSuccess = (
  options?: SwaggerTypescriptUseQueryOptions<{ [x in string | number]: any }>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetCodesSuccess.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetCodesSuccess.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getCodesSuccess.key] as QueryKey,
    fun: () => getCodesSuccess(configOverride),
  };
};
useGetCodesSuccess.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<{ [x in string | number]: any }>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetCodesSuccess.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * Get deposit history
 */
export const useGetDepositCheck = (
  queryParams?: GetDepositCheckQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetDepositCheck>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetDepositCheck.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetDepositCheck.info = (
  queryParams?: GetDepositCheckQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getDepositCheck.key, queryParams] as QueryKey,
    fun: () =>
      getDepositCheck(
        queryParams,

        configOverride,
      ),
  };
};
useGetDepositCheck.prefetch = (
  client: QueryClient,
  queryParams?: GetDepositCheckQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetDepositCheck>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetDepositCheck.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * Get deposit history
 */
export const useGetDepositHistory = (
  queryParams?: GetDepositHistoryQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetDepositHistory>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetDepositHistory.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetDepositHistory.info = (
  queryParams?: GetDepositHistoryQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getDepositHistory.key, queryParams] as QueryKey,
    fun: () =>
      getDepositHistory(
        queryParams,

        configOverride,
      ),
  };
};
useGetDepositHistory.prefetch = (
  client: QueryClient,
  queryParams?: GetDepositHistoryQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetDepositHistory>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetDepositHistory.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * Exchange Data
 */
export const useGetExchange_dataMarkets = (
  options?: SwaggerTypescriptUseQueryOptions<GetExchangedataMarkets>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetExchange_dataMarkets.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetExchange_dataMarkets.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getExchange_dataMarkets.key] as QueryKey,
    fun: () => getExchange_dataMarkets(configOverride),
  };
};
useGetExchange_dataMarkets.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetExchangedataMarkets>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetExchange_dataMarkets.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get all markets details
 */
export const useGetExchange_dataMarkets_details = (
  queryParams?: GetExchange_dataMarkets_detailsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetExchangeDataMarketsDetails>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetExchange_dataMarkets_details.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetExchange_dataMarkets_details.info = (
  queryParams?: GetExchange_dataMarkets_detailsQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getExchange_dataMarkets_details.key, queryParams] as QueryKey,
    fun: () =>
      getExchange_dataMarkets_details(
        queryParams,

        configOverride,
      ),
  };
};
useGetExchange_dataMarkets_details.prefetch = (
  client: QueryClient,
  queryParams?: GetExchange_dataMarkets_detailsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetExchangeDataMarketsDetails>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetExchange_dataMarkets_details.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get all markets types
 */
export const useGetExchange_dataMarkets_types = (
  options?: SwaggerTypescriptUseQueryOptions<GetExchangeDataMarketsTypes>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetExchange_dataMarkets_types.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetExchange_dataMarkets_types.info = (
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getExchange_dataMarkets_types.key] as QueryKey,
    fun: () => getExchange_dataMarkets_types(configOverride),
  };
};
useGetExchange_dataMarkets_types.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetExchangeDataMarketsTypes>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetExchange_dataMarkets_types.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * Exchange Data
 */
export const useGetExchange_dataOrderbook_list = (
  options?: SwaggerTypescriptUseQueryOptions<GetExchangedataOrderBookList>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetExchange_dataOrderbook_list.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetExchange_dataOrderbook_list.info = (
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getExchange_dataOrderbook_list.key] as QueryKey,
    fun: () => getExchange_dataOrderbook_list(configOverride),
  };
};
useGetExchange_dataOrderbook_list.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetExchangedataOrderBookList>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetExchange_dataOrderbook_list.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get all markets volume_count
 */
export const useGetExchange_dataVolume_count = (
  options?: SwaggerTypescriptUseQueryOptions<GetExchangeDataMarketsVolumeCount>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetExchange_dataVolume_count.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetExchange_dataVolume_count.info = (
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getExchange_dataVolume_count.key] as QueryKey,
    fun: () => getExchange_dataVolume_count(configOverride),
  };
};
useGetExchange_dataVolume_count.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetExchangeDataMarketsVolumeCount>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetExchange_dataVolume_count.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * Available coins
 */
export const useGetGet_available_coins = (
  options?: SwaggerTypescriptUseQueryOptions<GetAvailableCoins>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetGet_available_coins.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetGet_available_coins.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getGet_available_coins.key] as QueryKey,
    fun: () => getGet_available_coins(configOverride),
  };
};
useGetGet_available_coins.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetAvailableCoins>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetGet_available_coins.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get orders history
 */
export const useGetHistoryOrders = (
  queryParams?: GetHistoryOrdersQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetHistoryOrders>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetHistoryOrders.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetHistoryOrders.info = (
  queryParams?: GetHistoryOrdersQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getHistoryOrders.key, queryParams] as QueryKey,
    fun: () =>
      getHistoryOrders(
        queryParams,

        configOverride,
      ),
  };
};
useGetHistoryOrders.prefetch = (
  client: QueryClient,
  queryParams?: GetHistoryOrdersQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetHistoryOrders>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetHistoryOrders.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get positions history
 */
export const useGetHistoryPositions = (
  queryParams?: GetHistoryPositionsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetHistoryPositions>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetHistoryPositions.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetHistoryPositions.info = (
  queryParams?: GetHistoryPositionsQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getHistoryPositions.key, queryParams] as QueryKey,
    fun: () =>
      getHistoryPositions(
        queryParams,

        configOverride,
      ),
  };
};
useGetHistoryPositions.prefetch = (
  client: QueryClient,
  queryParams?: GetHistoryPositionsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetHistoryPositions>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetHistoryPositions.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * News
 */
export const useGetNews = (
  options?: SwaggerTypescriptUseQueryOptions<GetNews>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetNews.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetNews.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getNews.key] as QueryKey,
    fun: () => getNews(configOverride),
  };
};
useGetNews.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetNews>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetNews.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get swagger json
 */
export const useGetSwagger = (
  options?: SwaggerTypescriptUseQueryOptions<{ [x in string | number]: any }>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetSwagger.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetSwagger.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getSwagger.key] as QueryKey,
    fun: () => getSwagger(configOverride),
  };
};
useGetSwagger.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<{ [x in string | number]: any }>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetSwagger.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get tickets
 */
export const useGetTickets = (
  queryParams?: GetTicketsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetTicketsGetTickets>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetTickets.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetTickets.info = (
  queryParams?: GetTicketsQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getTickets.key, queryParams] as QueryKey,
    fun: () =>
      getTickets(
        queryParams,

        configOverride,
      ),
  };
};
useGetTickets.prefetch = (
  client: QueryClient,
  queryParams?: GetTicketsQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetTicketsGetTickets>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetTickets.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * Download a binary file
 */
export const useGetTicketsDownload_attachment = (
  queryParams: GetTicketsDownload_attachmentQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<string>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetTicketsDownload_attachment.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetTicketsDownload_attachment.info = (
  queryParams: GetTicketsDownload_attachmentQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getTicketsDownload_attachment.key, queryParams] as QueryKey,
    fun: () =>
      getTicketsDownload_attachment(
        queryParams,

        configOverride,
      ),
  };
};
useGetTicketsDownload_attachment.prefetch = (
  client: QueryClient,
  queryParams: GetTicketsDownload_attachmentQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<string>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetTicketsDownload_attachment.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get ticket data
 */
export const useGetTicketsGet_ticket_data = (
  options?: SwaggerTypescriptUseQueryOptions<GetTicketsGetTicketData>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetTicketsGet_ticket_data.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetTicketsGet_ticket_data.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getTicketsGet_ticket_data.key] as QueryKey,
    fun: () => getTicketsGet_ticket_data(configOverride),
  };
};
useGetTicketsGet_ticket_data.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetTicketsGetTicketData>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetTicketsGet_ticket_data.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get candles history
 */
export const useGetTradingviewHistory = (
  queryParams: GetTradingviewHistoryQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetTradingviewHistory>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetTradingviewHistory.info(
    queryParams,
    configOverride,
  );
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetTradingviewHistory.info = (
  queryParams: GetTradingviewHistoryQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getTradingviewHistory.key, queryParams] as QueryKey,
    fun: () =>
      getTradingviewHistory(
        queryParams,

        configOverride,
      ),
  };
};
useGetTradingviewHistory.prefetch = (
  client: QueryClient,
  queryParams: GetTradingviewHistoryQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetTradingviewHistory>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetTradingviewHistory.info(
    queryParams,
    configOverride,
  );

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * account_details
 */
export const useGetUser_dataAccount_details = (
  options?: SwaggerTypescriptUseQueryOptions<GetUserDataAccountDetails>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataAccount_details.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUser_dataAccount_details.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUser_dataAccount_details.key] as QueryKey,
    fun: () => getUser_dataAccount_details(configOverride),
  };
};
useGetUser_dataAccount_details.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetUserDataAccountDetails>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataAccount_details.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * active_sessions
 */
export const useGetUser_dataActive_sessions = (
  options?: SwaggerTypescriptUseQueryOptions<GetUserDataActiveSessions>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataActive_sessions.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUser_dataActive_sessions.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUser_dataActive_sessions.key] as QueryKey,
    fun: () => getUser_dataActive_sessions(configOverride),
  };
};
useGetUser_dataActive_sessions.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetUserDataActiveSessions>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataActive_sessions.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * balance
 */
export const useGetUser_dataBalance = (
  options?: SwaggerTypescriptUseQueryOptions<GetUserDataBalance>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataBalance.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUser_dataBalance.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUser_dataBalance.key] as QueryKey,
    fun: () => getUser_dataBalance(configOverride),
  };
};
useGetUser_dataBalance.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetUserDataBalance>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataBalance.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * claim_referral_history
 */
export const useGetUser_dataClaim_referral_history = (
  options?: SwaggerTypescriptUseQueryOptions<Claim_referral_history>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } =
    useGetUser_dataClaim_referral_history.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUser_dataClaim_referral_history.info = (
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getUser_dataClaim_referral_history.key] as QueryKey,
    fun: () => getUser_dataClaim_referral_history(configOverride),
  };
};
useGetUser_dataClaim_referral_history.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<Claim_referral_history>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } =
    useGetUser_dataClaim_referral_history.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * claim_referral_rewards
 */
export const useGetUser_dataClaim_referral_rewards = (
  options?: SwaggerTypescriptUseQueryOptions<Success>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } =
    useGetUser_dataClaim_referral_rewards.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUser_dataClaim_referral_rewards.info = (
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getUser_dataClaim_referral_rewards.key] as QueryKey,
    fun: () => getUser_dataClaim_referral_rewards(configOverride),
  };
};
useGetUser_dataClaim_referral_rewards.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<Success>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } =
    useGetUser_dataClaim_referral_rewards.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * deposits
 */
export const useGetUser_dataDeposits = (
  options?: SwaggerTypescriptUseQueryOptions<Get_deposits_list>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataDeposits.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUser_dataDeposits.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUser_dataDeposits.key] as QueryKey,
    fun: () => getUser_dataDeposits(configOverride),
  };
};
useGetUser_dataDeposits.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<Get_deposits_list>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataDeposits.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get_2fa_Data
 */
export const useGetUser_dataGet_2fa_Data = (
  options?: SwaggerTypescriptUseQueryOptions<GetSettingsGet2FAData>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataGet_2fa_Data.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUser_dataGet_2fa_Data.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUser_dataGet_2fa_Data.key] as QueryKey,
    fun: () => getUser_dataGet_2fa_Data(configOverride),
  };
};
useGetUser_dataGet_2fa_Data.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetSettingsGet2FAData>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataGet_2fa_Data.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * get_referral_codes
 */
export const useGetUser_dataGet_referral_codes = (
  options?: SwaggerTypescriptUseQueryOptions<GetReferralCodes>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataGet_referral_codes.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUser_dataGet_referral_codes.info = (
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getUser_dataGet_referral_codes.key] as QueryKey,
    fun: () => getUser_dataGet_referral_codes(configOverride),
  };
};
useGetUser_dataGet_referral_codes.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetReferralCodes>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataGet_referral_codes.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * last_logins
 */
export const useGetUser_dataLast_logins = (
  options?: SwaggerTypescriptUseQueryOptions<GetLastLogins>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataLast_logins.info(configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetUser_dataLast_logins.info = (configOverride?: AxiosRequestConfig) => {
  return {
    key: [getUser_dataLast_logins.key] as QueryKey,
    fun: () => getUser_dataLast_logins(configOverride),
  };
};
useGetUser_dataLast_logins.prefetch = (
  client: QueryClient,
  options?: SwaggerTypescriptUseQueryOptions<GetLastLogins>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetUser_dataLast_logins.info(configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * Get withdraw history
 */
export const useGetWithdrawHistory = (
  queryParams?: GetWithdrawHistoryQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetWithdrawHistory>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetWithdrawHistory.info(queryParams, configOverride);
  return useQuery({
    queryKey: key,
    queryFn: fun,
    ...options,
  });
};
useGetWithdrawHistory.info = (
  queryParams?: GetWithdrawHistoryQueryParams,
  configOverride?: AxiosRequestConfig,
) => {
  return {
    key: [getWithdrawHistory.key, queryParams] as QueryKey,
    fun: () =>
      getWithdrawHistory(
        queryParams,

        configOverride,
      ),
  };
};
useGetWithdrawHistory.prefetch = (
  client: QueryClient,
  queryParams?: GetWithdrawHistoryQueryParams,
  options?: SwaggerTypescriptUseQueryOptions<GetWithdrawHistory>,
  configOverride?: AxiosRequestConfig,
) => {
  const { key, fun } = useGetWithdrawHistory.info(queryParams, configOverride);

  return client.getQueryData(key)
    ? Promise.resolve()
    : client.prefetchQuery({
        queryKey: key,
        queryFn: () => fun(),
        ...options,
      });
};

/**
 *
 * Generate address to deposit
 */
export const usePostDeposit = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    PostDeposit,
    { requestBody: RequestBodyPostDeposit },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postDeposit(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * email login
 */
export const usePostLoginEmail_login = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    EmailLoginResponse,
    { requestBody: RequestBodyPostLoginEmailLogin },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postLoginEmail_login(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * 2fa verification
 */
export const usePostLoginVerify2fa = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    EmailLoginVerify2FAResponse,
    { requestBody: RequestBodyPostLoginVerify2FA },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postLoginVerify2fa(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * logout
 */
export const usePostLogout = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptionsVoid<Success, TExtra>,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const { configOverride } = _o || {};

      return postLogout(configOverride);
    },
    ...options,
  });
};

/**
 *
 * cancel order
 */
export const usePostOrderCancel = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostOrderCancel },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postOrderCancel(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * edit sl and tp of order
 */
export const usePostOrderEditSl_tp = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostOrderEditSLAndTpMargin },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postOrderEditSl_tp(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * set long limit
 */
export const usePostOrderSetLimitLong = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostPositionSetLimitLong },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postOrderSetLimitLong(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * set short limit
 */
export const usePostOrderSetLimitShort = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostPositionSetLimitShort },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postOrderSetLimitShort(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * set long market
 */
export const usePostOrderSetMarketLong = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostPositionSetMarketLong },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postOrderSetMarketLong(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * set short market
 */
export const usePostOrderSetMarketShort = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostPositionSetMarketShort },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postOrderSetMarketShort(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * set fragmented close order
 */
export const usePostOrderSet_fragmented_close_order = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostOrderSetFragmentedCloseOrder },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postOrderSet_fragmented_close_order(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * set fragmented close order
 */
export const usePostOrderSet_group_close_order = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostOrderSetGroupCloseOrder },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postOrderSet_group_close_order(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * edit sl and tp of position
 */
export const usePostPositionEditSl_tp_margin = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostPositionEditSLAndTPAndMargin },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postPositionEditSl_tp_margin(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * send register verification code
 */
export const usePostRegisterSend_register_code = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostRegisterSendRegisterCode },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postRegisterSend_register_code(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * verify and register
 */
export const usePostRegisterVerify = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    RegisterVerifyResponse,
    { requestBody: RequestBodyPostRegisterVerify },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postRegisterVerify(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * reset 2fa
 */
export const usePostSecurityReset_2fa = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostSecurityReset2FA },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postSecurityReset_2fa(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * reset password
 */
export const usePostSecurityReset_password = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostSecurityResetPassword },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postSecurityReset_password(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * send 2fa reset code
 */
export const usePostSecuritySend_2fa_reset_code = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostSecuritySendPasswordResetCode },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postSecuritySend_2fa_reset_code(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * send password reset code
 */
export const usePostSecuritySend_password_reset_code = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostSecuritySendPasswordResetCode },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postSecuritySend_password_reset_code(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * create new ticket
 */
export const usePostTicketsCreate = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostTicketsCreate },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postTicketsCreate(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * add new reply to ticket
 */
export const usePostTicketsReply = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostTicketsReply },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postTicketsReply(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * activate_2fa
 */
export const usePostUser_dataActivate_2fa = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostSettingsActivate2FA },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postUser_dataActivate_2fa(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * change password
 */
export const usePostUser_dataChange_password = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostSettingsChangePassword },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postUser_dataChange_password(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * deactivate_2fa
 */
export const usePostUser_dataDeactivate_2fa = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostSettingsDeactivate2FA },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postUser_dataDeactivate_2fa(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * generate_ref_code
 */
export const usePostUser_dataGenerate_ref_code = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    PostUserDataGenerateRefCodeResponse,
    { requestBody: RequestBodyPostUserDataGenerateRefCode },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postUser_dataGenerate_ref_code(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * send change mail code
 */
export const usePostUser_dataSend_change_email_code = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostSettingsSendChangeMailCode },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postUser_dataSend_change_email_code(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * set_language
 */
export const usePostUser_dataSet_language = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostUserDataSetLanguage },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postUser_dataSet_language(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * transfer_balance
 */
export const usePostUser_dataTransfer_balance = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostUserDataTransferBalance },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postUser_dataTransfer_balance(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * verify change mail code
 */
export const usePostUser_dataVerify_change_email_code = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPostSettingsVerifyChangeMailCode },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postUser_dataVerify_change_email_code(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * Withdraw crypto
 */
export const usePostWithdraw = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    PostWithdraw,
    { requestBody: RequestBodyPostWithdraw },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postWithdraw(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * Get withdraw crypto rate
 */
export const usePostWithdrawRate = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    PostWithdrawRate,
    { requestBody: RequestBodyPostWithdrawRate },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return postWithdrawRate(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};

/**
 *
 * update ticket
 */
export const usePutTicketsUpdate = <TExtra,>(
  options?: SwaggerTypescriptUseMutationOptions<
    Success,
    { requestBody: RequestBodyPutTicketsUpdate },
    TExtra
  >,
) => {
  return useMutation({
    mutationFn: (_o) => {
      const {
        requestBody,

        configOverride,
      } = _o || {};

      return putTicketsUpdate(
        requestBody,

        configOverride,
      );
    },
    ...options,
  });
};
