const { execFileSync } = require('child_process');
const paw = process.env.USERPROFILE + '\\.meituan-catpaw\\bin\\paw.cmd';

// Navigate to cat.html food/coffee
execFileSync('cmd', ['/c', paw, 'browser-action', '{"action":"navigate","url":"http://localhost:8080/cat.html?c=food&s=%E5%92%96%E5%95%A1","waitUntil":"networkidle"}'],
  { encoding: 'utf8', timeout: 15000, stdio: ['inherit','pipe','pipe'] });
console.log('Navigated, waiting...');

// Wait for page to render then evaluate
setTimeout(() => {
  try {
    const out = execFileSync('cmd', ['/c', paw, 'browser-action', '{"action":"evaluate","script":"var c=document.querySelector(\\".cat-third-card\\"); c?c.href:\\"NONE\\""}'],
      { encoding: 'utf8', timeout: 10000, stdio: ['inherit','pipe','pipe'] });
    // Last line should be the result
    const lines = out.trim().split('\n');
    console.log('First third-level card href:', lines[lines.length-1]?.slice(-300));
  } catch (e) {
    console.log('Eval error:', e.stderr?.slice(-200) || e.message?.slice(-200));
  }
}, 2500);
