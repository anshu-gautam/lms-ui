import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { axios } from "../../utils";

import TextInput from "../shared/TextInput";

function CreateOrder({ closeModal, fetchOrders }) {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    pickUpDate: "",
    companyId: "",
  });

  const [item, setItem] = useState({});

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("/companies");
      setCompanies(response.data);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemsChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/orders", { ...formData, item });
      toast.success("Order has been placed!");
      fetchOrders();
      closeModal();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const selectedCompany = companies.find(
    (company) => company._id === formData.companyId
  );

  return (
    <main className="w-full flex justify-center">
      <section className="flex w-full flex-col">
        <form className="space-y-3 w-full" onSubmit={handleSubmit}>
          <TextInput
            name="address"
            label="Address"
            placeholder="Trident Academy"
            value={formData?.address}
            onChange={handleChange}
          />
          <TextInput
            name="pickUpDate"
            label="Pickup Date"
            placeholder="Today"
            type="date"
            value={formData?.pickUpDate}
            onChange={handleChange}
          />
          <div className="flex flex-col">
            <select
              className="select select-bordered w-full"
              name="companyId"
              onChange={handleChange}
            >
              <option disabled selected>
                Choose the company
              </option>
              {companies.map(({ name, _id }) => (
                <option
                  key={_id}
                  value={_id}
                  selected={formData.companyId === _id}
                >
                  {name}
                </option>
              ))}
            </select>
          </div>
          {!formData.companyId ? (
            <p>Please select a company to add items</p>
          ) : (
            Object.keys(selectedCompany?.rate).map((key) => (
              <TextInput
                key={key}
                name={key}
                label={key}
                type="number"
                onChange={handleItemsChange}
              />
            ))
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>
    </main>
  );
}

export { CreateOrder };

// address - text type
// pickup date - date type
// select company field
