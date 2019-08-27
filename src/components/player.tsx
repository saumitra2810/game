import React, {useState, useContext, useEffect} from 'react';
import ReactSVG from 'react-svg';
import styled from "styled-components";
import PlayerContext from '../context/player-info';

const containerStyling: React.CSSProperties = {
  width: '50px',
  fill: '#aaa',
  height: '50px',
  position: 'relative',
  transition: 'all 2s linear'
};

const Player: React.FC = () => {
    const player = useContext(PlayerContext);
    const [ direction, setDirection ] = useState('right');
    const isRunning = player["isRunning"];

    function changeDirection(event) {
      let pressedArrowKey = false;
      if (event.keyCode === 39) {
        setDirection('right');
        pressedArrowKey = true;
      }
      if (event.keyCode === 37) {
        setDirection('left');
        pressedArrowKey = true;
      }
      if(!isRunning && pressedArrowKey){
        player["toggleRunning"]();
      }
    }

    useEffect(() => {
      onkeydown = changeDirection;
    }, []);

    return (
      <div id="player" style={{...containerStyling, left: (isRunning ? (direction === "right" ? '98%' : '0%') : 0) }}>
          <ReactSVG
              src="running-man.svg"
            />
      </div>
    );
}

export default Player;
