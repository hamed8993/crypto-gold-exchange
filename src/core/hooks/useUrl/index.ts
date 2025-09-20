import { useParams, usePathname } from "next/navigation";

function useUrl() {
  const pathname = usePathname();
  const { locale } = useParams();

  const isActive = (path: string) => {
    return path === "/" ? pathname === `/${locale}` : pathname.includes(path);
  };

  return { isActive, locale, pathname };
}

export default useUrl;
