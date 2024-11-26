import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";

const ShowOrders = () => {
  const [order, setOrder] = useState(null);
  const { sessionId } = useContext(AppContext);

  useEffect(() => {
    const fetchUserOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/order/?sessionId=${sessionId}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data);
        setOrder(data);
      } catch (error) {
        console.log("Error fetching user order", error);
      }
    };
    fetchUserOrder();
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg border p-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-colorPrimary mb-6">
            Order Form
          </h1>
        </div>
        <div className="w-36">
          <img src="/images/logo/nestoryFull.png" alt="logo-photo" />
        </div>
      </div>

      {order ? (
        <div>
          <div className="border-b border-b-colorPrimary pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-1">Customer Details</h2>
            <p className="text-gray-500">Name: {order.userId.email || "N/A"}</p>
            <p className="text-gray-500">
              Email: {order.userId.email || "N/A"}
            </p>
          </div>

          <div className="border-b border-b-colorPrimary pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-1">Order Information</h2>
            <p className="text-gray-500">Order ID: {order._id}</p>
            <p className="text-gray-500">
              Created at: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-500">Status: {order.status}</p>
          </div>

          <div className="border-b border-b-colorPrimary pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-1">Delivery Information</h2>
            <div className="space-y-1 text-gray-500">
              <p>Street: {order.shippingAddress?.street || "N/A"}</p>
              <p>House: {order.shippingAddress?.house || "N/A"}</p>
              <p>City: {order.shippingAddress?.city || "N/A"}</p>
              <p>Zip: {order.shippingAddress?.zip || "N/A"}</p>
              <p>Country: {order.shippingAddress?.country || "N/A"}</p>
              <p>Shipping Fee: ${order.shippingFee || "N/A"}</p>
            </div>
          </div>

          <div className="border-b border-b-colorPrimary pb-4 mb-4">
            <h2 className="text-xl font-semibold mb-1">Items</h2>
            {order.items?.map((item) => (
              <div key={item.productId} className="flex justify-between py-2">
                <p className="font-medium text-gray-500">
                  {item.productId.name || "Unknown Product"}
                </p>
                <div className="flex items-center justify-end">
                  <p className="text-colorPrimary font-semibold">
                    <span> ${item.price?.toFixed(2) || "N/A"}</span>
                  </p>
                </div>
                <p className="text-gray-500">
                  Qty:{" "}
                  <span className="text-colorPrimary text-left">
                    {" "}
                    {item.quantity}{" "}
                  </span>{" "}
                </p>
              </div>
            ))}
          </div>

          <div className="text-right font-semibold text-[1.5rem]">
            <p>Total: ${order.total?.toFixed(2) || "N/A"}</p>
          </div>

          <p className="text-center text-sm px-15 text-gray-500 mt-6">
            Thank you for your order! If you have any questions, please contact
            us at support@nestory.com.
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Order not found.</p>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-5 bg-colorPrimary"></div>
    </div>
  );
};

export default ShowOrders;
// import { useContext, useEffect, useState } from "react";
// import { AppContext } from "../../context/AppProvider";

// const ShowOrders = () => {
//   const [order, setOrder] = useState(null);
//   const { sessionId } = useContext(AppContext);

//   useEffect(() => {
//     const fetchUserOrder = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3000/api/order/?sessionId=${sessionId}`,
//           {
//             credentials: "include",
//           }
//         );
//         const data = await response.json();
//         console.log(data);
//         setOrder(data);
//       } catch (error) {
//         console.log("Error fetching user order", error);
//       }
//     };
//     fetchUserOrder();
//   }, []);

//   return (
//     <div className="order-list-container p-6 max-w-4xl mx-auto">
//       <div className="text-center">
//         <h1 className="text-3xl font-semibold mb-6">Order Details</h1>
//       </div>
//       {order ? (
//         <div className="order-card py-[16px] px-[24px] border rounded-lg p-4 mb-6 shadow-md bg-white">
//           <div className="order-info flex justify-between items-center mb-4">
//             <div>
//               <h2 className="text-[1.6rem] font-semibold">
//                 Order ID: <span className="text-[1.4rem]"> {order._id}</span>
//               </h2>
//               <p className="text-[1.2rem] text-gray-600">
//                 Created at: {new Date(order.createdAt).toLocaleDateString()}
//               </p>
//               <p className="text-[1.2rem] text-gray-600">
//                 Status:{" "}
//                 <span className="font-medium text-blue-600">
//                   {order.status}
//                 </span>
//               </p>
//             </div>
//             <p className="text-[1.6rem] font-semibold">
//               Total: ${order.total?.toFixed(2) || "N/A"}
//             </p>
//           </div>
//           <div className="items-list mb-4">
//             {order.items?.map((item) => (
//               <div
//                 key={item.productId}
//                 className="item flex justify-between py-2 border-b"
//               >
//                 <div className="item-details">
//                   <p className="font-semibold">
//                     {item.productId.name || "Unknown Product"}
//                   </p>
//                   <p className="text-[1.2rem] text-gray-600">
//                     Quantity: {item.quantity}
//                   </p>
//                 </div>
//                 <p className="text-right text-gray-700">
//                   ${item.price?.toFixed(2) || "N/A"}
//                 </p>
//               </div>
//             ))}
//           </div>
//           {/* <div className="shipping-info text-sm text-gray-600">
//                         <p>Shipping Address:</p>
//                         {order.shippingAddress ? (
//                             <>
//                                 <p>Street: {order.shippingAddress.street}</p>
//                                 <p>House: {order.shippingAddress.house}</p>
//                                 <p>City: {order.shippingAddress.city}</p>
//                                 <p>Zip: {order.shippingAddress.zip}</p>
//                                 <p>Country: {order.shippingAddress.country}</p>
//                             </>
//                         ) : (
//                             <p>No shipping address available</p>
//                         )}
//                         <p>Shipping Fee: ${order.shippingFee || "N/A"}</p>
//                     </div> */}
//           <div className="shipping-info bg-white shadow-lg rounded-lg p-4 text-gray-700">
//             <h3 className="text-2xl font-semibold mb-3 text-gray-800">
//               Shipping Information:
//             </h3>

//             {order.shippingAddress ? (
//               <div className="space-y-1 text-[1.2rem]">
//                 <div className="flex justify-between">
//                   <span className="font-medium">Street:</span>
//                   <span>{order.shippingAddress.street}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="font-medium">House:</span>
//                   <span>{order.shippingAddress.house}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="font-medium">City:</span>
//                   <span>{order.shippingAddress.city}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="font-medium">Zip:</span>
//                   <span>{order.shippingAddress.zip}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="font-medium">Country:</span>
//                   <span>{order.shippingAddress.country}</span>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500 mt-2">
//                 No shipping address available
//               </p>
//             )}

//             <div className="mt-3 border-t pt-3 text-[1.2rem]">
//               <div className="flex justify-between">
//                 <span className="font-medium">Shipping Fee:</span>
//                 <span>${order.shippingFee || "N/A"}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">Order not found.</p>
//       )}
//     </div>
//   );
// };

// export default ShowOrders;
