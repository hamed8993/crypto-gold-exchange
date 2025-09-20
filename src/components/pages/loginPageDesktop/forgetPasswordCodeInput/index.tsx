import PinInputDefault from "@/shared/atoms/pinInputDefault";
import TopRightSection from "../components/topRightSection";
import { useLoginContext } from "../provider";
import ButtonsRow from "./components/buttonsRow";
import TitleBox from "./components/titleBox";

function ForgetPasswordCodeInput() {
  const { setValue } = useLoginContext();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-between">
      <TopRightSection />
      <div className="flex h-full w-[380px]! min-w-[380px]! flex-col items-center justify-start pt-12">
        <TitleBox />
        <PinInputDefault
          onChange={(value) => {
            setValue("forgetPasswordCode", value || "");
          }}
          length={4}
        />
        <ButtonsRow />
      </div>
    </div>
  );
}

export default ForgetPasswordCodeInput;
