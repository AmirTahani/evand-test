export default class Url {
  path = '';
  rawQuery = {};
  query = {
    cities: [],
    categories: []
  };

  setQuery(query) {
    this.rawQuery = {...query};
    Object.keys(query).map(key => {
      if (key === 'cities' || key === 'categories') {
        this.setArray(key, query[key]);
      } else {
        this.set(key, query[key]);
      }
    });
    return this;
  }

  set(key, value) {
    this.query[key] = value;
    return this;
  }

  setPath(value) {
    this.path = value;
    return this;
  }

  setArray(key, value) {
    value = value.split(',');
    if (this.query[key]) {
      this.query[key] = [...value];
    }
    else {
      this.query[key] = value;
    }
    return this;
  }

  toggleArray(key, value) {
    if (this.query[key]) {
      if (this.query[key].includes(value)) {
        this.query[key] = this.query[key].filter(item => item !== value);
      }
      else {
        this.query[key] = [...this.query[key], value];
      }
    }
    else {
      this.setArray(key, value)
    }
    return this;
  }

  unSet(key) {
    delete this.query[key];
    return this;
  }

  clearQuery() {
    this.query = {};
    return this;
  }

  getQuery() {
    return this.query;
  }

  getQueryString() {
    const query = this.getQuery();
    return Object.keys(query).reduce((accumulator, current) => {
      if (query[current].length === 0) {
        return accumulator;
      } else {
        if (Array.isArray(query[current])) {
          accumulator.push(`${current}=${query[current].join(',')}`);
          return accumulator;
        } else {
          accumulator.push(`${current}=${query[current]}`);
          return accumulator
        }
      }
      return accumulator;
    }, []).join('&');
  }

  duplicate() {
    const temp = new Url();
    temp.setQuery(this.rawQuery);
    temp.setPath(this.path);
    return temp;
  }

}