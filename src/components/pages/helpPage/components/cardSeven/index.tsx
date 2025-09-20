import CustomCard from "@/components/atoms/customCard";

function CardSeven() {
  return (
    <CustomCard>
      <p className="text-mainText mt-4 text-justify text-base leading-7">
        ۷. کارمزد معاملات
      </p>
      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        در پلتفرم ما، کارمزد معاملات به‌صورت ثابت و شفاف تعیین شده است:
      </p>
      <ul>
        <li>
          <p className="text-mainText mt-4 text-justify text-sm leading-7">
            • در تمامی بازارها از جمله نقره، کارمزد هر معامله معادل ۲۰٬۰۰۰ تومان
            است.
          </p>
        </li>
      </ul>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        💡 اگر در بازار نقره ۱۵ واحد معامله کنید، باز هم صرفاً همان ۲۰٬۰۰۰ تومان
        کارمزد از شما کسر خواهد شد.
      </p>
    </CustomCard>
  );
}

export default CardSeven;
