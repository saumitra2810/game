import React, {useEffect} from 'react';
import styled from "styled-components";

import Missiles from './missiles';
import FinishLine from './finish-line';
import Player from './player';
import Timer from './timer';

const Wrapper = styled.div`
    height: 70%;
`;

const PlayGround = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
`;

function isColliding(rect1, rect2){                         // adding 20 so that the collision happens more visibly
  let overlap = ((rect1.right - 20) > rect2.left &&
                (rect1.left + 20) < rect2.right &&
                rect1.bottom > rect2.top &&
                rect1.top < rect2.bottom);
  return overlap;
}



const Main: React.FC = () => {

  /*
    The following function does the following -
    1. Saves DOM references to the player, the missiles and the finish line.
    2. Requests frame callback using requestAnimationFrame
    3. Gets bounding rectangle for the playr and the missile and checks for collision.
    4. If no collision found, checks if it has reached the finish line.
    5. In the next frame, show prompt.
  */
  useEffect(() => {
    let didCollide = false, didFinish = false;
    let playerDomElement = document.getElementById("player");
    var finishLine = document.getElementById("finishLine");
    let missiles = document.querySelectorAll(".missile") || [];

    function checkCollision(){
      if(didCollide){
        let userInput = window.confirm("You lost! Want to try again?");
        if (userInput) {
          window.location.reload();
        }
      } else if(didFinish){
        let userInput = window.confirm("You won! Congratulations! Want to have another go?");
        if (userInput) {
          window.location.reload();
        }
      } else if(playerDomElement){
        let playerRectangle = playerDomElement.getBoundingClientRect();
        missiles.forEach(missile => {
          let missileRectangle = missile.getBoundingClientRect();
          if(isColliding(playerRectangle, missileRectangle)){
            didCollide = true;
            (missile as HTMLElement).style["animation-play-state"] = "paused";
          }
        });
        if(!didCollide && finishLine){
          let finishLineRectangle = finishLine.getBoundingClientRect();
          if(isColliding(playerRectangle, finishLineRectangle)){
            didFinish = true;
          }
        }
        window.requestAnimationFrame(checkCollision);
      } else {
        window.requestAnimationFrame(checkCollision);
      }
    }
    window.requestAnimationFrame(checkCollision);
  }, []);

  return (
      <Wrapper>
          <Timer />
          <PlayGround>
              <Player />
              <Missiles />
              <FinishLine />
          </PlayGround>
      </Wrapper>
  );
}
export default Main;
