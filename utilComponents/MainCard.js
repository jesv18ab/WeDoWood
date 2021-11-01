import React, { useEffect, useState } from 'react'
import { BiCubeAlt } from 'react-icons/bi'
import { getFormattedDate, getStepData } from '../utils/getDataForDetails'
import { GiFruitTree } from 'react-icons/gi'
import AnimatedProgressProvider from './AnimatedProgressProvider'
import { easeQuadInOut } from 'd3-ease'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

const ImprovementDiv = (data) => {
    const [arr, setArr] = useState([])
    let timer = null // Will hold a reference to the timer
    let index = 0 // Keeps track of which array element to show next

    if (data && data.val) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            function printCountries() {
                setArr((oldArray) => [...oldArray, data.val[index]])
                if (index === data.val.length - 1) {
                    clearInterval(timer) // Cancel the timer
                } else {
                    index++ // Increment the index so that the next time, we get the next country
                }
            }
            // You'll want to stop the interval when you're done iterating the array
            // so you need to set u a reference to it to refer to later.
            timer = setInterval(printCountries, 1000)
            // logs <div>I'm an element</div>
        }, [])
    }
    if (data !== null && Array.isArray(data.val)) {
        return (
            <div className="flex flex-wrap justify-center mb-2">
                <div className="font-semibold font-sans underline text-base w-full">
                    {data.title}
                </div>
                {arr && (
                    <div className="flex h-auto w-auto">
                        {arr.map((component, i) => {
                            return <GiFruitTree key={i} size={20} />
                        })}
                    </div>
                )}
            </div>
        )
    } else if (data) {
        return (
            <div className="flex flex-col h-auto justify-center items-center mb-2">
                <div className="font-semibold underline font-sans text-base w-full ">
                    {data.title}
                </div>
                <div className="flex w-16 h-16">
                    <AnimatedProgressProvider
                        valueStart={0}
                        valueEnd={data.val}
                        duration={5}
                        easingFunction={easeQuadInOut}>
                        {(value) => {
                            const roundedValue = Math.round(value)
                            return (
                                <CircularProgressbar
                                    value={value}
                                    text={`${roundedValue}%`}
                                    styles={buildStyles({ pathTransition: 'none' })}
                                />
                            )
                        }}
                    </AnimatedProgressProvider>
                </div>
            </div>
        )
    } else return <div className="flex h-16 w-auto"></div>
}

const getCardText = (props) => {
    const product = props.data.find((element) => element.id === props.item.id)
    // const values = getInfo(props.id, props.ids)

    // const timestamp = product.timestamp
    const keysToCheck = [
        {
            id: 'value-chain-checkpoint-wood',
            cardText: `Selecting the right raw material has a significant impact on the full life cycle carbon footprint. We care deeply about our footprint. Therefore, the end-to-end supply chain, is C02-neutral or better.`,
            title: props.titles.wood,
            subheader: 'Premium Material'
        },
        {
            id: 'value-chain-checkpoint-transportShip',
            cardText: `At We Do Wood we’re all about walking the talk. We create aesthetic furniture but always with a sustainable footprint. We have made it our ambition to always seek the better alternative`,
            title: props.titles.transportShip,
            subheader: 'Ship Overseas'
        },
        {
            id: 'value-chain-checkpoint-transportTruck',
            cardText: `Transportation leaves a significant carbon footprint. Therefore we have evaluated our ways of transportation. We have minimized the number of steps in our supplychain and optimized the transportation route`,
            title: props.titles.transportTruck,
            subheader: 'Minimize Distance'
        },
        {
            id: 'value-chain-checkpoint-production',
            cardText: `We work with Danish furniture manufacturers and have a long tradition of craftsmanship and high quality furniture. The main thing for us is to create furniture that is honest in both its actual function and its visual expression. `,
            title: props.titles.production,
            subheader: 'Fine Craftsmanship'
        }
    ]

    return keysToCheck.find((item) => item.id === product.type)
}

const ViewComponent = ({ type, prodId, data }) => {
    const step = data.find((element) => element.id === type)
    const date = new Date(step.timestamp)
    const formattedDate = getFormattedDate(date)
    const stepData = getStepData(step, prodId, data)

    return (
        <div className="flex flex-col h-full w-40 text-center">
            <div className="flex flex-col h-auto w-full items-center mb-2">
                <div className="font-semibold underline text-base ">Registration Date</div>
                <div className="flex flex-row w-full justify-center items-center">
                    <div>{!formattedDate ? 'Not Registered ' : formattedDate}</div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-auto w-full items-center mb-2">
                <div className="font-semibold underline text-base">Activity</div>
                <div className="flex flex-row w-full justify-center items-center">
                    {' '}
                    {stepData.activity}
                    {stepData.icon}
                </div>
            </div>
            <div className="flex flex-col justify-center h-auto w-full items-center mb-2 ">
                <div className="font-semibold underline text-base">Carbon Footprint</div>
                <div className="flex flex-row w-full justify-center items-center">
                    {!stepData.counterVal ? 'Not Registered ' : stepData.counterVal}
                </div>
            </div>
            {stepData && ImprovementDiv(stepData.compariosonVal)}
        </div>
    )
}

function MainCard({ props }) {
    const textElements = getCardText(props)

    return (
        <section className="flex flex-col flex-start w-full h-80 mb-4">
            <div className="flex flex-start flex-col justify-center items-center w-full ">
                <div className="flex flex-row w-full justify-center h-8 justify-center items-center mb-4">
                    <BiCubeAlt className="animate-pulse" color={'#189BA3'} size={30} />
                    <div className="headlineStyle">{textElements.title}</div>
                </div>
            </div>

            <div className="flex flex-row justify-evenly h-inherit">
                <div className="flex flex-col h-full w-18/25 text-sm ">
                    <div className="flex justify-center">
                        <div className="font-semibold underline text-base">
                            {textElements.subheader}
                        </div>
                    </div>
                    <div className="break-words">{textElements.cardText}</div>
                </div>
                <div className=" flex flex-col h-auto items-center w-auto">
                    <ViewComponent type={props.item.id} prodId={props.productId} data={props.data} />
                </div>
            </div>
        </section>
    )
}
export default MainCard
