// import React, { useState } from 'react'
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
// import { Label } from './ui/label'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { Loader2 } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { setUser } from '@/redux/authSlice'
// import { toast } from 'sonner'

// const UpdateProfileDialog = ({ open, setOpen }) => {
//     const [loading, setLoading] = useState(false);
//     const { user } = useSelector(store => store.auth);

//     const [input, setInput] = useState({
//         fullname: user?.fullname || "",
//         email: user?.email || "",
//         phoneNumber: user?.phoneNumber || "",
//         bio: user?.profile?.bio || "",
//         skills: user?.profile?.skills?.map(skill => skill) || "",
//         file: user?.profile?.resume || ""
//     });
//     const dispatch = useDispatch();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }

//     const fileChangeHandler = (e) => {
//         const file = e.target.files?.[0];
//         setInput({ ...input, file })
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("bio", input.bio);
//         formData.append("skills", input.skills);
//         if (input.file) {
//             formData.append("file", input.file);
//         }
//         try {
//             setLoading(true);
//             const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true
//             });
//             if (res.data.success) {
//                 dispatch(setUser(res.data.user));
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//         setOpen(false);
//         console.log(input);
//     }



//     return (
//         //         <div>
//         //             <Dialog open={open}>
//         //                 <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
//         //                     <DialogHeader>
//         //                         <DialogTitle>Update Profile</DialogTitle>
//         //                     </DialogHeader>
//         //                     <form onSubmit={submitHandler}>
//         //                         <div className='grid gap-4 py-4'>
//         //                             <div className='grid grid-cols-4 items-center gap-4'>
//         //                                 <Label htmlFor="name" className="text-right">Name</Label>
//         //                                 <Input
//         //                                     id="name"
//         //                                     name="name"
//         //                                     type="text"
//         //                                     value={input.fullname}
//         //                                     onChange={changeEventHandler}
//         //                                     className="col-span-3"
//         //                                 />
//         //                             </div>
//         //                             <div className='grid grid-cols-4 items-center gap-4'>
//         //                                 <Label htmlFor="email" className="text-right">Email</Label>
//         //                                 <Input
//         //                                     id="email"
//         //                                     name="email"
//         //                                     type="email"
//         //                                     value={input.email}
//         //                                     onChange={changeEventHandler}
//         //                                     className="col-span-3"
//         //                                 />
//         //                             </div>
//         //                             <div className='grid grid-cols-4 items-center gap-4'>
//         //                                 <Label htmlFor="number" className="text-right">Number</Label>
//         //                                 <Input
//         //                                     id="number"
//         //                                     name="number"
//         //                                     value={input.phoneNumber}
//         //                                     onChange={changeEventHandler}
//         //                                     className="col-span-3"
//         //                                 />
//         //                             </div>
//         //                             <div className='grid grid-cols-4 items-center gap-4'>
//         //                                 <Label htmlFor="bio" className="text-right">Bio</Label>
//         //                                 <Input
//         //                                     id="bio"
//         //                                     name="bio"
//         //                                     value={input.bio}
//         //                                     onChange={changeEventHandler}
//         //                                     className="col-span-3"
//         //                                 />
//         //                             </div>
//         //                             <div className='grid grid-cols-4 items-center gap-4'>
//         //                                 <Label htmlFor="skills" className="text-right">Kỹ năng</Label>
//         //                                 <Input
//         //                                     id="skills"
//         //                                     name="skills"
//         //                                     value={input.skills}
//         //                                     onChange={changeEventHandler}
//         //                                     className="col-span-3"
//         //                                 />
//         //                             </div>
//         //                             <div className='grid grid-cols-4 items-center gap-4'>
//         //                                 <Label htmlFor="file" className="text-right">Resume</Label>
//         //                                 <Input
//         //                                     id="file"
//         //                                     name="file"
//         //                                     type="file"
//         //                                     accept="application/pdf"
//         //                                     onChange={fileChangeHandler}
//         //                                     className="col-span-3"
//         //                                 />
//         //                             </div>
//         //                         </div>
//         //                         <DialogFooter>
//         //                             {
//         //                                 loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
//         //                             }
//         //                         </DialogFooter>
//         //                     </form>
//         //                 </DialogContent>
//         //             </Dialog>
//         //         </div>
//         //     )
//         // }

//         // export default UpdateProfileDialog
//         <div>
//             <Dialog open={open}>
//                 <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
//                     <DialogHeader>
//                         <DialogTitle>Cập nhật thông tin</DialogTitle>
//                     </DialogHeader>
//                     <form onSubmit={submitHandler}>
//                         <div className="grid gap-4 py-4">
//                             {/* Nhập tên */}
//                             <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="name" className="text-right">Họ tên</Label>
//                                 <Input
//                                     id="name"
//                                     name="name"
//                                     type="text"
//                                     value={input.fullname}
//                                     onChange={changeEventHandler}
//                                     placeholder="Nhập tên của bạn"
//                                     disabled={loading}
//                                     className="col-span-3"
//                                 />
//                             </div>

//                             {/* Nhập email */}
//                             <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="email" className="text-right">Email</Label>
//                                 <Input
//                                     id="email"
//                                     name="email"
//                                     type="email"
//                                     value={input.email}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>

//                             {/* Nhập Bio */}
//                             <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="bio" className="text-right">Mô tả</Label>
//                                 <textarea
//                                     id="bio"
//                                     name="bio"
//                                     value={input.bio}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3 p-2 border rounded-md"
//                                     rows="4"
//                                     placeholder="Nhập thông tin mô tả về bản thân"
//                                 />
//                             </div>

//                             {/* Nhập kỹ năng */}
//                             <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="skills" className="text-right">Kỹ năng</Label>
//                                 <Input
//                                     id="skills"
//                                     name="skills"
//                                     value={input.skills}
//                                     onChange={changeEventHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>

//                             {/* Tải lên Resume */}
//                             <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="file" className="text-right">Hồ sơ</Label>
//                                 <Input
//                                     id="file"
//                                     name="file"
//                                     type="file"
//                                     accept="application/pdf"
//                                     onChange={fileChangeHandler}
//                                     className="col-span-3"
//                                 />
//                             </div>
//                         </div>

//                         <DialogFooter>
//                             {loading ? (
//                                 <Button className="w-full my-4">
//                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                     Vui lòng đợi
//                                 </Button>
//                             ) : (
//                                 <Button type="submit" className="w-full my-4">
//                                     Cập nhật
//                                 </Button>
//                             )}
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default UpdateProfileDialog;

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
                                    className="col-span-3"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            {/* Nhập Bio */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="bio" className="text-right">Mô tả</Label>
                                <textarea
                                    id="bio"
                                    {...register('bio')}
                                    className="col-span-3 p-2 border rounded-md"
                                    rows="4"
                                    placeholder="Nhập thông tin mô tả về bản thân"
                                />
                            </div>

                            {/* Nhập kỹ năng */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="skills" className="text-right">Kỹ năng</Label>
                                <Input
                                    id="skills"
                                    {...register('skills')}
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

