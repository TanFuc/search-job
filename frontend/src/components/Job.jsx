import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Hôm nay" : `${daysAgoFunction(job?.createdAt)} ngày trước`}
                </p>
                <Button variant="outline" className="p-2 rounded-full hover:bg-gray-100 transition-all">
                    <Bookmark className="text-gray-500" />
                </Button>
            </div>

            <div className="flex items-center gap-4 my-4">
                <Avatar className="w-16 h-16 border-2 border-gray-300">
                    <AvatarImage src={job?.company?.logo || 'https://via.placeholder.com/50'} />
                </Avatar>
                <div>
                    <h1 className="font-semibold text-xl text-gray-800 hover:text-indigo-600 cursor-pointer">{job?.company?.name || 'Công ty chưa cập nhật'}</h1>
                    <p className="text-sm text-gray-600">{job?.location || 'Vị trí chưa rõ'}</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-2xl text-gray-900 mt-2 hover:text-indigo-600 cursor-pointer">{job?.title || 'Chưa có tiêu đề'}</h1>
                <p className="text-sm text-gray-700">{job?.description || 'Không có mô tả công việc.'}</p>
            </div>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
                <Badge className="bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-lg my-1">
                {`${job?.position} Vị trí` || 'Vị trí chưa rõ'}
                </Badge>
                <Badge className="bg-orange-100 text-orange-600 font-semibold px-4 py-2 rounded-lg my-1">
                    {job?.jobType || 'Loại công việc chưa rõ'}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-lg my-1">
                    Lương: {job?.salary || 'Chưa rõ'}
                </Badge>
                <Badge className="bg-red-100 text-red-700 font-semibold px-2 py-2 rounded-lg my-1">
                    Kinh nghiệm: {job?.experienceLevel || 'Chưa rõ'}
                </Badge>
            </div>

            <div className="flex items-center gap-4 mt-6">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="w-full sm:w-auto py-2 px-6 text-lg bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                >
                    Xem Chi Tiết
                </Button>
            </div>
        </div>
    )
}

export default Job
