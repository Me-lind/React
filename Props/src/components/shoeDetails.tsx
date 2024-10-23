
// Shoe details component
interface ShoeDetails {
    name: string;
    description: string;
    price: number;
    colors: string[];
    sizes: number[];
}
const ShoeDetails: React.FC<ShoeDetails> = ({
    name,
    description,
    price,
    colors,
    sizes
}) => {
    return (
        <div className="flex-1 space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-gray-600 text-sm">More info</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold mb-2">PRODUCT DESCRIPTION</h3>
                    <p className="text-gray-600">{description}</p>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">COLOUR</h3>
                    <div className="flex gap-2">
                        {colors.map((color, index) => (
                            <button
                                key={index}
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">SIZE</h3>
                    <div className="flex gap-2 flex-wrap">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                    <button className="bg-blue-500 text-white px-8 py-2 rounded-full hover:bg-blue-600">
                        BUY
                    </button>
                    <span className="text-xl font-bold">€{price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};
export default ShoeDetails