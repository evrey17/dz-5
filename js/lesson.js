
const tabContent = document.querySelectorAll('.tab_content_block')
const tabs =document.querySelectorAll('.tab_content_item')
const tabsParent =document.querySelector('.tab_content_items')
const hideTabContent = () => {
    tabContent.forEach( (item) => {
        item.style.display = 'none'
    })
    tabs.forEach( (item) => {
        item.classList.remove('tab_content_item_active')
    })
}
const showTabContent = (index = 0) => {
    tabContent[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
}
hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    const target = event.target
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach( (item, i) => {
            if (event.target === item) {
                hideTabContent(i)
                showTabContent(i)

            }
        })
    }
}
let slideIndex = 0
const slideTime = () =>{
    slideIndex++
    if(slideIndex>4){
        slideIndex=0
    }
    hideTabContent()
    showTabContent(slideIndex)
}

setInterval(slideTime , 3000)

// Converter 
const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector("#eur")
const converter = (element, element2 , element3) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = ()=> {
            const data = JSON.parse(request.response);
            if(element === " "){
                element2.value = ' '
                element3.value = ' '
            }
            if (element === som){
                element2.value = (element.value / data.usd).toFixed(2);
                element3.value = (element.value / data.eur).toFixed(2)
            }
            if (element === usd){
                element2.value = (element.value * data.usd).toFixed(2);
                element3.value = (element.value*data.usd/data.eur).toFixed(2)
            }
            if (element === eur){
                element2.value = (element.value / data.eur).toFixed(2)
                element3.value = (element.value*data.eur/data.usd).toFixed(2)
            }

        }
    }
}

converter(somInput, usdInput , eurInput)
converter(usdInput, somInput , eurInput)
converter(eurInput, somInput , usdInput)


console.log('Loading...')


