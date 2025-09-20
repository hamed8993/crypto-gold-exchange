import CustomCard from "@/components/atoms/customCard";

function CardThree() {
  return (
    <CustomCard>
      <p className="text-mainText mt-4 text-justify text-base leading-7">
        ۳. اسپرد چیست و چگونه روی سود و ضرر تأثیر می‌گذارد؟
      </p>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        اسپرد (Spread) به تفاوت بین قیمت خرید (Buy) و قیمت فروش (Sell) در هر
        لحظه از بازار گفته می‌شود. این تفاوت مانند هزینه‌ای پنهان برای ورود به
        معامله است.
      </p>
      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        مثال واقعی:
      </p>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        فرض کنید قیمت فروش در بازار طلا آبشده ۳٬۰۰۰٬۰۰۰ تومان و قیمت خرید
        ۳٬۰۰۵٬۰۰۰ تومان است. اگر شما همین حالا یک موقعیت خرید باز کنید، معامله
        شما در همان لحظه با قیمت خرید ثبت می‌شود (۳٬۰۰۵٬۰۰۰ تومان)، اما اگر
        بلافاصله بخواهید آن را ببندید، با قیمت فروش بسته می‌شود (۳٬۰۰۰٬۰۰۰
        تومان).
      </p>
      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        🔻 بنابراین حتی بدون اینکه قیمت بازار تغییری کند، شما در لحظه ورود، در
        ۵٬۰۰۰ تومان ضرر هستید، که دلیل آن فقط اسپرد است.
      </p>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        ✅ این ضرر اولیه طبیعی است و با حرکت بازار به نفع شما جبران می‌شود.
      </p>
    </CustomCard>
  );
}
export default CardThree;
