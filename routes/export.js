const express = require('express');
const router  = express.Router();
const getSalesData = () => require('../data/sales');

router.get('/csv', (req, res) => {
  const records = getSalesData();
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', 'attachment; filename="sales_report.csv"');
  res.send(toCSV(records));
});

function toCSV(records) {
  if (!records.length) return '';
  const headers = Object.keys(records[0]);
  const escape  = v => (typeof v === 'string' && (v.includes(',') || v.includes('"'))
    ? `"${v.replace(/"/g, '""')}"` : v);
  const rows = records.map(r => headers.map(h => escape(r[h])).join(','));
  return [headers.join(','), ...rows].join('\r\n');
}

module.exports = router;