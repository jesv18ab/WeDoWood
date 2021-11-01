import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useReducer, useState } from 'react'
import CountUp from 'react-countup'
import { Button, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { useRouter } from 'next/router'
import CustomTable from '../utilComponents/Table'
import PopupComponentInfoBox from '../utilComponents/PopupComponentInfoBox'
import styles from '../assets/scss/Main.module.css'
import { getAllIds } from '../utils/getDataForDetails'
import { PROCESSING_STEP } from '../appConfig'
import { PLASTICBAG_WEIGHT } from '../appConfig'
import { IoBagSharp } from 'react-icons/io5'

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch(
        'https://pilot.blockchainbusiness.dk/v2/data/6d02c026-35d6-4ef5-9fe2-52f1aefa3583?parents=true'
    )
    const data = await res.json()

    return {
        props: {
            data
        }
    }
}

function modalReducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                dimmer: action.dimmer,
                handler: action.handler,
                modalText: action.modalText,
                openTable: true
            }
        case 'CLOSE_MODAL':
            return { handler: null, openTable: false }
        default:
            throw new Error()
    }
}

function Index({data}) {

    const [popOneIsOpen, setPopOne] = useState(false)
    const [popTwoIsOpen, setPopTwo] = useState(false)
    const [infoBoxIsOpen, setInfoBox] = useState(false)

    const [state, dispatch] = useReducer(modalReducer, {
        dimmer: undefined,
        handler: null,
        modalText: '',
        openTable: false
    })
    const { openTable, dimmer, handler, modalText } = state

    // Code that controls that only one popup is open at a time
    // TODO: Optimize code and logic

    const monitorProps = () => {
        if (popOneIsOpen) {
            setPopOne(false)
        }
        if (popTwoIsOpen) {
            setPopTwo(false)
        }
        if (infoBoxIsOpen) {
            setInfoBox(false)
        }
    }

    const router = useRouter()

    // Properties of the Countup component
    const [duration, decimals_1, decimals_2, startValue] = [2, 3, 2, 0]

    useEffect(() => {
        if (!router.query.pid) {
            router.replace({
                pathname: '/',
                query: { pid: '6d02c026-35d6-4ef5-9fe2-52f1aefa3583' }
            })
            setTimeout(function () {
                setInfoBox(true)
            }, 3000)
        }
    }, [router])

    if (router.query.pid) {
        const productId = router.query.pid
        const product = data.find((element) => element.id === productId)
        const footprint = product.event_data.find((obj) => obj.key_name === 'footprint_in_kgCO2eq')
            .value
        const plastbagsSaved = (Math.abs(footprint) * 1000) / PLASTICBAG_WEIGHT
        const steps = getAllIds(data.filter((obj) => obj.type.startsWith(PROCESSING_STEP)))
        const step = steps.find((item) => item.type.includes('wood'))
        const typeOfTree = step.event_data.find((item) => item.key_name === 'material').value
        const charArr = [...typeOfTree.toUpperCase()]

        return (
            <div role="presentation" onClick={() => monitorProps()} className={styles.container}>
                <div className="flex fixed w-full h-auto justify-end">
                    <div
                        role="presentation"
                        onClick={() => setInfoBox(!infoBoxIsOpen)}
                        className="blockChainLogoBg xl:mr-1/3 ">
                        <PopupComponentInfoBox
                            props={{
                                modalText:
                                    'HEY!  Look for the blue icon. it means that data has been extracted from our Blockchain!',
                                openBox: infoBoxIsOpen,
                                text: 'Blockchain'
                            }}
                        />
                    </div>
                </div>
                <section className="flex flex-start items-center justify-center w-screen h-1/2">
                    <div className=" landingImg bg-productImage bg-center bg-cover justify-center text-3xl font-sans font-semibold text-accent xl:w-2/6 ">
                        <div className=" flex flex-col w-full h-full p-2 ">
                            {Object.values(charArr).map((item, index) => {
                                return (
                                    <div className="w-6 text-center" key={index}>
                                        {' '}
                                        {item}{' '}
                                    </div>
                                )
                            })}

                            <div className="w-full h-inherit flex justify-start items-end">
                                <img
                                    className="w-2/6"
                                    src="../assets/img/WeDoWoodLogowhite.svg"
                                    alt="sprout logo"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col items-center justify-start w-screen m-4 text-base font-normal h-1/3 font-sans">
                    <div className="text-center">
                        <div className="text-text break-words ">
                            We combine a sustainable mindset, circular economy and a nordic
                            aesthetic to create high-quality furniture. Our use of bamboo makes it
                            possible to create products with a negative CO2 footprint
                        </div>
                    </div>
                    <div className=" flex flex-row w-screen h-1/3 justify-around items-center mt-6 ">
                        <div className=" flex flex-col w-auto h-auto items-center">
                            <div className="flex flex-row h-6 items-baseline mb-2">
                                <CountUp
                                    className="text-3xl font-medium font-sans border-none"
                                    start={startValue}
                                    end={footprint}
                                    duration={duration}
                                    separator=" "
                                    decimals={decimals_1}
                                    decimal=","
                                />
                                <div className="text-3xl font-medium font-sans border-none">
                                    {' '}
                                    ekg
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg text-text"> Carbon Footprint(HC) </div>
                            </div>
                        </div>
                        <div className=" flex flex-col w-auto h-auto items-center">
                            <div className="flex flex-row h-6 justify-center items-baseline mb-2">
                                <CountUp
                                    className="text-3xl font-medium font-sans border-none"
                                    start={startValue}
                                    end={plastbagsSaved}
                                    duration={duration}
                                    separator=" "
                                    decimals={decimals_2}
                                    decimal=","
                                />
                                <div className="text-3xl font-medium font-sans border-none">
                                    <IoBagSharp color={'orange'} size={25} />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg text-text">Plastic bags reduced</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center w-screen h-inherit items-center outline-none mt-8 ">
                        <button
                            type="button"
                            onClick={() =>
                                router.push({
                                    pathname: 'journey',
                                    query: { pid: router.query.pid }
                                })
                            }
                            className="w-10/12 h-16 rounded-xl text-text outline-none focus:outline-none shadow-lg bg-accent border-tertiary">
                            PRESS TO SEE MY JOURNEY
                        </button>
                    </div>
                </section>

                <Modal
                    dimmer={dimmer}
                    open={openTable}
                    onClose={() => dispatch({ handler: null, type: 'CLOSE_MODAL' })}>
                    <Modal.Header>Blockchain data - {modalText}</Modal.Header>
                    <Modal.Content>
                        {handler && (
                            <CustomTable
                                props={{
                                    handler,
                                    product
                                }}
                            />
                        )}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
    return (
        <div style={{ justifyContent: 'center' }} className={styles.container}>
            <CircularProgress />
        </div>
    )
}

export default Index

/*
    const PopupComponent = (props) => {
        return (
            <div className="flex flex-col items-start w-58 font-sans ">
                <div className="flex flex-row self-center">
                    <BiCubeAlt className="text-bcLogo" size={32.64} />
                    <h2 className="font-sans text-2xl font-semibold mt-0 text-text">
                        {' '}
                        {props.text}{' '}
                    </h2>
                </div>
                <ul className="mt-2 text-text">
                    <li className=" p-1 text-lg">Published by: WeDoWood</li>
                    <li className=" p-1 text-lg">Created date: 12.02</li>
                    <li className=" p-1 text-lg">Data from Blockchain</li>
                </ul>
                <button
                    type="button"
                    className="w-60 h-10 rounded-lg text-lg font-medium text-text bg-accent shadow-md font-sans"
                    onClick={() =>
                        activateModal({
                            dimmer: 'blurring',
                            handler: props.handleTable,
                            modalText: props.headerText,
                            type: 'OPEN_MODAL'
                        })
                    }>
                    ALL DATA
                </button>
            </div>
        )
    }

*/
/*    const activateModal = (props) => {
        if (popTwoIsOpen) {
            setPopTwo(false)
        }
        if (popOneIsOpen) {
            setPopOne(false)
        }
        dispatch({
            dimmer: props.dimmer,
            handler: props.handler,
            modalText: props.modalText,
            type: props.type
        })
    }
*/
/* const controlPopUps = (id) => {
        if (id === 'c02' && popTwoIsOpen) {
            setPopTwo(false)
        }
        if (id === 'material' && popOneIsOpen) {
            setPopOne(false)
        }
    }*/
