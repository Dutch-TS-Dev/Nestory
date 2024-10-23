import { Star } from "lucide-react";

const StarRating = ({ rate }) => {
    const getStarPercentage = (index) => {
        const starFullness = Math.min(Math.max(rate - index, 0), 1) * 100;
        return `${starFullness}%`;
    };

    return (
        <div className="flex space-x-0.2">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="relative">
                    <Star className="text-gray-300" size={16} />
                    <div
                        className="absolute top-0 left-0 h-full  overflow-hidden"
                        style={{ width: getStarPercentage(index) }}
                    >
                        <Star
                            size={16}
                            className="text-colorSecondary "
                            fill="currentColor"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StarRating;