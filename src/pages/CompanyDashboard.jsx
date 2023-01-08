import React, { useEffect, useState } from "react";

import { axios } from "../utils";
import { toast } from "react-hot-toast";
import { CustomModal } from "../components/shared/CustomModal";
import CreateCompany from "../components/company/CreateForm";
import OrderStats from "../components/orders/OrderStats";

function CompanyDashBoard() {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState();

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const response = await axios.get("/users/company");
      setCompany(response?.data);
    } catch (e) {
      const errorMsg = e.response?.data?.error || e?.message;
      toast.error(errorMsg);
    }
  };

  console.log({ company });

  return (
    <>
      {open && (
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
      <section className="flex flex-col px-10 py-5">
        {company ? (
          <>
            <h3 className="text-xl text-left font-bold mb-4">
              Welcome {company?.name}
            </h3>
            <section>
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
              <OrderStats />
            </section>
          </>
        ) : (
          <div className="flex justify-end">
            <button className="btn btn-sm" onClick={() => setOpen(true)}>
              Create company
            </button>
          </div>
        )}
      </section>
    </>
  );
}
export default CompanyDashBoard;
