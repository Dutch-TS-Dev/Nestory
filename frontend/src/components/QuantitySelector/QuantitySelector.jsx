/* eslint-disable react/prop-types */

const QuantitySelector = ({
    size = "text-3xl",
    padding = "py-4 px-5",
    quantity,
    increaseQuantity,
    decreaseQuantity,
}) => {
    // const increaseQuantity = () => {
    //     // if (quantity < 5) setQuantity(quantity + 1);
    //     setQuantity(quantity + 1);
    // };

    // const decreaseQuantity = () => {
    //     if (quantity > 1) setQuantity(quantity - 1);
    // };
    return (
        <div className="flex items-center mr-4 space-x-4">
            <div className="flex items-center border rounded ">
                <button
                    onClick={decreaseQuantity}
                    className={`minus ${padding} ${size} hover:bg-gray-200`}
                >
                    -
                </button>
                <span
                    className={`font-medium ${padding} ${size} `}
                    style={{
                        minWidth: "3.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {quantity}
                </span>
                <button
                    onClick={increaseQuantity}
                    className={`plus ${padding} ${size} text-center hover:bg-gray-200`}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;
