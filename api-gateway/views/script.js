async function fetchTimestamp() {
	const input = document.getElementById("dateInput").value.trim();
	const endpoint = `/timestamp/${encodeURIComponent(input)}`;
	const resultDiv = document.getElementById("result");

	try {
		const res = await fetch(endpoint);
		const data = await res.json();
		resultDiv.innerHTML = data.error
			? `Error: ${data.error}`
			: `Unix: ${data.unix}<br>UTC: ${data.utc}`;
	} catch (err) {
		resultDiv.textContent = "Error contacting the server.";
	}
}
