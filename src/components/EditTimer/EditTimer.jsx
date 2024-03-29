import React, { useState } from 'react';
import './EditTimer.css';

const EditTimer = ({
  handleAtZeroState,
  handleIsShownState,
  parentCallback,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [hours, setHours] = useState(0);

  const windowWidth = window.innerWidth;

  const regex = /[^0-9]/;

  function handleSecondsChange(e) {
    e.target.value = e.target.value.replace(regex, '');

    if (e.target.value > 59) {
      e.target.value = 59;
    } else if ((e.target.value < 0) | e.target.value.includes('00')) {
      e.target.value = 0;
    } else if (e.target.value === '') {
      e.target.value = 0;
    }
    setSeconds(parseInt(e.target.value));
  }

  function handleMinutesChange(e) {
    e.target.value = e.target.value.replace(regex, '');

    if (e.target.value > 59) {
      e.target.value = 59;
    } else if ((e.target.value < 0) | e.target.value.includes('00')) {
      e.target.value = 0;
    } else if (e.target.value === '') {
      e.target.value = 0;
    }
    setMinutes(parseInt(e.target.value));
  }

  function handleHoursChange(e) {
    e.target.value = e.target.value.replace(regex, '');

    if (e.target.value > 99) {
      e.target.value = 99;
    } else if ((e.target.value < 0) | e.target.value.includes('00')) {
      e.target.value = 0;
    } else if (e.target.value === '') {
      e.target.value = 0;
    }
    setHours(parseInt(e.target.value));
  }

  const saveHandleClick = () => {
    parentCallback(seconds, minutes, hours);
    handleIsShownState();
  };

  const handleCancelClick = () => {
    handleIsShownState();
  };

  return (
    <section className='edit-wrapper'>
      <div className='main-edit_container'>
        <div className='input-container'>
          <p className='edit-text'>{windowWidth < 500 ? 'Hrs' : 'Horas'}</p>
          <input
            type='text'
            onChange={handleHoursChange}
            value={hours}
            min='0'
            max='24'
            className='edit-input'
          />
          <p className='edit-text'>{windowWidth < 500 ? 'Min' : 'Minutos'}</p>
          <input
            type='text'
            onChange={handleMinutesChange}
            value={minutes}
            min='0'
            max='59'
            className='edit-input'
          />
          <p className='edit-text'>{windowWidth < 500 ? 'Seg' : 'Segundos'}</p>
          <input
            type='text'
            onChange={handleSecondsChange}
            value={seconds}
            className='edit-input'
          />
        </div>

        <div className='checkbox-container'>
          <label className='checkbox'>
            <input
              id='stop-at-zero'
              defaultChecked
              name='at-zero'
              type='radio'
              className='checkbox-input'
              onChange={handleAtZeroState}
            />
            Parar temporizador
          </label>

          <label className='checkbox'>
            <input
              id='restart-at-zero'
              name='at-zero'
              type='radio'
              className='checkbox-input'
              onChange={handleAtZeroState}
            />
            Reiniciar temporizador
          </label>
        </div>

        <div className='buttons-container'>
          <button className='timer-button' onClick={saveHandleClick}>
            Guardar
          </button>
          <button className='timer-button' onClick={handleCancelClick}>
            Cancelar
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditTimer;
