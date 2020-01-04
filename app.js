
  const TIMER = document.getElementById('#timer');

  let base = 60;

  var clocktimer, dateObj, dh, dm, ds, ms; 
  var readout=''; 
  var h=1,m=1,tm=1,s=0,ts=0,init=0; 

function clearСlock() { 
  clearTimeout(clocktimer); 
  h=1;m=1;tm=1;s=0;ts=0;
  init=0;
  readout='00:00:00'; 
  TIMER.innerHTML = readout; 
} 

 function startTime(){
    var cdateObj = new Date(); 
    var t = (cdateObj.getTime() - dateObj.getTime())-(s*1000); 
        if (t>999) { s++; } 
        if (s>=(m*base)) { 
                ts=0; 
                m++; 
        } else { 
                ts=parseInt((ms/100)+s); 
                if(ts>=base) { ts=ts-((m-1)*base); } 
        } 
        if (m>(h*base)) { 
                tm=1; 
                h++; 
        } else { 
                tm=parseInt((ms/100)+m); 
                if(tm>=base) { tm=tm-((h-1)*base); } 
        } 
        ms = Math.round(t/10); 
        if (ms>99) {ms=0;} 
        if (ms==0) {ms='00';} 
        if (ms>0&&ms<=9) { ms = '0'+ms; } 
        if (ts>0) { ds = ts; if (ts<10) { ds = '0'+ts; }} else { ds = '00'; } 
        dm=tm-1; 
        if (dm>0) { if (dm<10) { dm = '0'+dm; }} else { dm = '00'; } 
        dh=h-1; 
        if (dh>0) { if (dh<10) { dh = '0'+dh; }} else { dh = '00'; } 
        readout = dh + ':' + dm + ':' + ds + '.' + ms; 
        TIMER.innerHTML = readout;
        clocktimer = setTimeout("startTime()",1); 
   } 

   function startStop() { 
    if (init==0){ 
            clearСlock();
            dateObj = new Date(); 
            startTime(); 
            init=1; 
    } else { 
            clearTimeout(clocktimer);
            init=0;
    } 
  } 

document.addEventListener('DOMContentLoaded', () => {

  const CONTAINER = document.getElementById('#container');
  const ELEM = document.querySelectorAll('.element');
  const WINNER = document.getElementById('#winner');
  const CLICKCOUNTER = document.getElementById('#clickCounterNumber');
  const START_BUTTON = document.getElementById('#start');
  const POPUP = document.getElementById('#popup');
  const TIMER_RESULT =document.getElementById('#timer_result');
  const TIMER_MAIN = document.querySelector('.timer_main');


  var clickCounter = 0;

  const shuffle = (array) => {
    for (let i = array.length - 2; i > 0; i--){
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    }
} 

    const random = () => {
      let arr = [];
      for(let i = 0; i < ELEM.length; i++){
        arr.push(ELEM[i].innerHTML)
      }
      
      shuffle(arr);
      
      for(let i = 0; i < arr.length; i++){
        ELEM[i].innerHTML = arr[i]; 
      }
    }

  const chouseElem = (event) => {
      let empty = document.getElementById('#elem_empty');
      let target = event.target; 
      let closestContainer = target.closest('.container_element');
      let closestEmptyContainer = empty.closest('.container_element');
      let targetTop = closestContainer.getBoundingClientRect().top;
      let targetLeft = closestContainer.getBoundingClientRect().left; 
      let emptyTop= closestEmptyContainer.getBoundingClientRect().top;
      let emptyLeft = closestEmptyContainer.getBoundingClientRect().left;
      let targetHeight = closestContainer.getBoundingClientRect().height;
      let targetWidth = closestContainer.getBoundingClientRect().width; 
      let moveTop = targetTop - emptyTop == -targetHeight && targetLeft - emptyLeft == 0;
      let moveBottom =  targetTop - emptyTop == targetHeight && targetLeft - emptyLeft == 0;
      let moveLeft = targetLeft - emptyLeft == -targetWidth && targetTop - emptyTop == 0;
      let moveRight = targetLeft - emptyLeft == targetWidth && targetTop - emptyTop == 0; 

     if(target == closestContainer || target == empty){
        return;
     }
        if(moveTop || moveBottom || moveLeft || moveRight){
          
          target.classList.add('element_empty');
          target.id = '#elem_empty';
          empty.classList.remove('element_empty');
          empty.id = '#elem';
          empty.innerHTML = target.innerHTML;
          target.innerHTML = null;
          target.backgroundColor = 'white';
          empty.backgroundColor = 'slategray';

          if(clickCounter==0){
            startStop();
            CLICKCOUNTER.innerHTML = ''; 
          }
          clickCounter++;
          for(i = 0; i < 15; i++){
            if(ELEM[i].innerHTML != i + 1){
              return;
            } 
          }

          POPUP.style.display = 'flex';
          TIMER_RESULT.innerHTML = TIMER.innerHTML;
          TIMER_MAIN.style.display = 'none';
          CLICKCOUNTER.innerHTML = clickCounter;
          startStop();
          clickCounter = 0;
        }
  }


  const startGame = () => {
    POPUP.style.display = 'none';
    TIMER_MAIN.style.display = 'block';
  }


  random();
  CONTAINER.addEventListener('click', chouseElem); 
  START_BUTTON.addEventListener('click', startGame)

});
