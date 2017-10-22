const labelizer = blogPost => {
  if (blogPost.labels.length < 0) return "";
  return "#" + blogPost.labels.join(" #");
};

module.exports = {
  labelizer
};
