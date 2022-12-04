    import "../scss/buttons.scss"

export function Button({text, icon}) {
    return <button>
        <div className="captions">
            <img src={icon} alt="Button's icon" />
            <p>{text}</p>
        </div>
    </button>
}