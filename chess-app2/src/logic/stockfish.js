export function getEvaluation(position, callback) {
    fetch("/topmoves", {
        method: "POST",
        cache: "no-cache",
        headers: { 
            "content_type":"application/json",
        },
        body: JSON.stringify({
            position: position,
            moves: 1  // only get best move
        })
    })
    .then(response => {
        return response.json();
    })
    .then(json => {
        // do some updates
        callback(json)
    })
}

// export function stopEvaluation() {
//     fetch("/stop");
// }

// // get request
// export function getEvaluation() {

//     var evaluation

//     fetch("/geteval")
//     .then(response => {
//         return response.json();
//     })
//     .then(stuff => {
//         // do some updates
//         console.log(stuff)
//         evaluation = stuff;
//     })

//     console.log(evaluation)
//     return evaluation;
// }