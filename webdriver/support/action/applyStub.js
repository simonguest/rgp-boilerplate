/**
 * Apply Stub
 * @param  {string} stub Name of the stub
 * @param  {Function} done Function to execute when finished
 */
module.exports = (stub, done) => {
  console.log(stub);
  let previousUrl = browser.getUrl();
  let url = `/test/stubs/${stub}`;
  browser.url(url);
  expect(browser.source().value).to.contain('{"status":"success"}');
  browser.url(previousUrl);
  done();
};