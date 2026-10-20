const { execSync } = require('child_process');
const paw = process.env.USERPROFILE + '\\.meituan-catpaw\\bin\\paw.cmd';
const cmd = `browser-action "{\\"action\\":\\"evaluate\\",\\"script\\":\\"document.querySelector('.cat-third-card').href\\"}"`;
try {
  const out = execSync(`"${paw}" ${cmd}`, { encoding: 'utf8', timeout: 15000 });
  console.log(out.slice(-800));
} catch (e) {
  console.log('ERROR:', e.stderr || e.message);
}
