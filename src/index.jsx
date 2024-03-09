import { createRoot } from 'react-dom/client';

import { MainView } from "./components/main-view/main-view";

import { Container } from 'react-bootstrap';



// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";


// {
//   /* The following line can be included in your src/index.js or App.js file */
// }
// import 'bootstrap/dist/css/bootstrap.min.css';

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    // <Container style = {{border: "1px solid red"}}>
    <Container>
  <MainView />
   </Container>
)};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);