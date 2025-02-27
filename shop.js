const filter = [];
const prijzenfilter = [];
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const filterselect = document.querySelectorAll("#filterarrow");
const filterform = document.querySelectorAll("#filterform");
const filterbutton = document.querySelectorAll("#filterbutton");
const container = document.querySelector(".store");
const filterlist = [filterselect, filterform, filterbutton];
console.log(filterlist);


jsonOphalen()
for (const checkbox of checkboxes) {
    checkbox.addEventListener("click", () => {

        if (checkbox.checked == true) {
            if (checkbox.dataset.soort === "-") {
                filter.push(checkbox.dataset.item)
                jsonOphalen()
            } else if (checkbox.dataset.soort === "prijs") {
                prijzenfilter.push(checkbox.dataset.item)
                jsonOphalen()
            }

        } else {
            if (checkbox.dataset.soort === "-") {
                reomvearray(filter, checkbox.dataset.item)
                jsonOphalen()
            } else if (checkbox.dataset.soort === "prijs") {
                reomvearray(prijzenfilter, checkbox.dataset.item)
                jsonOphalen()
            }
        }
        console.log(prijzenfilter);
        console.log(parseInt(Math.max.apply(null, prijzenfilter)));
        if (Math.max.apply(null, prijzenfilter) == -Infinity) {
            console.log(`hi`);

        }

    });
}



for (let indexOfFilter = 0; indexOfFilter < filterselect.length; indexOfFilter++) {
    const filterSelectEl = filterselect[indexOfFilter];
    const filterFormEl = filterform[indexOfFilter]
    const filterButtonEl = filterbutton[indexOfFilter]
    filterButtonEl.addEventListener("click", () => {
        hideandseek(filterFormEl, filterSelectEl)
    })
}
document.querySelector(".slider").oninput = function () {
    document.querySelector(".rangeInputNumber").value = parseInt(this.value);
    jsonOphalen()
}


document.querySelector(".rangeInputNumber").addEventListener("keyup", () => {
    let slider = document.querySelector(".slider")
    document.querySelector(".slider").value = document.querySelector(".rangeInputNumber").value
    if (parseInt(document.querySelector(".rangeInputNumber").value) <= 0) {
        document.querySelector(".rangeInputNumber").value = 1
    } else if (parseInt(document.querySelector(".rangeInputNumber").value) >= 20) {
        document.querySelector(".rangeInputNumber").value = 20
    }
    slider.value = document.querySelector(".rangeInputNumber").value
    if (document.querySelector(".rangeInputNumber").value == "") {
        slider.value = 2
    }
    console.log(document.querySelector(".rangeInputNumber").value);
    jsonOphalen()
});

const localGlobal = localStorage.getItem("card") ?? [];
const localGlobalobj = localGlobal
console.log(localGlobal.length);
if (localGlobal.length >= 4) {
    JSON.parse(localGlobalobj).forEach(element => {
        booking(element)

    });
}
// -------------------------------functions-------------------------
function hideandseek(soortform, soortarrow) {
    if (soortform.style.display == "block") {
        soortform.style.display = "none";
        soortarrow.classList.remove("down");
        soortarrow.classList.add("up");
        soortarrow.classList.add("arrow");
        soortform.classList.remove("showing");
        soortform.classList.add("hiding");
    } else {
        soortform.style.display = "block";
        soortform.classList.remove("hiding");
        soortarrow.classList.remove("up");
        soortarrow.classList.add("down");
        soortarrow.classList.add("arrow");
        soortform.classList.add("showing");
    }
}
function reomvearray(array, item) {
    const index = array.indexOf(item);
    if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
    }
}

