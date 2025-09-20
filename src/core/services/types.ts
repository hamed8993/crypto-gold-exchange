//@ts-nocheck
/**
 * AUTO_GENERATED Do not change this file directly, use config.ts file instead
 *
 * @version 6
 */

export interface DeleteUser_dataDelete_active_sessionsQueryParams {
  /**
   *
   * uuid
   */
  uuid: Delete_active_sessions;
}

export interface GetDepositCheckQueryParams {
  deposit_id?: Deposit_id;
}

export interface GetDepositHistoryQueryParams {
  address?: Address;
  asset?: Asset;
  /**
   *
   * from time (ms)
   */
  from?: TimeFrom;
  /**
   *
   * maxRowsPerPage
   */
  maxRowsPerPage?: MaxRowsPerPage;
  network?: Network;
  /**
   *
   * page
   */
  page?: Page;
  payment_currency?: Payment_currency;
  status?: Status;
  /**
   *
   * to time (ms)
   */
  to?: TimeTo;
  tx?: Tx;
}

export interface GetExchange_dataMarkets_detailsQueryParams {
  /**
   *
   * base
   */
  base?: Base;
  /**
   *
   * maxRowsPerPage
   */
  maxRowsPerPage?: MaxRowsPerPage;
  /**
   *
   * orderBy
   */
  orderBy?: OrderBy;
  /**
   *
   * orderDirection
   */
  orderDirection?: OrderDirection;
  /**
   *
   * page
   */
  page?: Page;
  /**
   *
   * quote
   */
  quote?: Quote;
  /**
   *
   * time resolution 1d returns 24 results others return 28 results
   */
  resolution?: ResolutionChartsRF;
  /**
   *
   * search data
   */
  search?: MarketDetailsSearchRF;
  /**
   *
   * if exist response will limited to slected symbol
   */
  symbol?: SymbolOrders;
  withChart?: MarketDetailsWithChartRF;
}

export interface GetHistoryOrdersQueryParams {
  /**
   *
   * from time (ms)
   */
  from?: TimeFrom;
  /**
   *
   * maxRowsPerPage
   */
  maxRowsPerPage?: MaxRowsPerPage;
  /**
   *
   * page
   */
  page?: Page;
  /**
   *
   * if exist response will limited to slected side
   */
  side?: Side;
  /**
   *
   * if exist response will limited to slected status
   */
  status?: StatusOrder;
  /**
   *
   * if exist response will limited to slected symbol
   */
  symbol?: SymbolOrders;
  /**
   *
   * to time (ms)
   */
  to?: TimeTo;
}

export interface GetHistoryPositionsQueryParams {
  /**
   *
   * from time (ms)
   */
  from?: TimeFrom;
  /**
   *
   * maxRowsPerPage
   */
  maxRowsPerPage?: MaxRowsPerPage;
  /**
   *
   * page
   */
  page?: Page;
  /**
   *
   * if exist response will limited to slected side
   */
  side?: Side;
  /**
   *
   * if exist response will limited to slected status
   */
  status?: StatusPosition;
  /**
   *
   * if exist response will limited to slected symbol
   */
  symbol?: SymbolOrders;
  /**
   *
   * to time (ms)
   */
  to?: TimeTo;
  /**
   *
   * if exist response will limited to slected type
   */
  type?: Type;
}

export interface GetTicketsDownload_attachmentQueryParams {
  /**
   *
   * uuid
   */
  uuid: DownloadFileUuidRT;
  /**
   *
   * uuid
   */
  base64?: Base64DownloadRF;
}

export interface GetTicketsQueryParams {
  /**
   *
   * maximum rows per page for paginated requests
   */
  maxRowsPerPage?: MaxRowsPerPageRF;
  /**
   *
   * page number for paginated requests
   */
  page?: PageRF;
  /**
   *
   * Priority
   */
  priority?: TicketPriorityRF;
  /**
   *
   * status
   */
  status?: TicketStatusRF;
  /**
   *
   * ticket_number
   */
  ticket_number?: TicketNumberRF;
}

