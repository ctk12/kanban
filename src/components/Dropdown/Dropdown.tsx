import React from 'react';

import './Dropdown.scss';

export function Dropdown(props: { text: string }) {
  const deleteItem = () => {
    // eslint-disable-next-line no-console
    console.log('hi deleted Item');
  };
  // const dropdownRef = useRef(null);

  // const handleClick = (event: MouseEvent) => {
  //   if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
  //     props.onClose();
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('click', handleClick);

  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // });

  return (
    <div className="dropdown">
      <a
        href="#delete"
        // style={{
        //   textDecoration: 'none',
        //   color: 'inherit',
        //   backgroundColor: 'transparent',
        //   cursor: 'pointer',
        // }}
        onMouseDown={() => deleteItem()}
      >
        {props.text}
      </a>
    </div>
  );
}
