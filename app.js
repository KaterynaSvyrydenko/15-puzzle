
document.addEventListener('DOMContentLoaded', () => {

  const CONTAINER = document.getElementById('#container');
  const ELEM = document.querySelectorAll('.element');

  const shuffle = (array) => {
    for (let i = array.length -1; i > 0; i--){
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    }
}

  const random = () => {
    let arr = [];
    for(let i = 0; i < ELEM.length; i++){
      arr.push(ELEM[i])
    }
    
    console.log(arr);
    let newArr = shuffle(arr);
  
    console.log(arr);
    return newArr;
  }



  const chouseElem = (event) => {
      let empty = document.getElementById('#elem_empty');
      let target = event.target;  
      let closestElem = target.closest('.element');
      let targetTop = target.getBoundingClientRect().top;
      let targetLeft = target.getBoundingClientRect().left; 
      let emptyTop= empty.getBoundingClientRect().top;
      let emptyLeft = empty.getBoundingClientRect().left;
      let targetHeight = target.getBoundingClientRect().height;
      let targetWidth = target.getBoundingClientRect().width; 
      let moveTop = targetTop - emptyTop == -targetHeight && targetLeft - emptyLeft == 0;
      let moveBottom =  targetTop - emptyTop == targetHeight && targetLeft - emptyLeft == 0;
      let moveLeft = targetLeft - emptyLeft == -targetWidth && targetTop - emptyTop == 0;
      let moveRight = targetLeft - emptyLeft == targetWidth && targetTop - emptyTop == 0; 

      if(moveTop || moveBottom || moveLeft || moveRight){
        target.classList.add('element_empty');
        target.id = '#elem_empty';
        empty.classList.remove('element_empty');
        empty.id = '#elem';
        empty.innerHTML = target.innerHTML;
        target.innerHTML = null;
      }
  }
  random();
  CONTAINER.addEventListener('click', chouseElem); 

});