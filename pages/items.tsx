import React from 'react'
import Link from 'next/link';
import { ItemContextData } from '@/context/itemContext';

const items = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const itemContext = React.useContext(ItemContextData);
    console.log(itemContext.selectedItem);

    return (
        <div className='flex flex-col justify-center items-center mt-10'>
            <div className='w-2/4 text-center'>
                <Link href="/" className='mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>Back to home</Link>
                <div className='border block w-full p-2.5'>
                <h1 className='text-3xl mb-5 uppercase'>{itemContext.selectedItem?.name}</h1>
                <img className="w-full h-40" src="https://thumbs.dreamstime.com/z/fresh-fruits-assorted-colorful-clean-eating-fruit-background-138466607.jpg" alt="Sunset in the mountains" />
                <h3 className='my-3'>Description</h3>
                    <p className='my-5'>{itemContext.selectedItem?.description}</p>
                    <div className='flex justify-center mb-5'>
                        <div className="h-32 w-8 bg-blue-800 mx-1 animate-spin"></div>
                        <div className="h-24 w-8 bg-violet-800 mx-1 animate-spin"></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default items