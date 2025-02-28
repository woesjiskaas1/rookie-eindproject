
// ----------------------  JSON OPHALEN --------------------------------
jsonOphalen()
function jsonOphalen() {
    fetch("web.json")
        .then((data) => data.json())
        .then(recomandation,)
        .catch(error => console.error(error), console.log(`error`),
        );
}


function recomandation(data) {
    let local = JSON.parse(localStorage.getItem("item"))
    if (JSON.parse(localStorage.getItem("item")) == null) {
        localStorage.setItem("item", JSON.stringify(data.store))
        local = data.store
        console.log(local);
    }
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
                            const createdElementNested = document.createElement(keytext);
                            if (keytext === "button") {
                                createdElementNested.addEventListener("click", () => {
                                    // console.log(element);
                                    addingToShoppingCard(element)
                                })
                            }

                            const text = element[keytext];
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
// ------------------------shopping cart----------------------------------
const localGlobal = localStorage.getItem("card") ?? [];
const localGlobalobj = localGlobal
if (localGlobal.length >= 4) {
    JSON.parse(localGlobalobj).forEach(element => {
        booking(element)

    });
}
document.getElementById("shopping-cart").addEventListener("click", () => {
    console.log(`cliked`);

    if (document.getElementById("mySidenav").style.width == "25%") {
        document.getElementById("mySidenav").style.width = "0";
    } else {
        document.getElementById("mySidenav").style.width = "25%";
    }


})
document.getElementById("winkelwagenClose").addEventListener("click", () => {
    document.getElementById("mySidenav").style.width = "0";
})
function reomvearray(array, item) {
    const index = array.indexOf(item);
    if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
    }
}

// ------------------------booking----------------------\\
function addingToShoppingCard(data) {
    const shoplocal = JSON.parse(localStorage.getItem("item"))
    console.log(shoplocal);

    for (const element of shoplocal) {
        if (element.card["text-right"][0].h1 === data.h1) {
            console.log(data.h1);
            const local = localStorage.getItem("card") ?? [];
            console.log(local.length);
            if (local.length <= 4) {
                const locallist = [element]
                localStorage.setItem("card", JSON.stringify(locallist));
            } else {
                const localobj = JSON.parse(local);
                localobj.push(element)
                localStorage.setItem("card", JSON.stringify(localobj));
            }
            booking(element)
            break
        }

    }

}
function booking(data) {
    const shoppingcontainer = document.querySelector(".winkelwagenInhoud")
    const maincard = document.createElement("div")
    maincard.classList.add("cardWagen")
    shoppingcontainer.appendChild(maincard)
    const card = data.card
    for (const key in card) {
        if (Object.prototype.hasOwnProperty.call(card, key)) {
            const element = card[key];
            if (element.length === 4) {
                const cardpart = document.createElement("div")
                cardpart.classList.add("cardWagen-left")
                maincard.appendChild(cardpart)
                for (const elementdos of element) {
                    const soort = Object.keys(elementdos)
                    const waarde = Object.values(elementdos)
                    if (soort[0] === "div") {
                        console.log(`hi`);
                        const createdElementDiv = document.createElement(soort[0])
                        cardpart.appendChild(createdElementDiv)
                        for (const keytomany in waarde[0]) {
                            if (Object.prototype.hasOwnProperty.call(waarde[0], keytomany)) {
                                const divElement = waarde[0][keytomany];
                                const createdElementInDiv = document.createElement(keytomany)
                                if (keytomany === "img") {
                                    createdElementInDiv.src = divElement
                                } else {
                                    createdElementInDiv.innerText = divElement
                                }
                                createdElementDiv.appendChild(createdElementInDiv)
                            }
                        }
                    } else if (soort[0] === "h1") {
                        const createdElement = document.createElement("h2")
                        createdElement.innerText = waarde[0]
                        cardpart.appendChild(createdElement)
                    }


                }
            }
            if (element.length === 6) {
                const soort = Object.keys(element[1])
                const waarde = Object.values(element[1])
                const cardpart = document.createElement("div")
                cardpart.classList.add("cardWagen-center")
                maincard.appendChild(cardpart)
                const createdElement = document.createElement(soort[0])
                createdElement.innerText = waarde[0]
                cardpart.appendChild(createdElement)
                const cardpartx = document.createElement("div")
                cardpartx.classList.add("cardWagen-right")
                maincard.appendChild(cardpartx)
                const createdElementx = document.createElement("a")
                createdElementx.innerText = "×"
                createdElementx.setAttribute('id', "removebutton");
                cardpartx.appendChild(createdElementx)
                createdElementx.addEventListener("click", () => {
                    removingfromshopping(data)
                    while (maincard.firstChild) {
                        maincard.removeChild(maincard.firstChild);
                    }
                })
            }

        }
    }
}
function removingfromshopping(data) {
    const shoppingcard = JSON.parse(localStorage.getItem("card"));
    // localStorage.removeItem("card");
    const shoppingcardarr = JSON.stringify(shoppingcard)
    for (const key in shoppingcard) {
        if (Object.prototype.hasOwnProperty.call(shoppingcard, key)) {
            const element = shoppingcard[key];
            console.log(element);
            if (element.card.img === data.card.img) {
                console.log(element);
                console.log(shoppingcard);

                reomvearray(shoppingcard, element)
                console.log(shoppingcard);
                localStorage.setItem("card", JSON.stringify(shoppingcard))
                break
            }
        }
    }
    console.log(data);
}
document.getElementById("bestel").addEventListener("click", () => {
    const maincard = document.querySelector(".winkelwagenInhoud")
    const bestellingen = localStorage.getItem("bestellingen") ?? [];
    const shoppingcard = localStorage.getItem("card");
    const tijd = localStorage.getItem("time") ?? [];
    if ((bestellingen.length <= 4) && (shoppingcard.length >= 4)) {
        const locallist = [shoppingcard]
        console.log(JSON.parse(locallist));
        localStorage.setItem("bestellingen", locallist);
        JSON.parse(locallist).forEach(element => {
            const d = new Date()
            const month = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
            const tijdto = { "td": `${month} ${d.getHours()}:${d.getMinutes()}` }
            tijd.push(tijdto)
            console.log(tijd);
            localStorage.setItem("time", JSON.stringify(tijd))
        });
    } else if (shoppingcard.length >= 4) {
        const tijdobj = JSON.parse(tijd)
        const locallocalobj = JSON.parse(bestellingen);
        console.log(locallocalobj);
        console.log(JSON.parse(shoppingcard));
        JSON.parse(shoppingcard).forEach(element => {
            locallocalobj.push(element)
            const d = new Date()
            const month = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
            const tijd = { "td": `${month} ${d.getHours()}:${d.getMinutes()}` }
            tijdobj.push(tijd)
            console.log(tijdobj);
            localStorage.setItem("time", JSON.stringify(tijdobj))
        });
        console.log(locallocalobj);
        localStorage.setItem("bestellingen", JSON.stringify(locallocalobj));
    }
    localStorage.setItem("card", [])
    while (maincard.firstChild) {
        maincard.removeChild(maincard.firstChild);
    }
})



document.getElementById("store").addEventListener("click", function () {
    window.location.href = "shop.html";
})
