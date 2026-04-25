
interface Props {
  isMobile: boolean
}
const NavUserDataSkeleton = ({ isMobile }: Props) => {
  return (
    <>
      <div className={`flex items-center gap-4 ${isMobile ? "" : "border-l border-[#C3C6D64D] pl-4"}`}> 
        {/* User info skeleton */}
        {!isMobile && (
        <div className="flex flex-col items-end gap-1.5">
          <div className="h-4 w-28 rounded bg-slate-200 animate-pulse" />
          <div className="h-2.5 w-20 rounded bg-primary/20 animate-pulse" />
        </div>
        )}
        {/* Avatar skeleton */}
        <div className={`h-10 w-10 rounded-lg bg-primary/20 animate-pulse ${isMobile ? "w-6.5 h-6.5" : ""}`} />
      </div>
    </>
  )
}

export default NavUserDataSkeleton
