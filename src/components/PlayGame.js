import React, { useEffect, useRef, useState } from 'react'

import { Wheel } from 'react-custom-roulette'

export default function HomeTest() {
  const data = [
    {
      option: 'VND 5K',
      style: {
        backgroundColor: '#62c050',
        textColor: 'white',
      },
    },
    {
      option: 'VND 10K',
      style: { backgroundColor: '#699ee5', textColor: 'white' },
    },
    {
      option: 'May mắn lần sau',
      style: { backgroundColor: '#fb8e42', textColor: 'white' },
    },
    {
      option: 'VND 20K',
      style: { backgroundColor: '#e83d45', textColor: 'white' },
    },
    {
      option: 'VND 30K',
      style: { backgroundColor: '#62c050', textColor: 'white' },
    },
    {
      option: 'May mắn lần sau',
      style: { backgroundColor: '#699ee5', textColor: 'white' },
    },
    {
      option: 'VND 50K',
      style: { backgroundColor: '#fb8e42', textColor: 'white' },
    },
    {
      option: 'Còn cái nịt',
      style: { backgroundColor: '#e83d45', textColor: 'white' },
    },
  ]

  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)

  const handleSpinClick = () => {
    const newPrizeNumber = 3
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  const handleSpinStop = (e) => {
    setMustSpin(false)
  }

  return (
    <div className="game" initial="hide" animate="visible">
      <div className="game_content">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleSpinStop}
          outerBorderColor="#4E5452"
          outerBorderWidth={3}
          innerBorderColor="#4E5452"
          innerBorderWidth={3}
          radiusLineColor="#4E5452"
        />

        <button
          whileHover="hover"
          className="game_content_spin"
          onClick={handleSpinClick}
        >
          Quay thưởng
        </button>
      </div>

      {/* when spin stop => show prize component */}
    </div>
  )
}
