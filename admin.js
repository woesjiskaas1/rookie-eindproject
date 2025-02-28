document.getElementById("bestellingen").addEventListener("click", () => {
    if (document.querySelector(".bestelling").style.display != "flex") {
        document.querySelector(".bestelling").style.display = "flex"
        document.querySelector(".products").style.display = "none"
    }
})
document.getElementById("productsNutton").addEventListener("click", () => {
    if (document.querySelector(".products").style.display != "flex") {
        document.querySelector(".bestelling").style.display = "none"
        document.querySelector(".products").style.display = "flex"
    }
})
function deletingletter(word) {
    const regex = word[0]
    let word2 = word.replace(regex, "");
    for (let i = 0; i < word.length; i++) {
        const element = word[i]
        if (i >= 1) {
            word2 = word2.replace(element, "");
        }
        if (element === " ") {
            word = word2
            return word2
        }
    }
}
showingproducts()
createTableRow();
function createTableRow() {
    const table = document.querySelector("tbody")
    const bestellingen = JSON.parse(localStorage.getItem("bestellingen")) ?? [];

    if ((bestellingen.length >= 1)) {
        for (const key in bestellingen) {
            if (Object.prototype.hasOwnProperty.call(bestellingen, key)) {
                const element = bestellingen[key];
                const id = { "th": key }
                for (const keydos in element.card) {
                    if (Object.prototype.hasOwnProperty.call(element.card, keydos)) {
                        const elementdos = element.card[keydos];
                        if (elementdos.length === 4) {
                            const plaats = elementdos[0].h1;
                            const naam = { "td": plaats }
                            const d = new Date()
                            const month = JSON.parse(localStorage.getItem("time"))
                            const soort = [id, naam, month[key]]
                            const row = document.createElement("tr")
                            table.appendChild(row)
                            for (let i = 0; i < soort.length; i++) {

                                const soortelement = soort[i];
                                const soortelementValeu = Object.values(soortelement);
                                const soortelementKeys = Object.keys(soortelement);

                                const createdElement = document.createElement(soortelementKeys[0]);
                                createdElement.innerText = soortelementValeu[0]
                                row.appendChild(createdElement);
                            }

                        }
                    }
                }
            }
        }
    } else {
        const divCreate = document.createElement("div");
        const container = document.querySelector(".bestelling");
        container.appendChild(divCreate)
        const createdElement = document.createElement("h3");
        createdElement.innerText = "nog geen bestellingen"
        divCreate.appendChild(createdElement);
    }
}
function showingproducts() {
    const container = document.querySelector(".products-table > tbody")
    const inventory = JSON.parse(localStorage.getItem("item"))
    for (const key in inventory) {
        if (Object.prototype.hasOwnProperty.call(inventory, key)) {
            const element = inventory[key];
            const soorten = [
                { "th": key },
                { "td": element.card["text-right"][0].h1 },
                { "td": element.card["text-left"][1].h2 },
                { "td": element.card.img },
                { "td": "edit" },
                { "td": "verwijderen" }
            ]
            const row = document.createElement("tr")
            container.appendChild(row)
            for (const elementsoort of soorten) {
                const soortvaleu = Object.values(elementsoort)
                const soortkeys = Object.keys(elementsoort)
                const createdElement = document.createElement(soortkeys[0]);
                createdElement.innerText = soortvaleu[0];
                row.appendChild(createdElement);
                if (soortvaleu[0] === "edit") {

                    createdElement.addEventListener("click", () => {
                        edit(element)
                    });
                }
                if (soortvaleu[0] === "verwijderen") {
                    createdElement.addEventListener("click", () => {
                        remove(element)
                    });
                }
            }
        }
    }
}
function edit(data) {

    const template = document.getElementsByTagName("template")[0];
    const temp = template.content.cloneNode(true);
    temp.querySelector("#picture-upload").addEventListener("change", (event) => {
        document.querySelector("#image").src = `img/${event.target.files[0].name}`
    })
    temp.querySelector("#image").src = data.card.img;
    temp.querySelector("#name").placeholder = data.card["text-right"][0].h1
    temp.querySelector("#pistes").placeholder = data.card["text-right"][1].p
    temp.querySelector("#flag").placeholder = data.card["text-right"][2].div.img
    temp.querySelector("#location").placeholder = data.card["text-right"][2].div.p
    temp.querySelector("#inputdescription").placeholder = data.card["text-right"][3].h3
    temp.querySelector("#inputpijs").placeholder = data.card["text-left"][1].h2
    temp.querySelector("#inputsport").placeholder = deletingletter(data.card["text-left"][2].h4)
    temp.querySelector("#inputmensen").placeholder = deletingletter(data.card["text-left"][3].h4)
    temp.querySelector("#inputauto").placeholder = deletingletter(data.card["text-left"][4].h4)
    document.getElementById("editerea").innerHTML = '';
    document.getElementById("editerea").appendChild(temp)
    document.getElementById("overlay").style.display = "block";
    // -------------------------------
    const select = document.querySelectorAll(".dropdown-item")
    const flag = document.getElementById("flag")
    for (const element of select) {


        element.addEventListener("click", () => {

            flag.src = `https://flagcdn.com/${element.dataset.selectCountry}.svg`

        });

    }
    // --------------------------------
    const textRight = data.card["text-right"];
    const textLeft = data.card["text-left"];
    document.getElementById("completeEdit").addEventListener("click", () => {
        const items = JSON.parse(localStorage.getItem("item"))
        for (const key in items) {
            if (Object.prototype.hasOwnProperty.call(items, key)) {
                const element = items[key];
                if (JSON.stringify(element) === JSON.stringify(data)) {
                    var keyitem = key

                    break
                }
            }
        }




        const textright = document.querySelectorAll(".inputer")

        data.card.img = document.querySelector("#image").src;
        textRight[0].h1 = textright[0].value == "" ? textright[0].placeholder : textright[0].value;
        textRight[1].p = textright[1].value == "" ? textright[1].placeholder : textright[1].value;
        textRight[2].div.img = document.querySelector(".inputflag").src;
        textRight[2].div.p = textright[2].value == "" ? textright[2].placeholder : textright[2].value;
        textRight[3].h3 = textright[3].value == "" ? textright[3].placeholder : textright[3].value;
        textLeft[1].h2 = `${textright[4].value}` == "" ? `${textright[4].placeholder}` : `${textright[4].value}`;
        textLeft[2].h4 = `sport: ${textright[5].value}` == "" ? `sport: ${textright[5].placeholder}` : `sport: ${textright[5].value}`;
        textLeft[3].h4 = `mensen: ${textright[6].value}` == "" ? `mensen: ${textright[6].placeholder}` : `mensen: ${textright[6].value}`;
        textLeft[4].h4 = `transport: ${textright[7].value}` == "" ? `transport: ${textright[7].placeholder}` : `transport: ${textright[7].value}`;
        data.card["text-right"] = textRight;
        data.card["text-left"] = textLeft;
        items[keyitem] = data
        // localStorage.removeItem("item")
        localStorage.setItem("item", JSON.stringify(items))

    })
}
// ------------------------------------------------------
document.getElementById("overlayClose").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";
});
document.getElementById("overlayAddClose").addEventListener("click", () => {
    document.getElementById("overlayAdd").style.display = "none";
});
document.getElementById("writeButton").addEventListener("click", () => {
    add()
})
document.getElementById("addnext").addEventListener("click", () => {
    const extradetail = document.querySelector(".extra-detail-add")
    const pointer = document.getElementById("addnext");
    if (pointer.style.left == "2.5%") {
        extradetail.style.display = "none"
        pointer.style.left = "92%"
        pointer.style.transform = "rotatez(0deg)"
        document.getElementById("addCard").style.display = "flex"
    } else {
        extradetail.style.display = "flex"
        pointer.style.left = "2.5%"
        pointer.style.transform = "rotatez(180deg)"
        document.getElementById("addCard").style.display = "none"
    }
})
document.getElementById("readJson").addEventListener("click", () => {
    readjson()
})
// --------------------------------------------------
function add() {
    const select = document.querySelectorAll(".dropdown-itemExample")
    const flag = document.getElementById("flagExample")
    const extraInput = document.querySelectorAll(".extraInput")
    const input = document.querySelectorAll(".inputer")
    let count = 0

    document.querySelector(".templateExample").src = `http://127.0.0.1:5500/eindproject/The-Webshop-36572a270c75-8e506663e739/img/no-image.jpg`;
    flag.src = `http://127.0.0.1:5500/eindproject/The-Webshop-36572a270c75-8e506663e739/img/no-image.jpg`;
    for (const element of select) {
        element.addEventListener("click", () => {
            flag.src = `https://flagcdn.com/${element.dataset.selectCountry}.svg`;
        });
    }
    document.getElementById("overlayAdd").style.display = "block";
    document.getElementById("picture-upload-Example").addEventListener("change", (event) => {
        document.querySelector(".templateExample").src = `img/${event.target.files[0].name}`;
    })
    // ----------------------------------------------------
    for (const elementInput of input) {
        let clicked = 0
        let clickedNegative = 0
        elementInput.addEventListener("keyup", () => {


            if (elementInput.value.length >= 1) {
                clicked++
                if (clicked <= 1) {
                    count++
                    clicked++
                } else {
                    clicked--
                }
            } else if (elementInput.value.length <= 0) {
                if ((count >= 1) && (clicked >= 1)) {
                    count--
                    clicked -= 2
                    clickedNegative++
                }
            }
        })
    }
    for (const elementExtraInput of extraInput) {
        let clicked = 0
        let clickedNegative = 0
        elementExtraInput.addEventListener("keyup", () => {


            if (elementExtraInput.value.length >= 1) {
                clicked++
                if (clicked <= 1) {
                    count++
                    clicked++
                } else {
                    clicked--
                }
            } else if (elementExtraInput.value.length <= 0) {
                if ((count >= 1) && (clicked >= 1)) {
                    count--
                    clicked -= 2
                    clickedNegative++
                }
            }
            completeadd(count)

        })
    }
    // --------------------------------------------------------------------------
    document.getElementById("addnext").addEventListener("click", () => {
        const extradetail = document.querySelector(".extra-detail-add")
        const pointer = document.getElementById("addnext");

        if (pointer.style.left == "92%") {
            extradetail.style.display = "none"
            pointer.style.left = "92%"
            pointer.style.transform = "rotatez(0deg)"
            document.getElementById("addCard").style.display = "flex"
        } else {
            extradetail.style.display = "flex"
            pointer.style.left = "2.5%"
            pointer.style.transform = "rotatez(180deg)"
            document.getElementById("addCard").style.display = "none"
        }
        completeadd(count)
    })
    // ---------------------------------------------------------------------------
    const data = JSON.parse(localStorage.getItem("item"))

    document.getElementById("completeAdd").addEventListener("click", () => {

        const newObj = {
            "country": extraInput[0].value,
            "sport": extraInput[1].value,
            "mensen": extraInput[2].value,
            "transport": extraInput[3].value,
            "prijs": extraInput[4].value,
            "amount": extraInput[5].value,
            "card": {
                "img": document.querySelector(".templateExample").src,
                "text-right": [
                    {
                        "h1": input[0].value
                    },
                    {
                        "p": input[1].value
                    },
                    {
                        "div": {
                            "img": "https://flagcdn.com/at.svg",
                            "p": input[2].value
                        }
                    },
                    {
                        "h3": input[3].value
                    }
                ],
                "text-left": [
                    {
                        "p": "p.p. vanaf*"
                    },
                    {
                        "h2": input[4].value
                    },
                    {
                        "h4": `sport ${input[5].value}`
                    },
                    {
                        "h4": `mensen: ${input[6].value}`
                    },
                    {
                        "h4": `transport: ${input[7].value}`
                    },
                    {
                        "button": "book"
                    }
                ]
            }
        }
        data.push(newObj)
        localStorage.setItem("item", JSON.stringify(data))
    })
}




