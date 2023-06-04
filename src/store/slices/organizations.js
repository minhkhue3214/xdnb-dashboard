import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
    organizations: [],
    pagination: {
        currentPage: null,
        totalPages: null,
    }
}

export const organizations = createSlice({
    name: 'organizations',
    initialState,
    reducers: {
        getAllOrganizationRequest: () => {
            // request user
        },
        getAllOrganizationSuccess: (state, action) => {
            const { page, totalPages, results } = action.payload;
            state.organizations = results;
            state.pagination.currentPage = page;
            state.pagination.totalPages = totalPages;
        },
        getAllOrganizationFail: (_, action) => {
            dispatchToast('error', action.payload);
        },
        deleteOrganizationRequest: () => {
            // request user
        },
        deleteOrganizationSuccess: (state, action) => {
            console.log("deleteShiftSuccess", action);
            let updateOrganizations = state.organizations.filter((organization) => organization.id !== action.payload)
            state.organizations = updateOrganizations;
            dispatchToast('success', 'Deleted organization!');
        },
        deleteOrganizationFail: (_, action) => {
            dispatchToast('error', action.payload);
        },
    }
});

export const { getAllOrganizationRequest, getAllOrganizationSuccess, getAllOrganizationFail, deleteOrganizationRequest, deleteOrganizationSuccess, deleteOrganizationFail } = organizations.actions;

export default organizations.reducer;