import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                {/* <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button> */}
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>Việt Nam</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Badge className="text-blue-700 font-bold max-w-xs truncate" variant="ghost">
                    {job?.position} Vị trí
                </Badge>
                <Badge className="text-[#F83002] font-bold max-w-xs truncate" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold max-w-xs truncate" variant="ghost">
                    Lương: {job?.salary}
                </Badge>

                {/* Hiển thị requirements chung một dòng */}
                {Array.isArray(job?.requirements) &&
                    job.requirements.map((requirement, index) => (
                        <Badge
                            key={index}
                            className="text-white bg-black font-bold px-2 py-1 rounded"
                            variant="ghost"
                        >
                            {requirement}
                        </Badge>
                    ))}
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Chi tiết</Button>
                {/* <Button className="text-blue-500">Save For Later</Button> */}
            </div>
        </div>
    )
}

export default Job