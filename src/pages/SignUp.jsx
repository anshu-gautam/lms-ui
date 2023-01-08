import React, { useState } from "react";
import Axios from "axios";
import toast from "react-hot-toast";
import TextInput from "../components/shared/TextInput";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await Axios.post("http://localhost:3000/users", formData);
      toast.success("Signed up successfully!");
      navigate("/signin");
    } catch (err) {
      err.response.data.errors.map((err) => toast.error(err));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserRole = (e) => {
    setFormData({
      ...formData,
      userRole: e.target.checked ? "company" : "customer",
    });
  };

  return (
    <main className="w-full h-screen flex justify-center items-center">
      <section className="flex flex-col border shadow p-4 md:p-10 w-4/5 md:w-2/5">
        <h2 className="text-3xl mb-8 uppercase font-bold underline">Sign up</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData?.email}
            onChange={handleChange}
          />
          <TextInput
            label="Name"
            name="name"
            placeholder="John Doe"
            value={formData?.name}
            onChange={handleChange}
          />
          <TextInput
            label="Phone number"
            name="phone"
            type="text"
            placeholder="+91-1234567890"
            value={formData?.phone}
            onChange={handleChange}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            value={formData?.password}
            onChange={handleChange}
          />
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-base font-medium">
                Are you signing up as a company?
              </span>
              <input
                type="checkbox"
                checked={formData?.userRole}
                className="checkbox"
                name="userRole"
                onChange={handleUserRole}
              />
            </label>
          </div>
          <button
            type="submit"
            className={`btn btn-primary btn-block ${
              loading && "loading btn-disabled "
            }`}
          >
            Submit
          </button>
          <Link to="/signin" className="text-blue-700 mt-4">
            Already have an account? Sign in here.
          </Link>
        </form>
      </section>
    </main>
  );
}
export default SignUp;
