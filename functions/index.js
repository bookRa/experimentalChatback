const functions = require('firebase-functions');
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp()
const databaseUsers = admin.database().ref('/users')
const databaseConvos = admin.database().ref('/convos')

const matchRequests = admin.database().ref('/matchRequests')



exports.getMatch = functions.https.onRequest((req, res) => {
    // replace this with uid to permit same userNames
    let name = req.query.userName;
    return cors(req, res, ()=>{
        matchRequests.once('value')
        .then(snapshot => {
            if (snapshot.hasChildren() && snapshot.val().u1 !== name) {
                console.log("Yes User in Queue")
                matchRequests.update({
                    u2: name
                }).then(()=>{
                    console.log("About to delete!")
                    matchRequests.remove()
                    returnObj = snapshot.val()
                    returnObj.paired = true;
                    res.send(returnObj)
                    // console.log(snapshot.val())
                    // console.log("matchRequests")
                    return null
                })
                .catch(err=> console.log(err))
    
            }
            else if(!snapshot.val() || snapshot.val().u1 !== name){
                console.log("No Users in Queue")
                let newConvo = databaseConvos.push()
                matchRequests.set({
                    conversation: newConvo.key,
                    u1: name,
                }).then(() => {
                    console.log("Match Request Added")
                    returnObj = {
                        paired: false,
                        conversation: newConvo.key
                    }
                    res.send(returnObj)
                    return null
                }
                )
                .catch(e=> console.log(e))
            }
            return null
        })
        .catch(err=> console.log(err))

    })
}
)
// exports.getMatch= functions.https.onRequest((req, res)=>{
//     let thisUser = {
//         name: req.query.userName,
//         connection: res
//     }
//     return cors(req, res, ()=>{
//         console.log("*****USERNAME REQUEST*****")
//         console.log(uQ)
//         console.log(thisUser.name)
//         if(uQ.length){
//             let firstUser = uQ.pop() // The first match requester
//             let newConvo = databaseConvos.push()
//             firstUser.connection.send({
//                 conversation: newConvo.key,
//                 partner: thisUser.name

//             })
//             thisUser.connection.send({
//                 conversation: newConvo.key,
//                 partner: firstUser.name

//             })
//         }
//         else{
//             uQ.push(thisUser)
//         }
//     })
// })



let uQ = []
exports.helloWorld = functions.https.onRequest((request, response) => {
    let newID = databaseConvos.push()
    return cors(request, response, () => {
        // console.log("response: ", response)
        // console.log("request: ", request)
        if (uQ.length) {
            uQ.pop().send({
                msg: "You're the first!",
                convo: newID.key
            })
            response.send({
                msg: "You're the Second!",
                convo: newID.key
            })
        } else {
            uQ.push(response)
            // response.send("Wait For it!!!")
        }
    })
});
/*
Should return the following JSON:
{
    conversation: convoID
    partner: partnerName
}
TODO: Error message on timeout
*/
// LET'S IMPLEMENT A CALLABLE LATER
// exports.getMatch = functions.https.onCall((data, context)=>{
    //     let thisUser = 
// })