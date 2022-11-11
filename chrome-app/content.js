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
    if (msg.success){
        applyCss();
        paintVacancies(document.body.getElementsByClassName("list-jobs")[0], msg.data);
    } else {
        showErrorPopup();
    }
    return Promise.resolve('Dummy response to keep the console quiet');
});

function showErrorPopup(){
    const html = `
<style>
        #overlay {
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            background: #999;
            width: 100%;
            height: 100%;
            opacity: 0.8;
            z-index: 100;
        }

        #popup {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            background: #f99;
            width: 500px;
            height: 100px;
            margin-left: -250px; 
            margin-top: -250px; 
            z-index: 200;
            border-radius: 10px;
            padding: 10px;
        }
        #popupclose {
            float: right;
            padding: 10px;
            cursor: pointer;
        }
        .popupcontent {
            padding: 10px;
        }
    </style>
<div id="overlay"></div>
<div id="popup">
    <div class="popupcontrols">
        <span id="popupclose">X</span>
    </div>
    <div class="popupcontent">
        Server stopped
    </div>
</div>`
    document.body.innerHTML += html;
    const closePopup = document.getElementById("popupclose");
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");

    const showPopup = () => {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }

    closePopup.onclick = function() {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    };
    showPopup();
}

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

