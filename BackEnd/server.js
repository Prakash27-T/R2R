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

    res.json(response.data.value);
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});