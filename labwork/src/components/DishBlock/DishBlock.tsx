import React from 'react'
import './DishBlock.css'
import IDishBlockProps from './IDishBlockProps'
import './DishBlock.css'

const DishBlock: React.FunctionComponent<IDishBlockProps> = (props): React.ReactElement => {

    return(
        <div className='DishBlock'>
            <div className='DishBlock__inner'>
                <img className='DishBlock_image' src={props.dish.imageSrc} alt={`${props.dish.name}_image`}/>
                <p>{props.dish.name}: {props.dish.cost} KZT</p>
            </div>
            <div className='DishBlock__inner'>
                <button onClick={props.editDish}>Edit</button>
                <button onClick={props.deleteDish}>Delete</button>
            </div>
        </div>
    )
}

export default DishBlock