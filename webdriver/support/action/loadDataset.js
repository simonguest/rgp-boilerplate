/**
 * Load a Dataset
 * @param  {String}   dataset The Dataset to load
 * @param  {Function} done Function to execute when finished
 */
module.exports = (dataset, done) => {
    let previousUrl = browser.getUrl();
    let url = `/test/datasets/${dataset}`;
    browser.url(url);
    expect(browser.source().value).to.contain('{"status":"success"}');
    browser.url(previousUrl);
    done();
};
