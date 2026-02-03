import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import {
  IoCameraOutline,
  IoMailOutline,
  IoCalendarOutline,
  IoShieldCheckmarkOutline,
  IoTrashOutline,
  IoCreateOutline,
  IoRestaurantOutline,
} from "react-icons/io5";

const Profile = () => {
  const { user, loading, refreshUser, deleteUserAccount } =
    useContext(AuthContext);
  const [localUser, setLocalUser] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    if (user) setLocalUser(user);
  }, [user]);

  if (loading || !localUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFBF0]">
        <span className="loading loading-spinner loading-lg text-[#E67E22]"></span>
      </div>
    );
  }

  const handleEditProfile = async () => {
    const { value: formValues } = await Swal.fire({
      title: "<span style='color:#5D4037'>Update Profile</span>",
      html: `
        <div style="display:flex; flex-direction:column; gap:10px;">
          <input type="text" id="swal-name" class="swal2-input" style="margin:0; border-radius:12px;" placeholder="Full Name" value="${localUser.displayName || ""}">
          <input type="text" id="swal-photo" class="swal2-input" style="margin:0; border-radius:12px;" placeholder="Photo URL" value="${localUser.photoURL || ""}">
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: "#E67E22",
      cancelButtonColor: "#5D4037",
      confirmButtonText: "Save Changes",
      customClass: { popup: "rounded-[2rem]" },
      preConfirm: () => {
        const name = document.getElementById("swal-name").value;
        const photoURL = document.getElementById("swal-photo").value;
        if (!name || !photoURL)
          Swal.showValidationMessage("Both fields are required");
        return { name, photoURL };
      },
    });

    if (formValues) {
      try {
        await updateProfile(user, {
          displayName: formValues.name,
          photoURL: formValues.photoURL,
        });
        setLocalUser({ ...localUser, ...formValues });
        if (refreshUser) refreshUser();
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          confirmButtonColor: "#E67E22",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Update failed",
          confirmButtonColor: "#E67E22",
        });
      }
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Delete Account?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#5D4037",
      confirmButtonText: "Yes, Delete",
      customClass: { popup: "rounded-[2rem]" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUserAccount(user);
          Navigate("/");
          Swal.fire({
            title: "Deleted!",
            icon: "success",
            confirmButtonColor: "#E67E22",
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Something went wrong",
            icon: "error",
            confirmButtonColor: "#E67E22",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center px-1 py-24 lg:py-32">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(93,64,55,0.15)] border border-orange-50 mt-10">
        {/* Banner with Logo */}
        <div className="h-48 bg-[#5D4037] relative flex flex-col items-center justify-center rounded-t-[3rem] overflow-visible">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden rounded-t-[3rem]">
            <div className="grid grid-cols-6 gap-4 transform -rotate-12 scale-150">
              {[...Array(24)].map((_, i) => (
                <IoRestaurantOutline key={i} size={40} className="text-white" />
              ))}
            </div>
          </div>

          <div className="z-10 flex flex-col items-center -mt-10">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-2">
              <IoRestaurantOutline className="text-[#E67E22]" size={32} />
            </div>
            <h1 className="text-white font-black tracking-tighter text-xl">
              MEAL<span className="text-[#E67E22]">DESK</span>
            </h1>
          </div>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-20">
            <div className="relative">
              <div className="absolute inset-0  rounded-full blur-md opacity-20"></div>
              <div className="w-32 h-32 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white">
                <img
                  src={localUser.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={handleEditProfile}
                className="absolute bottom-1 right-1 bg-[#E67E22] p-2.5 rounded-full text-white shadow-lg hover:scale-110 transition-all border-2 border-white z-30"
              >
                <IoCameraOutline size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-20 pb-10 px-10 text-center">
          <div className="mb-6">
            <h2 className="text-3xl font-black text-[#5D4037] mb-1">
              {localUser.displayName}
            </h2>
            <p className="text-gray-400 flex items-center justify-center gap-1.5 text-sm font-medium">
              <IoMailOutline className="text-[#E67E22]" /> {localUser.email}
            </p>
          </div>

          <div className="mb-8">
            {localUser.emailVerified ? (
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest border border-green-100 shadow-sm">
                <IoShieldCheckmarkOutline size={14} /> Verified Member
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest border border-red-100 shadow-sm">
                Unverified Account
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-left mb-10">
            <div className="p-4 bg-orange-50/40 rounded-[1.5rem] border border-orange-100/50">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1 flex items-center gap-1">
                <IoCalendarOutline className="text-[#E67E22]" /> Joined
              </p>
              <p className="text-xs font-bold text-[#5D4037]">
                {new Date(localUser.metadata.creationTime).toLocaleDateString(
                  "en-GB",
                  { day: "numeric", month: "short", year: "numeric" },
                )}
              </p>
            </div>
            <div className="p-4 bg-orange-50/40 rounded-[1.5rem] border border-orange-100/50">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1 flex items-center gap-1">
                <IoShieldCheckmarkOutline className="text-[#E67E22]" /> Status
              </p>
              <p className="text-xs font-bold text-[#5D4037]">Active User</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleEditProfile}
              className="flex-[2] flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#5D4037] text-white font-black text-xs hover:bg-[#E67E22] transition-all shadow-xl shadow-brown-100 active:scale-95 tracking-widest"
            >
              <IoCreateOutline size={18} /> EDIT PROFILE
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center py-4 rounded-2xl bg-white text-red-500 border-2 border-red-50 font-black text-sm hover:bg-red-50 transition-all active:scale-95"
            >
              <IoTrashOutline size={18} />
            </button>
          </div>

          <p className="mt-8 text-[9px] text-gray-300 font-bold uppercase tracking-[0.2em]">
            User ID: {localUser.uid.slice(0, 16)}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
