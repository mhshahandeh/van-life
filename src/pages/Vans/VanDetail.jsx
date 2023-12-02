import React, { Suspense } from "react"
import { Link, useLocation, useLoaderData, defer, Await } from "react-router-dom"
import { getVans } from "../../api"

export function loader({ params }) {
    return defer({ van : getVans(params.id)})
}

export default function VanDetail() { 
    const location = useLocation()
    const dataPromise = useLoaderData()

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    function renderVanElement(van) {
        return (
            <>
                <div className="van-detail">
                    <div className="van-detail-img">
                        <img src={van.imageUrl} />
                        <i className={`van-type ${van.type} selected`}>
                            {van.type}
                        </i>

                    </div>
                    <div className="van-detail-desc">
                        <h2>{van.name}</h2>
                        <p className="van-price"><span>${van.price}</span>/day</p>
                        <p className="van-desc">{van.description}</p>
                        <button className="link-button">Rent this van</button>

                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            <Suspense fallback={<h2>Loading vans...</h2>}>
                <Await resolve={dataPromise.van}>
                    {renderVanElement}
                </Await>
            </Suspense>
            

            

        </div>
    )
}