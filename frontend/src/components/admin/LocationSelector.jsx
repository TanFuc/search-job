import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const LocationSelector = ({ input, setInput }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedProvinceCode, setSelectedProvinceCode] = useState(null);

    // Phân miền
    const regions = {
        'Miền Bắc': ['Hà Nội', 'Hải Phòng', 'Quảng Ninh', 'Bắc Ninh', 'Hà Nam', 'Ninh Bình', 'Nam Định', 'Thái Bình'],
        'Miền Trung': ['Đà Nẵng', 'Huế', 'Nghệ An', 'Thanh Hóa', 'Quảng Bình', 'Quảng Trị', 'Quảng Nam', 'Bình Định'],
        'Miền Nam': ['Hồ Chí Minh', 'Cần Thơ', 'Bình Dương', 'Đồng Nai', 'Bà Rịa - Vũng Tàu', 'Vĩnh Long', 'Hậu Giang']
    };

    useEffect(() => {
        const fetchProvinces = async () => {
            const res = await axios.get('https://provinces.open-api.vn/api/?depth=1');
            setProvinces(res.data);
        };
        fetchProvinces();
    }, []);

    // Load Quận/Huyện sau khi chọn Tỉnh
    useEffect(() => {
        if (selectedProvinceCode) {
            const fetchDistricts = async () => {
                const res = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`);
                setDistricts(res.data.districts);
            };
            fetchDistricts();
        }
    }, [selectedProvinceCode]);

    // Tách Tỉnh theo miền
    const provincesByRegion = Object.keys(regions).map(region => ({
        region,
        provinces: provinces.filter(p => regions[region].includes(p.name))
    }));

    return (
        <div className="grid grid-cols-2 gap-2">
            {/* Dropdown tỉnh/thành theo miền */}
            <div>
                <label>Tỉnh/Thành phố</label>
                <Select onValueChange={(value) => {
                    const selected = provinces.find(p => p.name === value);
                    setInput({ ...input, location: value });
                    setSelectedProvinceCode(selected.code);
                }}>
                    <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Chọn tỉnh/thành" />
                    </SelectTrigger>
                    <SelectContent>
                        {provincesByRegion.map(group => (
                            <SelectGroup key={group.region}>
                                <div className="px-2 py-1 text-xs font-semibold text-gray-500">{group.region}</div>
                                {group.provinces.map(p => (
                                    <SelectItem key={p.code} value={p.name}>{p.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Dropdown quận/huyện */}
            <div>
                <label>Quận/Huyện</label>
                <Select onValueChange={(value) => setInput({ ...input, district: value })}>
                    <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder="Chọn quận/huyện" />
                    </SelectTrigger>
                    <SelectContent>
                        {districts.map(d => (
                            <SelectItem key={d.code} value={d.name}>{d.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default LocationSelector;
