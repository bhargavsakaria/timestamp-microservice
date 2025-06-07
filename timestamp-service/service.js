const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({
	path: path.join(__dirname, "..", ".env"),
});

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/api/:date", (req, res) => {
	const dateParam = req.params.date;

	if (!dateParam) {
		const now = new Date();
		return res.json({ unix: now.getTime(), utc: now.toUTCString() });
	}

	const timestamp = isNaN(dateParam)
		? Date.parse(dateParam)
		: parseInt(dateParam);
	const date = new Date(timestamp);

	if (isNaN(date.getTime())) {
		return res.json({ error: "Invalid Date" });
	}

	return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

const PORT = process.env.TIMESTAMP_SERVICE_PORT || 4000;
app.listen(PORT, () => {
	console.log(`Timestamp Service listening on port ${PORT}`);
});
