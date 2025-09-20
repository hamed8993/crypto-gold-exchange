import clsx from "clsx";
import FooterContent from "./components/footerContent";
import FooterCopyrightAndSocial from "./components/footerCopyrightAndSocial";
import FooterDownloads from "./components/footerDownloads";

interface FooterProps {
  containerClassName?: string;
}

function Footer({ containerClassName }: FooterProps) {
  return (
    <div className={clsx("flex w-full items-center", containerClassName)}>
      <span className="lg:bg-newColor_borderNeutral10 block h-px w-full max-w-6 bg-transparent" />
      <div className="border-newColor_borderNeutral10 bg-newColor_bgNeutral5 w-full min-w-[731px] rounded-xl border p-3 lg:w-full">
        <div className="border-newColor_borderNeutral10 bg-constantLight flex w-full flex-col rounded-lg border px-4 pt-12 pb-6">
          <FooterContent />
          <div className="flex w-full flex-col gap-8 lg:ltr:pr-48 lg:rtl:pl-12">
            <FooterDownloads />
            <FooterCopyrightAndSocial />
          </div>
        </div>
      </div>
      <span className="lg:bg-newColor_borderNeutral10 block h-px w-full max-w-6 bg-transparent" />
    </div>
  );
}

export default Footer;
