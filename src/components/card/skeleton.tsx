export const Skeleton = () => {
  return (
    <div className="grid w-full max-w-lg animate-pulse gap-4 shadow-lg">
      <div role="status" className="h-72  rounded bg-gray-200  md:p-6" />
      <div className="flex items-center justify-between p-4">
        <div className="mb-4 h-4 w-48 rounded-full bg-gray-200" />
        <div className="mb-4 h-8 w-4 rounded-full bg-gray-200" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  )
}
