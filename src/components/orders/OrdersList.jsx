import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDown } from "react-feather";
import { toast } from "react-hot-toast";
import { axios, userData } from "../../utils";

const orderStatuses = [
  "requested",
  "accepted",
  "rejected",
  "inProcess",
  "delivered",
];

const OrdersList = ({ orders, refetch }) => {
  // (topwear: 2, woolen: 3)
  const userRole = userData().user.userRole;


  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`/orders/${id}/status`, { status });
      refetch();
      toast.success(`Order status changed to ${status}.`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="overflow-x-auto z-0">
      <h2 className="text-2xl font-medium mb-2">Your orders</h2>
      {orders?.length ? (
        <table className="table w-full -z-0">
          <thead>
            <tr>
              <th>Status</th>
              <th>Items</th>
              <th>Pickup date</th>
              <th>Address</th>
              {/* <th>Cost</th> */}
              {userRole === "company" && <th></th>}
            </tr>
          </thead>
          <tbody>
            {orders.map(
              ({ _id, status, address, pickUpDate, totalCost, item }) => (
                <tr key={_id}>
                  <td>
                    <span className="badge badge-primary badge-outline">
                      {status}
                    </span>
                  </td>
                  <td>
                    {Object.keys(item)
                      ?.map((key) => `(${key}: ${item[key]})`)
                      ?.join(", ")}
                  </td>
                  <td>{new Date(pickUpDate).toLocaleDateString()}</td>
                  <td>{address}</td>
                  {/* <td>{totalCost}</td> */}
                  {userRole === "company" && (
                    <td>
                      <Menu as="div" className="inline-block text-left">
                        <Menu.Button className="flex w-full justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none">
                          Update status
                          <ChevronDown
                            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-12 mt-2 w-56 origin-top-right rounded-md bg-white/70 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none backdrop-blur-md">
                            <div className="py-1 divide-y divide-gray-200">
                              {orderStatuses.map((orderStatus) => (
                                <Menu.Item key={orderStatus}>
                                  {({ active }) => (
                                    <button
                                      className={`${
                                        active
                                          ? "bg-violet-500 text-white"
                                          : "text-gray-900"
                                      } group flex w-full items-center px-3 py-2 text-sm font-semibold capitalize`}
                                      onClick={() =>
                                        handleStatusUpdate(_id, orderStatus)
                                      }
                                    >
                                      {orderStatus}
                                    </button>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </td>
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <p>You haven't placed any orders yet!</p>
      )}
    </div>
  );
};

export { OrdersList };
