import React, { Component } from 'react';
import { connect } from 'react-redux';

import './CrumbLogoStyles.scss';

class CrumbLogo extends Component {
  getColor = (item) => {
    const { ingredients } = this.props;
    let color;

    ingredients.forEach(d => {
      if (d.id === item) {
        color = d.color;
      }
    });

    return color;
  }

  render() {
    const { items, defaultLogo, className } = this.props;
    return (
      <div
        className={`${'crumbLogo__container'} ${className}`}
      >
        <span
          className="crumbLogo__topSlice"
        />
        {
          items && items.map((item, key) => (
            <span
              key={key}
              style={{ background: this.getColor(item) }}
              className="crumbLogo__fillingItem"
            />
          ))
        }
        {
          defaultLogo &&
            <>
              <span
                style={{ background: '#7EA16B' }}
                className="crumbLogo__fillingItem"
              />
              <span
                style={{ background: '#DA9F93' }}
                className="crumbLogo__fillingItem"
              />
            </>
        }
        <span
          className="crumbLogo__bottomSlice"
        />
      </div>
    );
  }
}

export function mapStateToProps({ ingredients }) {
  return {
    ingredients: ingredients.list,
  }
}

export default connect(mapStateToProps)(CrumbLogo);