export interface GetTradingviewHistoryQueryParams {
  /**
   *
   * from timestamp
   */
  from: TimeFromRF;
  /**
   *
   * chart timeframe
   */
  resolution: ResolutionRF;
  symbol: SymbolRF;
  /**
   *
   * to timestamp
   */
  to: TimeToRF;
}

export interface GetWithdrawHistoryQueryParams {
  address?: Address;
  asset?: Asset;
  /**
   *
   * from time (ms)
   */
  from?: TimeFrom;
  /**
   *
   * maxRowsPerPage
   */
  maxRowsPerPage?: MaxRowsPerPage;
  network?: Network;
  /**
   *
   * page
   */
  page?: Page;
  payment_currency?: Payment_currency;
  status?: Status;
  /**
   *
   * to time (ms)
   */
  to?: TimeTo;
  tx?: Tx;
}

export type RequestBodygetDepositCheck = GetDepositCheck;

export type RequestBodygetDepositHistory = GetDepositHistory;

export type RequestBodygetWithdrawHistory = GetWithdrawHistory;

export type RequestBodypostDeposit = PostDepositReqBody;

export type RequestBodypostLoginEmailLogin = PostLoginEmailLoginReqBody;

export type RequestBodypostLoginVerify2FA = PostLoginVerify2FAReqBody;

export type RequestBodypostOrderCancel = PostOrderCancelReqBody;

export type RequestBodypostOrderEditSLAndTpMargin =
  PostOrderEditSLAndTpMarginReqBody;

export type RequestBodypostOrderSetFragmentedCloseOrder =
  PostOrderSetFragmentedCloseOrderReqBody;

export type RequestBodypostOrderSetGroupCloseOrder =
  PostOrderSetGroupCloseOrderReqBody;

export type RequestBodypostPositionEditSLAndTPAndMargin =
  PostPositionEditSLAndTPAndMarginReqBody;

export type RequestBodypostPositionSetLimitLong =
  PostPositionSetLimitLongReqBody;

export type RequestBodypostPositionSetLimitShort =
  PostPositionSetLimitShortReqBody;

export type RequestBodypostPositionSetMarketLong =
  PostPositionSetMarketLongReqBody;

export type RequestBodypostPositionSetMarketShort =
  PostPositionSetMarketShortReqBody;

export type RequestBodypostRegisterSendRegisterCode =
  PostRegisterSendRegisterCodeReqBody;

export type RequestBodypostRegisterVerify = PostRegisterVerifyReqBody;

export type RequestBodypostSecurityReset2FA = PostSecurityReset2FAReqBody;

export type RequestBodypostSecurityResetPassword =
  PostSecurityResetPasswordReqBody;

export type RequestBodypostSecuritySendPasswordResetCode =
  PostSecuritySendPasswordResetCodeReqBody;

export type RequestBodypostSettingsActivate2FA = PostSettingsActivate2FAReqBody;

export type RequestBodypostSettingsChangePassword =
  PostSettingsChangePasswordReqBody;

export type RequestBodypostSettingsDeactivate2FA =
  PostSettingsDeactivate2FAReqBody;

export type RequestBodypostSettingsSendChangeMailCode =
  PostSettingsSendChangeMailCodeReqBody;

export type RequestBodypostSettingsVerifyChangeMailCode =
  PostSettingsVerifyChangeMailCodeReqBody;

export type RequestBodypostTicketsCreate = PostTicketsCreateReqBody;

export type RequestBodypostTicketsReply = PostTicketsReplyReqBody;

export type RequestBodypostUserDataGenerateRefCode =
  PostUserDataGenerateRefCodeReqBody;

export type RequestBodypostUserDataSetLanguage = PostUserDataSetLanguageReqBody;

export type RequestBodypostUserDataTransferBalance =
  PostUserDataTransferBalanceReqBody;

export type RequestBodypostWithdraw = PostWithdrawReqBody;

export type RequestBodypostWithdrawRate = PostWithdrawRateReqBody;

