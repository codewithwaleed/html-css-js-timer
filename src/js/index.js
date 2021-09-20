const regex = /^\d{0,2}:\d{0,2}:\d{0,2}$/;

let myTimer;
function touchLabel(){
  const currentValue = document.getElementsByClassName("timer-lbl")[0].textContent;
  document.getElementsByClassName("timer-lbl")[0].classList.add("hide");
  document.getElementsByClassName("timer-txt")[0].classList.remove("hide");
  document.getElementsByClassName("timer-txt")[0].placeholder = currentValue;
  document.getElementsByClassName("timer-txt")[0].value = '';

  document.getElementsByClassName("timer-txt")[0].focus();
  clearInterval(myTimer);
}

function onChangeText(){
  const key = event.keyCode || event.charCode;
  let currentValue = document.getElementsByClassName("timer-txt")[0].value;
  const timer = currentValue.split(':');
  const hours = parseInt(timer[0], 10);
  const minutes = parseInt(timer[1], 10);
  const seconds = parseInt(timer[2], 10);

  if(key !== 8){
    if (currentValue.length >= 2 && currentValue.length < 5) {
      if (currentValue.indexOf(":") == -1) {
        currentValue = currentValue.slice(0, 2) + ":" + currentValue.slice(2);
      }
    } else if(currentValue.length >= 5 && currentValue.length < 7){
      if (currentValue.indexOf(":") > 0) {
        currentValue = currentValue.slice(0, 5) + ":" + currentValue.slice(5);
      }
    }
  }
  document.getElementsByClassName("timer-txt")[0].value = currentValue
  if(!regex.test(currentValue) || (hours > 24 || minutes > 59 || seconds > 59)){
    document.getElementsByClassName("error")[0].classList.remove("hide");
    return false
  }else {
    document.getElementsByClassName("error")[0].classList.add("hide");
  }
}

function updateLabelValue(){
  const currentValue = document.getElementsByClassName("timer-txt")[0].value;

  document.getElementsByClassName("timer-txt")[0].classList.add("hide");
  document.getElementsByClassName("timer-lbl")[0].classList.remove("hide");
  document.getElementsByClassName("error")[0].classList.add("hide");

  const timer = currentValue.split(':');
  const hours = parseInt(timer[0], 10);
  const minutes = parseInt(timer[1], 10);
  const seconds = parseInt(timer[2], 10);

  if(!regex.test(currentValue) || (hours > 24 || minutes > 59 || seconds > 59)){
    const newValue = document.getElementsByClassName("timer-lbl")[0].textContent;
    document.getElementsByClassName("timer-txt")[0].value = newValue;
    return false
  }
  document.getElementsByClassName("timer-lbl")[0].innerHTML = currentValue;
}

function start() {
  if(myTimer){
    clearInterval(myTimer);
    myTimer = undefined;
    return
  }
  const currentValue = document.getElementsByClassName("timer-lbl")[0].textContent;
  const timer = currentValue.split(':');
  let hours = parseInt(timer[0], 10);
  let minutes = parseInt(timer[1], 10);
  let seconds = parseInt(timer[2], 10);


  myTimer = setInterval(myClock, 1000);
  var c = 5;
  function myClock() {
    let newValue = ''

    if(hours > 0 && seconds == 0 && minutes == 0){
      seconds = 59;
      minutes = 59;
      hours=hours-1
      newValue = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      document.getElementsByClassName("timer-lbl")[0].innerHTML = newValue
      return;
    }

    if(seconds > 0){
      seconds = --seconds;
    }else if(seconds == 0 && minutes > 0){
      seconds = 59;
      minutes = --minutes;
    }else if(minutes == 0 && hours > 0){
      minutes = 59;
      hours = --hours;
    }
    newValue = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    document.getElementsByClassName("timer-lbl")[0].innerHTML = newValue

    if (seconds == 0 && minutes == 0 && hours == 0) {
      clearInterval(myTimer);
      alert("Reached zero");
    }
  }
}