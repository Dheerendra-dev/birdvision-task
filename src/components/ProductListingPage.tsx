import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Loader from './Loader';

interface Product {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
}

const ProductListingPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        //function to fetch all the product based on the pagination
        const getProducts = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products?limit=9&skip=${(currentPage - 1) * 10}`);
                const { products } = await response.json();
                console.log(products)
                setProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false)
            }
        };
        getProducts();
    }, [currentPage]);

    //go to next page 
    const goToNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };
    // prev page
    const goToPrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    return (
        <div className='w-full justify-center items-center'>
            <div className="text-center p-10 mt-10">
                <h1 className="font-bold text-4xl mb-4">Product List</h1>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <section
                    id="Projects"
                    className="w-fit bg-slate-50  mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-4 mb-5"
                >
                    {products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </section>
            )}
            <div className='w-full justify-center flex mb-10'>
                <button onClick={goToPrevPage} disabled={currentPage === 1} className="flex w-30 items-center py-2 px-3 rounded font-medium select-none border text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white dark:hover:text-white"
                >
                    ⪻
                </button>
                <button onClick={goToNextPage} className="flex items-center w-30 py-2 px-3 rounded font-medium select-none border text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white dark:hover:text-white"
                >
                    ⪼
                </button>

            </div>
        </div>
    );
}

export default ProductListingPage;
