import ShoeDetails from './components/shoedetails'
import ShoeType from './components/shoeType'
import ProductsWrapper from './components/productsWrapper'
import ShoeImage from './assets/shoe2.jpeg';


import './App.css'

function App() {
  const shoeData = {
    image: ShoeImage,
    name: "Nike Trainers",
    description: "A sleek and comfortable athletic shoe designed for everyday wear and performance.",
    price: 34.95,
    colors: ['#000000', '#2563eb', '#f97316', '#ec4899', '#eab308'],
    sizes: [40, 41, 42, 43, 44, 45],
};

return (
    <ProductsWrapper
        shoeType={
            <ShoeType
                image={shoeData.image}
            />
        }
        shoeDetails={
            <ShoeDetails
                name={shoeData.name}
                description={shoeData.description}
                price={shoeData.price}
                colors={shoeData.colors}
                sizes={shoeData.sizes}
            />
        }
    />
);
};

export default App
