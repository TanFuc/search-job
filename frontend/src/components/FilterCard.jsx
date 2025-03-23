import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Vị trí",
        array: ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng"]
    },
    {
        filterType: "Lĩnh vực",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "Data Analyst", "Mobile App Developer", "Software Tester (QA/QC)", "AI/ML Engineer", "IT Support Specialist"]
    }
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        if (selectedValue) {
            dispatch(setSearchedQuery(selectedValue));
        }
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full bg-white p-4 rounded-md shadow-md">
            <h1 className="font-semibold text-xl text-gray-800 mb-4">Lọc công việc</h1>
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index} className="mb-4">
                            <h2 className="font-medium text-lg text-gray-700 mb-2">{data.filterType}</h2>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div key={itemId} className="flex items-center space-x-3 mb-2">
                                            <RadioGroupItem 
                                                value={item} 
                                                id={itemId} 
                                                className="hover:bg-indigo-100 rounded-full transition-colors" 
                                            />
                                            <Label 
                                                htmlFor={itemId} 
                                                className="text-sm text-gray-600 cursor-pointer hover:text-indigo-600"
                                            >
                                                {item}
                                            </Label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
