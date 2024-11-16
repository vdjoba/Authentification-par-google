const express = require('express');
const app = express();
const PORT = 5055;

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

app.get('/api/setting/store-setting/seo', (req, res) => {
    res.status(200).json({ message: "SEO settings fetched successfully!" });
});

app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
