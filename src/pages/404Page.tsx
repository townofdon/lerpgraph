import { Link } from "react-router"
import { Stack } from "../components/Stack"

export const Page404 = () => {
  return <main>
    <Stack direction="column">
      <h1>err0r 404</h1>
      <h2>You broke the site!</h2>
      <p><em>Just kidding, we probably did something dumb on our end.</em></p>
      <p><Link to="/">&lt;-- Back to Home</Link></p>
    </Stack>
  </main>
}