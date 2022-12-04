import "../scss/product.scss"
import { Button } from "./button"
import cartIcon from "../assets/cart.svg"
import truckIcon from "../assets/truck.svg"
import renderCanvas from "../js/canvas_renderer"
import { useEffect } from "react"
import { ProductNumberInput } from "./productNumber"
import productInformations from "../assets/product.json"

export function Product(params) {
    useEffect(() => {
        if(!window.canvasRendered) {
            renderCanvas()
            window.canvasRendered= true
        }

        const canvas = document.querySelector('canvas')
        canvas.onmousedown = canvas.onpointerdown = () => {
            canvas.classList.add('focusing')
        }
        canvas.onmouseup = canvas.onpointerup = () => {
            canvas.classList.remove('focusing')
        }
    })

    const reviewChart = {
        participant: productInformations.reviews,
        data: {
            "loved": {
                label: "😻",
                data: productInformations.reviews.filter(r => r.review === 2)
            },
            "liked": {
                label: "😺",
                data: productInformations.reviews.filter(r => r.review === 1)
            },
            "hated": {
                label: "😾",
                data: productInformations.reviews.filter(r => r.review === 0)
            }
        }
    }

    return <div className="product">
        <div className="canvas-wrapper">
            <canvas>
                <p>Sorry, but your device doesn't support canvas. The product's preview can't be loaded.</p>
            </canvas>
        </div>
        <div className="product-informations">
            <div className="general-infos">
                <h2 className="product-name">{productInformations.name}</h2>
                <div className="product-description">
                    {productInformations.descriptions.map((content, index) => (
                        <p key={index}>{content}</p>
                    ))}
                </div>
            </div>
            <div className="price-n-actions">
                <div className="price">
                    <h3 className="price-value">
                        <span className="money">{productInformations.price.money}</span>
                        <span className="value">{productInformations.price.value}</span>
                    </h3>
                    <p className="price-caption">includes TVA</p>
                </div>
                <div className="actions">
                    <ProductNumberInput />
                    <Button icon={truckIcon} text="Buy Article" />
                    <Button icon={cartIcon} text="Add To Cart" />
                </div>
            </div>
        </div>
        <div className="product-details">
            <h2 className="section-title">Product Details</h2>
            <table>
                <tbody>
                    {productInformations.details.map((data, index) => (
                        <tr key={index}>
                            <td className="detail-desc">{data.description}</td>
                            <td className="detail-value">{data.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="product-reviews">
            <h2 className="section-title">Top Reviews</h2>
            <div className="chart">
                {Object.keys(reviewChart.data).map((name, index) => {
                    const {label, data} = reviewChart.data[name]
                    const value = data.length / reviewChart.participant.length * 100
                    return (
                        <div className="review-chart" key={index} data-review-index={index}>
                            <p className="label">{label}</p>
                            <div className="bar" style={{"--barPourcentage": `${value}%`}}></div>
                        </div>
                    )
                })}
            </div>
            <div className="comments">
                {productInformations.reviews.map((review, index) => (
                    <article key={index} data-review-index={2 - review.review}>
                        <div className="author">
                            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                            <img src={review.author.picture} alt={`${review.author.name.toLowerCase()}'s profile picture`} />
                            <h3 className="name">{review.author.name}</h3>
                        </div>
                        <section className="content">
                            <p>{review.comment}</p>
                        </section>
                    </article>
                ))}
            </div>
        </div>
    </div>
}