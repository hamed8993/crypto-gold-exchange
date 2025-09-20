import CustomCard from "@/components/atoms/customCard";

function CardTwo() {
  return (
    <CustomCard>
      <p className="text-mainText mt-4 text-justify text-base leading-7">
        ۲. گام قیمتی (Price Step)
      </p>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        گام قیمتی به معنای کوچک‌ترین تغییر مجاز در قیمت‌ها است که بر اساس آن سود
        و زیان محاسبه می‌شود.
      </p>
      <ul>
        <li>
          <p className="text-mainText mt-4 text-justify text-sm leading-7">
            • در بازارهای ریالی، هر استپ برابر با ۱٬۰۰۰ تومان است.
          </p>
        </li>
        <li>
          <p className="text-mainText mt-4 text-justify text-sm leading-7">
            • در بازارهای دلاری (مثل انس جهانی)، هر استپ برابر با ۰٫۵ دلار است.
          </p>
        </li>
        <li>
          <p className="text-mainText mt-4 text-justify text-sm leading-7">
            • در بازار نقره دلاری، استپ دقیق‌تر شده و برابر با ۰٫۰۱ دلار است.
          </p>
        </li>
      </ul>
      <p className="text-mainText mt-4 text-justify text-sm leading-7">مثال:</p>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        اگر قیمت انس طلا از ۲۰۱۰ دلار به ۲۰۱۳ دلار برسد، این تغییر معادل ۶ استپ
        (۳ ÷ ۰.۵) خواهد بود.
      </p>
    </CustomCard>
  );
}

export default CardTwo;
