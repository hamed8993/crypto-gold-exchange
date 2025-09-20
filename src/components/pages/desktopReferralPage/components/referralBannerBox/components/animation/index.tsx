import Animation from "@/components/pages/desktopReferralPage/animation";

function AnimationSection() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <div className="mx-auto h-56 w-56 ltr:scale-x-[-1]">
        <Animation />
      </div>
    </div>
  );
}

export default AnimationSection;
