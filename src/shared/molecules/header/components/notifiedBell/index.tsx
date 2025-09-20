import { GoBell } from "react-icons/go";

interface NotifiedBellProps {
  hasNotification?: boolean;
}

function NotifiedBell({ hasNotification = false }: NotifiedBellProps) {
  return (
    <div className="relative">
      <GoBell className="text-textPrimary size-6" />
      <span
        className={`right[-1px] bg-iconSuccess absolute top-0 size-2 rounded-full ${hasNotification ? "inline-block" : "hidden"}`}
      />
    </div>
  );
}

export default NotifiedBell;
