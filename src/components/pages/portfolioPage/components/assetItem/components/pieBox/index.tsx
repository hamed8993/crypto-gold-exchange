import CustomPieChart from "@/components/atoms/customPieChart";
import { pieDataProps } from "../..";
import PieDetails from "../pieDetails";

interface PieBoxProps {
  coin: string;
  pieData: Array<pieDataProps>;
}

function PieBox({ coin, pieData }: PieBoxProps) {
  return (
    <div className="flex w-full items-center justify-around py-3">
      <PieDetails coin={coin} pieData={pieData} />

      <CustomPieChart
        data={pieData}
        height={130}
        innerRadius={40}
        outerRadius={60}
        width={130}
      />
    </div>
  );
}

export default PieBox;
