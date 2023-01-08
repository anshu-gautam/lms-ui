import React, { useState, useEffect } from "react";

import { axios } from "../utils";
import { toast } from "react-hot-toast";
import { CustomModal } from "../components/shared/CustomModal";
import { List } from "../components/orders/List";
import { CreateOrder } from "../components/orders/CreateOrderForm";
import OrderStats from "../components/orders/OrderStats";

function UserDashboard() {
  const [open, setOpen] = useState(false);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/orders");
      setOrders(response?.data?.orders);
    } catch (e) {
      const errorMsg = e.response?.data?.error || e?.message;
      toast.error(errorMsg);
    }
  };

  return (
    <>
      {open && (
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
        <div className="flex justify-end">
          <button className="btn btn-sm" onClick={() => setOpen(true)}>
            Create order
          </button>
        </div>
        <OrderStats />
        <List orders={orders} />
      </section>
    </>
  );
}
export default UserDashboard;
