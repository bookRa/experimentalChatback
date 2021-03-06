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
    // TODO: replace this with uid to permit same userNames
    let name = req.query.userName;
    return cors(req, res, () => {
        matchRequests.once('value')
            .then(snapshot => {
                if (snapshot.hasChildren()) { //that means somone's been here before (u1 could be null)
                let u1 = snapshot.val().u1;
                    if (u1) { //u1 exists
                        console.log("Yes User in Queue")
                        matchRequests.update({
                            u2: name
                        }).then(() => {
                            console.log("About to delete!")
                            matchRequests.remove()
                            returnObj = snapshot.val()
                            returnObj.paired = true;
                            res.send(returnObj)
                            // console.log(snapshot.val())
                            // console.log("matchRequests")
                            return null
                        })
                            .catch(err => console.log("Error removing successful match:", err))
                    } else { //u1 is null (i.e prev user has unsubscribed)
                        matchRequests.update({
                            u1: name
                        }).then(() => {
                            // let timeOut = 10 //Set the timeout here? Not now
                            console.log("Match Request updated from unsubbed U1")
                            returnObj = snapshot.val()
                            returnObj.u1 = name
                            returnObj.paired = false
                            res.send(returnObj)
                            return null
                        }
                        )
                            .catch(e => console.log("Error updating with unsubbed u1:", e))

                    }

                }
                else { // if (!snapshot.val() || snapshot.val().u1 !== name)
                    console.log("No Users in Queue")
                    let newConvo = databaseConvos.push()
                    matchRequests.set({
                        conversation: newConvo.key,
                        u1: name,
                    }).then(() => {
                        let timeOut = 10
                        console.log("Match Request Added")
                        returnObj = {
                            paired: false,
                            conversation: newConvo.key,
                            timeOut: timeOut
                        }
                        res.send(returnObj)
                        return null
                    }
                    )
                        .catch(e => console.log("Error Setting fresh node:", e))
                }
                return null
            })
            .catch(err => console.log("Wasn't able to get the Match Node:", err))

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