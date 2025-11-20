// App.jsx
import { useState } from "react";
import "./App.css";
import {PrimerComponente} from "./components/PrimerComponente.jsx";

const products = [
  {
    id: 1,
    name: "Product A",
    price: "$25",
    description: "This is Product A. High quality and durable.",
  },
  {
    id: 2,
    name: "Product B",
    price: "$40",
    description: "Product B comes with premium features and warranty.",
  },
  {
    id: 3,
    name: "Product C",
    price: "$15",
    description: "Affordable Product C, great for everyday use.",
  },
];

function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card" onClick={() => setExpanded(!expanded)}>
      <h2 className="product-title"> {product.name}</h2>
      <p className="price">{product.price}</p>
      {expanded && <p className="description">{product.description}</p>}
    </div>
  );
}
function Description({ text }){
  return <p>{text}</p>;
}

export default function App() {
  return (
    <div className="app">
      <div className="header-card">
        <h1 className="header">GrafiCalamar</h1>
      </div>
      <div className="card title-card">
        <h1 className="title">Our products</h1>
      </div>
      <div className="card-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="card-container">
        <h1 className="title"></h1>
        <PrimerComponente />
      </div>
    </div>
  );
}