export type RequestBodyputTicketsUpdate = PutTicketsUpdateReqBody;

export type Address = string;

export type Asset = string;

/**
 *
 * base
 */

export type Base = string;

/**
 *
 * uuid
 */

export type Base64DownloadRF = "true" | "false";

export interface Claim_referral_history {
  result?: {
    amount: string;
    blanace_after: string;
    blanace_beofre: string;
    time: string;
  }[];
  status?: string;
}

/**
 *
 * uuid
 */

export type Delete_active_sessions = string;

export type Deposit_id = string;

/**
 *
 * uuid
 */

export type DownloadFileUuidRT = string;

export interface EmailLoginResponse {
  result?: { tfa_status?: string };
  status?: string;
}

export interface EmailLoginVerify2FAResponse {
  result?: {
    /**
     *
     * - Format: uuid
     */
    user_uuid?: string;
  };
  status?: string;
}

export interface Error {
  error: string;
  status: string;
}

export interface GetAvailableCoins {
  result?: {
    /**
     *
     * The decimals Schema
     *
     */
    decimals: string;
    /**
     *
     * The id Schema
     *
     */
    id: string;
    /**
     *
     * The name_en Schema
     *
     */
    name_en: string;
    /**
     *
     * The name_fa Schema
     *
     */
    name_fa: string;
    /**
     *
     * The network Schema
     *
     */
    networks: array;
    /**
     *
     * The networks_data Schema
     *
     */
    networks_data: array;
    /**
     *
     * The network_name_fa Schema
     *
     */
    status: "active" | "inactive";
    /**
     *
     * The symbol Schema
     *
     */
    symbol: string;
  }[];
  status?: string;
}

export interface GetDepositCheck {
  paginationData?: {
    currentPage?: string;
    currentPageRows?: string;
    lastPage?: string;
    maxRowsPerPage?: string;
    totalRows?: string;
  };
  result?: {
    actual_amount?: string;
    actual_equivalent?: string;
    address?: string;
    amount?: string;
    asset?: string;
    confirmations?: string;
    created_at?: string;
    deposit_id?: string;
    equivalent?: string;
    min_confirmation?: string;
    network?: string;
    payment_currency?: string;
    rate?: string;
    status?: string;
    tx?: string;
  };
  status?: string;
}

/**
 *
 * Root Schema
 *
 */

export interface GetDepositHistory {
  /**
   *
   * A Schema
   *
   */
  result: {
    /**
     *
     * The address Schema
     *
     */
    address: string;
    /**
     *
     * The amount Schema
     *
     */
    amount: string;
    /**
     *
     * The asset Schema
     *
     */
    asset: string;
    /**
     *
     * The created_at Schema
     *
     */
    created_at: string;
    /**
     *
     * The deposit_id Schema
     *
     */
    deposit_id: string;
    /**
     *
     * The equivalent Schema
     *
     */
    equivalent: string;
    /**
     *
     * The payment_currency Schema
     *
     */
    payment_currency: string;
    /**
     *
     * The rate Schema
     *
     */
    rate: string;
    /**
     *
     * The actual_amount Schema
     *
     */
    actual_amount?: string;
    /**
     *
     * The actual_equivalent Schema
     *
     */
    actual_equivalent?: string;
    /**
     *
     * The confirmations Schema
     *
     */
    confirmations?: string;
    /**
     *
     * The network Schema
     *
     */
    network?: string;
    /**
     *
     * The status Schema
     *
     */
    status?: string;
    /**
     *
     * The tx Schema
     *
     */
    tx?: string;
  }[];
  /**
   *
   * The status Schema
   *
   */
  status: string;
  paginationData?: {
    currentPage?: string;
    currentPageRows?: string;
    lastPage?: string;
    maxRowsPerPage?: string;
    totalRows?: string;
  };
}

