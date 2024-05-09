import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInterceptor";
import CONSTANTS from "../constants";
// to fetch employees
export const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async () => {
    const response = await axiosInstance.get(CONSTANTS.EMPLOYEE_API);
    return response.data;
  }
);

//  to add a new employee
export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (employee) => {
    const response = await axiosInstance.post(CONSTANTS.EMPLOYEE_API, employee);
    return response.data;
  }
);

//  update an existing employee
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (employee) => {
    const { id, ...data } = employee;
    const response = await axiosInstance.put(
      `${CONSTANTS.EMPLOYEE_API}/${id}`,
      data
    );
    return response.data;
  }
);
// delete Employee
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (employee) => {
    const { id } = employee;
    const response = await axiosInstance.delete(
      `${CONSTANTS.EMPLOYEE_API}/${id}`
    );
    return response.data;
  }
);
// Define the initial state
const initialState = {
  employees: [],
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

// Create the Redux slice
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    clearStore(state) {
      // Action to clear the store on logout
      state.employees = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.map((emp) => {
          if (emp._id === action.meta.arg.id) return action.payload;
          return emp;
        });
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = state.employees.filter(
          (emp) => emp._id !== action.meta.arg.id
        );
      });
  },
});

export const { clearStore } = employeeSlice.actions;
export default employeeSlice.reducer;
