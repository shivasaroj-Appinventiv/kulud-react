import { Eye, EyeOff } from "lucide-react";
import useLoginHelper from "./login.helper";

const Login = () => {
  const { formik, handleForgotPassword, showPassword, setShowPassword } =
    useLoginHelper();

  return (
    <>
      <div className="">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Login to account
        </h2>
        <p className="text-gray-600 mb-8">
          Enter your credentials to access your account
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address*
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div >
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password*
            </label>

            {/* 👇 Relative only for input box */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* 👇 Error OUTSIDE relative container */}
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>
          <button
            disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Login
          </button>
          <div className="mt-4 flex text-center justify-center w-full">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="cursor-pointer text-blue-500"
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
