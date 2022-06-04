import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = () => {
  const [inputValue, setInputValue] =useState('')
  const [calculatedValue, setCalculatedValue] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // https://stackoverflow.com/a/6479415
  const calculator = (v:string) => eval(v.replace(/[^-()\d/*+.]/g, ''))

  const calculate = (v: string) => {
      const calculatedValue = calculator(v)
      return calculatedValue
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const calculatedValue = calculate(inputValue)
      setCalculatedValue(calculatedValue)
    } catch (e) {
      console.error(e)
      alert('計算に失敗しました')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input placeholder='1+2+3' onChange={handleChange} />
        <span style={{marginLeft: 5, marginRight: 5}}>=</span>
        {calculatedValue}
      </form>
    </>
  )
}

export default Home