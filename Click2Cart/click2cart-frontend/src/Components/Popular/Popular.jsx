import React from 'react'
import './Popular.css'
import Item from '../Item/Item'

const Popular = (props) => {
  const filteredProducts = props.data.filter(
    (item) => {
      // debugger
      // item.name.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
      return item.category.toLowerCase().includes(props?.searchTerm?.toLowerCase())
    });

  return (
    <div className='popular container'>
  <h1>Products</h1>
  <hr />
  <div className="row">
    {props.data.map((item, i) => (
      <div className="col-md-3" key={i}>
        <div className="popular-item">
          <Item
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default Popular
