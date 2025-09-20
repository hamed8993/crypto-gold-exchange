import { RoutesName } from "@/core/constants/routes";
import { redirect } from "next/navigation";
// import { getExchange_dataMarkets } from "@/core/services/services";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  // TODO check
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Promise<any>;
}>) {
  const { locale, market } = await params;

  const marketArray = market.split("-");
  if (marketArray.length !== 2) {
    return redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/${RoutesName.trade}/xauabt-irt`,
    );
  }

  // const [base, quote] = marketArray;

  // const { result } = await getExchange_dataMarkets();

  // const isMarketAvailable = result?.filter(
  //   (item) => item.base === base && item.quote === quote,
  // ).length;

  // if (!isMarketAvailable) {
  //   redirect(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/${RoutesName.trade}/xau-usd`,
  //   );
  // }

  return children;
}
