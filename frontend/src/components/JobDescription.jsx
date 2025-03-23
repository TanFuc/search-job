import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); 
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-4xl mx-auto my-8 bg-white p-6 rounded-lg shadow-lg'>
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-800'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-3 mt-4'>
                        <Badge className='text-blue-600' variant="ghost">{singleJob?.position} Vị trí</Badge>
                        <Badge className='text-yellow-600' variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className='text-green-600' variant="ghost">Lương: {singleJob?.salary}</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 ${isApplied ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}`}>
                    {isApplied ? 'Đã Ứng Tuyển' : 'Ứng Tuyển Ngay'}
                </Button>
            </div>

            <div className='border-b border-gray-300 pb-4'>
                <h2 className='text-xl font-semibold text-gray-800'>Mô Tả Công Việc</h2>
            </div>

            <div className='mt-4 space-y-3'>
                <h3 className='text-lg font-medium text-gray-700'>Vị trí: <span className='font-normal'>{singleJob?.jobType}</span></h3>
                <h3 className='text-lg font-medium text-gray-700'>Địa điểm: <span className='font-normal'>{singleJob?.location}</span></h3>
                <h3 className='text-lg font-medium text-gray-700'>Mô tả: <span className='font-normal'>{singleJob?.description}</span></h3>
                <h3 className='text-lg font-medium text-gray-700'>Kinh nghiệm: <span className='font-normal'>{singleJob?.experienceLevel}</span></h3>
                <h3 className='text-lg font-medium text-gray-700'>Lương: <span className='font-normal'>{singleJob?.salary}</span></h3>
                <h3 className='text-lg font-medium text-gray-700'>Số ứng viên đã ứng tuyển: <span className='font-normal'>{singleJob?.applications?.length}</span></h3>
                <h3 className='text-lg font-medium text-gray-700'>Ngày đăng: <span className='font-normal'>{singleJob?.createdAt.split("T")[0]}</span></h3>
            </div>

            <div className='mt-6'>
                <Button
                    onClick={() => navigate('/jobs')}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg">
                    Quay lại
                </Button>
            </div>
        </div>
    );
};

export default JobDescription;
