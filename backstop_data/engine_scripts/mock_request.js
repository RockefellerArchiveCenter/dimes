const fs = require('fs')

function createFilepath(label, url, method) {
  const labelSanitize = label.replace(/\s/g, "_").toLowerCase()
  const urlSanitize = url.replace("http://", "").replace("https://", "").replace(/\//g, "_").replace("?", "-").replace(":", "--")
  return `backstop_data/request_reference/${labelSanitize}__${urlSanitize}__${method.toLowerCase()}`
}

module.exports = async (page, scenario, vp, isReference) => {
  await require('./puppet/loadCookies')(page, scenario);
  
  await page.setRequestInterception(true);

  page.on("request", req => {
    const fixturePath = createFilepath(scenario.label, req.url(), req.method())
    if (req.method() === 'OPTIONS') {
      req.respond({
        status: 200,
        headers: {
          'access-control-allow-headers': 'accept, accept-encoding, authorization, content-type, dnt, origin, user-agent, x-csrftoken, x-requested-with',
          'access-control-allow-methods': 'DELETE, GET, OPTIONS, PATCH, POST, PUT',
          'access-control-allow-origin': '*',
          'access-control-max-age': '86400',
          'content-length': '0',
          'content-type': 'text/html; charset=utf-8',
        }
      })
    } else if (fs.existsSync(fixturePath)) {
      const stubText = fs.readFileSync(fixturePath, {encoding:'utf8', flag:'r'})
      const stubResponse = JSON.parse(stubText)
      if (stubResponse) {
        req.respond({
          status: 200,
          content: 'application/json',
          headers: {"Access-Control-Allow-Origin": "*"},
          body: JSON.stringify(stubResponse)
        });
      }
    } else {
      if (req.url().includes('api.rockarch.org') || req.url().includes('rac-vch')) {
        console.log(fixturePath)
      }
      req.continue();
    }
  })
};