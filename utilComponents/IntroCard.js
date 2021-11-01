import React from 'react'
import { BiCubeAlt } from 'react-icons/bi'
import { AMOUNT_OF_DOTS } from '../appConfig'
import { WEIGHT_PR_DOT } from '../appConfig'
import { AMOUNT_OF_UNITS_SOLD } from '../appConfig'
import CountUp from 'react-countup'

function IntroCard() {
    const plasticRemoved = AMOUNT_OF_UNITS_SOLD * AMOUNT_OF_DOTS * WEIGHT_PR_DOT
    return (
        <section className="flex flex-col flex-start w-full h-60 mb-4">
            <div className="flex flex-start flex-col justify-center items-center w-full ">
                <div className="flex flex-row w-full justify-center h-8 justify-center items-center p-2 mb-2 ">
                    <BiCubeAlt className="animate-pulse" color={'#189BA3'} size={30} />
                    <div className="headlineStyle text-center">OUR IMPACT</div>
                </div>
                <div className="flex flex-col h-full w-screen text-sm p-4 pb-2">
                    The small colored pegs in our Scoreboards are made of leftover production
                    materials. The colored DOTS consist of upcycled Plastic. Each Scoreboard holds{' '}
                    {AMOUNT_OF_DOTS} DOTS with an average weight of {WEIGHT_PR_DOT}g. Our ability to
                    absorb plastic is reflected in th total amount of Scoreboard units sold, which
                    in 2021 will be {AMOUNT_OF_UNITS_SOLD}. This amount of sold units will add up to
                    a total absorption of {plasticRemoved / 1000}kg.
                </div>
                <div className=" flex flex-row w-screen h-1/3 justify-around items-center ">
                    <div className=" flex flex-col w-auto h-auto items-center">
                        <div className="flex flex-row h-6 items-baseline mb-2">
                            <CountUp
                                className="text-3xl font-medium font-sans border-none"
                                start={0}
                                end={plasticRemoved / 1000}
                                duration={10}
                                separator=" "
                                decimals={2}
                                decimal=","
                            />
                            <div className="text-3xl font-medium font-sans border-none"> kg</div>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-text"> Plastic reduced in Kg </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default IntroCard

/*                <div className="flex w-full h-24">
                    <StackedBar plastRemoved={Math.round(plasticRemoved / 1000)} />
                </div>*/
