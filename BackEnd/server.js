import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

async function getAccessToken() {
  const tokenResponse = await axios.post(
    process.env.D365_TOKEN_URL,
    new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "client_credentials",
      scope: process.env.SCOPE,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return tokenResponse.data.access_token;
}
// login 


app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log("Login Request:", { username, password });

  try {
    const accessToken = await getAccessToken();

    // Call D365 Login API
    const apiResponse = await axios.get(process.env.LOGIN, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    const users = apiResponse.data.value;

    // Find user by email/username
    const user = users.find(
      (u) => u.Email === username
    );

    // User not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Password validation
    if (user.Password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Remove password before sending to frontend
    const { Password, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      status: safeUser.Status,
      user: safeUser,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});
/* PR Header List */
app.get("/api/PRList", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(process.env.PR_HEADER, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    const PRList = response.data.value.map((item) => ({
      ProjectId: item.DefaultProjectId,
      RequisitionNumber: item.RequisitionNumber,
      RequisitionName: item.RequisitionName,
      RequestedDate: item.DefaultRequestedDate,
      RequisitionPurpose: item.RequisitionPurpose,
      LineStatus: item.RequisitionStatus,
      PreparerPersonnelNumber: item.PreparerPersonnelNumber,
      DefaultAccountingDate: item.DefaultAccountingDate,
    }));

    res.json(PRList);
  } catch (error) {
    console.error(
      "PR List Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* PR Lines by Requisition Number */
app.get("/api/PR_lines/:RequisitionNumber", async (req, res) => {
  try {
    const { RequisitionNumber } = req.params;
    const accessToken = await getAccessToken();

    const url =
      `${process.env.PR_DETAIL_LINEPAGE}` +
      `?$filter=RequisitionNumber eq '${RequisitionNumber}'`;

    console.log("Calling URL:", url);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    console.log("RequisitionNumber:", RequisitionNumber);
    const materials = response.data.value.map((item) => ({
      AccountingDate: item.AccountingDate,
      RequestedDate: item.RequestedDate,
      ProductName: item.ProductName,
      LineDescription: item.LineDescription,
      ProcurementProductCategoryName: item.ProcurementProductCategoryName,
      PurchasePriceQuantity: item.PurchasePriceQuantity,
      RequestedQuantity: item.RequestedQuantity,
      PurchaseUnitSymbol: item.PurchaseUnitSymbol,
      RequestedPrice: item.RequestedPrice,
      DeliveryAddressName: item.DeliveryAddressName,
      RequisitionNumber: item.RequisitionNumber,
      DeliveryAddressCity: item.DeliveryAddressCity,
      ReceivingWarehouseId: item.ReceivingWarehouseId,
      ReceivingSiteId: item.ReceivingSiteId,
    }));

    res.json(materials);
    console.log("Materials:", materials);
  } catch (error) {
    console.error(
      "PR Lines Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* GET SITE ID FROM D365FO */
app.get("/api/Sites_Id", async (req, res) => {
  try {
    console.log("started-sitesid")
    const accessToken = await getAccessToken();

    const response = await axios.get(
      "https://shlt-dev01185046dcf29ca8dcdevaos.axcloud.dynamics.com/api/services/SHLTPurchaseRequisitionServiceHeaderGroup/SHLTPurchaseRequisitionHeaderService/getSites",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        }
      }
    );
   console.log(response.data.value);
  res.json(response.data.value);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


/* PO Header List */
app.get("/api/POList", async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(process.env.PO_HEADER, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    const POList = response.data.value.map((item) => ({
      PurchaseOrderNumber: item.PurchaseOrderNumber,
      PurchaseOrderName: item.PurchaseOrderName,
      ProjectId: item.ProjectId,
      DocumentApprovalStatus: item.DocumentApprovalStatus,
      PurchaseOrderStatus: item.PurchaseOrderStatus,
    }));

    res.json(POList);
  } catch (error) {
    console.error(
      "PO List Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});