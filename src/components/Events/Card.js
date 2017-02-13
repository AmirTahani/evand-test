import React, { Component } from 'react';
import { Column, Row } from 'cathode';
import Styles from './Card.scss';

export default class Card extends Component {
  render() {
    const {src , title} = this.props;
    return (
      <div className={Styles.container}>
          <Row>
            <Column sm={24}>
              <div className="card-header">
                <img className="card-image" src={src} alt="logo"/>
                <h4 className="card-title">{title}</h4>
              </div>
            </Column>

          </Row>
      </div>
    );
  }
}