export interface GetExchangeDataMarketsDetails {
  paginationData?: {
    currentPage?: string;
    currentPageRows?: string;
    lastPage?: string;
    maxRowsPerPage?: string;
    totalRows?: string;
  };
  result?: {
    base: string;
    change_percentage: string;
    change_price: string;
    chart: { max: undefined; min: undefined; symbol: string; xy: array };
    highest_price: string;
    last_price: string;
    lowest_price: string;
    market_type: string;
    quote: string;
    quote_market_precision: string;
    symbol: string;
    volume: string;
  }[];
  status?: string;
}

export interface GetExchangeDataMarketsTypes {
  result?: { name: string; translation: { en: string; fa: string } }[];
  status?: string;
}

export interface GetExchangeDataMarketsVolumeCount {
  result?: {
    irt?: { count?: string; volume?: string };
    usd?: { count?: string; volume?: string };
  };
  status?: string;
}

export interface GetExchangedataMarkets {
  result?: {
    active_hours: string;
    allowed_price_offset: string;
    base: string;
    fee: string;
    leverage: array;
    liquidity_threshold: string;
    market_type: string;
    max_contract_size: string;
    pl_multiplier: string;
    price_step: string;
    quote: string;
    quote_precision: string;
    status: string;
    symbol: string;
    translations: {
      ar: { base: string; quote: string; symbol: string };
      en: { base: string; quote: string; symbol: string };
      fa: { base: string; quote: string; symbol: string };
      ru: { base: string; quote: string; symbol: string };
      tr: { base: string; quote: string; symbol: string };
    };
  }[];
  status?: string;
}

export interface GetExchangedataOrderBookList {
  result?: {
    xaggrirt?: {
      base?: string;
      orderbook?: {
        longs?: {
          price: string;
          totalVolumeBase: string;
          totalVolumeQuote: string;
          volumeBase: string;
          volumeQuote: string;
        }[];
        shorts?: {
          price: string;
          totalVolumeBase: string;
          totalVolumeQuote: string;
          volumeBase: string;
          volumeQuote: string;
        }[];
      };
      quote?: string;
      quote_precision?: number;
    };
    xagusd?: {
      base?: string;
      orderbook?: {
        longs?: {
          price: string;
          totalVolumeBase: string;
          totalVolumeQuote: string;
          volumeBase: string;
          volumeQuote: string;
        }[];
        shorts?: {
          price: string;
          totalVolumeBase: string;
          totalVolumeQuote: string;
          volumeBase: string;
          volumeQuote: string;
        }[];
      };
      quote?: string;
      quote_precision?: number;
    };
    xauabtirt?: {
      base?: string;
      orderbook?: {
        longs?: {
          price: string;
          totalVolumeBase: string;
          totalVolumeQuote: string;
          volumeBase: string;
          volumeQuote: string;
        }[];
        shorts?: {
          price: string;
          totalVolumeBase: string;
          totalVolumeQuote: string;
          volumeBase: string;
          volumeQuote: string;
        }[];
      };
      quote?: string;
      quote_precision?: number;
    };
    xaugrirt?: {
      base?: string;
      orderbook?: {
        longs?: {
          price: string;
          totalVolumeBase: string;
          totalVolumeQuote: string;
          volumeBase: string;
          volumeQuote: string;
        }[];
        shorts?: {
          price: string;
          totalVolumeBase: string;
          totalVolumeQuote: string;
          volumeBase: string;
          volumeQuote: string;
        }[];
      };
      quote?: string;
      quote_precision?: number;
    };
    xauusd?: {
      base?: string;
      orderbook?: {
        longs?: {
          price: string;
          totalVolumeBase: string;
          totalVolumeQuote: string;
          volumeBase: string;
          volumeQuote: string;
        }[];
        shorts?: {
          price: string;
          totalVolumeBase: string;
          totalVolumeQuote: string;
          volumeBase: string;
          volumeQuote: string;
        }[];
      };
      quote?: string;
      quote_precision?: number;
    };
  };
  status?: string;
}

