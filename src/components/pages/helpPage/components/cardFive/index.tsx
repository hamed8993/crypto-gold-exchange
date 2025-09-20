import CustomCard from "@/components/atoms/customCard";

function CardFive() {
  return (
    <CustomCard>
      <p className="text-mainText mt-4 text-justify text-base leading-7">
        ۵. حداقل مبلغ واریز
      </p>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        کاربران می‌توانند به میزان دلخواه واریز انجام دهند، اما برای اینکه امکان
        ورود به معامله فراهم شود، باید مبلغ واریزی به‌اندازه‌ای باشد که بتواند
        حداقل یک موقعیت معاملاتی را با درنظر گرفتن اهرم پوشش دهد.
      </p>
      <ul>
        <li>
          <p className="text-mainText mt-4 text-justify text-sm leading-7">
            🔸 حداقل توصیه‌شده برای واریز: ۱٬۰۰۰٬۰۰۰ تومان یا معادل دلاری آن
          </p>
        </li>
      </ul>
      <p className="text-mainText mt-4 text-justify text-sm leading-7">مثال:</p>

      <p className="text-mainText mt-4 text-justify text-sm leading-7">
        با اهرم ۱۰، واریز یک میلیون تومان به شما اجازه می‌دهد وارد معامله‌ای با
        ارزش ۱۰ میلیون تومان شوید.
      </p>
    </CustomCard>
  );
}

export default CardFive;
