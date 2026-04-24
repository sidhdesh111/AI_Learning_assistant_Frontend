import { useEffect, useState } from "react";
import PageHeader from "../../Components/common/PageHeader";
import {
  Eye,
  EyeOff,
  LockIcon,
  LockKeyholeOpen,
  Mail,
  Smile,
  User,
  User2,
} from "lucide-react";
import toast from "react-hot-toast";
import { changePassword, getProfile } from "../../Services/authServices";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await getProfile();

        console.log(response);

        if (response.success && response.user) {
          const { name, username, email } = response.user;
          setName(name);
          setUsername(username);
          setEmail(email);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChangePassword = async () => {
    setPasswordLoading(true);
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      setPasswordLoading(false);
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.",
      );
      setPasswordLoading(false);

      return;
    }

    const passwordData = {
      currentPassword,
      newPassword,
    };

    try {
      const response = await changePassword(passwordData);

      if (response.success) {
        toast.success("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to change password",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div>
      <PageHeader title="Profile Settings" />
      <div className="space-y-8">
        {/* User Information Display  */}

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            User Information
          </h3>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-neutral-700 mb-1.5"
                htmlFor=""
              >
                Name
              </label>
              <div className="relative">
                <div className=" absolute inset-y-0.5 left-0 pl-3 flex items-center pointer-events-none">
                  <Smile className="h-4 w-4 text-slate-700" />
                </div>
                <p className="w-full h-9 pl-9 pr-3 pt-2 border border-neutral-200 rounded-md bg-neutral-50 text-sm text-neutral-800">
                  {name}
                </p>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-neutral-700 mb-1.5"
                htmlFor=""
              >
                Username
              </label>
              <div className="relative">
                <div className=" absolute inset-y-0.5 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-700" />
                </div>
                <p className="w-full h-9 pl-9 pr-3 pt-2 border border-neutral-200 rounded-md bg-neutral-50 text-sm text-neutral-800">
                  {username}
                </p>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-neutral-700 mb-1.5"
                htmlFor=""
              >
                Email Address
              </label>
              <div className="relative">
                <div className=" absolute inset-y-0.5 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-700" />
                </div>
                <p className="w-full h-9 pl-9 pr-3 pt-2 border border-neutral-200 rounded-md bg-neutral-50 text-sm text-neutral-800">
                  {email}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* change password  */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Change Password
          </h3>
          <div className="space-y-4">
            <form onSubmit={handleChangePassword}>
              <div className="mt-10">
                <label
                  className="capitalize block text-sm font-medium text-neutral-700 mb-1.5"
                  htmlFor="Current-pwd"
                >
                  current password
                </label>
                <div className="relative">
                  <div className=" absolute inset-y-0.5 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-4 w-4 text-slate-700 " />
                  </div>
                  <input
                    required
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                    id="Current-pwd"
                    type={showPassword.current ? "text" : "password"}
                    className="w-full h-9 pl-9 pr-3  border border-neutral-200 rounded-md bg-neutral-50 text-sm text-neutral-800 focus-within:outline-emerald-500"
                  />
                  <div
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        current: !showPassword.current,
                      }))
                    }
                    className=" absolute inset-y-0.5 flex items-center right-2"
                  >
                    {showPassword.current ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>
              <div className="my-4">
                <label
                  className="capitalize block text-sm font-medium text-neutral-700 mb-1.5"
                  htmlFor="new-pwd"
                >
                  new password
                </label>
                <div className="relative">
                  <div className=" absolute inset-y-0.5 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-4 w-4 text-slate-700" />
                  </div>
                  <input
                    required
                    id="new-pwd"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    type={showPassword.new ? "text" : "password"}
                    className="w-full h-9 pl-9 pr-3  border border-neutral-200 rounded-md bg-neutral-50 text-sm text-neutral-800 focus-within:outline-emerald-500"
                  />
                  <div
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        new: !showPassword.new,
                      }))
                    }
                    className=" absolute inset-y-0.5 flex items-center right-2"
                  >
                    {showPassword.new ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="capitalize block text-sm font-medium text-neutral-700 mb-1.5"
                  htmlFor="confirm-pwd"
                >
                  confirm new password
                </label>
                <div className="relative">
                  <div className=" absolute inset-y-0.5 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-4 w-4 text-slate-700" />
                  </div>
                  <input
                    required
                    id="confirm-pwd"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type={showPassword.confirm ? "text" : "password"}
                    className="w-full h-9 pl-9 pr-3  border border-neutral-200 rounded-md bg-neutral-50 text-sm text-neutral-800 focus-within:outline-emerald-500"
                  />
                  <div
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirm: !showPassword.confirm,
                      }))
                    }
                    className=" absolute inset-y-0.5 flex items-center right-2"
                  >
                    {showPassword.confirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-5 h-11 bg-linear-to-br from-emerald-400 to-teal-400 text-white hover:text-emerald-900 font-medium text-sm rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-emerald-500/25"
                >
                  <LockKeyholeOpen className="w-4 h-4" />
                  {passwordLoading ? "Changing..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
