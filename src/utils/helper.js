export const isExists = (cart, product) => {
  return cart.find((i) => i.id === product.id);
};

export const getUniqueValue = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "size") {
    unique = unique.flat();
  }
  return [...new Set(unique)];
};

export const NavList = [
  { id: 0, icon: "fa-solid fa-house", link: "/" },
  { id: 1, icon: "fa-solid fa-heart", link: "/favorites" },
  { id: 2, icon: "fa-solid fa-basket-shopping", link: "/cart" },
  { id: 3, icon: "fa-solid fa-user", link: "/profile" },
];

export const buttons = [
  { id: 0, name: "All" },
  { id: 1, imageURL: "./assets/images/nike.svg", name: "Nike" },
  { id: 2, imageURL: "./assets/images/reebok.svg", name: "Reebok" },
  { id: 3, imageURL: "./assets/images/puma.svg", name: "Puma" },
  { id: 4, imageURL: "./assets/images/adidas.svg", name: "Adidas" },
  { id: 5, imageURL: "./assets/images/vans.svg", name: "Vans" },
];
