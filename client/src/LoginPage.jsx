import "./App.css"

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=edf539a34bd74b2595956a005b1f372b&response_type=code&redirect_uri=http://127.0.0.1:5173/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played"

export default function LoginPage() {
  return (
    <div className="login-page">
        <div className="login-container">
            <p>Login with spotify</p>
            <a href={AUTH_URL}>Spotify</a>
        </div>
    </div>
  )
}
