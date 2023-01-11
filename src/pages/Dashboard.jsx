import React, { useEffect, useState } from "react";

import { axios, userData } from "../utils";
import { toast } from "react-hot-toast";
import { CustomModal } from "../components/shared/CustomModal";
import CreateCompany from "../components/company/CreateForm";
import OrderStats from "../components/orders/OrderStats";
import { OrdersList } from "../components/orders/OrdersList";

function DashBoard() {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const isCompany = userData()?.user?.userRole === "company";

  useEffect(() => {
    isCompany && fetchCompany();
    fetchOrders();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("/orders/statistics");
      setStats(response?.data?.statistics);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchCompany = async () => {
    try {
      const response = await axios.get("/users/company");
      setCompany(response?.data);
    } catch (e) {
      const errorMsg = e.response?.data?.error || e?.message;
      toast.error(errorMsg);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders");
      setOrders(response?.data?.orders);
    } catch (e) {
      const errorMsg = e.response?.data?.error || e?.message;
      toast.error(errorMsg);
    }
  };

  const refetchOnUpdate = () => {
    fetchOrders();
    fetchStats();
  };

  return (
    <>
      {open && isCompany && (
        <CustomModal
          isOpen={open}
          closeModal={() => setOpen(false)}
          title="Create company"
        >
          <CreateCompany
            closeModal={() => setOpen(false)}
            fetchCompany={fetchCompany}
          />
        </CustomModal>
      )}
      {open && !isCompany && (
        <CustomModal
          isOpen={open}
          closeModal={() => setOpen(false)}
          title="Create order"
        >
          <CreateOrder
            closeModal={() => setOpen(false)}
            fetchOrders={fetchOrders}
          />
        </CustomModal>
      )}
      <section className="flex flex-col px-10 py-5">
        {isCompany && company && (
          <section>
            <h3 className="text-xl text-left font-bold mb-4">
              Welcome {company?.name}
            </h3>
            <h2 className="font-semibold text-xl mb-2">Rate sheet</h2>
            <section className="flex space-x-4 mb-5">
              {Object.keys(company.rate).map((key) => (
                <div
                  className="bg-white shadow-lg px-4 py-2 w-full max-w-xs"
                  key={key}
                >
                  <p className="uppercase font-mono tracking-wider text-xl">
                    {key}
                  </p>
                  <p className="font-extrabold text-4xl">
                    {company.rate[key]}₹
                  </p>
                </div>
              ))}
            </section>
          </section>
        )}
        <div className="flex justify-end">
          <button className="btn btn-sm" onClick={() => setOpen(true)}>
            {isCompany ? "Create company" : "Create order"}
          </button>
        </div>
        <OrderStats stats={stats} />
        <OrdersList orders={orders} refetch={refetchOnUpdate} />
      </section>
    </>
  );
}
export default DashBoard;
