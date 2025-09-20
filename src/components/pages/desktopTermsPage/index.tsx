import { DesktopPageLayout } from "@/components/organisms/desktopLayout";

interface DesktopTermsPageProps {
  className?: string;
}

export default function DesktopTermsPage({ className }: DesktopTermsPageProps) {
  return (
    <DesktopPageLayout className={className}>
      <div
        dir="rtl"
        className="*:font-farsi mt-4 mb-6 flex flex-1 flex-col px-6"
      >
        <p className="text-mainText text-justify text-xl leading-7">
          قوانین و مقررات استفاده از پلتفرم
        </p>
        <p className="text-mainText mt-4 text-justify text-base leading-7">
          ثبت‌نام و دسترسی به خدمات
        </p>

        <p className="text-mainText mt-1 px-2 text-justify text-sm leading-7">
          ثبت‌نام در پلتفرم و ایجاد حساب کاربری به‌منزله‌ی پذیرش کامل شرایط
          استفاده از خدمات است. کاربران موظف‌اند صرفاً با اطلاعات معتبر اقدام به
          ایجاد حساب کرده و از ایجاد چند حساب برای یک شخص حقیقی یا حقوقی خودداری
          کنند.
        </p>
        <p className="text-mainText mt-4 text-justify text-base leading-7">
          دارایی، کیف پول و تراکنش‌ها
        </p>

        <p className="text-mainText mt-1 px-2 text-justify text-sm leading-7">
          تمامی واریزها و برداشت‌ها از طریق رمزارزهای پشتیبانی‌شده در پلتفرم
          انجام می‌شود. مسئولیت انتخاب صحیح شبکه، نوع ارز، و واردکردن آدرس دقیق،
          کاملاً بر عهده کاربر است. برداشت‌ها پس از بررسی سیستمی و در بازه‌ای
          منطقی انجام می‌گیرند.
        </p>
        <p className="text-mainText mt-4 text-justify text-base leading-7">
          انجام معاملات
        </p>

        <p className="text-mainText mt-1 px-2 text-justify text-sm leading-7">
          کاربر با استفاده از امکانات معاملاتی پلتفرم، معاملات خود را به‌صورت
          مستقل و با مسئولیت کامل اجرا می‌کند. ساختار قیمت‌گذاری، اختلاف قیمت
          خرید و فروش، حجم مجاز، و شرایط معاملاتی بر اساس مشخصات هر بازار تعریف
          شده‌اند و ممکن است در بازارهای مختلف متفاوت باشند.
        </p>

        <p className="text-mainText mt-4 text-justify text-base leading-7">
          اهرم، کارمزد و حجم معاملات
        </p>
        <p className="text-mainText mt-1 px-2 text-justify text-sm leading-7">
          پلتفرم این امکان را فراهم می‌کند که کاربر با انتخاب اهرم، قدرت خرید
          خود را افزایش دهد. کارمزد معاملات و حدود مجاز حجم ورود برای هر بازار
          به‌صورت سیستمی مشخص شده‌اند و پیش از ثبت سفارش نمایش داده می‌شوند.
        </p>
        <p className="text-mainText mt-4 text-justify text-base leading-7">
          مسئولیت‌ها و ریسک معاملات
        </p>
        <p className="text-mainText mt-1 px-2 text-justify text-sm leading-7">
          تصمیم‌گیری و اجرای هرگونه معامله صرفاً توسط خود کاربر انجام می‌شود.
          پلتفرم هیچ‌گونه مشاوره یا پیشنهاد مالی ارائه نمی‌دهد و مسئولیتی در
          قبال سود یا زیان ناشی از نوسانات بازار یا انتخاب‌های کاربر ندارد.
        </p>
        <p className="text-mainText mt-4 text-justify text-base leading-7">
          امنیت حساب کاربری
        </p>
        <p className="text-mainText mt-1 px-2 text-justify text-sm leading-7">
          کاربر موظف به حفظ محرمانگی اطلاعات ورود خود است. در صورت بروز هرگونه
          دسترسی غیرمجاز ناشی از بی‌احتیاطی کاربر، مسئولیتی متوجه پلتفرم نخواهد
          بود.
        </p>

        <p className="text-mainText mt-4 text-justify text-base leading-7">
          پشتیبانی و ارتباط با کاربران
        </p>
        <p className="text-mainText mt-1 px-2 text-justify text-sm leading-7">
          پشتیبانی کاربران به‌صورت آنلاین از طریق سیستم تیکت یا چت
          درون‌برنامه‌ای انجام می‌شود. با توجه به ساختار غیرمتمرکز پلتفرم،
          ارائه‌ی شماره تماس یا دفتر فیزیکی در اولویت قرار نگرفته و این موضوع
          به‌هیچ‌وجه ارتباطی با کیفیت خدمات، امنیت یا پاسخ‌گویی نخواهد داشت.
          پاسخ‌گویی کامل، در بسترهای رسمی تعریف‌شده انجام می‌شود.
        </p>
        <p className="text-mainText mt-4 text-justify text-base leading-7">
          اصلاح و به‌روزرسانی قوانین
        </p>
        <p className="text-mainText mt-1 px-2 text-justify text-sm leading-7">
          پلتفرم این حق را برای خود محفوظ می‌دارد که در صورت لزوم قوانین را
          اصلاح یا به‌روزرسانی کند. نسخه جاری همواره در سایت قابل مشاهده بوده و
          ادامه استفاده از خدمات به‌معنای پذیرش تغییرات خواهد بود.
        </p>
        <p className="text-mainText mt-4 text-justify text-base leading-7">
          موارد خارج از مسئولیت
        </p>
        <p className="text-mainText mt-1 px-2 text-justify text-sm leading-7">
          پلتفرم هیچ‌گونه مسئولیتی در قبال ضررهای ناشی از قطعی اینترنت، اشتباهات
          کاربری، اختلالات مرتبط با شبکه بلاک‌چین، یا سوء برداشت از عملکرد بازار
          ندارد.
        </p>
      </div>
    </DesktopPageLayout>
  );
}