export interface GetHistoryOrders {
  paginationData?: {
    currentPage?: string;
    currentPageRows?: string;
    lastPage?: string;
    maxRowsPerPage?: string;
    totalRows?: string;
  };
  result?: {
    base: string;
    created_at: string;
    entryPrice: string;
    fee: string;
    filled: string;
    /**
     *
     * - Format: uuid
     */
    groupId: string;
    leverage: string;
    orderId: string;
    quote: string;
    requiredMargin: string;
    side: string;
    slPrice: string;
    status: string;
    symbol: string;
    totalMargin: string;
    totalSize: string;
    tpPrice: string;
    type: string;
    /**
     *
     * - Format: uuid
     */
    user_uuid: string;
  }[];
  status?: string;
}

export interface GetHistoryPositions {
  paginationData?: {
    currentPage?: string;
    currentPageRows?: string;
    lastPage?: string;
    maxRowsPerPage?: string;
    totalRows?: string;
  };
  result?: {
    base: string;
    entryPrice: string;
    leverage: string;
    orderId: string;
    quote: string;
    side: string;
    slPrice: string;
    subPositions: array;
    symbol: string;
    tpPrice: string;
  }[];
  status?: string;
}

export interface GetLastLogins {
  result?: {
    agent: string;
    /**
     *
     * - Format: ipv4
     */
    ip: string;
    time: string;
  }[];
  status?: string;
}

export interface GetNews {
  result?: {
    en?: { content_text: string; date_published: number; title: string }[];
    fa?: { content_text: string; date_published: number; title: string }[];
  };
  status?: string;
}

export interface GetReferralCodes {
  result?: {
    refCodes?: {
      code: string;
      income: string;
      referrerShare: string;
      subsetCount: string;
      subsetShare: string;
    }[];
    totalClaimed?: string;
    unclaimedBalance?: string;
  };
  status?: string;
}

export interface GetSettingsGet2FAData {
  qr?: string;
  secret?: string;
  status?: string;
}

/**
 *
 * Root Schema
 *
 */

export interface GetTicketsGetTicketData {
  /**
   *
   * The result Schema
   *
   */
  result: {
    /**
     *
     * The articles Schema
     *
     */
    articles: {
      /**
       *
       * The attachments Schema
       *
       */
      attachments: {
        /**
         *
         * The fileName Schema
         *
         */
        fileName: string;
        /**
         *
         * The uuid Schema
         *
         */
        uuid: string;
      }[];
      /**
       *
       * The createdAt Schema
       *
       */
      createdAt: string;
      /**
       *
       * The creator_type Schema
       *
       */
      creator_type: string;
      /**
       *
       * The message Schema
       *
       */
      message: string;
      /**
       *
       * The updatedAt Schema
       *
       */
      updatedAt: string;
      /**
       *
       * The uuid Schema
       *
       */
      uuid: string;
    }[];
    /**
     *
     * The closedAt Schema
     *
     */
    closedAt: string;
    /**
     *
     * The createdAt Schema
     *
     */
    createdAt: string;
    /**
     *
     * The creator_type Schema
     *
     */
    creator_type: string;
    /**
     *
     * The creator_uuid Schema
     *
     */
    creator_uuid: string;
    /**
     *
     * The number Schema
     *
     */
    number: string;
    /**
     *
     * The priority Schema
     *
     */
    priority: string;
    /**
     *
     * The status Schema
     *
     */
    status: string;
    /**
     *
     * The title Schema
     *
     */
    title: string;
    /**
     *
     * The updatedAt Schema
     *
     */
    updatedAt: string;
  };
  /**
   *
   * The serverTime Schema
   *
   */
  serverTime: string;
  /**
   *
   * The status Schema
   *
   */
  status: string;
}

export interface GetTicketsGetTickets {
  paginationData: {
    currentPage: string;
    currentPageRows: string;
    lastPage: string;
    maxRowsPerPage: string;
    totalRows: string;
  };
  result: {
    articles: {
      createdAt: string;
      creator_type: string;
      message: string;
      updatedAt: string;
    }[];
    closedAt: string;
    createdAt: string;
    creator_type: string;
    creator_uuid: string;
    number: string;
    priority: string;
    status: string;
    title: string;
    updatedAt: string;
  }[];
  serverTime: string;
  status: string;
}

