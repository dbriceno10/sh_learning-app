import React from 'react';

function Categorias({categoria}) {
  return <div>
      <label>
          <input key={categoria} type='checkbox' name='categoria' value={categoria}/>{categoria }
      </label>
  </div>;
}

export default Categorias;
