import LoadingView from "@/components/atoms/loadingView";

interface LoadingProps {
  isClosePending: boolean;
}

function Loading({ isClosePending }: LoadingProps) {
  return (
    <>
      {isClosePending ? (
        <div
          style={{ flex: 1, position: "absolute", width: "100%" }}
          className="bg-mainBackground absolute flex h-full items-center justify-center opacity-50"
        >
          <LoadingView />
        </div>
      ) : null}
    </>
  );
}

export default Loading;
