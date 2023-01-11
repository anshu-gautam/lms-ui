import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";
import { axios } from "../../utils";

const STATUS_BG_MAPPER = {
  requested: "bg-blue-100",
  accepted: "bg-purple-100",
  rejected: "bg-red-100",
  inProcess: "bg-green-100",
  delivered: "bg-gray-100",
};

function OrderStats({ stats = {} }) {
  if (!Object.keys(stats).length) {
    return (
      <div className="bg-white py-5 my-5">
        <div className="px-4">
          Order statistics will be avialable once you create any order
        </div>
      </div>
    );
  }
  return (
    <>
      <h2 className="text-2xl font-medium mb-2">Order statistics</h2>

      <section className="flex space-x-4 mb-5">
        {Object.keys(stats).map((key) => (
          <div
            className={`${STATUS_BG_MAPPER[key]} shadow-lg px-4 py-2 w-full max-w-xs`}
            key={key}
          >
            <p className="uppercase font-mono tracking-wider text-xl">{key}</p>
            <p className="font-extrabold text-4xl">{stats[key]}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default OrderStats;
