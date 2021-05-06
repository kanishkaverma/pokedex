import React from 'react';

const InfoButton = ({ title, children, onClick }) => {
  return (
    <div className='key' title={title} onClick={onClick}>
      {children}
    </div>
  );
};

export default InfoButton;
