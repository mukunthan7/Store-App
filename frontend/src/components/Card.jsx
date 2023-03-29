import {React} from 'react';
import "./card.css"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';

export default function Card(props){
    return(
        <div className='card_component'>
            <div className='card'>
                <p> <span className="counter__output">{props.counter}</span> Products</p>
                <h2>{props.name}</h2>
                <div className='lastLine'> 
                <Link to={props.link} className='Link' ><p>View details</p>< KeyboardArrowRightIcon /></Link>
                </div>
            </div>
        </div>
    )
}