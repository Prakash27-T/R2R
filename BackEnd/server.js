import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/PRList", async (req, res) => {
  try {

    const tokenResponse = await axios.post(
      process.env.D365_TOKEN_URL,
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "client_credentials",
        scope: process.env.SCOPE
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;
    console.log(accessToken)

    const response = await axios.get(
      process.env.PR_HEADER,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json"
        }
      }
    );

    const PRList = response.data.value.map(item => ({
      ProjectId: item.DefaultProjectId,
      RequisitionNumber: item.RequisitionNumber,
      RequisitionName: item.RequisitionName,
      RequestedDate: item.DefaultRequestedDate,
      RequisitionPurpose: item.RequisitionPurpose,
      LineStatus: item.RequisitionStatus,
      
    }));

    res.json(PRList);

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: error.message
    });

  }
});
/* PR_LISTLINE*/
app.use("/api", router);
router.get("/PR_lines/:RequisitionNumber", async (req, res) => {
  try {
     const { RequisitionNumber } = req.params;
      const accessToken = await getAccessToken();
    const response = await axios.get(
       `${process.env.PR_DETAIL_LINEPAGE}?$filter=RequisitionNumber eq '${RequisitionNumber}'`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        }
      }
    );
    console.log("RequisitionNumber:", RequisitionNumber);
    res.json(response.data.value);
  } catch (error) {
    console.error("PR Lines Error:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
     }
    });

   //export default router;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});