const express = require("express");
const router = express.Router();

const { getPRList } = require("../services/d365Service");

router.get("/summary", async (req, res) => {
  try {
    const data = await getPRList();

    const result = {
      totalPurchaseIds: data.length,
      pending: 0,
      approved: 0,
      completed: 0
    };

    data.forEach((item) => {
      switch (item.Status) {
        case "Pending":
          result.pending++;
          break;

        case "Approved":
          result.approved++;
          break;

        case "Completed":
          result.completed++;
          break;
      }
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;