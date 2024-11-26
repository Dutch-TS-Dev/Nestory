/* eslint-disable react/prop-types */

const DashboardCard = ({ title, value, icon: Icon }) => {
    return (
        <div className="bg-colorPrimary p-5 rounded-lg flex gap-5 cursor-pointer w-full text-gray-200  hover:bg-gray-600 relative">
            <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold">{title}</span>
                <span className="text-2xl font-medium">{value}</span>
                {/* <span className="text-sm font-light">
                    <span className="text-lime-500">2.5%</span> more than last
                    month
                </span> */}
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1d5c83] to-[#051d2c] opacity-30" />
            <div className="absolute -bottom-3 -right-0 text-[#1d5c83] opacity-50">
                <Icon className="h-32 w-32" />
            </div>
        </div>
    );
};

export default DashboardCard;
