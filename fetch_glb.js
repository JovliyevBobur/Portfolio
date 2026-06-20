const fs = require('fs');

async function run() {
  const htmlRes = await fetch('https://maqsadbek370.netlify.app');
  const html = await htmlRes.text();
  const regex = /\/assets\/[^"']+\.js/g;
  const matches = html.match(regex) || [];
  
  for (const match of matches) {
    const jsRes = await fetch(`https://maqsadbek370.netlify.app${match}`);
    const js = await jsRes.text();
    const glbRegex = /https:\/\/[^"']+\.glb/g;
    const glbMatches = js.match(glbRegex) || [];
    if (glbMatches.length > 0) {
      console.log(`Found GLB in ${match}:`);
      console.log(glbMatches);
    }
  }
}
run();
