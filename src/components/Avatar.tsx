interface AvatarProps {
  profilePicture?: string | null;
  fullName?: string | null;
  size?: "sm" | "md";
}
 
const VITE_IMAGE_PREFIX = import.meta.env.VITE_IMAGE_PREFIX;
 
const Avatar = ({ profilePicture, fullName, size = "md" }: AvatarProps) => {
  const dimension = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const fontSize = size === "sm" ? "text-xs" : "text-sm";
 
  // Get initials from fullName
  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";
 
  if (profilePicture) {
    return (
      <img
        src={VITE_IMAGE_PREFIX + profilePicture}
        alt={fullName || "User"}
        className={`${dimension} rounded-full object-cover flex-shrink-0 ring-2 ring-white`}
      />
    );
  }
 
  // Fallback — initials avatar
  return (
    <div
      className={`${dimension} ${fontSize} rounded-full bg-blue-600 flex items-center justify-center
                  flex-shrink-0 font-semibold text-white ring-2 ring-white`}
    >
      {initials}
    </div>
  );
};
 
export default Avatar;