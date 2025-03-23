import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Lập trình viên Frontend", "Lập trình viên Backend", "Lập trình viên Full Stack", "Kỹ sư DevOps", 
    "Phân tích dữ liệu", "Lập trình viên Mobile", "Kiểm thử phần mềm (QA/QC)", "Kỹ sư AI/ML", 
    "Chuyên viên hỗ trợ IT", "Nhân viên Marketing", "Nhân viên Bán hàng", "Quản lý Dự án", 
    "Thiết kế đồ họa", "Quản trị mạng", "Kế toán", "Quản lý Nhân sự", "Nhân viên Tư vấn", 
    "Giám đốc điều hành (CEO)", "Giám đốc tài chính (CFO)", "Chuyên viên chăm sóc khách hàng", 
    "Nhà phân tích kinh doanh", "Chuyên gia UX/UI", "Giáo viên", "Y tá", "Lập trình viên game"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    // Chia category thành các nhóm 3 mục
    const chunkedCategory = [];
    for (let i = 0; i < category.length; i += 3) {
        chunkedCategory.push(category.slice(i, i + 3));
    }

    return (
        <div className="p-6 bg-gray-50 rounded-xl shadow-xl">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Chọn Lĩnh Vực Nghề Nghiệp</h2>
            <Carousel className="w-full max-w-2xl mx-auto my-8">
                <CarouselContent>
                    {chunkedCategory.map((group, index) => (
                        <CarouselItem key={index} className="flex justify-between">
                            {group.map((cat, idx) => (
                                <Button
                                    key={idx}
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="rounded-full py-4 px-8 text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-110 hover:bg-purple-600 hover:text-white"
                                >
                                    {cat}
                                </Button>
                            ))}
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-gray-700 hover:text-purple-600 transition duration-200" />
                <CarouselNext className="text-gray-700 hover:text-purple-600 transition duration-200" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
