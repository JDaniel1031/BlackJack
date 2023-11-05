export const getRandomImages = (imageArray) => {
    // Shuffle the array to get a random order
    const shuffledArray = imageArray.sort(() => Math.random() - 0.5);
  
    // Take the first two elements from the shuffled array
    const randomImages = shuffledArray.slice(0, 2);
  
    return randomImages;
  };
  
  const imageArray = [
    {
      "id": "https://robohash.org/molestiasaliquidmaxime.png?size=500x500&set=set1"
    },
    {
      "id": "https://robohash.org/veritatisnonoptio.png?size=500x500&set=set1"
    },
    {
      "id": "https://robohash.org/quonumquamperferendis.png?size=500x500&set=set1"
    },
    {
      "id": "https://robohash.org/harumomnisitaque.png?size=500x500&set=set1"
    },
    {
      "id": "https://robohash.org/nostrumenimcupiditate.png?size=500x500&set=set1"
    },
    {
      "id": "https://robohash.org/aliquidquampraesentium.png?size=500x500&set=set1"
    },
    {
      "id": "https://robohash.org/ipsumvoluptatenesciunt.png?size=500x500&set=set1"
    },
    {
      "id": "https://robohash.org/consequunturnostrumqui.png?size=500x500&set=set1"
    },
    {
      "id": "https://robohash.org/temporibusharumoccaecati.png?size=500x500&set=set1"
    },
    {
      "id": "https://robohash.org/doloremsedaperiam.png?size=500x500&set=set1"
    }
  ];
  
  export const randomImages = getRandomImages(imageArray);

  