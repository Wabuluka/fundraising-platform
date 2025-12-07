export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-base-200">
      <div>
        <span className="loading loading-ring loading-xl bg-red-600"></span>
      </div>
      <p className="text-base-content/70">App is loading ...</p>
    </div>
  );
}