export interface GetTradingviewHistory {
  [(x in string) | number]: any;
}

export interface GetUserDataAccountDetails {
  result?: {
    cellphone?: string;
    country?: string;
    dailyWithdrawLimit?: string;
    depositPermission?: string;
    /**
     *
     * - Format: email
     */
    email?: string;
    family_name?: string;
    isBan?: string;
    language?: string;
    last24hWithdrawVolume?: string;
    last30dWithdrawVolume?: string;
    monthlyWithdrawLimit?: string;
    name?: string;
    openContractSize?: string;
    passwordResetTime?: string;
    referredBy?: string;
    registerTime?: string;
    tradePermission?: string;
    twoFactorAuthenticationStatus?: string;
    user_id?: string;
    vipLevel?: string;
    withdrawPermission?: string;
  };
  status?: string;
}

export interface GetUserDataActiveSessions {
  result?: { current?: string; sessions?: { agent: string; uuid: string }[] };
  status?: string;
}

export interface GetUserDataBalance {
  result?: {
    main?: {
      available: string;
      coin: string;
      pendingWithdraw: string;
      total: string;
    }[];
    margin?: {
      available: string;
      coin: string;
      in_order: string;
      total: string;
    }[];
  };
  status?: string;
}

/**
 *
 * Root Schema
 *
 */

export interface GetWithdrawHistory {
  /**
   *
   * A Schema
   *
   */
  result: {
    /**
     *
     * The address Schema
     *
     */
    address: string;
    /**
     *
     * The amount Schema
     *
     */
    amount: string;
    /**
     *
     * The asset Schema
     *
     */
    asset: string;
    /**
     *
     * The created_at Schema
     *
     */
    created_at: string;
    /**
     *
     * The equivalent Schema
     *
     */
    equivalent: string;
    /**
     *
     * The network Schema
     *
     */
    network: string;
    /**
     *
     * The payment_currency Schema
     *
     */
    payment_currency: string;
    /**
     *
     * The rate Schema
     *
     */
    rate: string;
    /**
     *
     * The status Schema
     *
     */
    status: string;
    /**
     *
     * The tx Schema
     *
     */
    tx: string;
    /**
     *
     * The withdraw_id Schema
     *
     */
    withdraw_id: string;
  }[];
  /**
   *
   * The status Schema
   *
   */
  status: string;
  paginationData?: {
    currentPage?: string;
    currentPageRows?: string;
    lastPage?: string;
    maxRowsPerPage?: string;
    totalRows?: string;
  };
}

export interface Get_deposits_list {
  result?: {
    amount: string;
    asset: string;
    deposit_id: string;
    irt_eq: string;
    method: string;
    rate: string;
    reference_code: string;
    status: string;
    time: string;
    uuid: string;
  }[];
  status?: string;
}

/**
 *
 * search data
 */

export type MarketDetailsSearchRF = string;

export type MarketDetailsWithChartRF = "true" | "false";

/**
 *
 * maxRowsPerPage
 */

export type MaxRowsPerPage = string;

/**
 *
 * maximum rows per page for paginated requests
 */

export type MaxRowsPerPageRF = string;

export type Network = string;

/**
 *
 * orderBy
 */

export type OrderBy =
  | "symbol"
  | "change_percentage"
  | "change_price"
  | "last_price"
  | "highest_price"
  | "lowest_price"
  | "volume";

/**
 *
 * orderDirection
 */

export type OrderDirection = "asc" | "desc";

/**
 *
 * page
 */

export type Page = string;

/**
 *
 * page number for paginated requests
 */

export type PageRF = string;

export type Payment_currency = string;

/**
 *
 * Root Schema
 *
 */

