function paginatedResults(array) {
  return (req, res, next) => {
    const { page, limit } = parseInt(req.query);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < array.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = array.slice(startIndex, endIndex);
    res.paginatedResults = results;
    next();
  };
}

module.exports = { paginatedResults };
