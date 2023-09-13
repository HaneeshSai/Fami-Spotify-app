const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://127.0.0.1:5173/',
    clientId: "edf539a34bd74b2595956a005b1f372b",
    clientSecret: "3ce6e7f1f6bd4844be49552979825fdd"
})


app.post('/refresh', (req, res) => {
    console.log("hi")
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://127.0.0.1:5173/',
        clientId: "edf539a34bd74b2595956a005b1f372b",
        clientSecret: "3ce6e7f1f6bd4844be49552979825fdd",
        refreshToken
    })

    spotifyApi.refreshAccessToken().then(
        (data) => {
          res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
          })
      
          // Save the access token so that it's used in future calls
          spotifyApi.setAccessToken(data.body['access_token']);
        }).catch(() => {
            console.log(err)
            res.sendStatus(400)
        })
        
})

app.post("/getprofile", async (req, res) => {
    spotifyApi.setAccessToken(req.body.accessToken)
    const {body: profileResponse} = await spotifyApi.getMe()
    const {body: usersPlaylist} = await spotifyApi.getUserPlaylists(profileResponse.id)
    const { body: recentlyPlayed} = await spotifyApi.getMyRecentlyPlayedTracks({limit: 1})
    const lastTrackPlayed = recentlyPlayed.items.length > 0 ? recentlyPlayed.items[0].track : null;
    res.json({profileResponse, lastTrackPlayed, usersPlaylist})

})

app.post("/login", (req, res) => {
    const code = req.body.code

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((error) => {
        console.log(error)
        res.sendStatus(400)
    })
})


app.listen(3001, () => {
    console.log('listening to 3001')
})