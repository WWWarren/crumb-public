import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Scrollbar from 'react-scrollbars-custom';

import arrowDownIcon from '../../../images/icons/arrow-down-icon.svg';
import arrowUpIcon from '../../../images/icons/arrow-up-icon.svg';

import './Select.scss';

const SelectBox = ({ items, itemKey, selectBoxWidth, selectItem, id }) => {
  const [container] = useState(() => {
    const el = document.createElement('div');
    return el
  })

  useEffect(() => {
    const root = document.querySelector(`.form-select__${id}`);
    root.appendChild(container);
    return () => {
      root.removeChild(container);
    }
  }, [container, id])

  function showItems() {
    if (items) {
      const item = items.map((item, i) => (
        <div
          key={i}
          onClick={() => selectItem(item)}
          className="form-select__selectOption"
        >
          <span className="form-select__selectOptionName">{item[itemKey]}</span>
          {item.type ? <div className="form-select__selectOptionType">{item.type}</div> : ''}
        </div>
      ))
      return item;
    };
  }

  return ReactDOM.createPortal(
    <Scrollbar
      style={{ width: selectBoxWidth + 3, height: 125, position: 'fixed', zIndex: 999 }}
    >
      <div
        className="form-select__selectOptions"
      >
        {showItems()}
      </div>
    </Scrollbar>,
    container,
  );
}

const Select = ({ value, input, onClick, items, itemKey, addMargin }) => {
  const selectBox = useRef();
  const [selected, setSelected] = useState(value);
  const [open, setOpen] = useState(false);

  function selectItem(item) {
    input.onChange(item.id);

    setOpen(false);
    setSelected(item[itemKey]);

    if (onClick) onClick(item);
  }

  return (
    <div
      className={`form-select__selectContainer form-select__${input.name}`}
      style={{
        marginBottom: addMargin ? 10 : 0,
      }}
    >
      <div
        {...input}
        className={`form-select__selectBox ${open ? 'form-select__selectBox_open' : ''}`}
        onClick={() => setOpen(!open)}
        ref={selectBox}
      >
        {selected ? selected : 'Select'}
        <img className="form-select__selectArrow" src={open ? arrowUpIcon : arrowDownIcon} alt="" />
      </div>
      {
        open &&
          <SelectBox
            id={input.name}
            items={items}
            itemKey={itemKey}
            selectItem={selectItem}
            selectBoxWidth={selectBox.current ? selectBox.current.clientWidth : 0}
          />
      }
    </div>
  )
}

export default Select;
