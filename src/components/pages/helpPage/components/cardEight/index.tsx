import CustomCard from "@/components/atoms/customCard";

function CardEight() {
  return (
    <CustomCard>
      <p className="text-mainText mt-4 text-justify text-base leading-7">
        ۸. اهرم (Leverage)
      </p>
      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        اهرم ابزاری برای چند برابر کردن قدرت خرید کاربران است. در پلتفرم ما،
        مقادیر مشخصی از اهرم در دسترس کاربران قرار دارد:
      </p>
      <ul>
        <li>
          <p className="text-mainText mt-4 text-justify text-sm leading-7">
            • در تمامی بازارها: اهرم‌های ۱۰، ۱۵ و ۲۰ برابر قابل انتخاب هستند.
          </p>
        </li>
        <li>
          <p className="text-mainText mt-4 text-justify text-sm leading-7">
            • در بازار نقره: فقط اهرم‌های ۳ و ۵ برابر فعال است.
          </p>
        </li>
      </ul>
      <p className="text-mainText mt-4 text-justify text-sm leading-7">مثال:</p>
      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        با انتخاب اهرم ۲۰ و واریز یک میلیون تومان، قدرت معاملاتی شما ۲۰ میلیون
        تومان خواهد بود.
      </p>
    </CustomCard>
  );
}

export default CardEight;
