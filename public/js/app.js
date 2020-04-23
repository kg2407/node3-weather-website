// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


//-------------How Fetch works----------------------

// fetch('http://localhost:3000/weather?address=Boston').then((response)=>{
//     response.json().then((data)=>{
//         if (data.error){
//             console.log(data.error)
//         }else{
//             console.log('Forecast ',data.forecast)
//             console.log('Location ', data.location)
//         }
//     })
// })
//-------------How Fetch works----------------------

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address='+ location).then((response)=>{
            response.json().then((data)=>{
                if (data.error){
                    messageOne.textContent = data.error
                    // console.log(data.error)
                }else{
                    messageOne.textContent = data.forecast
                    messageTwo.textContent = data.location
                    // console.log('Forecast ',data.forecast)
                    // console.log('Location ', data.location)
                }
            })
        })
})