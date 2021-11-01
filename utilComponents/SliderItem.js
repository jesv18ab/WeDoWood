import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import getTitles from '../utils/getTitles'
//import getValueFromKey from '../utils/getValueFromKey'
const titles = getTitles()

function SliderItem(props) {
    const router = useRouter()
    const { data } = props
    const title = titles[data.type]

    return (
        <div className="outline-none sm: p-2">
            <div
                style={{
                    backgroundImage: `url(../assets/img/supplychain/${data.type}.jpg)`
                }}
                className="flex flex-col bg-cover bg-center justify-center items-center w-56 h-40 rounded-2xl p-1 h-40 font-sans font-semibold text-white lg:w-80 lg:ml-14 lg:h-48 ">
                <div className="flex flex-col w-full font-sans text-3xl font-semibold flex-start">
                    <div
                        style={{ filter: 'drop-shadow(2px 4px 6px black)' }}
                        className=" m-2 mt-1 lg:text-5xl">
                        {title}
                    </div>
                </div>
                <div className="flex w-full h-inherit justify-end items-end ">
                    <div
                        onClick={() =>
                            router.push({
                                pathname: 'details',
                                query: {
                                    pid: router.query.pid,
                                    card: title
                                }
                            })
                        }
                        className=" flex justify-center items-center bg-cardBg rounded-full h-16 w-16">
                        <AiOutlineRight color="white" size={52} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliderItem
