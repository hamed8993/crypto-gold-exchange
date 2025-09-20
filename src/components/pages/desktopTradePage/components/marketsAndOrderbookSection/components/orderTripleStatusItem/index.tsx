export enum orderStatusEnum {
  sell = "short",
  buy = "long",
  all = "all",
}

interface OrderTripleStatusItemProps {
  status: orderStatusEnum;
  selectedStatus?: orderStatusEnum;
  handleCick: (arg: orderStatusEnum) => void;
}
function OrderTripleStatusItem({
  status,
  selectedStatus,
  handleCick,
}: OrderTripleStatusItemProps) {
  return (
    <button
      type="button"
      onClick={() => handleCick(status)}
      className={`flex size-8 items-center justify-center rounded-sm px-[10px] py-[11px] ${selectedStatus === status ? "bg-bgMuted" : "transparent"}`}
    >
      <div className="flex h-[10px] w-3 flex-col gap-[2px] bg-transparent">
        <span
          className={`h-[2px] w-[12px] rounded-[2px] ${status === orderStatusEnum.sell || status === orderStatusEnum.all ? "bg-iconError" : "bg-iconDisabled"}`}
        />
        <span className={`bg-iconDisabled h-[2px] w-[12px] rounded-[2px]`} />
        <span
          className={`bg-iconDisabled h-[2px] w-[12px] rounded-[2px] ${status === orderStatusEnum.buy || status === orderStatusEnum.all ? "bg-iconSuccess" : "bg-iconDisabled"}`}
        />
      </div>
    </button>
  );
}

export default OrderTripleStatusItem;
