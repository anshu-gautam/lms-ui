import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { axios } from "../../utils";

import TextInput from "../shared/TextInput";

function CreateCompany({ closeModal }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [clothType, setClothType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (price.split(",").length !== clothType.split(",").length) {
      toast.error("Cloth types and prices are not in equal numbers");
      return;
    }

    const clothTypes = clothType.split(",");
    const prices = price.split(",");
    const rate = prices.map((p, idx) => ({
      clothType: clothTypes[idx],
      price: p,
    }));

    try {
      setLoading(true);
      await axios.post("/companies", { name, rate });
      toast.success("Company created successfully !");
      closeModal();
    } catch (err) {
      err.response.data.errors.map((err) => toast.error(err));
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleClothTypeChange = (e) => setClothType(e.target.value);

  return (
    <main className="w-full h-screen flex justify-center pt-10">
      <section className="flex w-full flex-col">
        <form className="space-y-3 w-full" onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Cloth type"
            name="clothType"
            placeholder="Topwear"
            value={clothType}
            onChange={handleClothTypeChange}
          />
          <TextInput
            label="Price"
            name="price"
            type="price"
            placeholder="₹ 99"
            value={price}
            onChange={handlePriceChange}
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
      </section>
    </main>
  );
}
export default CreateCompany;
