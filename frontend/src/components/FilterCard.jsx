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
    // {
    //     filterType: "Salary",
    //     array: ["25000000", "15000000", "20000000"]
    // }
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className="w-full bg-white p-3 rounded-md">
            <h1 className="font-bold text-lg">Lọc công việc</h1>
            <hr className="mt-3" />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className="font-bold text-lg">{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div key={itemId} className="flex items-center space-x-2 my-2">
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
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
