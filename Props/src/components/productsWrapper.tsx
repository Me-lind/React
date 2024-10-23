import React from 'react';

interface ProductsWrapperProps {
    shoeType: React.ReactNode;
    shoeDetails: React.ReactNode;
}

// Main wrapper component
const ProductsWrapper: React.FC<ProductsWrapperProps> = ({ shoeType, shoeDetails }) => {
    return (
        <div className="products-wrapper">
            <div className="shoe-type">
                {shoeType}
            </div>
            <div className="shoe-details">
                {shoeDetails}
            </div>
        </div>
    );
};

export default ProductsWrapper;
