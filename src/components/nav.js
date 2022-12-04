import { useEffect, useState } from "react"
import icon from "../assets/icon.svg"
import "../scss/nav.scss"

export function NavigationBar() {
    const links = ["kitchen", "salon", "bedroom", "outdoor"]
    const [show, setShow] = useState(false)
    
    const [min, max]= [.005, 1]
    const [scroll, setScroll] = useState(min)
    useEffect(() => {
        const scroller = document.querySelector('main')
        const {clientHeight, scrollHeight} = scroller
        const maxScrollY = scrollHeight  - clientHeight

        scroller.onscroll = (e) => {
            const scrollY = scroller.scrollTop
            const scroll = scrollY / maxScrollY
            if(scroll < min) return setScroll(min)
            else if(scroll > max) return setScroll(max)
            else return setScroll(scroll)
        }
    })

    return <nav style={{"--scroll": scroll}} className={show ? "openned" : ""}>
        <a href="/" className="logo">
            <img src={icon} alt="Brand icon" />
            <h1>Be Good At Home</h1>
        </a>
        <ul className="links">
            {links.map((room, index) => <li key={index}><a href={`#${room}`}>{room}</a></li>)}
        </ul>
        <button className="openner" onClick={() => setShow(!show)}>
            Open Menu
        </button>
    </nav>
}