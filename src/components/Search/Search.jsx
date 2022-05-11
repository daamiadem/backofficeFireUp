import React, { useState } from 'react';
import "./search.css"
import {DateRangePicker} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"
import { Calendar } from 'react-date-range';


function Search(props) {
  const [startDate, setStartDate] =useState(new Date());
  const [endDate, setEndDate] =useState(new Date());

  const selectionRange= {
    startDate:startDate,
    endDate:endDate,
    key:"selection",
  }

  function handleSelect(ranges){
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);

   

  
  }

  props.passChildData(startDate);
    props.passChildData2(endDate);
  return (
    <div className='search'>
      <DateRangePicker ranges={
        [selectionRange]} onChange={handleSelect}
        minDate={new Date()}

        
        />


      
    </div>
  )
}

export default Search
