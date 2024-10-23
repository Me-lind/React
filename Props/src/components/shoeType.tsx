// Shoe image and slider component
interface ShoeType {
    image: string;
}

const ShoeType: React.FC<ShoeType> = ({image}) => {
    return (
        <div className="flex-1">
            <div className="relative">
                <img
                    src={image}
                    alt="Shoe"
                    className="w-full h-auto max-w-md rounded-lg" // max-w-md ensures the image isn't too wide
                />
            </div>
        </div>
    );
};

export default ShoeType