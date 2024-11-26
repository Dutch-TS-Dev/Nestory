import { useEffect, useState } from "react";

const Timer = () => {
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        const updateTimer = () => {
            const date = new Date();
            const dateline = new Date("2024-12-06 13:00:00");
            const time = dateline.getTime() - date.getTime();
            setTimer(time);
        };

        updateTimer(); // 初始化计时器
        const interval = setInterval(updateTimer, 1000); // 每秒更新一次

        return () => clearInterval(interval); // 组件卸载时清除计时器
    }, []);
    return (
        <div className="flex justify-around items-center w-full gap-4 my-20">
            <div className="w-1/5 border-b-2  border-colorSecondary pb-8 text-center">
                <h1 className="text-4xl md:text-[3rem] font-bold">
                    {timer < 0
                        ? "00"
                        : Math.floor(timer / (1000 * 60 * 60 * 24)) < 10
                        ? `0${Math.floor(timer / (1000 * 60 * 60 * 24))}`
                        : Math.floor(timer / (1000 * 60 * 60 * 24))}
                </h1>
                <p>days</p>
            </div>
            <div className="w-1/5 border-b-2  border-colorSecondary pb-8 text-center">
                <h1 className="text-4xl md:text-[3rem] font-bold">
                    {timer < 0
                        ? "00"
                        : Math.floor(
                              (timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                          ) < 10
                        ? `0${Math.floor(
                              (timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                          )}`
                        : Math.floor(
                              (timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                          )}
                </h1>
                <p>hours</p>
            </div>
            <div className="w-1/5 border-b-2  border-colorSecondary pb-8 text-center">
                <h1 className="text-4xl md:text-[3rem] font-bold">
                    {timer < 0
                        ? "00"
                        : Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60)) <
                          10
                        ? `0${Math.floor(
                              (timer % (1000 * 60 * 60)) / (1000 * 60)
                          )}`
                        : Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60))}
                </h1>
                <p>minutes</p>
            </div>
            <div className="w-1/5 border-b-2  border-colorSecondary pb-8 text-center">
                <h1 className="text-4xl md:text-[3rem] font-bold">
                    {timer < 0
                        ? "00"
                        : Math.floor((timer % (1000 * 60)) / 1000) < 10
                        ? `0${Math.floor((timer % (1000 * 60)) / 1000)}`
                        : Math.floor((timer % (1000 * 60)) / 1000)}
                </h1>
                <p>seconds</p>
            </div>
        </div>
    );
};

export default Timer;
