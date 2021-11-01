import { useEffect } from 'react'
import $ from 'jquery'

function retreiveData() {
    const username = 'CBS'
    const password = 'Sommer2021!'
    fetch(
        "https://sproutworld.activebs.com:38881/SproutBC15_2_NUP/OData/Company('Sprout%20Europe%20ApS')/workflowItems",
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: 'Basic ' + btoa(`${username}:${password}`)
            }
        }
    )
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            // Read the response as json.
            return response.json()
        })
        .then(function (responseAsJson) {
            // Do stuff with the JSON
            console.log(responseAsJson)
        })
        .catch(function (error) {
            console.log('Looks like there was a problem: \n', error)
        })
}

function testOdata() {
    useEffect(() => {
        retreiveData()
    }, [])
    return (
        <div className=" flex h-full w-full justify-center items-center">
            <div className="flex">hey</div>
        </div>
    )
}

export default testOdata

/*  if (typeof window) {
     //Endpoint
     const uri =
         "https://sproutworld.activebs.com:38881/SproutBC15_2_NUP/OData/Company('Sprout%20Europe%20ApS')/workflowItems"
     let h = new Headers()

     //Basic Auth
     let encoded = window.btoa('CBS:Sommer2021!')
     let auth = 'Basic ' + encoded
     //Header properties
     h.append('accept', 'application/json')
     h.append('authorization', auth)

     //Making request
     let reg = new Request(uri, {
         method: 'GET'
     })

     //Fetch data method
     fetch(reg)
         .then((response) => {
             console.log('response')
             console.log(response)
             if (response.ok) {
                 return response.json
             } else {
                 throw new Error('Bad HTTP Stuff')
             }
         })
         .then((jsonData) => {
             console.log(jsonData)
         })
 }*/
