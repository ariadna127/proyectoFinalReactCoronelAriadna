import React, { useState } from 'react'
import './itemDetail.css'
import { useCartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
const ItemDetail = ({ item }) => {

    const [goToCart, setGoToCart] = useState(false);
    const { addProduct } = useCartContext();
    const onAdd = (quantity) => {
        setGoToCart(true);
        addProduct(item, quantity);
    }



    return (
        <div className='row'>
            <div className='mt-5 mb-5 d-flex gap-5 justify-content-center'>
                <div>
                    <img className='imagen-detail' src={item.img} alt={item.title} />
                </div>
                <div>
                    <h3>{item.title}</h3>
                    <p className='text-secondary' ><strong>$ {item.price}</strong></p>
                    <p>{item.description}</p>
                    <p  className='p-detail'> Stock: <span>{item.stock}</span> </p>
                    <p className='p-detail'>Categoria: <span> {item.category} </span></p>
                    <div className='mt-5 div-detail'>
                        {goToCart ? <Link to='/cart' className='link'>Ir al carrito</Link> : <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />}
                    </div>
                    
                </div>

            </div>

        </div>
    )
}

export default ItemDetail