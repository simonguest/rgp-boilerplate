module.exports.terminate = () => {
  return new Promise(() => {
    process.exit(0);
  });
};
