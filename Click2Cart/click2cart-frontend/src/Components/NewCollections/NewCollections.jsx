import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = (props) => {
  return (
    <div className='new-collections container'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="row">
      {props.data.map((item, i) => (
        <div className="col-md-3" key={i}>
            <div className="collections">
             <Item id={item.id} key={i} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
            </div>
        </div>
      ))}
      </div>
      {/* <div className="collections">
        {props.data.map((item,i)=>{
                return <Item id={item.id} key={i} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
            })}
      </div> */}
    </div>
  )
}

export default NewCollections
