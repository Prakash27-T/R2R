import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;


app.get("/api/Projects", async (req, res) => {
    try 
    {

      // STEP 1 - Get Token
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
          "Content-Type":
            "application/x-www-form-urlencoded"
        }
      }
      );

       const accessToken =
      tokenResponse.data.access_token;

       console.log("Token:", accessToken);

      if (!accessToken) {
          return res.status(401).json({
        error: "No Access Token"
         });
    }
      const projectList =
      response.data.value.map(item => ({
        projectId: item.ProjectID,
        projectName: item.ProjectName,
        status: item.Status,
        projectStage: item.ProjectStage,
        
         }));

    console.log(projectList);

    res.json(projectList);

  } catch (error) {

  console.log("FULL ERROR");

  console.log(error);

  console.log("Message:");
  console.log(error.message);

  console.log("Response:");
  console.log(error.response?.data);

  res.status(500).json({
    message: error.message,
    details: error.response?.data
  });
  }
   });

app.listen(5000, () => {
  console.log("Server Running");
});