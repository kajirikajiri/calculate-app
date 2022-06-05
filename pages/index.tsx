import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { calculator } from '../scripts/calculator'

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [calculatedValue, setCalculatedValue] = useState(0)
  const [error, setError] = useState('')
  useEffect(()=>{
    if (error.length > 0) {
      const id = setTimeout(() => {
        setError('')
      }, 3000)
      return () => clearTimeout(id)
    }
  }, [error])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = calculator.sanitize(e.target.value)
    if (e.target.value !== sanitized) {
      const missing = e.target.value.replace(sanitized, "")
      console.error(`Invalid input: ${missing}`)
      setError(`入力された値「${missing}」は入力できません。数字か+-*/.()のみ入力できます。`)
      return
    }
    setInputValue(sanitized)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    calculator.setValue = inputValue
    const result = calculator.calculate()
    if (result.isErr) {
      console.error(e)
      setError('計算に失敗しました')
      return
    }

    setCalculatedValue(result.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder='1+2+3' value={inputValue} onChange={handleChange} />
      <span style={{ marginLeft: 5, marginRight: 5 }}>=</span>
      {calculatedValue}
      <div>{error}</div>
    </form>
  )
}

export default Home
