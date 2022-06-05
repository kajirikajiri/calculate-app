import type { NextPage } from 'next'
import { useState } from 'react'
import { calculator } from '../scripts/calculator'

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [calculatedValue, setCalculatedValue] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = calculator.sanitize(e.target.value)
    if (e.target.value !== sanitized) {
      const missing = e.target.value.replace(sanitized, "")
      console.error(`Invalid input: ${missing}`)
      alert(`入力された値「${missing}」は入力できません。数字か+-*/.()のみ入力できます。`)
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
      alert('計算に失敗しました')
      return
    }

    setCalculatedValue(result.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder='1+2+3' value={inputValue} onChange={handleChange} />
      <span style={{ marginLeft: 5, marginRight: 5 }}>=</span>
      {calculatedValue}
    </form>
  )
}

export default Home