function completeadd(count) {
    if ((count === 14) && (document.getElementById("addCard").style.display == "none")) {
        document.getElementById("completeAdd").style.display = "block"

    } else {
        document.getElementById("completeAdd").style.display = "none"
    }
}
function readjson() {
    localStorage.removeItem("item");
    fetch("web.json")
        .then((data) => data.json())
        .then((data) => {
            localStorage.setItem("item", JSON.stringify(data.store));
            const container = document.querySelector("body > div.main-container > div.products > div:nth-child(2) > table > tbody");
                while (container.firstChild) {
                    container.removeChild(container.lastChild);
                    if (container.lastChild.firstChild === null) {
                        showingproducts()
                        break
                        
                    }
                }
        })
        .catch(error => console.error(error), console.log(`error`),
        );
}
function remove(data) {

    const localdata = JSON.parse(localStorage.getItem("item"))
    for (const key in localdata) {
        if (Object.prototype.hasOwnProperty.call(localdata, key)) {
            const element = localdata[key];
            if (JSON.stringify(element) === JSON.stringify(data)) {
                const index = localdata.indexOf(element);
                if (index > -1) { // only splice array when item is found
                    localdata.splice(index, 1); // 2nd parameter means remove one item only
                    localStorage.setItem("item", JSON.stringify(localdata))
                }
                const container = document.querySelector("body > div.main-container > div.products > div:nth-child(2) > table > tbody");
                while (container.firstChild) {
                    container.removeChild(container.lastChild);
                    if (container.lastChild.firstChild === null) {
                        showingproducts()
                        break
                        
                    }
                }
                break
            }

        }
    }

}
document.getElementById("store").addEventListener("click", () => {
    window.location.href = "shop.html";
})
document.getElementById("home").addEventListener("click", () => {
    window.location.href = "index.html";
})