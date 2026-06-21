import Spinner from "@/shared/components/Spinner";

function Loading() {
  return (
    <div className="h-dvh flex items-center justify-center">
      <div>
        <Spinner />
        <p className="text-brand-mist-600">Hold on, we are almost there...</p>
      </div>
    </div>
  );
}

export default Loading;
