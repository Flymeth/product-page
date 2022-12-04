import plusIcon from "../assets/plus.svg"
import minusIcon from "../assets/minus.svg"
import { useState } from "react"
import "../scss/productAmount.scss"

export function ProductNumberInput(params) {
    const [amount, updateValue] = useState(1)

    function setAmount(value) {
        updateValue((value !== "" ? Math.max(1, value) : value))
    }

    return <div className="product-amount-visualizer">
        <div className="addition counter-button" onClick={() => setAmount(amount + 1)}>
            <img src={plusIcon} alt="Add one more of this product" />
        </div>
        <label className="amount" htmlFor="amount">
            <input id="product-amount" name="amount" type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        </label>
        <div className="substraction counter-button" onClick={() => setAmount(amount - 1)}>
            <img src={minusIcon} alt="Remove one of this product" />
        </div>
    </div>
}