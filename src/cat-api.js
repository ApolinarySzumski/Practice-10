export const fetchBreeds = () => {
  return fetch(
    'https://api.thecatapi.com/v1/breeds?live_rZzH8aTSb8EgvoUpMxGnwE4BaOpFs1yxswJogZfxRC4o5Mo0oZR6Pv4xvrcRihcn'
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      return response.json();
    }
  });
};

export const fetchCatByBreed = breedId => {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_rZzH8aTSb8EgvoUpMxGnwE4BaOpFs1yxswJogZfxRC4o5Mo0oZR6Pv4xvrcRihcn`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      return response.json();
    }
  });
};
