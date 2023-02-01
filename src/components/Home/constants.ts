const width = 800;
const q = 80;
const params = `ixlib=rb-1.2.1&auto=format&fit=crop&w=${width}&q=${q}`;

const emojiToImage: Record<string, string> = {
  "🍞": `https://images.unsplash.com/photo-1549931319-a545dcf3bc73?${params}`,
  "🍜": `https://images.unsplash.com/photo-1559942144-92147a3adb0f?${params}`,
  "🍪": `https://images.unsplash.com/photo-1607114910421-a7c2b982d497?${params}`,
  "🥘": `https://images.unsplash.com/photo-1612690194179-65e8a2bdc470?${params}`,
  "🌮": `https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?${params}`,
  "🥔": `https://images.unsplash.com/photo-1631898039984-fd5f61fe8732?${params}`,
  "🍗": `https://images.unsplash.com/photo-1604422237312-37a96a84a4c6?${params}`,
  "🍖": `https://images.unsplash.com/photo-1593030668930-8130abedd2b0?${params}`,
  "🍌": `https://images.unsplash.com/photo-1605671086496-47bfef8d7191?${params}`,
  "🍝": `https://images.unsplash.com/photo-1622973536968-3ead9e780960?${params}`,
  "🍩": `https://images.unsplash.com/photo-1585653621032-a5fec164ee92?${params}`,
  "🧁": `https://images.unsplash.com/photo-1486427944299-d1955d23e34d?${params}`,
  "🐟": `https://images.unsplash.com/photo-1645120091968-5f24af8eaff5?${params}`,
  "🍲": `https://images.unsplash.com/photo-1591386767153-987783380885?${params}`,
};

const defaultImage = `https://images.unsplash.com/photo-1591386767153-987783380885?${params}`;

export { emojiToImage, defaultImage };
