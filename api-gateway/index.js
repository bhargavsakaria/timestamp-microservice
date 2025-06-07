const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files (CSS, client-side JS)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

// Serve index.html from views/
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Proxy to timestamp-service
app.get("/timestamp/:date", async (req, res) => {
	try {
		const { date } = req.params;
		const tsPort = process.env.TIMESTAMP_SERVICE_PORT || 4000;
		const response = await axios.get(
			`http://timestamp-service:${tsPort}/api/${date || ""}`
		);
		res.json(response.data);
	} catch (err) {
		res.status(500).json({ error: "Timestamp service unreachable" });
	}
});

const PORT = process.env.API_GATEWAY_PORT || 3000;
app.listen(PORT, () => {
	console.log(`API Gateway running on port ${PORT}`);
});
