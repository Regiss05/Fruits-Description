/* eslint-disable react/jsx-key */
// eslint-disable-next-line
import React from 'react';
import Head from 'next/head'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link';
import ItemContext, { ItemContextData }  from '@/context/itemContext';
import { useRouter } from 'next/router';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [desInput, setDesInput] = useState('');

  const itemContext = React.useContext(ItemContextData);

  const [search, setSearch] = useState('');

  const filter = (e: { target: { value: any; }; }) => {
    const keyword = e.target.value;
    setSearch(keyword);
  };

  const addName = () => {
    if (userInput && desInput) {
      itemContext.setItems([
        {
          id: uuidv4(),
          name: userInput,
          description: desInput,
        },
        ...itemContext.items,
      ])   

      setUserInput('')
      setDesInput('')
    }

  }

  const router = useRouter();

  const handleDelete = (list: { id: string; name: string; description: string; }) => {
    const updatedNames = itemContext.items.filter((currentName, idx) => itemContext.items.indexOf(currentName) != itemContext.items.indexOf(list))

    itemContext.setItems(updatedNames)
  }

  let foundUsers = itemContext.items.filter((user) => {
    return user.name.toLowerCase().startsWith(search.toLowerCase());
  });

  if(search.length < 1) foundUsers = itemContext.items;

  return (
    <>
      <Head>
        <title>Simple App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col justify-center items-center">
          <div className='w-2/4 text-center bg-primary'>
            <div className="container">
              <form>
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search ..."
                    value={search}
                    onChange={filter}
                    required />
                  <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
              </form>
            </div>
            <h1 className='text-2xl my-5 animate-ping'>ADD ITEM</h1>
            <div>
              <input type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder='Add new name'
                className=' block w-full p-2.5'
                required
              />
              <input type="text"
                value={desInput}
                onChange={(e) => setDesInput(e.target.value)}
                placeholder='Description'
                className=' block w-full p-2.5 h-40 border'
                required
              />
              <button onClick={(e) => {
                e.preventDefault
                addName()
              }}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                Add Name
              </button>
            </div>
          </div>
          <h1 className='font-bold my-5'>FRUITS SPECIFICATIONS</h1>
          <div className='flex flex-wrap justify-center'>
            {
              foundUsers && foundUsers.length > 0 ? (
                foundUsers.map((list, idx) => {
                  return (
                    <div className="card-w rounded overflow-hidden shadow-lg mr-2 mt-2">
                      <img className="w-full h-40" src="https://thumbs.dreamstime.com/z/fresh-fruits-assorted-colorful-clean-eating-fruit-background-138466607.jpg" alt="Sunset in the mountains" />
                      <div className="px-6 py-4" key={idx}>
                        <div className="font-bold text-xl mb-2 uppercase">{list.name}</div>
                        <p className="font-thin text-xs px-5">
                          {list.description}
                        </p>
                      </div>
                      <div className="px-6 mb-4">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Enjoy</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Quality</span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Health</span>
                        <div>
                          <button onClick={(e) => {
                            e.preventDefault
                            itemContext.setSelectedItem(list);
                            router.push('/items');
                          }} 
                          className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                          > View Details </button>
                          <button onClick={(e) => {
                            e.preventDefault
                            handleDelete(list)
                          }}
                            className='type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                          >Delete</button>
                        </div>

                      </div>
                    </div>
                  )
                })
              ) : (
                <h1>No results found!</h1>
              )
            }
          </div>
        </div>
      </main>
    </>
  )
}
          
 
  
   