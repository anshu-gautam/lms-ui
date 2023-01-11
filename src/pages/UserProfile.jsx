import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { axios } from "../utils";

function Userprofile() {
  const [user, setUser] = useState();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get("/users/profile");
      setUser(response.data);
    } catch (error) {
      toast.error(console.message);
    }
  };

  return (
    <section className="py-20 px-16  flex flex-col  font-semibold">
      <img
        className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
        height={100}
        width={100}
        src="https://placeimg.com/192/192/people"
        alt=" Profile image"
      />
      <div className=" py-4">
        <p>Email: {user?.email}</p>
        <p>Name: {user?.name}</p>
        <p>Phone: {user?.phone}</p>
        <p> Role: {user?.userRole}</p>
      </div>
    </section>
  );
}
export default Userprofile;
