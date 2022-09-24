const admin = require('firebase-admin')
const serviceAccount = require('./fb_admin.json')
const data = require('./data.json')
const lostData = require('./lostdata.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})


const db = admin.firestore()
const start = async () => {


    await db.collection('server').doc('test')
        .set({
            name: "Mohammed",
            age: "Sami"
        })
        .then((res) => {
            console.log(res)
        })
        .catch((error) => {
            console.log("hello")
        })

    await console.log("hello Mohammed")
}
// start()


var a = 0
const snapShot = async () => {

    await db.collection('server').onSnapshot((snap) => {
        const dt = snap.docs[0]
        // console.log(dt._fieldsProto)

        console.log("hello Mohammed " + a)
        a += 1

        // db.collection('')
    })

    // await console.log("finished")
}

// snapShot()

const onSnapShotfound_repots = async () => {

    await db.collection('found_repots').onSnapshot(async (snap) => {
        console.log('hello Mohammed ' + a)
        a += 1
        await db.collection('found_repots')
            .orderBy('date')
            .limit(5)
            .get()
            .then((data) => {
                console.log(data.docs)
            })
            .catch((error) => {
                console.log(error)
            })
    })
}

// onSnapShotfound_repots()

const GenerateData = async () => {

    let deviceyData = JSON.parse(JSON.stringify(data))
    console.log(deviceyData.length)

    var batch = db.batch()
    const d = deviceyData.slice(0, 20)
    d.forEach((item) => {
        batch.set(db.collection('found_repots').doc(), item)
    });

    batch.commit().then((res) => {
        console.log("good insert")
    })
        .catch((error) => {
            console.log("there are error")
        })
}

// GenerateData()

const GenerateLostData = async () => {

    const lostDt = JSON.parse(JSON.stringify(lostData))

    const batch = db.batch()

    const d = lostDt.slice(0, 20)
    d.forEach((item) => {
        batch.set(db.collection('lost_repots').doc(), item)
    })

    batch.commit().then((res) => {
        console.log("good insert")
    })
        .catch((error) => {
            console.log("there are error")
        })
}

GenerateLostData()