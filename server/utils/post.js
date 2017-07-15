module.exports = array => array.map((obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
    newObj[newKey] = obj[key];
  });
  return newObj;
});
