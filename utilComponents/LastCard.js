import React from 'react'
import { BiCubeAlt } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { GoHome } from 'react-icons/go'
import { Popup } from 'semantic-ui-react'
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa'

const FscDiv = (data) => {
    const router = useRouter()
    return (
        <div className="flex flex-col justify-between items-center">
            <img
                height={120}
                width={120}
                className="mb-2 m-auto"
                src={'/assets/img/fsc.svg'}
                alt="fsc logo"
            />
            <div className="flex flex-row justify-evenly ">
                <Popup
                    on={'click'}
                    content={
                        <div
                            className={
                                'flex flex-row justify-center h-10 w-24 items-center border-1 bg-white border-black rounded-md'
                            }>
                            <FaClipboardCheck size={25} /> <div>copied</div>
                        </div>
                    }
                    onOpen={() => console.log('')}
                    position="top center"
                    pinned
                    trigger={
                        <div
                            onClick={() => navigator.clipboard.writeText(data.product_id)}
                            className="flex justify-center items-center h-10 w-10 bg-gray-200 rounded-lg mr-1 hover:bg-gray-300 focus:outline-none">
                            <FaClipboard size={20} />
                        </div>
                    }
                    closeOnTriggerClick
                    hideOnScroll
                />
                <button
                    onClick={() => router.push('https://info.fsc.org/certificate.php')}
                    className=" flex flex-row justify-center items-center w-24 h-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-secondary rounded font-sans text-base pr-0 pl-0">
                    <div> View </div>
                </button>
            </div>
        </div>
    )
}

const MainCertficateDiv = (data) => {
    const router = useRouter()
    return (
        <div className="flex flex-col justify-between items-center">
            <img
                className="m-auto"
                src={'/assets/img/carbon.svg'}
                alt="fsc logo"
                height={120}
                width={120}
            />
            <button
                onClick={() => router.push(data.event_data[0].storage)}
                className=" flex flex-row justify-center items-center h-10 w-24 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-secondary rounded font-sans text-base pr-0 pl-0">
                <div> View </div>
            </button>
        </div>
    )
}

function LastCard({ cardProps }) {
    const router = useRouter()
    return (
        <section className="flex flex-col flex-start w-full h-80 mb-4">
            <div className="flex flex-start flex-col justify-center items-center w-full ">
                <div className="flex flex-row w-full justify-center h-8 justify-center items-center p-2 mb-2 ">
                    <BiCubeAlt className="animate-pulse" color={'#189BA3'} size={30} />
                    <div className="headlineStyle text-center">{cardProps.headerText}</div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center h-inherit w-full ">
                <div className=" flex flex-col h-full w-full p-2 text-sm pt-0 pb-2 ...">
                    <div className="flex flex-col justify-start text-base font-semibold font-sans h-4/6 p-2">
                        <h3 className="text-center">{cardProps.subHeader}</h3>
                        <div className="flex flex-wrap h-auto w-full justify-evenly ">
                            {cardProps.certificates &&
                                cardProps.certificates.map((item) => {
                                    if (item.brand.includes('FSC')) {
                                        return FscDiv(item)
                                    } else {
                                        return MainCertficateDiv(item)
                                    }
                                })}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center h-auto w-full items-center mt-16 ">
                        <div className="flex flex-row justify-start text-base font-semibold font-sans">
                            <div className=" headlineStyle text-center">{cardProps.subHeader2}</div>
                        </div>
                        <div className=" flex flex-row justify-center items-center text-lg font-sans text-center p-2">
                            If you want to know more about us and what we do, don't hesitate to
                            reach out!.
                        </div>
                        <button
                            onClick={() => router.push('https://www.wedowood.dk/')}
                            className=" flex flex-row justify-center items-center w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-secondary rounded font-sans text-base pr-0 pl-0">
                            <GoHome className="p-1 -ml-2" size={30} color={'#189ba3'} />
                            <div> FIND US HERE </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default LastCard
