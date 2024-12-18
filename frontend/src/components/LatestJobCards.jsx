import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>Việt Nam</p>
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



        </div>
    )
}

export default LatestJobCards