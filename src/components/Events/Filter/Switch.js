import React, { Component } from 'react';
import styles from './Switch.scss';

export default class Switch extends Component {

  handleChange() {
    this.props.onChange(this.refs.checkBox.checked);
  }

  render() {
    const {label, checked} = this.props;
    return (
      <div className={styles.container}>
        <label>{label}</label>
        <input type="checkbox" checked={checked} ref='checkBox' onChange={this.handleChange.bind(this)}/>
      </div>
    );

  }
}