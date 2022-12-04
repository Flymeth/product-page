import { NavigationBar } from "./components/nav";
import { Product } from "./components/product";
import "./scss/main.scss";

function App() {
  const root = document.querySelector('#root')
  const pageDimention = [root.clientWidth, root.clientHeight]

  const backgroundSize= parseFloat(getComputedStyle(root).backgroundSize.replace('%', ''))
  const backgroundDimention = pageDimention.map(dimention => dimention * backgroundSize / 100)
  const backgroundOffset = backgroundDimention.map((bgSize, index) => bgSize - pageDimention[index])

  const pixelsPerDistance= .05

  const cantUseBgAnimation = navigator.userAgentData.mobile ?? navigator.userAgent.toLowerCase().includes('mobile')
  if(!cantUseBgAnimation) window.onmousemove = (e) => {
    const clientPosition = [e.clientX, e.clientY]

    const clientPositionAsBackground = clientPosition.map((client, index) => client * backgroundDimention[index] / pageDimention[index])
    const [x, y] = clientPositionAsBackground.map((value, index) => -value * pixelsPerDistance - backgroundOffset[index] /2)
    
    root.style.backgroundPosition= `${x}px ${y}px`
  }
  else root.style.backgroundSize= "cover"

	return (
		<>
			<NavigationBar />
			<main>
				<Product />
        <footer>
          <p>Made with 💖 by <a href="https://flymeth.net" target={"_blank"} rel="noreferrer">Flymeth</a>.</p>
        </footer>
			</main>
		</>
	);
}

export default App;
