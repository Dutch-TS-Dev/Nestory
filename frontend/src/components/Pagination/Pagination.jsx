// import { useContext } from "react";
// import { AppContext } from "../../context/AppProvider";

/* eslint-disable react/prop-types */
const Pagination = ({ currentPage, hasPrev, hasNext, onPageChange }) => {
    // const { scrollTargetDiv } = useContext(AppContext);
    const handlePageChange = (newPage) => {
        onPageChange(newPage);
        window.scrollTo(0, 0);
    };
    return (
        <div className="flex justify-between mt-12 w-full">
            <button
                className="rounded-md bg-colorSecondary text-colorPrimary p-2 text-xl w-32 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
                disabled={!hasPrev}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                Previous
            </button>
            <button
                className="rounded-md bg-colorSecondary text-colorPrimary p-2 text-xl w-32 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
                disabled={!hasNext}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
