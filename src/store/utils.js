const loginServiceURL = "https://login5.responsys.net";
const authEndpoint = "/rest/api/v1.3/auth/token";

export const AUTHENTICATION = {
  endPoint: loginServiceURL.concat(authEndpoint),
  authenticateAction: "api/userAuthentication",
};

export const CAMPAIGN = {
  endPoint: "/rest/api/v1.5/campaigns/actions/search",
  searchAction: "api/loadEntities/searchCampaigns",
};

export const CAMPAIGNS = {
  endPoint: "/rest/api/v1.5/campaigns?type=email",
  fetchAllAction: "api/loadEntities/campaigns",
  createAction: "api/createCampaign",
};

export const LISTS = {
  endPoint: "/rest/api/v1.3/lists",
  fetchAllAction: "api/loadEntities/lists",
};

export const SUPPDATA = {
  endPoint: "/rest/api/v1.3/suppData",
  fetchAllAction: "api/loadEntities/suppData",
};

export const FILTERS = {
  endPoint: "/rest/api/v1.3/filters",
  fetchAllAction: "api/loadEntities/filters",
};

export const FOLDERS = {
  endPoint: "/rest/api/v1.3/folders",
  fetchAllAction: "api/loadEntities/folders",
};

export const TEMPLATES = {
  endPoint: "/rest/api/v1.3/clFolders/contentlibrary/stensulimports?type=docs",
  fetchAllAction: "api/loadEntities/emailTemplates",
};

export const CONTENTLIBRARY = {
  endPoint: "/rest/api/v1.3/clFolders",
  createAction: "api/createContentLibraryFolder",
  moveAction: "api/moveContentLibraryDoc",
};

export const LINKTABLE = {
  createAction: "api/createLinkTable",
  mergeAction: "api/mergeLinkTable",
};
