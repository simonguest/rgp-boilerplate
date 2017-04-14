/**
 * Reset Stubs
 * @param  {Function} done Function to execute when finished
 */
module.exports = (done) => {
  let previousUrl = browser.getUrl();
  let url = `/test/stubs/reset`;
  browser.url(url);
  expect(browser.source().value).to.contain('{"status":"success"}');
  browser.url(previousUrl);
  done();
};