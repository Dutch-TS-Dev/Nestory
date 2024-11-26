/* eslint-disable react/prop-types */
const Button = ({
    text,
    width,
    height,
    fontSize,
    onClickHandler,
    disabled,
}) => {
    return (
        <button
            className={`flex justify-center items-center rounded-[22px] bg-colorSecondary  duration-300 ease-in-out text-white font-bold ${
                disabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:bg-colorPrimary"
            }`}
            style={{
                width: width,
                height: height || "44px",
                fontSize: fontSize || "14px",
            }}
            onClick={disabled ? null : onClickHandler} // 禁用状态下不触发点击事件
            disabled={disabled}
        >
            {text}
        </button>

        // <div
        //     className="flex justify-center items-center rounded-[22px]  bg-colorSecondary hover:bg-colorPrimary duration-300 ease-in-out cursor-pointer  text-white disabled:cursor-not-allowed disabled:opacity-50"
        //     style={{
        //         width: width,
        //         height: height || "44px",
        //         fontSize: fontSize || "14px",
        //     }}
        //     onClick={onClickHandler}
        //     disabled={disabled}
        // >
        //     {text}
        // </div>
    );
};

export default Button;
