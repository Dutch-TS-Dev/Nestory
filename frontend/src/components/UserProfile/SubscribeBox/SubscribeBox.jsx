import Button from "../../Button/Button";

const SubscribeBox = () => {
    const subscribeHandle = () => {
        console.log("Subscribe is ok");
    };
    return (
        <div className="w-[100%] mt-[3rem] h-[32rem] md:h-[24rem] lg:h-[16rem] flex flex-col lg:flex-row lg:justify-center">
            <div className=" lg:basis-[40%] h-[10rem] lg:h-[16rem] bg-colorSecondary  rounded-t-[22px] lg:rounded-tr-none lg:rounded-bl-[22px] flex flex-col justify-center items-center">
                <p className="text-white">
                    Subscribe to our newsletter and grab
                </p>
                <p className="text-colorPrimary"> 30% OFF!</p>
            </div>
            <div className="lg:basis-[60%] h-[22rem] md:h-[13rem] lg:h-[16rem] bg-colorPrimary flex flex-col justify-center gap-[2rem] items-center md:flex-row rounded-b-[22px] lg:rounded-bl-none lg:rounded-r-[22px]">
                <input
                    className=" h-[4.5rem] w-[75%] md:w-[50%] rounded-[10px] p-[2rem] text-white bg-[#174B69]"
                    type="text"
                    placeholder="Your email address..."
                />
                <Button
                    text="Subscribe"
                    width="200px"
                    onClickHandler={subscribeHandle}
                />
            </div>
        </div>
    );
};

export default SubscribeBox;
