import React, { useState, useEffect } from 'react';
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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", role: "student" });
    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            setError(""); // Reset error state
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.message || "Đã có lỗi xảy ra");
            toast.error(error.response?.data?.message || "Đã có lỗi xảy ra");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-full sm:w-96 border border-gray-300 rounded-lg p-8 my-10 shadow-xl bg-white'>
                    <h1 className='font-bold text-2xl mb-6 text-gray-800 text-center'>Đăng nhập</h1>

                    {/* Email input with icon */}
                    <div className='my-4'>
                        <Label>Email</Label>
                        <div className="relative">
                            <Input
                                type="email"
                                value={input.email}
                                name="email"
                                onChange={changeEventHandler}
                                placeholder="tanphuc@gmail.com"
                                className="w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-purple-400"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></span>
                        </div>
                    </div>

                    {/* Password input with icon */}
                    <div className='my-4'>
                        <Label>Mật khẩu</Label>
                        <div className="relative">
                            <Input
                                type="password"
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="********"
                                className="w-full p-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-purple-400"
                            />
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></span>
                        </div>
                    </div>

                    {/* Role selection */}
                    <div className='my-4'>
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
                                <Label htmlFor="r1">Ứng viên</Label>
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

                    {/* Display error message */}
                    {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

                    {/* Submit button */}
                    {loading ? (
                        <Button className="w-full my-4 flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Vui lòng chờ
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-purple-600 hover:bg-purple-700 text-white">
                            Đăng nhập
                        </Button>
                    )}

                    {/* Signup link */}
                    <div className='text-center'>
                        <span className='text-sm'>
                            Chưa có tài khoản? <Link to="/signup" className='text-[#7209b7] hover:underline'>Đăng ký</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
