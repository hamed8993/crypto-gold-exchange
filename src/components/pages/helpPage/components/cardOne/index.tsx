import CustomCard from "@/components/atoms/customCard";

function CardOne() {
  return (
    <CustomCard>
      <p className="text-mainText mt-4 text-justify text-base leading-7">
        ۱. محاسبه سود و زیان
      </p>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        در پلتفرم ما، سود و زیان کاربران بر اساس آخرین قیمت معامله‌شده در بازار
        محاسبه می‌شود. به‌عبارت ساده‌تر، هرگاه شما وارد یک معامله خرید یا فروش
        شوید، تغییرات بعدی قیمت بازار نسبت به قیمت ورود شما، میزان سود یا
        زیان‌تان را تعیین می‌کند.
      </p>
      <p className="text-mainText mt-4 text-justify text-sm leading-7">مثال:</p>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        فرض کنید وارد معامله خرید در بازار طلا آبشده با قیمت ۳٬۰۰۰٬۰۰۰ تومان
        می‌شوید. اگر قیمت بازار پس از دقایقی به ۳٬۰۳۰٬۰۰۰ تومان برسد، شما در سود
        هستید. و اگر به ۲٬۹۸۰٬۰۰۰ تومان برسد، در ضرر خواهید بود.
      </p>
    </CustomCard>
  );
}

export default CardOne;
