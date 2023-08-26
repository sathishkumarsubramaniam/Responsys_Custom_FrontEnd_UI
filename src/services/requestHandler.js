import axios from "axios";

export default function RequestHandler() {
  try {
    this.constructor();
  } catch (error) {
    console.log(error);
  }
}

RequestHandler.prototype = {
  constructor: function () {
    this.getData = this.getData.bind(this);
    this.getMultipleData = this.getMultipleData.bind(this);
  },

  authenticate: (endPoint, data) =>
    axios.post(endPoint, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),

  setRequestDefaults: ({ authToken, endPoint }) => {
    axios.defaults.headers.common["Authorization"] = authToken;
    axios.defaults.baseURL = endPoint;
    return true;
  },

  getData: (endPoint) => axios.get(endPoint),

  getMultipleData: async (endPoint) => await axios.get(endPoint),

  postData: (endPoint, data) =>
    axios.post(endPoint, data, {
      headers: { "Content-Type": "application/json" },
    }),

  putData: (endPoint, data) =>
    axios.put(endPoint, data, {
      headers: { "Content-Type": "application/json" },
    }),

  deleteData: (endPoint, data) => axios.delete(endPoint, data),

  getCampaigns: (data) => {
    axios
      .post(
        "/rest/api/v1.5/campaigns/actions/search",
        {
          searchCriteria: {
            keyword: {
              key: "campaignName",
              value: data,
            },
          },
          sortCriteria: {
            field: "campaignName",
            order: "desc",
          },
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        return response;
      });
  },
};
