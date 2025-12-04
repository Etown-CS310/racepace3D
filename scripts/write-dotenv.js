const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '..', '.env');

// List the env vars you expect from EAS secrets
const vars = [
  'EXPO_PUBLIC_API_KEY',
  // add more names here: 'ANOTHER_SECRET',
];

const missing = vars.filter(name => !process.env[name]);
if (missing.length) {
  console.error('Missing required env vars:', missing.join(', '));
  process.exit(1);
}

const content = vars.map(name => `${name}=${process.env[name]}`).join('\n') + '\n';

fs.writeFileSync(outPath, content, { encoding: 'utf8', mode: 0o600 });
console.log(`Wrote .env to ${outPath}`);