export interface PostDeposit {
  /**
   *
   * A Schema
   *
   */
  result: {
    /**
     *
     * The address Schema
     *
     */
    address: string;
    /**
     *
     * The amount Schema
     *
     */
    amount: string;
    /**
     *
     * The asset Schema
     *
     */
    asset: string;
    /**
     *
     * The deposit_id Schema
     *
     */
    deposit_id: string;
    /**
     *
     * The equivalent Schema
     *
     */
    equivalent: string;
    /**
     *
     * The payment_currency Schema
     *
     */
    payment_currency: string;
    /**
     *
     * The rate Schema
     *
     */
    rate: string;
    /**
     *
     * The network Schema
     *
     */
    network?: string;
  };
  /**
   *
   * The status Schema
   *
   */
  status: string;
}

export interface PostDepositReqBody {
  amount?: string;
  asset?: string;
  network?: string;
  payment_currency?: string;
}

export interface PostLoginEmailLoginReqBody {
  /**
   *
   * - Format: email
   */
  email?: string;
  password?: string;
}

export interface PostLoginVerify2FAReqBody {
  tfaCode?: string;
}

export interface PostOrderCancelReqBody {
  orderId?: string;
  symbol?: string;
}

export interface PostOrderEditSLAndTpMarginReqBody {
  orderId?: string;
  slPrice?: string;
  symbol?: string;
  tpPrice?: string;
}

export interface PostOrderSetFragmentedCloseOrderReqBody {
  positionUuid?: string;
  symbol?: string;
}

export interface PostOrderSetGroupCloseOrderReqBody {
  entryPrice?: string;
  orderId?: string;
  symbol?: string;
}

export interface PostPositionEditSLAndTPAndMarginReqBody {
  backupMargin?: string;
  entryPrice?: string;
  orderId?: string;
  slPrice?: string;
  symbol?: string;
  tpPrice?: string;
}

export interface PostPositionSetLimitLongReqBody {
  contractSize?: string;
  entryPrice?: string;
  leverage?: string;
  slPrice?: string;
  symbol?: string;
  tpPrice?: string;
}

export interface PostPositionSetLimitShortReqBody {
  contractSize?: string;
  entryPrice?: string;
  leverage?: string;
  slPrice?: string;
  symbol?: string;
  tpPrice?: string;
}

export interface PostPositionSetMarketLongReqBody {
  contractSize?: string;
  leverage?: string;
  slPrice?: string;
  symbol?: string;
  tpPrice?: string;
}

export interface PostPositionSetMarketShortReqBody {
  contractSize?: string;
  leverage?: string;
  slPrice?: string;
  symbol?: string;
  tpPrice?: string;
}

export interface PostRegisterSendRegisterCodeReqBody {
  /**
   *
   * - Format: email
   */
  email?: string;
}

export interface PostRegisterVerifyReqBody {
  cellphone?: string;
  confirmationCode?: string;
  country?: string;
  /**
   *
   * - Format: email
   */
  email?: string;
  family_name?: string;
  name?: string;
  password?: string;
  referralCode?: string;
}

export interface PostSecurityReset2FAReqBody {
  /**
   *
   * - Format: email
   */
  email?: string;
  resetCode?: string;
}

export interface PostSecurityResetPasswordReqBody {
  /**
   *
   * - Format: email
   */
  email?: string;
  newPassword?: string;
  resetCode?: string;
}

export interface PostSecuritySendPasswordResetCodeReqBody {
  /**
   *
   * - Format: email
   */
  email?: string;
}

export interface PostSettingsActivate2FAReqBody {
  tfaCode?: string;
}

export interface PostSettingsChangePasswordReqBody {
  currentPassword?: string;
  newPassword?: string;
}

export interface PostSettingsDeactivate2FAReqBody {
  tfaCode?: string;
}

export interface PostSettingsSendChangeMailCodeReqBody {
  /**
   *
   * - Format: email
   */
  email?: string;
}

export interface PostSettingsVerifyChangeMailCodeReqBody {
  code?: string;
}

export interface PostTicketsCreateReqBody {
  "attachments[]"?: string[];
  message?: string;
  tag?: string[];
  title?: string;
}

