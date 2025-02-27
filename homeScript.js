
// ----------------------  JSON OPHALEN --------------------------------
jsonOphalen()
function jsonOphalen() {
    fetch("web.json")
        .then((data) => data.json())
        .then(recomandation)
        .catch(error => console.error(error), console.log(`error`),
        );
}

function recomandation(data) {
    console.log(data.recomendations);
    const slideContainer = document.querySelector('.slideshow-container')
    for (const plek of data.recomendations) {
        const createdelementdiv = document.createElement('div')
        createdelementdiv.classList.add('card', 'mySlides', 'fade')
        slideContainer.appendChild(createdelementdiv)
        createdelementdiv.style.display = "none"
        for (const key in plek) {
            if (Object.prototype.hasOwnProperty.call(plek, key)) {
                const element = plek[key];
                const createdElement = document.createElement(key)
                if (key == "div") {
                    createdElement.classList.add("card-text")
                } else {
                    createdElement.src = element
                }
                createdelementdiv.appendChild(createdElement)
                if (key != "img") {
                    for (const keytext in element) {
                        if (Object.prototype.hasOwnProperty.call(element, keytext)) {
                            const text = element[keytext];
                            const createdElementNested = document.createElement(keytext);
                            createdElementNested.innerText = text;
                            createdElement.appendChild(createdElementNested)
                        }
                    }
                }
            }
        }

    }

    showSlides();
}
// --------------------slideshow animation---------------------------

let slideIndex = 0;

const how = document.getElementById('how');
const howcard = document.querySelectorAll('.card-how')
const howarrow = document.querySelectorAll('.arrow-how')
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); // Change image every 2 seconds
}





// ------------------------view animation----------------------------------
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
        ? ((top > 50 && top < innerHeight) ||
            (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
if (elementIsVisibleInViewport(how, true)) {
    console.log('hi');

}
console.log(elementIsVisibleInViewport(how, true));

addEventListener("scroll", (event) => {
    console.log('scrolling');

    if (elementIsVisibleInViewport(how, true)) {
        if (howcard.classList != 'seen') {
            for (const element of howcard) {
                element.classList.add('seen')

            }
            for (const element of howarrow) {
                element.classList.add('seen')
            }
        }

    }
});