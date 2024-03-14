const express = require('express');
const router  = express.Router();
const { getSalesData } = require('../data/sales');

router.get('/csv', (req, res) => {
  const records = getSalesData();

  // BUG introduced in commit 4f2a9c1 (2024-03-14): Content-Type was changed from
  // 'text/csv' to 'text/html' during a merge of the response-header refactor branch.
  res.setHeader('Content-Type', 'text/html');

  // res.setHeader('Content-Disposition', 'attachment; filename="sales_report.csv"');

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
