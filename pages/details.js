import styles from '../assets/scss/Main.module.css'
import React, { useEffect } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useRouter } from 'next/router'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgress } from '@material-ui/core'
import { MAP_SLIDER_TITLES, PROCESSING_STEP } from '../appConfig'
import { getAllIds, getAllCertificates } from '../utils/getDataForDetails'
import LastCard from '../utilComponents/LastCard'
import MainCard from '../utilComponents/MainCard'
import CommunityCard from '../utilComponents/CommunityCard'
import IntroCard from '../utilComponents/IntroCard'
const titles = MAP_SLIDER_TITLES

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch(
        'https://pilot.blockchainbusiness.dk/v2/data/6d02c026-35d6-4ef5-9fe2-52f1aefa3583?parents=true'
    )
    const data = await res.json()

    const result = await fetch('https://pilot.blockchainbusiness.dk/v2/data?company_id=test')
    const allData = await result.json()

    return {
        props: {
            data,
            allData
        }
    }
}

export default function details({ data, allData }) {
    const router = useRouter()
    const pid = router.query.pid
    useEffect(() => {})

    if (pid) {
        const ids = getAllIds(data.filter((obj) => obj.type.startsWith(PROCESSING_STEP)))
        const certificates = getAllCertificates(allData)
        return (
            <div style={{ height: 'auto', padding: '1rem' }} className={styles.container}>
                <div className=" flex self-start sticky z-50 top-2">
                    <IoArrowBack
                        className="flex self-start sticky z-50 top-2"
                        onClick={() =>
                            router.push({ pathname: 'journey', query: { pid: router.query.pid } })
                        }
                        size={30}
                    />
                </div>
                <div className="mb-20">
                    <IntroCard />
                </div>
                <div className="mb-20">
                    <CommunityCard
                        props={{
                            productId: pid,
                            data: data
                        }}
                    />
                </div>
                {Object.values(ids).map((item, index) => (
                    <div id={item.id} className="mb-20" key={index}>
                        <MainCard
                            props={{
                                productId: pid,
                                item: item,
                                ids: ids,
                                titles: titles,
                                index: index,
                                data: data
                            }}
                        />
                    </div>
                ))}

                <div className=" w-full h-96">
                    <div className="mb-16">
                        <LastCard
                            cardProps={{
                                headerText: 'WE ARE CERTIFIED',
                                subHeader: 'Overview of all certificates',
                                subHeader2: 'MORE INFO?',
                                bottomCard: true,
                                certificates: certificates
                            }}
                        />
                    </div>
                </div>

                <div style={{ height: '30rem' }} className=" w-full h-96"></div>
            </div>
        )
    } else
        return (
            <div className="flex w-screen h-full justify-center items-center ">
                {' '}
                <CircularProgress />{' '}
            </div>
        )
}
