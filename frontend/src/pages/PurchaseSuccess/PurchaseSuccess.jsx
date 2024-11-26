import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

import Confetti from "react-confetti";

const PurchaseSuccess = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  //  const { clearCart } = useCartStore();
  const { setCartItems } = useContext(AppContext);
  const [error, setError] = useState(null);
  const { setSessionId } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await fetch("http://localhost:3000/api/payments/checkout-success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
          credentials: "include",
        });

        // clearCart();
        const res = await fetch("http://localhost:3000/cart", {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) {
          if (res.status === 404) {
            return [];
          } else {
            throw new Error("Failed to fetch cart items");
          }
        }
        // const data = await res.json();
        setCartItems([]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
      setSessionId(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, []);

  if (isProcessing) return "Processing...";

  if (error) return `Error: ${error}`;

  return (
    <div className="h-[70vh] flex items-center justify-center px-6 sm:px-8 ">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className="max-w-xl w-full bg-gray-100 rounded-xl shadow-xl overflow-hidden relative z-10">
        <div className="p-10 sm:p-12">
          <div className="flex justify-center">
            <CheckCircle className=" w-16 h-16 mb-4" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center  mb-2">
            Purchase Successful!
          </h1>

          <p className="text-gray-500 text-center mb-2 py-6">
            Thank you for your order. {"We're"} processing it now.
          </p>
          <p className=" text-center text-md mb-6">
            Check your profile for order details or{" "}
            <span
              className="underline cursor-pointer hover:text-colorSecondary"
              onClick={() => navigate("/show-orders")}
            >
              Click Here
            </span>
          </p>
          <div className="bg-colorSecondary rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[1.2rem] text-gray-600">Order number</span>
              <span className="text-[1.2rem] text-gray-600">#12345</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[1.2rem] text-gray-600">
                Estimated delivery
              </span>
              <span className="text-[1.2rem]  text-gray-600">
                3-5 business days
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <button
              className="w-full bg-colorPrimary hover:bg-colorSecondary text-white font-bold py-3 px-5
             rounded-lg transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to={"/"}
              className="w-full bg-colorPrimary hover:bg-colorSecondary text-white font-bold py-3 px-5 
            rounded-lg transition duration-300 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PurchaseSuccess;
