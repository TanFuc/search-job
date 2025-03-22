import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <h1 className='text-4xl font-bold text-center'>
                <span className='text-blue-500'>Việc Làm Mới Nhất & Hàng Đầu</span>
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8'>
                {allJobs?.length > 0 ? (
                    allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                ) : (
                    <div className="col-span-3 text-center text-gray-500 font-medium">
                        Hiện chưa có công việc nào được đăng tải.
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestJobs;
