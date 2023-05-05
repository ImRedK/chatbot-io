class Bot {
  constructor(name, color, data) {
    this.name = name;
    this.color = color;
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getName() {
    return this.name;
  }

  getColor() {
    return this.color;
  }

  clearData() {
    this.data = "";
  }

  setData(data) {
    this.data = data;
  }

  randomApi() {
    fetch(
      "https://jsonplaceholder.typicode.com/todos/" + this.getRandomInt(1, 10)
    )
      .then((response) => response.json())
      .then((json) =>
        this.setData(json.title.charAt(0).toUpperCase() + json.title.slice(1))
      );
  }

  pokemonName(pokemon) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
      .then((response) => response.json())
      .then((json) =>
        this.setData(json.name.charAt(0).toUpperCase() + json.name.slice(1))
      );
  }

  maleOrFemale(name) {
    fetch("https://api.genderize.io?name=" + name)
      .then((response) => response.json())
      .then((json) =>
        this.setData(
          json.gender.charAt(0).toUpperCase() +
            json.gender.slice(1) +
            " : " +
            json.probability * 100 +
            " %"
        )
      );
  }

  chatGPT(sentence) {
    let key1 = "sk-z1QGmwvVVEtNXrQyIBVM";
    let key2 = "T3BlbkFJC9OmUxmU4p9MLW9EN43m";
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + key1 + key2,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: sentence }],
        max_tokens: 100,
        model: "gpt-3.5-turbo",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setData(data.choices[0].message.content);
      });
  }

  help() {
    let text =
      "- help : affiche les cammandes des bots. <br>" +
      "- " +
      this.name.toLowerCase() +
      " : fait parler le bot. <br>" +
      "- bots : fait parler les bots. <br>" +
      "- gpt " +
      this.name.toLowerCase() +
      " + texte : communique avec l'api ChatGPT. <br>Exemple : gpt " +
      this.name.toLowerCase() +
      " coucou <br>";
    if (this.name == "Veigar") {
      text +=
        "- gender + un prénom : donne le genre probable de la personne avec ce prénom. <br>Exemple : gender Michelle";
    }
    if (this.name == "Lux") {
      text +=
        "- pokemon + un nombre : donne le nom du pokémon avec ce numéro de pokédex. <br>Exemple : pokemon 151";
    }
    if (this.name == "Graves") {
      text += "- random : répond aléatoirement en latin";
    }
    return text;
  }

  decisionMaking(string) {
    if (this.name == "Veigar") {
      if (string.toLowerCase() == "veigar") {
        this.data =
          "Sachez que si les choses étaient différentes, je n'aurais aucune pitié pour vous.";
      }
      if (string.toLowerCase().includes("gender", 0)) {
        this.maleOrFemale(string.substring(7));
      }
      if (
        string.toLowerCase().includes("gpt", 0) &&
        string.toLowerCase().includes("veigar", 4)
      ) {
        this.chatGPT(string.substring(10));
      }
    }
    if (this.name == "Lux") {
      if (string.toLowerCase() == "lux") {
        this.data = "Chut... Je charge mon laser.";
      }
      if (string.toLowerCase().includes("pokemon", 0)) {
        this.pokemonName(string.substring(8));
      }
      if (
        string.toLowerCase().includes("gpt", 0) &&
        string.toLowerCase().includes("lux", 4)
      ) {
        this.chatGPT(string.substring(7));
      }
    }
    if (this.name == "Graves") {
      if (string.toLowerCase() == "graves") {
        this.data = "Je n'ai pas de temps à perdre avec des jeux. ";
      }
      if (string.toLowerCase().includes("random", 0)) {
        this.randomApi();
      }
      if (
        string.toLowerCase().includes("gpt", 0) &&
        string.toLowerCase().includes("graves", 4)
      ) {
        this.chatGPT(string.substring(10));
      }
    }
    if (string.toLowerCase() == "help") {
      this.data = this.help();
    }
    if (string.toLowerCase() == "bots") {
      this.data = "C'est toi le bot.";
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
