import { useState } from "react";
import loginback from '../../images/loginbg.jpg';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      if (res.ok) {
        if (data.isAdmin) {
          dispatch(signInSuccess(data));
          navigate("/mainDashboard");
        } else {
          dispatch(signInSuccess(data));
          navigate("/");
        }
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div 
    style={{
      backgroundImage: `url(${loginback})`, // Set the background image
      backgroundSize: "cover", // Cover the entire container
      backgroundPosition: "center", // Center the image
      backgroundRepeat: "no-repeat",
      height: "84.35vh"
    }}>
      <div className="flex items-center justify-center ">
        <div className=" bg-transparent w-1/4">
          <h1 className="text-3xl text-center font-semibold mt-32 mb-10">Sign In</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="email"
              className="border border-gray-700 p-3 rounded-3xl"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              className="border border-gray-700 p-3 rounded-3xl"
              id="password"
              onChange={handleChange}
            />

            <button
              disabled={loading}
              style={{
                marginTop: "15px",
                color: "white",
                padding: "0.75rem 2rem",
                borderRadius: "1.5rem",
                border: "none",
                cursor: "pointer",
                backgroundColor: "rgba(0, 128, 0, 0.8)", // Adjust the alpha value for transparency
              }}
              className={
                loading ? "opacity-80 cursor-not-allowed" : "hover:opacity-95"
              }
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
          <div className="flex gap-2 mt-5">
            <p>Don't have an account?</p>
            <Link to={"/sign-up"}>
              <span className="text-blue-700">Sign up</span>
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  );
}