let graves = new Bot(
  "Graves",
  "danger",
  "Tout le monde est un héros, jusqu'à perdre une jambe ou deux."
);
let lux = new Bot(
  "Lux",
  "warning",
  "Un double arc-en-ciel est un phénomène produit par la réfraction, la réflexion et la dispersion des radiations colorées composant la lumière blanche du soleil par des gouttes d'eau. Vous comprenez ? "
);
let veigar = new Bot("Veigar", "info", "En avant ! Bande de nullos !");

var messages = [];

var bots = [graves, lux, veigar];

function whatTimeIsIt() {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  return dateTime;
}

function hereAreBots() {
  for (var i = 0; i < bots.length; i++) {
    document.getElementById("bots").innerHTML += `<article class="message is-${
      bots[i].color
    }">
              <div class="message-header">
                <figure class="image is-48x48">
                  <img src="pics/${bots[i].name.toLowerCase()}.jpg" />
                </figure>
                <p>${bots[i].name}</p>
              </div>
            </article>`;
  }
}

function initAll() {
  hereAreBots();
  if (JSON.parse(localStorage.getItem("storedMessages"))) {
    for (var i = 0; i < bots.length; i++) {
      bots[i].clearData();
    }
    messages = JSON.parse(localStorage.getItem("storedMessages"));
    readMessage();
  } else {
    addMessage();
    readMessage();
  }
}

function readMessage() {
  saveMessages();
  document.getElementById("content").innerHTML = ``;
  for (var i = 0; i < messages.length; i++) {
    if (messages[i].name == "user") {
      document.getElementById("content").innerHTML += `<div class="columns">
                  <div class="column"></div>
                  <div class="column is-three-fifths">
                    <article class="message">
                      <div class="message-body">${messages[i].data}
                        <br>
                      <br>
                      ${messages[i].date}
                      </div>
                    </article>
                  </div>
                </div>`;
    } else {
      document.getElementById("content").innerHTML += `<div class="columns">
                  <div class="column is-three-fifths">
                    <article class="message is-${messages[i].color}">
                      <div class="message-header">
                        <figure class="image is-48x48">
                          <img src="pics/${messages[
                            i
                          ].name.toLowerCase()}.jpg" />
                        </figure>
                        <p>${messages[i].name}</p>
                      </div>
                      <div class="message-body">${messages[i].data}
                      <br>
                      <br>
                      ${messages[i].date}
                      </div>
                    </article>
                  </div>
                  <div class="column"></div>
                </div>`;
    }
    var elem = document.getElementById("content");
    elem.scrollTop = elem.scrollHeight;
  }
}

function addMessage() {
  for (var i = 0; i < bots.length; i++) {
    if (bots[i].getData()) {
      messages.push({
        name: bots[i].getName(),
        color: bots[i].getColor(),
        data: bots[i].getData(),
        date: whatTimeIsIt(),
      });
    }
    bots[i].clearData();
  }
  readMessage();
}

function isNullOrWhitespace(input) {
  return !input || input.replace(/\s/g, "").length < 1;
}

function userMessage() {
  if (!isNullOrWhitespace(document.getElementById("writing").value)) {
    messages.push({
      name: "user",
      color: "",
      data: document.getElementById("writing").value,
      date: whatTimeIsIt(),
    });
    for (var i = 0; i < bots.length; i++) {
      bots[i].decisionMaking(document.getElementById("writing").value);
    }
    document.getElementById("writing").value = "";
    readMessage();
  }
}

var input = document.getElementById("writing");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

function saveMessages() {
  localStorage.setItem("storedMessages", JSON.stringify(messages));
}

function everyTime() {
  for (var i = 0; i < bots.length; i++) {
    if (bots[i].data != "") {
      addMessage();
      bots[i].setData("");
    }
  }
}

var myInterval = setInterval(everyTime, 1000);

initAll();
