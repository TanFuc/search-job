

import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { ArrowLeft} from 'lucide-react';

const provinces = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng"];
const jobTypes = ["Full-time", "Part-time", "Internship", "Freelance", "Remote"];
const experienceLevels = [
    "Không yêu cầu",
    "Dưới 1 năm",
    "1 năm",
    "2 năm",
    "3 năm",
    "4 năm",
    "5 năm",
    "Trên 5 năm"
];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectCompanyHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validate dữ liệu trước khi submit
        if (!input.title || !input.description || !input.requirements || !input.salary ||
            !input.location || !input.jobType || !input.experience || input.position <= 0 || !input.companyId) {
            toast.error("Vui lòng điền đầy đủ thông tin hợp lệ.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Lỗi đăng công việc.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                <div className="flex items-center gap-5">
                        <Button
                            onClick={() => navigate("/admin/jobs")}
                            variant="outline"
                            className="flex items-center gap-2 text-gray-500 font-semibold"
                        >
                            <ArrowLeft />
                            <span>Quay lại</span>
                        </Button>
                        <h1 className="font-bold text-xl">Thêm mới công việc</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4 m-4'>
                    
                        <div>
                            <Label>Tiêu đề</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Lương</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Mô tả</Label>
                            <textarea
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="w-full border border-gray-300 rounded-md p-2 my-1 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
                                rows={4}
                            />
                        </div>

                        <div>
                            <Label>Yêu cầu</Label>
                            <textarea
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="w-full border border-gray-300 rounded-md p-2 my-1 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
                                rows={4}
                            />
                        </div>

                        <div>
                            <Label>Địa điểm</Label>
                            <Select onValueChange={(value) => setInput({ ...input, location: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn tỉnh/thành" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {provinces.map((province) => (
                                            <SelectItem key={province} value={province}>
                                                {province}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Loại công việc</Label>
                            <Select onValueChange={(value) => setInput({ ...input, jobType: value })}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn loại công việc" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {jobTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
    <Label>Cấp độ kinh nghiệm</Label>
    <Select onValueChange={(value) => setInput({ ...input, experience: value })}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn cấp độ kinh nghiệm" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                        {level}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>
</div>

                        <div>
                            <Label>Số lượng vị trí</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        {/* Dropdown chọn công ty */}
                        {companies.length > 0 && (
                            <div>
                                <Label>Công ty</Label>
                                <Select onValueChange={selectCompanyHandler}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn công ty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company.name} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {/* Nút submit hoặc nút loading */}
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Vui lòng đợi
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Đăng công việc mới</Button>
                    )}

                    {/* Thông báo nếu không có công ty */}
                    {companies.length === 0 && (
                        <p className='text-xs text-red-600 font-bold text-center my-3'>
                            *Vui lòng đăng ký công ty trước khi đăng công việc
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;
