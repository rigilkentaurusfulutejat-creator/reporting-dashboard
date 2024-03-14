const express = require('express');
const path = require('path');
const exportRouter = require('./routes/export');

const app = express();
const PORT = 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Mount export route
app.use('/api/export', exportRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Reporting dashboard running at http://localhost:${PORT}`);
});
