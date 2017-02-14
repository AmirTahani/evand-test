import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './DropDown.scss';

export default class DropDown extends Component {
  state = {
    show: false,
    param: []
  }

  renderOptions = options => {
    return (
      options.data.map((item, key) => {
        const queryString = this.props.url.duplicate().toggleArray(options.name, options.optionValue(item)).getQueryString();
        const queryParam = this.props.url.duplicate().getQuery()[options.name];
        const selected = queryParam.includes(options.optionValue(item));

        return <Link
          className={`option ${selected ? 'selected' : ''}`}
          key={key}
          to={`${this.props.location.pathname}?${queryString}`}
          onClick={this.handleClick.bind(this)}
        >
          {options.optionLabel(item)}
        </Link>
      })
    )
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    const {data} = this.props;
    const queryParam = this.props.url.duplicate().getQuery()[data.name];
    return (
      <div className={styles.container}>
        <div
          className="title"
          onClick={this.handleClick.bind(this)}
        >
          {queryParam && queryParam.length !== 0 ? queryParam.join(',') : data.label}
        </div>
        {
          this.state.show ? <div>
              {
                this.renderOptions(data)
              }
            </div> : ''
        }

      </div>
    );
  }
};