export interface PostTicketsReplyReqBody {
  message: string;
  ticketNumber: string;
  "attachments[]"?: string[];
}

export interface PostUserDataGenerateRefCodeReqBody {
  subset_share?: string;
}

export interface PostUserDataGenerateRefCodeResponse {
  result?: {
    code?: string;
    income?: string;
    referrerShare?: string;
    subsetCount?: string;
    subsetShare?: string;
  };
  status?: string;
}

export interface PostUserDataSetLanguageReqBody {
  language?: string;
}

export interface PostUserDataTransferBalanceReqBody {
  amount?: string;
  currency?: "irt" | "try" | "usd" | "eur" | "gbp";
  fromWallet?: "main" | "margin";
  toWallet?: "main" | "margin";
}

/**
 *
 * Root Schema
 *
 */

export interface PostWithdraw {
  /**
   *
   * A Schema
   *
   */
  result: {
    /**
     *
     * The address Schema
     *
     */
    address: string;
    /**
     *
     * The amount Schema
     *
     */
    amount: string;
    /**
     *
     * The asset Schema
     *
     */
    asset: string;
    /**
     *
     * The equivalent Schema
     *
     */
    equivalent: string;
    /**
     *
     * The network Schema
     *
     */
    network: string;
    /**
     *
     * The payment_currency Schema
     *
     */
    payment_currency: string;
    /**
     *
     * The rate Schema
     *
     */
    rate: string;
    /**
     *
     * The withdraw_id Schema
     *
     */
    deposit_id?: string;
  };
  /**
   *
   * The status Schema
   *
   */
  status: string;
}

export interface PostWithdrawRate {
  result?: {
    amount?: string;
    asset?: string;
    equivalent?: string;
    network?: string;
    payment_currency?: string;
    rate?: string;
  };
  status?: string;
}

export interface PostWithdrawRateReqBody {
  amount?: string;
  asset?: string;
  network?: string;
  payment_currency?: string;
}

export interface PostWithdrawReqBody {
  address?: string;
  amount?: string;
  asset?: string;
  network?: string;
  payment_currency?: string;
}

/**
 *
 * quote
 */

export type Quote = string;

export interface RegisterVerifyResponse {
  result?: {
    /**
     *
     * - Format: uuid
     */
    user_uuid?: string;
  };
  status?: string;
}

/**
 *
 * time resolution 1d returns 24 results others return 28 results
 */

export type ResolutionChartsRF = "1d" | "1w" | "2w" | "1m";

/**
 *
 * chart timeframe
 */

export type ResolutionRF = "1" | "5" | "15" | "60" | "240" | "1d";

/**
 *
 * if exist response will limited to slected side
 */

export type Side = "long" | "short" | "all";

export type Status =
  | "pending"
  | "completed"
  | "processing"
  | "rejected"
  | "cancelled";

/**
 *
 * if exist response will limited to slected status
 */

export type StatusOrder = "pending" | "completed" | "canceled";

/**
 *
 * if exist response will limited to slected status
 */

export type StatusPosition = "open" | "closed";

export interface Success {
  result: string;
  status: string;
}

/**
 *
 * if exist response will limited to slected symbol
 */

export type SymbolOrders = string;

export type SymbolRF = string;

/**
 *
 * ticket_number
 */

export type TicketNumberRF = string;

/**
 *
 * Priority
 */

export type TicketPriorityRF = "low" | "normal" | "high";

/**
 *
 * status
 */

export type TicketStatusRF = "new" | "open" | "closed";

/**
 *
 * from time (ms)
 */

export type TimeFrom = string;

/**
 *
 * from timestamp
 */

export type TimeFromRF = string;

/**
 *
 * to time (ms)
 */

export type TimeTo = string;

/**
 *
 * to timestamp
 */

export type TimeToRF = string;

export type Tx = string;

/**
 *
 * if exist response will limited to slected type
 */

export type Type = "entry" | "sl" | "tp";
