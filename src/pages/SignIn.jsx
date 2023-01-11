import React, { useState } from "react";
import Axios from "axios";
import toast from "react-hot-toast";
import TextInput from "../components/shared/TextInput";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post(
        "http://localhost:3000/users/login",
        formData
      );
      localStorage.setItem("user-data", JSON.stringify(response.data));
      toast.success("Signed in successfully.");
      navigate("/");

      // response.data?.user?.userRole === "company"

      //   ? navigate("/company/dashboard")
      //   : navigate("/user/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex justify-center items-center relative">
      <section className="flex flex-col shadow-lg p-10 w-2/5 z-10 backdrop-blur bg-white/40">
        <h2 className="text-3xl mb-8 uppercase font-bold underline">Sign In</h2>
        <form className="space-y-4" onSubmit={submitHandler}>
          <TextInput
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder="johdoe@example.com"
            onChange={handleChange}
          />
          <TextInput
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder="********"
            onChange={handleChange}
          />
          <button
            type="submit"
            className={`btn btn-primary btn-block ${
              loading && "loading btn-disabled "
            }`}
          >
            Submit
          </button>
        </form>
        <Link to="/signup" className="text-blue-700 mt-4">
          Don't have account? Sign up here
        </Link>
      </section>
    </main>
  );
}
export default SignIn;
