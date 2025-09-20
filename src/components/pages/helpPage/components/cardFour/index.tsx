import CustomCard from "@/components/atoms/customCard";

function CardFour() {
  return (
    <CustomCard>
      <p className="text-mainText mt-4 text-justify text-base leading-7">
        ۴. محدودیت حجم در معاملات
      </p>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        برای کنترل مدیریت ریسک و نقدشوندگی بازارها، محدودیت‌هایی برای حجم ورود
        به معاملات اعمال شده است:
      </p>
      <ul>
        <li>
          <p className="text-mainText mt-4 text-justify text-sm leading-7">
            • در تمامی بازارها (به‌جز نقره): حداقل ورود به معامله ۱ واحد و
            مجموعاً حداکثر ۱۰ واحد در هر سفارش مجاز است.
          </p>
        </li>
        <li>
          <p className="text-mainText mt-4 text-justify text-sm leading-7">
            • در بازار نقره (ریالی): حجم مجاز برای هر سفارش بین ۱۰ تا ۲۰ واحد
            تعیین شده است.
          </p>
        </li>
      </ul>
      <p className="text-mainText mt-4 text-justify text-sm leading-7">نکته:</p>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        در حال حاضر، سیستم حساب‌های VIP فعال نیست و همه کاربران تحت قوانین واحد
        فعالیت می‌کنند.
      </p>
    </CustomCard>
  );
}

export default CardFour;
