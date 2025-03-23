import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "Data Analyst", "Mobile App Developer", "Software Tester (QA/QC)", "AI/ML Engineer", "IT Support Specialist"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="p-4 bg-gray-100 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-6">Choose Your Career Path</h2>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="flex justify-center">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full py-3 px-6 text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-500 hover:text-white"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-gray-700 hover:text-blue-500 transition duration-200" />
                <CarouselNext className="text-gray-700 hover:text-blue-500 transition duration-200" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel;
