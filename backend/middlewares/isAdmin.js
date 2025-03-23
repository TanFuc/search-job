const isAdmin = async (req, res, next) => {
    try {
        const userId = req.id; // Được xác định từ middleware xác thực (isAuthenticated)
        const user = await User.findById(userId);
        if (user.role !== 'admin') {
            return res.status(403).json({
                message: "Bạn không có quyền truy cập vào tài nguyên này.",
                success: false
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Có lỗi xảy ra khi kiểm tra quyền truy cập.",
            success: false
        });
    }
};

export default isAdmin;
