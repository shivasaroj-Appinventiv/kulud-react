import { Link } from "react-router-dom";

const WildCardRoute = () => {
  return (
    <div className="flex justify-center items-center flex-col bg-gray-100 h-screen">
        <div>

      <h1 className="text-2xl mb-5">Page Not Found</h1>
      <Link className="" to="/login">Home</Link>
        </div>
    </div>
  );
};

export default WildCardRoute;
