import React, { useState } from 'react'
import { BiCubeAlt } from 'react-icons/bi'
import { useRouter } from 'next/router'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import CountUp from 'react-countup'

function CommunityCard({ props }) {
    console.log("props.data")
    console.log(props.data)
    let totalFootprint = 0
    const router = useRouter()
    const [openTreeNation, handleTreeNation] = useState(false)
    const [openUpCyclingForum, handleUpCyclingForum] = useState(false)
    const [openTheUpcycle, handleopenTheUpcycle] = useState(false)
    const arr = []

    props.data.forEach((item) => {
        if (item.type.includes('value-chain-checkpoint') && item.id !== props.productId) {
            const cf = item.event_data.find((obj) => obj.key_name === 'kg_co_2_e_kg').value
            arr.push(cf)
        }
    })

    console.log("props.data")
    console.log(props)
    const weight = props.data
        .find((item) => item.id === props.productId)
        .event_data.find((item) => item.key_name === 'weightInKg').value
    arr.forEach((item) => {
        totalFootprint = totalFootprint + (weight / 1000) * item
    })

    return (
        <section className="flex flex-col flex-start w-full h-80 mb-4">
            <div className="flex flex-start flex-col justify-center items-center w-full ">
                <div className="flex flex-row w-full justify-center h-8 justify-center items-center p-2 mb-2 ">
                    <BiCubeAlt className="animate-pulse" color={'#189BA3'} size={30} />
                    <div className="headlineStyle text-center">WHAT WE DO</div>
                </div>
                <div>
                    <div className="flex flex-col h-full w-screen text-sm p-4 pb-2">
                        We wish to be a part of a community that is engaged in removing waste from
                        the nature. We have found a solution to collect plastic and use it in our
                        products. Our Scoreboard is produced without any use of pesticides,
                        fertilizers or herbicides - no harm is done to either nature or any animals.
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center h-inherit w-full ">
                <div className=" flex flex-col h-full w-full p-2 text-sm pt-0 pb-2">
                    <div className="flex flex-col justify-start text-base font-semibold font-sans h-4/6 p-4">
                        <div className="flex flex-wrap h-auto w-full justify-evenly ">
                            <button
                                onClick={() => handleTreeNation(true)}
                                className=" flex flex-row justify-center items-center w-24 h-16 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-secondary rounded font-sans text-base pr-0 pl-0 shadow-lg">
                                <div> Tree nation </div>
                            </button>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className="flex items-baseline justify-center mt-8"
                                open={openTreeNation}
                                onClose={() => handleTreeNation(!openTreeNation)}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500
                                }}>
                                <Fade in={openTreeNation}>
                                    <div className=" flex flex-col items-center h-auto w-5/6 bg-white border-black border-1 rounded-lg mt-2 font-sans text-sm p-4">
                                        <img
                                            className="mb-2 mt-2"
                                            src={'/assets/img/carbon.svg'}
                                            alt="fsc logo"
                                            height={180}
                                            width={180}
                                        />
                                        <div className="p-4 mb-4">
                                            Our mission is to reforest the world. Planting trees has
                                            been proven to be one of the most efficient solutions to
                                            fight Climate Change. Thanks to our reforestation and
                                            conservation projects we help to restore forests, create
                                            jobs, support local communities and protect
                                            biodiversity. Through the Tree-Nation platform we aim to
                                            bring a technological solution to the problem of
                                            Deforestation, responsible for about 17% of all Climate
                                            Change emissions.
                                        </div>
                                        <button
                                            onClick={() => router.push('https://tree-nation.com')}
                                            className=" flex flex-row justify-center items-center w-2/3 h-16 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-secondary rounded font-sans text-base pr-0 pl-0">
                                            <div> Read more about Tree nation </div>
                                        </button>
                                    </div>
                                </Fade>
                            </Modal>
                            <button
                                onClick={() => handleUpCyclingForum(true)}
                                className=" flex flex-row justify-center items-center w-24 h-16 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-secondary rounded font-sans text-base pr-0 pl-0 shadow-lg">
                                <div> Upcycling Forum </div>
                            </button>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className="flex items-baseline justify-center mt-8"
                                open={openUpCyclingForum}
                                onClose={() => handleUpCyclingForum(!openUpCyclingForum)}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500
                                }}>
                                <Fade in={openUpCyclingForum}>
                                    <div className=" flex flex-col items-center h-auto w-5/6 bg-white border-black border-1 rounded-lg mt-2 font-sans text-sm p-4">
                                        <img
                                            className="mb-2 mt-2"
                                            src={'/assets/img/upCyclingForum.png'}
                                            alt="fsc logo"
                                            height={100}
                                            width={100}
                                        />
                                        <div className="p-4 mb-4">
                                            Upcycling Forum is a forum for companies, who are
                                            dedicated to transform their sustainable business
                                            strategy to a competitive resource. Our community are
                                            for companies who Believe in a mutual beneficial
                                            collaboration for all companies involved. Want to
                                            creative solutions to complex issues that is always
                                            achieved through a responsible mindset and with a focus
                                            on both the functional- and commercial side of our
                                            partners.
                                        </div>
                                        <button
                                            onClick={() =>
                                                router.push(
                                                    'https://www.upcyclingforum.dk/da/om-upcycling-forum'
                                                )
                                            }
                                            className=" flex flex-row justify-center items-center w-2/3 h-16 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-secondary rounded font-sans text-base pr-0 pl-0">
                                            <div> Read more about The Upcycling Forum</div>
                                        </button>
                                    </div>
                                </Fade>
                            </Modal>
                            <button
                                onClick={() => handleopenTheUpcycle(true)}
                                className=" flex flex-row justify-center items-center w-24 h-16 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-secondary rounded font-sans text-base pr-0 pl-0 shadow-lg">
                                <div> The Upcycl </div>
                            </button>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className="flex items-baseline justify-center mt-8"
                                open={openTheUpcycle}
                                onClose={() => handleopenTheUpcycle(!openTheUpcycle)}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500
                                }}>
                                <Fade in={openTheUpcycle}>
                                    <div className=" flex flex-col items-center h-auto w-5/6 bg-white border-black border-1 rounded-lg mt-2 font-sans text-sm p-4">
                                        <img
                                            className="mb-2 mt-2"
                                            src={'/assets/img/theUpcycle.png'}
                                            alt="fsc logo"
                                            height={120}
                                            width={120}
                                        />
                                        <div className="p-4 mb-4">
                                            The main objective with UPCYCL is to make a community,
                                            where companies work together to circulate materials
                                            between the production- and development units so that
                                            the supplychain to a greater extent consists of upcycled
                                            elements. By sharing ressources through THE UPCYCL, we
                                            can reduce timewaste and increase our sales.
                                            Simultaneously we will reduce both the amount of used
                                            ressources and the workload connected to removal of
                                            waste.
                                        </div>
                                        <button
                                            onClick={() => router.push('https://theupcycl.com')}
                                            className=" flex flex-row justify-center items-center w-2/3 h-16 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-secondary rounded font-sans text-base pr-0 pl-0">
                                            <div> Read more about The Upcycl </div>
                                        </button>
                                    </div>
                                </Fade>
                            </Modal>
                        </div>
                    </div>
                    <div className=" flex flex-row w-screen h-1/3 justify-around items-center ">
                        <div className=" flex flex-col w-auto h-auto items-center">
                            <div className="flex flex-row w-full justify-center h-8 justify-center items-center p-2 mb-2 ">
                                <div className="text-xl text-center">OUR FINAL FOOTPRINT</div>
                            </div>
                            <div className="flex flex-row h-6 items-baseline mb-2">
                                <CountUp
                                    className="text-3xl font-medium font-sans border-none"
                                    start={0}
                                    end={totalFootprint}
                                    duration={10}
                                    separator=" "
                                    decimals={2}
                                    decimal=","
                                />
                                <div className="text-3xl font-medium font-sans border-none">
                                    {' '}
                                    kg
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-sm text-text"> IMPACT in ekg </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CommunityCard
