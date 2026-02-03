import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  console.log("From Profile", user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl max-w-md w-full p-6 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full opacity-30"></div>

        <div className="flex justify-center">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mt-4 text-gray-800">
          {user.displayName}
        </h2>

        <p className="text-center text-gray-600 text-sm mt-1">{user.email}</p>

        <div className="flex justify-center mt-3">
          {user.emailVerified ? (
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
              {user.uid}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Account Created</span>
            <span className="text-gray-500">
              {new Date(user.metadata.creationTime).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Last Login</span>
            <span className="text-gray-500">
              {new Date(user.metadata.lastSignInTime).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button className="mt-6 w-full py-2 rounded-xl bg-gradient-to-r from-[#DCE1CB] to-[#A3B18A] text-gray-800 font-semibold hover:scale-[1.02] transition-transform duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
