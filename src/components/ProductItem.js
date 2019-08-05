import React from 'react';

const ProductItem = ({ product: {name, id, surname, desc} }) => {

  return (
      <tr>
        <td className="col_name">{id}</td>
        <td className="col_name">{name}</td>
        <td className="col_name">{surname}</td>
        <td className="col_name">{desc}</td>
      </tr>
  );
};

export default ProductItem;
