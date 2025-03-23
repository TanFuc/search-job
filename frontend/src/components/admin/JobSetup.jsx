import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetJobById from '@/hooks/useGetJobById';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

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

const JobSetup = () => {
    const params = useParams();
    useGetJobById(params.id);

    const { singleJob } = useSelector((store) => store.job);
    const { companies } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

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
    const selectedCompany = companies.find(company => company._id === input.companyId);
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: name === "position" ? Number(value) : value }));
    };

    const selectCompanyHandler = (value) => {
        setInput((prev) => ({ ...prev, companyId: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.title || !input.description || !input.requirements || !input.salary ||
            !input.location || !input.jobType || !input.experience || input.position <= 0 || !input.companyId) {
            toast.error("Vui lòng điền đầy đủ thông tin hợp lệ.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Cập nhật thất bại!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (singleJob) {
            setInput({
                title: singleJob.title || "",
                description: singleJob.description || "",
                requirements: Array.isArray(singleJob.requirements)
                    ? singleJob.requirements.join(', ')
                    : singleJob.requirements || "",
                salary: singleJob.salary || "",
                location: singleJob.location || "",
                jobType: singleJob.jobType || "",
                experience: singleJob.experienceLevel || "",
                position: singleJob.position || 0,
                companyId: singleJob.company || ""
            });
        }

        console.log(singleJob);
        
    }, [singleJob]);

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
                            type="button"
                        >
                            <ArrowLeft />
                            <span>Quay lại</span>
                        </Button>
                        <h1 className="font-bold text-xl">Cập nhật công việc</h1>
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
                                className="w-full border border-gray-300 rounded-md p-2 my-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                                rows={4}
                            />
                        </div>

                        <div>
                            <Label>Yêu cầu</Label>
                            <textarea
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="w-full border border-gray-300 rounded-md p-2 my-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                                rows={4}
                            />
                        </div>

                        <div>
                            <Label>Địa điểm</Label>
                            <Select
                                value={input.location}
                                onValueChange={(value) => setInput((prev) => ({ ...prev, location: value }))}
                            >
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
                            <Select
                                value={input.jobType}
                                onValueChange={(value) => setInput((prev) => ({ ...prev, jobType: value }))}
                            >
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
    <Select
        value={experienceLevels.includes(input.experience) ? input.experience : ""}
        onValueChange={(value) => setInput((prev) => ({ ...prev, experience: value }))}
    >
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

                        {companies.length > 0 && (
  <div>
    <Label>Công ty</Label>
    <Select
      value={input.companyId}
      onValueChange={selectCompanyHandler}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Chọn công ty" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {companies.map((company) => (
            <SelectItem key={company._id} value={company._id}>
              {company.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>

    {/* Hiển thị tên công ty đã chọn */}
    {selectedCompany && (
      <p className="mt-2 text-sm text-gray-600">
        Công ty đã chọn: <span className="font-semibold">{selectedCompany.name}</span>
      </p>
    )}
  </div>
)}
                    </div>

                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Vui lòng đợi
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Cập nhật công việc</Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default JobSetup;


