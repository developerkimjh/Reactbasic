import React from "react";
import Title from "./components/Title";
import Form from "./components/Form";
import Maincard from "./components/Maincard";
import Favorites from "./components/Favorites";
import "./App.css";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  const [img, setImg] = React.useState(CAT1);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);
    setImg(newCat);
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, img];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const aleadyFavorite = favorites.includes(img);

  return (
    <div>
      <Title>
        {counter}
        {counter == null ? "" : "번째"} 고양이 짤
      </Title>
      <Form updateMainCat={updateMainCat} />
      <Maincard
        img={img}
        onHeartClick={handleHeartClick}
        aleadyFavorite={aleadyFavorite}
      />
      <Favorites favorites={favorites} />
    </div>
  );
};

export default App;
