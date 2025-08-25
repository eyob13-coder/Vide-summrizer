import { Link, useNavigate } from "react-router-dom";

const SignInModal = ({ close }) => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    // TODO: Integrate Google OAuth
    alert("Google Sign-In Coming Soon!");
    close();
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 text-center">
        <h2 className="text-xl font-bold mb-2">Sign in to continue</h2>
        <p className="text-gray-600 mb-4">
          Create a free account to upload unlimited videos and save your highlights.
        </p>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition mb-3"
        >
          Sign in with Google
        </button>

        <Link
          to="/signup"
          className="w-full block bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Sign up with Email
        </Link>

        <button onClick={close} className="mt-4 text-gray-500 hover:underline">
          Maybe Later
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
