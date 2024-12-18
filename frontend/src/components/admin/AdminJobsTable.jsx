import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Trash } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job)

    const [filterJobs, setFilterJobs] = useState(allAdminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('called')
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
        })
        setFilterJobs(filteredJobs)
    }, [allAdminJobs, searchJobByText])

    const deleteJobHandler = async (jobId) => {
        try {
            const res = await axios.delete(`${JOB_API_END_POINT}/${jobId}`, { withCredentials: true })
            if (res.data.success) {
                toast.success(res.data.message)
                // Remove the deleted job from the list
                setFilterJobs(filterJobs.filter(job => job._id !== jobId))
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Xóa công việc thất bại!')
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>Danh sách các công việc bạn đã đăng gần đây</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tên công ty</TableHead>
                        <TableHead>Vị trí</TableHead>
                        <TableHead>Ngày đăng</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Sửa</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4' />
                                                <span>Ứng viên</span>
                                            </div>
                                            <div onClick={() => deleteJobHandler(job._id)} className='flex items-center w-fit gap-2 cursor-pointer mt-2 text-red-600'>
                                                <Trash className='w-4' />
                                                <span>Xóa</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
