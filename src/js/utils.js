import store from "../store/index.js";

export const checkTokenExist = () => {
  const token = store.getState().auth;
  if (token.authToken !== "") {
    return true;
  }
  return false;
};

export const campaignInput = {
  type: "EMAIL",
  name: "",
  folderName: "RPA",
  subject: "Test Subject",
  locale: "en",
  marketingStrategy: "Promotional",
  marketingProgram: "Promotional",
  htmlMessagePath: "",
  enableLinkTracking: true,
  linkTablePath: "Hari_Test/Test_LT",
  enableExternalTracking: false,
  trackHTMLOpens: true,
  useUTF8: true,
  purpose: "PROMOTIONAL",
  filterPaths: ["HariP_Test/RPA_List_Filter"],
  dataSource: [
    {
      path: "Hari_Test/Hari_List",
      alias: "Hari_List",
      fields: [],
      type: "PROFILE_LIST",
      defaultValue: null,
    },
    {
      path: "HariP_Test/RPA_List",
      alias: "RPA_List",
      fields: [
        {
          name: "RIID_",
          alias: "RIID_",
          lookUpKey: true,
          defaultValue: null,
        },
        {
          name: "FIRST_NAME",
          alias: "FIRST_NAME",
          lookUpKey: false,
          defaultValue: "Valued Member",
        },
        {
          name: "LAST_NAME",
          alias: "LAST_NAME",
          lookUpKey: false,
          defaultValue: null,
        },
        {
          name: "EMAIL_ADDRESS",
          alias: "EMAIL_ADDRESS",
          lookUpKey: false,
          defaultValue: null,
        },
      ],
      type: "PET",
      defaultValue: null,
    },
  ],
};

export const businessUnits = [
  { label: "APAC LMS CUSTOMER", value: "APAC LMS CUSTOMER" },
  { label: "APAC LHS/LTS ACQUISITION", value: "APAC LHS/LTS ACQUISITION" },
  { label: "APAC LHS/LTS CUSTOMER", value: "APAC LHS/LTS CUSTOMER" },
  { label: "APAC LSS ACQUISITION", value: "APAC LSS ACQUISITION" },
  { label: "EMEA", value: "EMEA" },
  { label: "NAMER BCS/CONSUMER", value: "NAMER BCS/CONSUMER" },
  { label: "NAMER LMS CUSTOMER", value: "NAMER LMS CUSTOMER" },
  { label: "NAMER LMS ACQUISITION", value: "NAMER LMS ACQUISITION" },
  { label: "NAMER LTS CUSTOMER", value: "NAMER LTS CUSTOMER" },
  { label: "NAMER LTS ACQUISITION", value: "NAMER LTS ACQUISITION" },
  { label: "NAMER LSS ACQUISITION", value: "NAMER LSS ACQUISITION" },
];

export const getBUConfig = (value) => campaignInput;

export const linkTableInput = {
  recordData: {
    fieldNames: ["LINK_NAME", "LINK_CATEGORY", "LINK_URL"],
    records: [],
  },
};

export const defaultUpdateCampaignInput = [
  {
    description: "",
    subject: "",
    externalCampaignCode: "",
  },
];
