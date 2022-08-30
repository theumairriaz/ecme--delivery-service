import React from 'react';

import './style.css';

function Table(props: any) {
  return (
    <table className='rwd-table'>
      <tbody>
        <tr>
          <th>Description</th>
          <th>Cost</th>
        </tr>
        {props.entries.map((e: any) => (
          <tr key={e.description + e.cost}>
            <td data-th='Description'>{e.description}</td>
            <td data-th='Description'>{e.cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
