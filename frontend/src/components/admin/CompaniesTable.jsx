// src/components/CompaniesTable.jsx
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSingleCompany, deleteCompanyAsync } from '@/redux/companySlice'; // Import đúng tên action

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    const handleDelete = (companyId) => {
        if (window.confirm('Bạn chắc chắn muốn xóa công ty?')) {
            dispatch(deleteCompanyAsync(companyId)); // Thực hiện action xóa qua Redux
        }
    };

    const handleEdit = (companyId) => {
        // Lấy thông tin công ty khi click vào Sửa
        const company = companies.find(c => c._id === companyId);
        dispatch(setSingleCompany(company));  // Lưu công ty vào Redux store
        navigate(`/admin/companies/${companyId}`);
    };

    return (
        <div>
            <Table>
                <TableCaption>Danh sách các công ty bạn đã đăng ký gần đây</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Tên công ty</TableHead>
                        <TableHead>Ngày đăng ký</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div onClick={() => handleEdit(company._id)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Sửa</span>
                                            </div>
                                            <div onClick={() => handleDelete(company._id)} className='flex items-center gap-2 w-fit cursor-pointer text-red-500'>
                                                <Trash2 className='w-4' />
                                                <span>Xóa</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default CompaniesTable;
