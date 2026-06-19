import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/PRList", async (req, res) => {
  try {

    const tokenResponse = await axios.post(
      "https://login.microsoftonline.com/a5bc2758-f276-4349-916f-7cec75e119a6/oauth2/v2.0/token",
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

    const response = await axios.get(
      "https://shlt-dev01185046dcf29ca8dcdevaos.axcloud.dynamics.com/data/PurchaseRequisitionLinesV2",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json"
        }
      }
    );

    const PRList = response.data.value.map(item => ({
      ProjectId: item.ProjectId,
      ProductName: item.ProductName,
      RequestedDate: item.RequestedDate,
      PurchasePriceQuantity: item.PurchasePriceQuantity,
      LineStatus: item.LineStatus
    }));

    res.json(PRList);

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      message: error.message
    });

  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});