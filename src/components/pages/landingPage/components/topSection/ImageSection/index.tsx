import Image from "next/image";

const ImageSection = () => {
  return (
    <div className="absolute top-64 w-full max-w-[1200px]">
      <div>
        <Image
          alt="Abstract mountain image"
          className="relative left-0 top-3 w-full scale-90 animate-fadeIn"
          height={663}
          src={"/assets/images/mountain.webp"}
          width={1350}
        />
      </div>
      <Image
        alt="Abstract charts image"
        className="absolute top-3 w-full max-w-[1200px] scale-90 animate-revealClip md:top-12 lg:top-20 xl:top-16"
        height={663}
        src={"/assets/images/charts.webp"}
        width={1350}
      />
    </div>
  );
};

export default ImageSection;
