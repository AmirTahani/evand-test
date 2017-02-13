import React, { Component } from 'react';
import styles from './Search.scss';

export default class Search extends Component {

  handleChange(event) {
    if (event.target.value !== '') {
      this.props.onChange(event.target.value);
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <input type="text" placeholder="Search" onBlur={this.handleChange.bind(this)} defaultValue={this.props.value}/>
      </div>

    )

  }
}