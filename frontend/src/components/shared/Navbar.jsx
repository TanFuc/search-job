import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
        <Link to='/' className='flex items-center gap-2'>
          <h1 className='text-2xl font-bold'>
            IT<span className='text-blue-600'>Job</span>
          </h1>
        </Link>

        <nav className='flex items-center gap-6'>
          <ul className='hidden md:flex items-center gap-5 font-medium text-gray-700'>
            {user?.role === 'recruiter' ? (
              <>
                <li>
                  <Link to='/admin/companies' className='hover:text-blue-600 transition'>Công ty</Link>
                </li>
                <li>
                  <Link to='/admin/jobs' className='hover:text-blue-600 transition'>Việc làm</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/' className='hover:text-blue-600 transition'>Trang chủ</Link>
                </li>
                <li>
                  <Link to='/jobs' className='hover:text-blue-600 transition'>Việc làm</Link>
                </li>
                <li>
                  <Link to='/browse' className='hover:text-blue-600 transition'>Tất cả</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to='/login'>
                <Button variant='outline' className='hover:border-blue-600 hover:text-blue-600 transition'>
                  Đăng nhập
                </Button>
              </Link>
              <Link to='/signup'>
                <Button className='bg-blue-600 hover:bg-blue-700 text-white transition'>
                  Đăng ký
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className='cursor-pointer border-2 border-blue-600 hover:shadow-md transition'>
                  <AvatarImage src={user?.profile?.profilePhoto} alt='avatar' />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className='w-72 p-4'>
                <div className='flex gap-3 items-center mb-3'>
                  <Avatar className='w-12 h-12 border'>
                    <AvatarImage src={user?.profile?.profilePhoto} alt='avatar' />
                  </Avatar>
                  <div>
                    <h4 className='font-semibold text-gray-800'>{user?.fullname}</h4>
                    <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='space-y-2'>
                  {user?.role === 'student' && (
                    <Link to='/profile' className='flex items-center gap-2 text-gray-700 hover:text-blue-600 transition'>
                      <User2 size={18} />
                      <span>Xem hồ sơ</span>
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className='flex items-center gap-2 text-gray-700 hover:text-red-500 transition w-full'
                  >
                    <LogOut size={18} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
