const List = ({ orders }) => {
  // (topwear: 2, woolen: 3)
  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-medium mb-2">Your orders</h2>
      {orders.length ? (
        <table className="table w-full -z-0">
          <thead>
            <tr>
              <th>Status</th>
              <th>Items</th>
              <th>Pickup date</th>
              <th>Address</th>
              <th>Cost</th>
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
                  <td>{totalCost}</td>
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

export { List };
