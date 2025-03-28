import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption>Danh sách các công việc bạn đã ứng tuyển</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Vị trí công việc</TableHead>
                        <TableHead>Công ty</TableHead>
                        <TableHead className="text-right">Trạng thái</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* Kiểm tra nếu không có công việc đã ứng tuyển */}
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500">Bạn chưa ứng tuyển công việc nào.</TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => {
                            // Kiểm tra nếu công việc đã bị xóa hoặc không có thông tin
                            const job = appliedJob.job;
                            if (!job || !job.title || !job.company) {
                                return null; // Nếu không có thông tin về công việc, không hiển thị dòng này
                            }
                            return (
                                <TableRow key={appliedJob._id}>
                                    <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{job?.title}</TableCell>
                                    <TableCell>{job?.company?.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge
                                            className={`${appliedJob?.status === "rejected"
                                                    ? 'bg-red-400'
                                                    : appliedJob.status === 'pending'
                                                        ? 'bg-gray-400'
                                                        : 'bg-green-400'
                                                }`}
                                        >
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
