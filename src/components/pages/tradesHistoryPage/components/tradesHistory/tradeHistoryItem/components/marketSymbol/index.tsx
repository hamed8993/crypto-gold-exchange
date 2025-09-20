import useUrl from "@/core/hooks/useUrl";

interface MarketSymbolProps {
  base: string;
  quote: string;
}

function MarketSymbol({ base, quote }: MarketSymbolProps) {
  const { locale } = useUrl();
  return (
    <>
      {locale === "fa" ? (
        <div className="flex min-h-6 items-center justify-start gap-1 pe-1">
          <p className="text-accentText text-xs leading-none" dir="ltr">
            {`${base.toUpperCase()}${quote.toUpperCase()}`}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default MarketSymbol;
