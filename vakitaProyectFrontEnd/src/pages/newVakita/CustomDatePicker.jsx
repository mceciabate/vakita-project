import React from 'react';
import {  ErrorMessage } from 'formik';
import "../../styles/newVakitaPage.css"

function CustomDatePicker({ field, form, ...props }) {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()); // Se suma 1 año
  
    return (
      <div className="boxItems">
        <label htmlFor={field.name} className='labelDate'>{props.label}</label>
        <input
          type="date"
          id={field.name}
          name={field.name}
          min={today.toISOString().split('T')[0]} // Fecha mínima (fecha de inicio)
          max={maxDate.toISOString().split('T')[0]} // Fecha máxima (1 año desde hoy)
          {...field}
          {...props}
        />
        <div className='error'>
          <ErrorMessage name={field.name} component="div" />
        </div>
      </div>
    );
}

export default CustomDatePicker