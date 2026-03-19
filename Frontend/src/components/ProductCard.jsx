import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { _id, name, price, image } = product;

  return (
    <Link to={`/product/${_id}`} className="group block">
      <div className="overflow-hidden rounded-xl bg-gray-50 aspect-[3/4] relative">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="mt-3 px-0.5">
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        <p className="text-sm font-semibold text-black mt-0.5">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
