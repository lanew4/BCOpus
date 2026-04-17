#!/usr/bin/env node

const { execSync } = require('child_process');

// Bloom County ran in two distinct periods
const RANGES = [
  { start: new Date('1980-04-20'), end: new Date('1989-08-06') },
  { start: new Date('2015-07-12'), end: new Date() },
];

function daysBetween(a, b) {
  return Math.floor((b - a) / 86400000);
}

function randomDate() {
  const totalDays = RANGES.reduce((sum, r) => sum + daysBetween(r.start, r.end), 0);
  let pick = Math.floor(Math.random() * totalDays);

  for (const range of RANGES) {
    const span = daysBetween(range.start, range.end);
    if (pick < span) {
      const date = new Date(range.start.getTime() + pick * 86400000);
      return date;
    }
    pick -= span;
  }
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return { y, m, d };
}

const date = randomDate();
const { y, m, d } = formatDate(date);
const url = `https://www.gocomics.com/bloomcounty/${y}/${m}/${d}`;

console.log(`Opening Bloom County for ${y}-${m}-${d}...`);
execSync(`open "${url}"`);
