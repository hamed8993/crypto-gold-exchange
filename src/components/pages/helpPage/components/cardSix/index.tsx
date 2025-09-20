import CustomCard from "@/components/atoms/customCard";

function CardSix() {
  return (
    <CustomCard>
      <p className="text-mainText mt-4 text-justify text-base leading-7">
        ۶. حداقل حجم ورود به معامله
      </p>

      <ul>
        <li>
          <p className="text-mainText mt-4 text-justify text-sm leading-7">
            • در همه بازارها (به‌جز نقره): مجموع حجم مجاز برای ورود به معامله
            حداقل ۱۰ واحد در نظر گرفته شده است.
          </p>
        </li>
        <li>
          <p className="text-mainText mt-4 text-justify text-sm leading-7">
            • در بازار نقره (ریالی): حداقل حجم ورود ۱۰ واحد و حداکثر ۲۰ واحد
            تعیین شده است.
          </p>
        </li>
      </ul>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        🔸 این مقادیر به کاربران نمایش داده می‌شود و پیش از ثبت سفارش، در سیستم
        بررسی می‌گردد.
      </p>
    </CustomCard>
  );
}

export default CardSix;
