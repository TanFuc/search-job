import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim()) {
            dispatch(setSearchedQuery(query));
            navigate("/browse");
        }
    };

    return (
        <section className="text-center py-16 px-4 bg-gradient-to-r from-white via-blue-50 to-white">
            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-semibold text-sm tracking-wide shadow-sm">
                    Trang Web Săn Việc Số 1
                </span>

                <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-800">
                    Tìm Kiếm, Ứng Tuyển & <br />
                    Nhận Được <span className="text-blue-600">Công Việc Mơ Ước</span>
                </h1>

                <p className="text-gray-600 text-base sm:text-lg">
                    Hãy nhanh chóng tìm kiếm công việc phù hợp và ứng tuyển ngay hôm nay.
                    Chúng tôi luôn đồng hành cùng bạn trên con đường sự nghiệp.
                </p>

                <div className="flex items-center gap-2 max-w-xl w-full mx-auto bg-white border border-gray-200 rounded-full px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-blue-500 transition">
                    <input
                        type="text"
                        placeholder="Tìm kiếm công việc mơ ước..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-full bg-blue-600 hover:bg-blue-700 transition px-3 py-2"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
