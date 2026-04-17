import { createSlice } from "@reduxjs/toolkit";
import type {
  Organization,
  OrganizationManagementSlice,
} from "./organization.interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ApiResponse,
  PaginatedQuery,
  PaginatedResponse,
} from "../../../interfaces/api.interface";

import type { RootState } from "../../../redux/store";
import { setLoading } from "../../../redux/slices/global.slice";
import endPoints from "../../../api/endPoints";
import { http } from "../../../api/http.service";

const ORGANIZATION_BASE_PATH = import.meta.env.VITE_BASE_URL;


const organizationManagementSlice = createSlice({
  name: "OrganizationManagement",

  initialState: {
    organizationList: [],
    error: "",
    status: "idle",
    totalDocs: 0,
    details: null,
  } as OrganizationManagementSlice,

  reducers: {
    setOrganizationDetails: (
      state,
      { payload }: { payload: Organization | null },
    ) => {
      state.details = payload;
    },
  },
  extraReducers(builder) {
    builder
      //List
      .addCase(getOrganizationList.rejected, (state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        ((state.status = "failed"),
          (state.error = action.error.message as string));
      })
      .addCase(getOrganizationList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrganizationList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.organizationList = action.payload?.docs ?? [];
        state.totalDocs = action.payload?.totalDocs ?? 0;
      })

      //Details
      .addCase(getOrganizationDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrganizationDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.details = action.payload;
      })
      .addCase(getOrganizationDetails.rejected, (state) => {
        state.status = "failed";
      })

      //Update Details
      .addCase(updateOrganizationDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrganizationDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.details = action.payload;
      })
      .addCase(updateOrganizationDetails.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const getOrganizationList = createAsyncThunk(
  "organization/list",
  async (query: PaginatedQuery, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const { filter = {}, ...rest } = query;
      const newQuery = { ...rest, ...filter };

      const { data } = await http.get<
        ApiResponse<PaginatedResponse<Organization>>
      >(endPoints.organizationList, newQuery, {
        baseURL: ORGANIZATION_BASE_PATH,
      });

      return data.result;
    } catch (error) {
      return thunkApi.rejectWithValue(error); // ✅ Fixed
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  },
);

export const getOrganizationDetails = createAsyncThunk(
  "organization/details",
  async (id: string, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const { data } = await http.get<ApiResponse<Organization>>(
        endPoints.get_organization_details,
        { organizationId: id },
        {
          baseURL: ORGANIZATION_BASE_PATH,
        },
      );
      return data.result;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  },
);

export const updateOrganizationDetails = createAsyncThunk(
  "updateOrganizationDetails",
  async ({ payload }: { payload: Partial<Organization> }, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const { data } = await http.put<ApiResponse<Organization>>(
        endPoints.update_organization_details,
        { payload },
        {
          baseURL: ORGANIZATION_BASE_PATH,
        },
      );
      return data.result;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  },
);

export const selectOrganization = (state: RootState) =>
  state.organizationManagement;

export default organizationManagementSlice.reducer;
