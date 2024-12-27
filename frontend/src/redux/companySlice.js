// src/redux/companySlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import Cookies from 'js-cookie';  // Import js-cookie

const initialState = {
    companies: [],
    searchCompanyByText: '',
    singleCompany: null,
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        },
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        deleteCompany: (state, action) => {
            state.companies = state.companies.filter(company => company._id !== action.payload);
        }
    }
});

// Action async để xóa công ty
export const deleteCompanyAsync = (companyId) => async (dispatch) => {
    const token = Cookies.get('token'); // Lấy token từ cookies

    if (!token) {
        console.error("Token is missing.");
        return;
    }

    try {
        const response = await axios.delete(`${COMPANY_API_END_POINT}/delete/${companyId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
            withCredentials: true,  // Đảm bảo cookie được gửi kèm với yêu cầu
        });

        if (response.data.success) {
            dispatch(deleteCompany(companyId)); // Xóa công ty khỏi Redux state
        }
    } catch (error) {
        console.error("Error deleting company:", error);
    }
};

export const { setCompanies, setSearchCompanyByText, setSingleCompany, deleteCompany } = companySlice.actions;
export default companySlice.reducer;
