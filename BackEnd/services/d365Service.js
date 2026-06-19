const axios = require("axios");

const response = await axios.get(
      "https://shlt-dev01185046dcf29ca8dcdevaos.axcloud.dynamics.com/data/PurchaseRequisitionLinesV2",
      {
        headers: {
          Authorization:
            `Bearer ${accessToken}`,
          Accept: "application/json"
        }
      }
    );

 //exports { getPRList };