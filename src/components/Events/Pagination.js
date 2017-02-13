import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Pagination.scss';

export default class Pagination extends Component {

  render() {
    const {next, prev} = this.props;
    return (
      <div className={styles.container}>
        { next ? <Link className="pagination pagination-next" to={next}>Next</Link> : null }
        { prev ? <Link className="pagination pagination-prev" to={prev}>Prev</Link> : null }
      </div>
    )
  }
}