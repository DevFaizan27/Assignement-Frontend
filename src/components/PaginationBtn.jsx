import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PaginationBtn = ({currentPage,setCurrentPage,limitPerPage,getUsers}) => {
    
    // const dispatch = useDispatch();

  const { userDetails } = useSelector((state) => state.user);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            // dispatch(getUsers({ page: currentPage - 1, limit: limitPerPage }));
            getUsers()
        }
    };

    const handleNext = () => {
        const totalPages = Math.ceil(userDetails?.totalUsers / limitPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            getUsers()
            // dispatch(getUsers({ page: currentPage + 1, limit: limitPerPage }));
        }
    };

    return (
        <div className="pt-4 pr-2">
            <div className=""></div>
            <div className="flex items-center justify-between gap-3">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className='bg-gray-500 text-white px-5 py-1.5 rounded-md'>
                    Previous
                </button>
                <div className="">
                <p>
                        Showing <strong>{`${(currentPage - 1) * limitPerPage + 1}`}</strong> to{" "}
                        <strong>{`${Math.min(currentPage * limitPerPage, userDetails?.totalUsers)}`}</strong> of{" "}
                        <strong>{`${userDetails?.totalUsers}`}</strong> results
                    </p>
                </div>
                <button
                    onClick={handleNext}
                    disabled={currentPage >= Math.ceil(userDetails?.totalUsers / limitPerPage)}
                    className='bg-indigo-500 text-white px-5 py-1.5 rounded-md'>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginationBtn;
