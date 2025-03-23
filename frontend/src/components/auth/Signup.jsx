import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto p-4'>
                <form onSubmit={submitHandler} className='w-full md:w-1/2 lg:w-1/3 bg-white p-8 rounded-lg shadow-lg'>
                    <h1 className='font-bold text-2xl mb-6 text-center text-[#7209b7]'>Đăng ký</h1>

                    {/* Fullname */}
                    <div className='my-3'>
                        <Label>Họ và Tên</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Nguyễn Văn Tèo"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Email */}
                    <div className='my-3'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="teonguyen@gmail.com"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className='my-3'>
                        <Label>Số điện thoại</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="8080808080"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Password */}
                    <div className='my-3'>
                        <Label>Mật khẩu</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Role */}
                    <div className='my-3'>
                        <Label>Vai trò</Label>
                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Sinh viên</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Nhà tuyển dụng</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Avatar Upload */}
                    <div className='my-3'>
                        <Label>Ảnh đại diện</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="w-full p-3 border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>

                    {/* Submit Button */}
                    {
                        loading
                            ? <Button className="w-full my-4 bg-purple-600 text-white hover:bg-purple-700"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Vui lòng chờ </Button>
                            : <Button type="submit" className="w-full my-4 bg-purple-600 text-white hover:bg-purple-700">Đăng ký</Button>
                    }

                    <div className='text-center mt-4'>
                        <span className='text-sm'>Đã có tài khoản? <Link to="/login" className='text-[#7209b7] hover:underline'>Đăng nhập</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