async function jsonOphalen() {
    fetch("web.json")
        .then((data) => data.json())
        .then(store)
        .catch(error => console.error(error), console.log(`error`),
        );
}
function store(data) {
    const local = JSON.parse(localStorage.getItem("item"));
    let mensen = isNaN(parseInt(document.querySelector(".rangeInputNumber").value)) ? 2 : parseInt(document.querySelector(".rangeInputNumber").value)

    console.log(mensen);

    console.log(filter);
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (const key in filter) {
        if (Object.prototype.hasOwnProperty.call(filter, key)) {
            const element = filter[key];
            for (const filterkey in local) {
                if (Object.prototype.hasOwnProperty.call(local, filterkey)) {
                    const filterElement = local[filterkey];
                    if (mensen <= filterElement.mensen) {
                        for (const key3 in filterElement) {
                            if (Object.prototype.hasOwnProperty.call(filterElement, key3)) {
                                const element3 = filterElement[key3];
                                if (element === element3) {
                                    if ((parseInt(Math.max.apply(null, prijzenfilter)) >= parseInt(filterElement.prijs) || (Math.max.apply(null, prijzenfilter) == -Infinity))) {
                                        makingcard(filterElement);
                                        console.log(`hi`);

                                        console.log(filterElement);
                                    }

                                }

                            }
                        }
                    }
                }
            }
        }
    }
    if (filter.length == 0) {
        for (const key in local) {
            if (Object.prototype.hasOwnProperty.call(local, key)) {
                const element = local[key];
                if (mensen <= parseInt(element.mensen)) {
                    if ((parseInt(Math.max.apply(null, prijzenfilter)) >= parseInt(element.prijs) || (Math.max.apply(null, prijzenfilter) == -Infinity))) {
                        
                        
                        makingcard(element);
                        
                    }
                }
            }
        }
    }
}

// const local = JSON.parse(localStorage.getItem("item")) ?? " ";
// for (const element of local) {
//     makingcard(element);
//     console.log(element);
    
// }
async function makingcard(data) {
    console.log(data);
    
    const maincard = document.createElement("div");
    maincard.classList.add("card");
    container.appendChild(maincard);
    const carddivder = document.createElement("hr")
    container.appendChild(carddivder);
    for (const key in data.card) {
        if (Object.prototype.hasOwnProperty.call(data.card, key)) {
            const segment = data.card[key];
            if (key === "img") {
                const createsegment = document.createElement(key)
                createsegment.src = segment
                maincard.appendChild(createsegment)
            } else {
                const createsegment = document.createElement("div")
                createsegment.classList.add(key)
                maincard.appendChild(createsegment)
                for (const keys in segment) {
                    if (Object.prototype.hasOwnProperty.call(segment, keys)) {
                        const somthing = segment[keys];
                        const soort = Object.keys(somthing)
                        const waarde = Object.values(somthing)
                        if (soort[0] == "div") {
                            const afkomstdiv = document.createElement(soort[0])
                            createsegment.appendChild(afkomstdiv)
                            for (const keyss in waarde[0]) {
                                if (Object.prototype.hasOwnProperty.call(waarde[0], keyss)) {
                                    const element = waarde[0][keyss];
                                    const afkomst = document.createElement(keyss)


                                    if (keyss === "img") {
                                        afkomst.src = element
                                    } else {
                                        afkomst.innerText = element
                                    }
                                    afkomstdiv.appendChild(afkomst)
                                }
                            }
                        } else {
                            const createdElement = document.createElement(soort[0])
                            if (soort[0] === "button") {
                                createdElement.addEventListener("click", () => {
                                    addingToShoppingCard(data)
                                })
                            }
                            createdElement.innerText = waarde[0]
                            createsegment.appendChild(createdElement)
                        }
                    }
                }
            }

        }
    }
}

// ---------------------------shopping cart-------------------------------\\
document.getElementById("shopping-cart").addEventListener("click", () => {
    if (document.getElementById("mySidenav").style.width == "25%") {
        document.getElementById("mySidenav").style.width = "0";
    } else {
        document.getElementById("mySidenav").style.width = "25%";
    }


})
document.getElementById("winkelwagenClose").addEventListener("click", () => {
    document.getElementById("mySidenav").style.width = "0";
})

// ------------------------booking----------------------\\
function addingToShoppingCard(data) {
    const local = localStorage.getItem("card") ?? [];
    console.log(local.length);
    if (local.length <= 4) {
        const locallist = [data]
        localStorage.setItem("card", JSON.stringify(locallist));
    } else {
        const localobj = JSON.parse(local);
        localobj.push(data)
        localStorage.setItem("card", JSON.stringify(localobj));
    }
    booking(data)
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
document.getElementById("home").addEventListener("click", function () {
    window.location.href = "index.html";
})