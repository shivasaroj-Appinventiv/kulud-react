import OTPInput from "react-otp-input";
import userVerifyOTPHelper from "./verify-otp.helper";

const VerifyOTP = () => {
  const {
    handleBackToLogin,
    handleSubmit,
    loading,
    setOtp,
    error,
    setError,
    otp,
  } = userVerifyOTPHelper();

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h1>
        <p className="text-gray-600 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP Input */}
        <div className="">
          <OTPInput
            value={otp}
            onChange={(value) => {
              setOtp(value);
              setError("");
            }}
            numInputs={6}
            shouldAutoFocus
            inputType="tel"
            renderSeparator={<span className="mx-1">-</span>}
            renderInput={(props) => (
              <input
                {...props}
                className="w-12 h-12 border rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  width: "50px",
                  height: "45px",
                  margin: "0 4px",
                  fontSize: "18px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  textAlign: "center",
                }}
              />
            )}
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={otp.length !== 6 || loading}
          className={`w-full bg-blue-600 cursor-pointer text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:bg-gray-500 disabled:cursor-not-allowed ${
            otp.length === 6
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="mt-4 w-full flex justify-center">
          <button
            type="button"
            onClick={handleBackToLogin}
            className="text-blue-500 hover:text-blue-700 cursor-pointer w-fit"
          >
            Back to Login
          </button>
        </div>

        {/* Resend */}
        {/* <p className="text-sm text-gray-500 mt-4">
          Didn’t receive OTP?{" "}
          <button
            type="button"
            className="text-blue-500 font-medium hover:underline"
            onClick={() => alert("Resend OTP")}
          >
            Resend
          </button>
        </p> */}
      </form>
    </div>
  );
};

export default VerifyOTP;
