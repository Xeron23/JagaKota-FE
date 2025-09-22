import { useAuth } from "@/context/Auth";
import UserProfile from "@/assets/icons/user.png"
import ButtonSubmit from "@/components/button";

export function Profile({ onClose }) {
  const { isChecking, user, logout } = useAuth();
  if (isChecking) return <Spinner />;

  return (   
    <div className="absolute bottom-full right-0 mb-2 w-64 rounded-lg shadow-lg bg-white p-4 z-50">

      <div className="flex gap-3 items-center">
        <img
          src={UserProfile}
          className="w-16 h-16 p-2 bg-[#EAD5AE] rounded-md"
        />
        <div className="flex flex-col flex-1 min-w-0">
          <p className="bg-[#F7EEDF] rounded-md px-2 py-1 text-sm truncate">
            {user.username}
          </p>
          <p className="bg-[#F7EEDF] rounded-md px-2 py-1 text-sm truncate">
            {user.email}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <ButtonSubmit
          onClick={async () => {
            await logout();
            if (onClose) onClose();
          }}
          style={"bg-[#FFA3A3] w-full py-2 rounded-md text-sm"}
        >
          Keluar Akun
        </ButtonSubmit>
      </div>
    </div>
  );
}