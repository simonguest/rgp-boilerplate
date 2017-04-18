module.exports.terminate = () => {
  return new Promise((resolve, reject) => {
    process.exit(0);
  });
};