class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: "i",
      }
    } : {}
    this.query = this.query.find({ ...keyword });
    return this;
    // these lines will update the query to search for products where the name matches the pattern "keyword:"value".
  }
  filter() {
    const queryCopy = { ...this.queryStr }
    // Modifying the string to access the category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    //filter for price range and rating
    let queryStr = JSON.stringify(queryCopy);
    //regular expression /\b(gt|gte|lt|lte)\b/g matches any occurrence of "gt", "gte", "lt", or "lte" in the string, as long as they are whole words (i.e., not part of a larger word).
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);


    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1)

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
  //return this is for method chaining, multiple methods can be called on a single object in a single statement
};

module.exports = ApiFeatures;