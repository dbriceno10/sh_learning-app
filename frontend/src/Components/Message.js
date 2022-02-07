import React from 'react';

const Message = ({ msg, bgColor }) => {
  let styles = {
    padding: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    backgroundColor: bgColor,
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: '0.5rem'
  }
  return (
    <div style={styles}>
      {/* <p>{msg}</p> */}
      <p dangerouslySetInnerHTML={{ __html: msg}}/>
    </div>
  )
};

export default Message;
