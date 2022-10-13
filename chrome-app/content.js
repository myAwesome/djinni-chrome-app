'use strict';

if (window.location.host === "djinni.co"){
    const links = [];
    const vacancies = document.getElementsByClassName('list-jobs__title');
    for (let i of vacancies){
        links.push(i.getElementsByClassName('profile')[0].href);
    }
    chrome.runtime.sendMessage(null, {links});
}

chrome.runtime.onMessage.addListener(msg => {
    applyCss();
    paintVacancies(document.body.getElementsByClassName("list-jobs")[0], msg);
    return Promise.resolve('Dummy response to keep the console quiet');
});

function paintVacancies(jobList, msg){
    const jobs = jobList.getElementsByClassName('profile');
    for (let i of msg){
        for (let j of jobs){
            if(`https://djinni.co${j.getAttribute('href')}` === i.link){
                if (i.hide) {
                    j.closest('.list-jobs__item').classList.add('djinni__hide')
                }
                if (i.fav) {
                    j.closest('.list-jobs__item').classList.add('djinni__fav')
                }
                break;
            }
        }
    }
}

function applyCss() {
  const styles = '.djinni__hide { background-color: #fddbdb;} .djinni__fav { background-color: #dbfddb;}';
  const styleSheet = document.createElement('style');
  styleSheet.innerText = styles;
  styleSheet.setAttribute('type', 'text/css');
  document.head.appendChild(styleSheet);
}

