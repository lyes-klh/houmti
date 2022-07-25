class APIFeatures {
  constructor(DBQuery, reqQuery) {
    this.DBQuery = DBQuery;
    this.reqQuery = reqQuery;
  }

  filter() {
    let queryObj = { ...this.reqQuery };
    const specialFeatures = ['page', 'limit', 'sort', 'fields'];

    specialFeatures.forEach((item) => delete queryObj[item]);

    queryObj = JSON.parse(
      JSON.stringify(queryObj).replace(
        /gt|gte|lt|lte|ne|eq/g,
        (match) => `$${match}`
      )
    );

    this.DBQuery = this.DBQuery.find(queryObj);
    return this;
  }

  sort() {
    if (this.reqQuery.sort) {
      const sortOptions = this.reqQuery.sort.replace(',', ' ').trim();
      this.DBQuery = this.DBQuery.sort(sortOptions);
    } else {
      this.DBQuery = this.DBQuery.sort('-createdAt');
    }

    return this;
  }

  project() {
    if (this.reqQuery.fields) {
      const fields = this.reqQuery.fields.replace(',', ' ').trim();
      this.DBQuery = this.DBQuery.select(fields);
    } else {
      this.DBQuery = this.DBQuery.select('-__v');
    }

    return this;
  }

  paginate() {
    const limit = this.reqQuery.limit || 10;
    const page = this.reqQuery.page || 1;

    const skip = (page - 1) * limit;
    this.DBQuery = this.DBQuery.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
