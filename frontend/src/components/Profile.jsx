import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg">
                {/* Phần hiển thị thông tin người dùng */}
                <div className="flex justify-between mb-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24 border-2 border-gray-200 rounded-full overflow-hidden">
                            <AvatarImage src="https://dongphuchaianh.com/wp-content/uploads/2024/03/logo-hinh-con-cho-hinh-6.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-800">{user?.fullname}</h1>
                            <p className="text-gray-600">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className="flex items-center gap-2 text-purple-500 border-purple-500 hover:bg-purple-100 transition-all">
                        <Pen /> Cập nhật
                    </Button>
                </div>

                <div className="my-6">
                    {/* Thông tin liên hệ */}
                    <div className="flex items-center gap-3 my-3">
                        <Mail className="text-gray-600" />
                        <span className="text-gray-700">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 my-3">
                        <Contact className="text-gray-600" />
                        <span className="text-gray-700">{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className="my-6">
                    <h2 className="font-bold text-lg text-gray-800">Kỹ năng</h2>
                    {/* Hiển thị kỹ năng */}
                    <div className="flex gap-2 flex-wrap">
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className="bg-indigo-100 text-indigo-700">{item}</Badge>
                            )) : <span className="text-gray-500">Chưa có kỹ năng</span>
                        }
                    </div>
                </div>

                <div className="my-6">
                    <Label className="font-bold">Hồ sơ</Label>
                    {/* Hiển thị resume nếu có */}
                    {
                        isResume ? (
                            <a target="blank" href={user?.profile?.resume} className="text-[#7209b7] hover:underline">
                                {user?.profile?.resumeOriginalName}
                            </a>
                        ) : (
                            <span className="text-gray-500">Chưa có hồ sơ</span>
                        )
                    }
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-8 shadow-lg">
                {/* Hiển thị bảng công việc đã ứng tuyển */}
                <h2 className="font-bold text-xl my-4 text-gray-800">Công việc đã ứng tuyển</h2>
                <AppliedJobTable />
            </div>

            {/* Cập nhật thông tin người dùng */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
