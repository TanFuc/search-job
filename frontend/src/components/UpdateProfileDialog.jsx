import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const schema = yup.object({
        fullname: yup.string().required('Họ tên là bắt buộc'),
        email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        phoneNumber: yup.string().required('Số điện thoại là bắt buộc'),
        bio: yup.string().optional(),
        skills: yup.string().optional(),
        file: yup.mixed().test('fileType', 'Chỉ chấp nhận file PDF', (value) => {
            if (value) {
                return value.type === 'application/pdf';
            }
            return true;
        })
    }).required();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullname: user?.fullname || '',
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
            bio: user?.profile?.bio || '',
            skills: user?.profile?.skills?.map(skill => skill) || '',
            file: null
        }
    });

    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setValue('file', file);
    };

    const submitHandler = async (data) => {
        if (!data.fullname || !data.email || !data.phoneNumber) {
            toast.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const formData = new FormData();
        formData.append('fullname', data.fullname);
        formData.append('email', data.email);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('bio', data.bio);
        formData.append('skills', data.skills);
        if (data.file) {
            formData.append('file', data.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Đã xảy ra lỗi');
        } finally {
            setLoading(false);
        }
        setOpen(false);
    };

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Cập nhật thông tin</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="grid gap-4 py-4">
                            {/* Nhập tên */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="fullname" className="text-right">Họ tên</Label>
                                <Input
                                    id="fullname"
                                    {...register('fullname')}
                                    type="text"
                                    placeholder="Nhập tên của bạn"
                                    disabled={loading}
                                    className="col-span-3"
                                />
                                {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
                            </div>

                            {/* Nhập email */}
                            <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor="email" className="text-right">Email</Label>
    <Input
        id="email"
        {...register('email')}
        type="email"
        placeholder="Nhập email của bạn"
        readOnly // Làm cho ô email không thể chỉnh sửa
        className="col-span-3 bg-gray-300 cursor-not-allowed hover:bg-gray-300"
    />
    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
</div>

                            {/* Nhập số điện thoại */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phoneNumber" className="text-right">Số điện thoại</Label>
                                <Input
                                    id="phoneNumber"
                                    {...register('phoneNumber')}
                                    type="text"
                                    placeholder="Nhập số điện thoại của bạn"
                                    disabled={loading}
                                    className="col-span-3"
                                />
                                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                            </div>

                            {/* Nhập mô tả */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right">Mô tả</Label>
                                <textarea
                                    id="bio"
                                    {...register('bio')}
                                    className="col-span-3 p-2 border rounded-md"
                                    rows="4"
                                    placeholder="Nhập thông tin mô tả về bản thân"
                                    disabled={loading}
                                />
                            </div>

                            {/* Nhập kỹ năng */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right">Kỹ năng</Label>
                                <Input
                                    id="skills"
                                    {...register('skills')}
                                    type="text"
                                    placeholder="Nhập kỹ năng của bạn"
                                    disabled={loading}
                                    className="col-span-3"
                                />
                            </div>

                            {/* Tải lên Resume */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="file" className="text-right">Hồ sơ</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    disabled={loading}
                                    className="col-span-3"
                                />
                                {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
                            </div>
                        </div>

                        <DialogFooter>
                            {loading ? (
                                <Button className="w-full my-4">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Vui lòng đợi
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full my-4">
                                    Cập nhật
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateProfileDialog;
