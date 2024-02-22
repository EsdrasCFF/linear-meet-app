export function generateCharacters() {
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'

  let lowercase = '';
  let lowercaseTwo = '';
  let numbercase = '';

  let lettersSize = 4
  for(let i = 0; i < lettersSize; i++ ) {
    const randomLowercaseLetters = Math.floor(Math.random() * lowercaseLetters.length)
    const randomLowercaseTwoLetters = Math.floor(Math.random() * lowercaseLetters.length)
    const randomNumbers = Math.floor(Math.random() * numbers.length)
    
    lowercase = lowercase + lowercaseLetters[randomLowercaseLetters]
    lowercaseTwo = lowercaseTwo + lowercaseLetters[randomLowercaseTwoLetters]
    numbercase = numbercase + numbers[randomNumbers]
    
  }

  const roomId = `${lowercase}-${numbercase}-${lowercaseTwo}`

  return roomId
}