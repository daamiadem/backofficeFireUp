import React, { useState } from 'react';
import "./search.css"
import {DateRangePicker} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"
import { Calendar } from 'react-date-range';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';


function Searchtimepicker(props) {

  const [value, onChange] = useState(['00:00', '00:00']);
  console.log(value)


  props.passtimedata(value);

  return (
    <div> 
    <TimeRangePicker onChange={onChange} value={value}
     />
  </div>
  )
}

export default Searchtimepicker
