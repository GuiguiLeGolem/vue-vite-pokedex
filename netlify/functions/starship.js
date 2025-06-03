const fetch = require('node-fetch')

exports.handler = async function(){
    const data = await fetch('https://www.swapi.tech/api/starships/').then(res => res.json())

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}