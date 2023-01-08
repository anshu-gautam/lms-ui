/*
- fecth user's company
- if company is received, set in state variable and show it in a div
- else show a button to create company
*/

import React, { useEffect, useState } from "react";


import { axios } from "../utils";
import { toast } from "react-hot-toast";
import { CustomModal } from "../components/shared/CustomModal";
import CreateCompany from "../components/company/CreateForm";

function CompanyDashBoard() {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState();

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = async () => {
    try {
      const response = await axios.get("/users/company");
      setCompany(response?.data[0]);
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
          title="Create company"
        >
          <CreateCompany closeModal={() => setOpen(false)} />
        </CustomModal>
      )}
      <section className="flex flex-col px-10 py-5">
        {company ? (
          <h3 className="text-xl text-left">{company?.name}</h3>
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
