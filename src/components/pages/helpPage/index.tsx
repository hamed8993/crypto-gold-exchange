import PwaPageLayout from "@/components/organisms/layout";
import { useTranslations } from "next-intl";
import CardEight from "./components/cardEight";
import CardFive from "./components/cardFive";
import CardFour from "./components/cardFour";
import CardNine from "./components/cardNine";
import CardOne from "./components/cardOne";
import CardSeven from "./components/cardSeven";
import CardSix from "./components/cardSix";
import CardThree from "./components/cardThree";
import CardTwo from "./components/cardTwo";

function HelpPage() {
  const t = useTranslations();

  return (
    <PwaPageLayout title={t("help")} hasBackChevron>
      <div dir="rtl" className="*:font-farsi flex flex-1 flex-col px-3">
        <p className="text-mainText mx-2 mt-4 text-justify text-base leading-7">
          راهنمای جامع معاملات در پلتفرم
        </p>
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
        <CardFive />
        <CardSix />
        <CardSeven />
        <CardEight />
        <CardNine />
      </div>
    </PwaPageLayout>
  );
}

export default HelpPage;
