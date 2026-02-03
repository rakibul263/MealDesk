import { useContext, useState, useEffect, use } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user, loading, refreshUser, deleteUserAccount } = use(AuthContext);
  const [localUser, setLocalUser] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    if (user) setLocalUser(user);
  }, [user]);

  if (loading || !localUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  const handleEditProfile = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Profile",
      html: `
        <input type="text" id="swal-name" class="swal2-input" placeholder="Full Name" value="${localUser.displayName || ""}">
        <input type="text" id="swal-photo" class="swal2-input" placeholder="Photo URL" value="${localUser.photoURL || ""}">
      `,
      showCancelButton: true,
      confirmButtonColor: "#A3B18A",
      confirmButtonText: "Update",
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("swal-name").value;
        const photoURL = document.getElementById("swal-photo").value;
        if (!name || !photoURL)
          Swal.showValidationMessage("Please enter both name and photo URL");
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
          text: "Your profile has been updated successfully.",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: {
        confirmButton:
          "bg-gradient-to-r from-[#DCE1CB] to-[#A3B18A] text-white rounded-xl hover:scale-[1.02] transition-transform duration-300",
        cancelButton:
          "bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-300",
      },
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUserAccount(user);
          Navigate("/");
          Swal.fire({
            title: "Deleted!",
            text: "Your account has been deleted.",
            icon: "success",
            customClass: {
              popup: "rounded-3xl shadow-2xl",
            },
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Try again.",
            icon: "error",
            customClass: {
              popup: "rounded-3xl shadow-2xl",
            },
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl max-w-md w-full p-6 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-30"></div>

        <div className="flex justify-center">
          <img
            src={localUser.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mt-4 text-gray-800">
          {localUser.displayName}
        </h2>

        <p className="text-center text-gray-600 text-sm mt-1">
          {localUser.email}
        </p>

        <div className="flex justify-center mt-3">
          {localUser.emailVerified ? (
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
              ✔ Email Verified
            </span>
          ) : (
            <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
              ✖ Email Not Verified
            </span>
          )}
        </div>

        <div className="border-t my-5"></div>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">User ID</span>
            <span className="text-gray-500 truncate max-w-[180px]">
              {localUser.uid}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Account Created</span>
            <span className="text-gray-500">
              {new Date(localUser.metadata.creationTime).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Last Login</span>
            <span className="text-gray-500">
              {new Date(localUser.metadata.lastSignInTime).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            className="mt-6 w-full py-2 rounded-xl bg-gradient-to-r from-[#DCE1CB] to-[#A3B18A] text-gray-800 font-semibold hover:scale-[1.02] transition-transform duration-300"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          <button
            className="mt-6 w-full py-2 rounded-xl bg-gradient-to-r from-[#A3B18A] to-[#DCE1CB]  text-gray-800 font-semibold hover:scale-[1.02] transition-transform duration-300"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
