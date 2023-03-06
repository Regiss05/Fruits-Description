import Head from 'next/head'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [nameList, setNameList] = useState([]);

  const handleChange = (e) => {
    e.preventDefault()

    setUserInput(e.target.value)
  }

  const addName = () => {
    setNameList([
      userInput,
      ...nameList
    ])

    setUserInput('')
  }

  const handleDelete = (name) => {
    const updatedNames = nameList.filter((currentName, idx) => nameList.indexOf(currentName) != nameList.indexOf(name))

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
        <div>
          <div>
            <input type="text"
              value={userInput}
              onChange={handleChange}
              placeholder='Add new name'
            />
            <button onClick={(e) => {
              e.preventDefault
              addName()
            }}
            >
              Add Name
            </button>
          </div>
          {
            nameList.length >= 1 ? nameList.map((name, idx) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <div>
                  <div key={idx}>
                    <h1>{name}</h1>
                    <p>je sui vraiment ct</p>
                  </div>
                  <button onClick={(e) => {
                    e.preventDefault
                    handleDelete(name)
                  }}>Delete</button>
                </div>
              )
            })
              : ''
          }
        </div>
      </main>
    </>
  )
}
