import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import RequestHandler from "../services/requestHandler.js";
import {
  CAMPAIGNS,
  CAMPAIGN,
  LISTS,
  SUPPDATA,
  FILTERS,
  FOLDERS,
  TEMPLATES,
  CONTENTLIBRARY,
  LINKTABLE,
} from "./utils.js";

const reqHandler = new RequestHandler();

const asyncThunk = (action, endPoint) =>
  createAsyncThunk(action, async () => {
    try {
      const res = await reqHandler.getData(endPoint);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  });

const loadCampaigns = createAsyncThunk(CAMPAIGNS.fetchAllAction, async () => {
  try {
    const res = await reqHandler.getData(CAMPAIGNS.endPoint);
    if (res.status === 200 && res.data.links !== undefined) {
      const responseDataArr = [];
      const URL = res.data.links[1].href;
      const res2 = await reqHandler.getData(URL);
      const response = responseDataArr.concat(
        res.data.campaigns,
        res2.data.campaigns
      );
      return response;
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
const loadLists = asyncThunk(LISTS.fetchAllAction, LISTS.endPoint);
const loadSuppData = asyncThunk(SUPPDATA.fetchAllAction, SUPPDATA.endPoint);
const loadFilters = asyncThunk(FILTERS.fetchAllAction, FILTERS.endPoint);
const loadFolders = asyncThunk(FOLDERS.fetchAllAction, FOLDERS.endPoint);
const loadTemplates = asyncThunk(TEMPLATES.fetchAllAction, TEMPLATES.endPoint);

const createCampaign = createAsyncThunk(
  CAMPAIGNS.createAction,
  async (dataInput, { rejectWithValue }) => {
    try {
      const res = await reqHandler.postData(CAMPAIGNS.endPoint, dataInput);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.title) {
        return rejectWithValue(error.response.data.title);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const createClFolder = createAsyncThunk(
  CONTENTLIBRARY.createAction,
  async (folderData, { rejectWithValue }) => {
    try {
      const res = await reqHandler.postData(
        CONTENTLIBRARY.endPoint,
        folderData
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.title) {
        return rejectWithValue(error.response.data.title);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const copyClDoc = createAsyncThunk(
  CONTENTLIBRARY.moveAction,
  async (inputData, { rejectWithValue }) => {
    try {
      const res = await reqHandler.putData(
        `/rest/api/v1.3/clDocs${inputData.destinationPath}`,
        inputData.sourcePath
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.title) {
        return rejectWithValue(error.response.data.title);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const createLinkTable = createAsyncThunk(
  LINKTABLE.createAction,
  async (inputData, { rejectWithValue }) => {
    try {
      const res = await reqHandler.postData(
        `/rest/api/v1.3/folders/RPA/linkTables/${inputData}_LT`,
        {
          description: "New Link Table",
        }
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.title) {
        return rejectWithValue(error.response.data.title);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const mergeLinkTable = createAsyncThunk(
  LINKTABLE.mergeAction,
  async (inputData, { rejectWithValue }) => {
    try {
      const res = await reqHandler.postData(
        `/rest/api/v1.3/folders/RPA/linkTables/${inputData.name}_LT/members`,
        inputData.records
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.title) {
        return rejectWithValue(error.response.data.title);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const getCampaign = createAsyncThunk(
  CAMPAIGN.searchAction,
  async (dataInput, { rejectWithValue }) => {
    try {
      const searchCriteria = {
        searchCriteria: {
          keyword: {
            key: "campaignName",
            value: dataInput,
          },
        },
        sortCriteria: {
          field: "campaignName",
          order: "desc",
        },
      };

      const res = await reqHandler.postData(
        CAMPAIGN.endPoint,
        JSON.stringify(searchCriteria)
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.title) {
        return rejectWithValue(error.response.data.title);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const entitiesSlice = createSlice({
  name: "entities",
  initialState: {
    campaigns: [],
    lists: [],
    suppData: [],
    filters: [],
    folders: [],
    emailTemplates: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadCampaigns.fulfilled, (state, action) => {
      state.campaigns = [...action.payload];
      console.log("Campaigns fulfilled");
    });
    builder.addCase(loadCampaigns.rejected, (state, action) => {
      console.log("Campaigns rejected", action.payload);
    });
    builder.addCase(getCampaign.fulfilled, (state, action) => {
      console.log("Search Campaign fulfilled", action.payload);
    });
    builder.addCase(getCampaign.rejected, (state, action) => {
      console.log("Search Campaign rejected", action.payload);
    });
    builder.addCase(loadLists.fulfilled, (state, action) => {
      state.lists = [...action.payload];
      console.log("Profile List fulfilled");
    });
    builder.addCase(loadLists.rejected, (state, action) => {
      console.log("Profile List rejected", action.payload);
    });
    builder.addCase(loadSuppData.fulfilled, (state, action) => {
      state.suppData = [...action.payload];
      console.log("Supp Data fulfilled");
    });
    builder.addCase(loadSuppData.rejected, (state, action) => {
      console.log("Supp Data rejected", action.payload);
    });
    builder.addCase(loadFilters.fulfilled, (state, action) => {
      state.filters = [...action.payload.filters];
      console.log("Filers fulfilled");
    });
    builder.addCase(loadFilters.rejected, (state, action) => {
      console.log("Filers rejected", action.payload);
    });
    builder.addCase(loadFolders.fulfilled, (state, action) => {
      state.folders = [...action.payload.folders];
      console.log("Folders fulfilled");
    });
    builder.addCase(loadFolders.rejected, (state, action) => {
      console.log("Folders rejected", action.payload);
    });
    builder.addCase(loadTemplates.fulfilled, (state, action) => {
      state.emailTemplates = [...action.payload.documents];
      console.log("Email Templates fulfilled");
    });
    builder.addCase(loadTemplates.rejected, (state, action) => {
      console.log("Email Templates rejected", action.payload);
    });
    builder.addCase(createCampaign.fulfilled, (state, action) => {
      state.campaigns = [...state.campaigns, action.payload];
      console.log("createCampaign fulfilled");
    });
    builder.addCase(createCampaign.rejected, (state, action) => {
      console.log("createCampaign rejected", action.payload);
    });
    builder.addCase(createClFolder.fulfilled, (state, action) => {
      console.log("createClFolder fulfilled");
    });
    builder.addCase(createClFolder.rejected, (state, action) => {
      console.log("createClFolder rejected", action.payload);
    });
    builder.addCase(copyClDoc.fulfilled, (state, action) => {
      console.log("copyClDoc fulfilled");
    });
    builder.addCase(copyClDoc.rejected, (state, action) => {
      console.log("copyClDoc rejected", action.payload);
    });
    builder.addCase(createLinkTable.fulfilled, (state, action) => {
      console.log("createLinkTable fulfilled");
    });
    builder.addCase(createLinkTable.rejected, (state, action) => {
      console.log("createLinkTable rejected", action.payload);
    });
    builder.addCase(mergeLinkTable.fulfilled, (state, action) => {
      console.log("mergeLinkTable fulfilled");
    });
    builder.addCase(mergeLinkTable.rejected, (state, action) => {
      console.log("mergeLinkTable rejected", action.payload);
    });
  },
});

export {
  loadCampaigns,
  loadLists,
  loadSuppData,
  loadFilters,
  loadFolders,
  loadTemplates,
  createCampaign,
  getCampaign,
  createClFolder,
  copyClDoc,
  createLinkTable,
  mergeLinkTable,
};
export default entitiesSlice.reducer;
