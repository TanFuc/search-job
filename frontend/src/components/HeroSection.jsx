import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Trang Web Săn Việc Số 1</span>
                <h1 className='text-5xl font-bold'>Tìm Kiếm, Ứng Tuyển & <br /> Nhận Được <span className='text-blue-500'>Công Việc Mơ Ước</span></h1>
                <p>Hãy nhanh chóng tìm kiếm công việc phù hợp với bạn và ứng tuyển ngay hôm nay. Chúng tôi luôn đồng hành cùng bạn trên con đường sự nghiệp.</p>

                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>

                    <input
                        type="text"
                        placeholder='Tìm kiếm và ứng tuyển công việc mơ ước của bạn'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#2f3ad5]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection