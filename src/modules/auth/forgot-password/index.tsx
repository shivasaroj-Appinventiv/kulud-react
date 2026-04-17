import useForgotPasswordHelper from "./forgot-password.helper";

const ForgotPassword = () => {
  const { handleSubmit, handleBackToLogin, error, setEmail, email } =
    useForgotPasswordHelper();

    
  return (
    <div className="">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Forgot Password
        </h2>
        <p className="text-gray-600 mb-8">
          Enter your email to reset your password
        </p>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2 "
        >
          Email*
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          onChange={(e) => {
            (e.preventDefault(), setEmail(e.target.value));
          }}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        />

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 cursor-pointer text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={!email}
        >
          Submit
        </button>

        <div className="mt-4 w-full flex justify-center">
          <button
            onClick={handleBackToLogin}
            className="text-blue-500 hover:text-blue-700 cursor-pointer w-fit"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
