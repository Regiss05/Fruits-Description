// eslint-disable-next-line

import Head from 'next/head'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [desInput, setDesInput] = useState('')

  const [nameList, setNameList] = useState([
    {
      id: '123',
      name: 'Orange',
      description: 'An orange is a fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus × sinensis,[1] which is also called sweet orange, to distinguish it from the related Citrus × aurantium, referred to as bitter orange. '
    }
    
  ]);

  const addName = () => {
    if (userInput && desInput) {
      setNameList([
        {
          id: uuidv4(),
          name: userInput,
          description: desInput,
        },
        ...nameList,
      ])

      setUserInput('')
      setDesInput('')
    }

  }

  const handleDelete = (list: { id: string; name: string; description: string; }) => {
    const updatedNames = nameList.filter((currentName, idx) => nameList.indexOf(currentName) != nameList.indexOf(list))

    setNameList(updatedNames)
  }

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
            <SearchBar />
            <h1 className='text-2xl my-5'>ADD STOCK</h1>
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
            <div className=''>
              {
                nameList.map((list, idx) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div className='border'>
                      <div key={idx}>
                        <h1 className='uppercase font-extrabold'>{list.name}</h1>
                        <p className='font-thin text-xs p-5'>{list.description}</p>
                      </div>
                      <Link href="/items"
                        className='class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"'
                      >View</Link>
                      <button onClick={(e) => {
                        e.preventDefault
                        handleDelete(list)
                      }}
                        className='type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                      >Delete</button>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
