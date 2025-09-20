import { useGetExchange_dataMarkets } from "@/core/services/hooks";


export const useGetMarketFee = () =>{
    const {data:marketList} = useGetExchange_dataMarkets()

    const getMarketFee= (symbol: string)=>{
        const feeItem = marketList?.result?.find(item => item?.symbol === symbol);
    return Number(feeItem?.fee) || 0
    }

    return getMarketFee
}
