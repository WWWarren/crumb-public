import React from 'react';
import { connect } from 'react-redux';

import './CrumbLogoStyles.scss';

const CrumbLogo = ({ items, defaultLogo, className, ingredients }) => {
  function getColor(item) {
    let color;

    ingredients.forEach(d => {
      if (d.id === item) {
        color = d.color;
      }
    });

    return color;
  }

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
            style={{ background: getColor(item) }}
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

export function mapStateToProps({ ingredients }) {
  return {
    ingredients: ingredients.list,
  }
}

export default connect(mapStateToProps)(CrumbLogo);
