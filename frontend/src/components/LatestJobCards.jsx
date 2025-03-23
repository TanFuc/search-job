import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job?._id}`)}
            className="relative p-6 rounded-xl shadow-lg bg-gradient-to-r from-[#e0e7ff] via-[#f0f9ff] to-[#fef9f4] cursor-pointer transition-all transform hover:scale-105 hover:shadow-2xl hover:border-[#7209b7] border border-transparent"
        >
            {/* Company Logo moved to the right */}
            <div className="absolute top-2 right-4">
                <img 
                    src={job?.company?.logo || 'https://via.placeholder.com/50'} 
                    alt="Company Logo" 
                    className="w-12 h-12 object-cover rounded-full"
                />
            </div>

            {/* Company Name & Location */}
            <div className="flex justify-between mb-4">
                <div>
                    <h1 className="font-semibold text-xl text-[#1a202c]">{job?.company?.name || 'Công ty chưa cập nhật'}</h1>
                    <p className="text-sm text-gray-500">{job?.location || 'Vị trí chưa rõ'}</p>
                </div>
                {/* Optionally add a heart icon for favorites */}
                <div className="flex items-center text-[#7209b7] hover:text-[#5a3e8c] cursor-pointer">
                    <i className="fas fa-heart"></i>
                </div>
            </div>

            {/* Job Title & Description */}
            <div className="mb-4">
                <h1 className="font-bold text-2xl text-[#1a202c] hover:text-[#7209b7] transition-all">{job?.title || 'Chưa có tiêu đề'}</h1>
                <p className="text-sm text-gray-600 line-clamp-4">{job?.description || 'Không có mô tả công việc.'}</p>
            </div>

            {/* Job Badges */}
            <div className="flex items-center gap-4 flex-wrap mt-6">
                <Badge className="text-purple-700 font-semibold bg-purple-100 rounded-full px-4 py-2 transition-all hover:bg-purple-200 hover:scale-105 hover:shadow-lg">
                    {`${job?.position} Vị trí` || 'Vị trí chưa rõ'}
                </Badge>

                <Badge className="text-[#F83002] font-semibold bg-[#FDE2D2] rounded-full px-4 py-2 transition-all hover:bg-[#F9B6A5] hover:scale-105 hover:shadow-lg">
                    {job?.jobType || 'Loại công việc chưa rõ'}
                </Badge>

                <Badge className="text-[#7209b7] font-semibold bg-[#F2E6FF] rounded-full px-4 py-2 transition-all hover:bg-[#D8B2F0] hover:scale-105 hover:shadow-lg">
                    Lương: {job?.salary || 'Chưa rõ'}
                </Badge>

                <Badge className="bg-red-100 text-red-700 font-semibold rounded-full px-4 py-2 transition-all hover:bg-[#D8B2F0] hover:scale-105 hover:shadow-lg">
                    Kinh nghiệm: {job?.experienceLevel || 'Chưa rõ'}
                </Badge>

                <Badge className="bg-pink-100 text-pink-700 font-semibold rounded-full px-4 py-2 transition-all hover:bg-[#D8B2F0] hover:scale-105 hover:shadow-lg">
                 {job?.location || 'Chưa rõ'}
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
