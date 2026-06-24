const fs = require('fs');
const files = ['package-lock.json', 'yarn.lock'];
for (const file of files) {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  } catch (_error) {
    // ignore
  }
}

const ua = process.env.npm_config_user_agent || '';
if (!/^pnpm\//.test(ua)) {
  console.error('Use pnpm instead');
  process.exit(1);
}
