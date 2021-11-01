import { GiWoodPile, GiTruck } from 'react-icons/gi'
import CountUp from 'react-countup'
import React from 'react'

//Hardcoeded number og trees
const dividerWood = 200
const formerSeaConst = 0.21
const formerTruckConst = 0.19

const getFootprint = (step, prodId, data) => {
    const datapoint = { dataVal: '' }
    const weight = data
        .find((item) => item.id === prodId)
        .event_data.find((item) => item.key_name === 'weightInKg').value

    const conversionConst = step.event_data.find((item) => item.key_name === 'kg_co_2_e_kg').value
    datapoint.dataVal = weight * conversionConst
    //const weight = step.even_data.find
    return datapoint.dataVal
}

function getAllIds(steps) {
    /*
     Traverse tree structure in breadth first fashion, beginning at the root node.
     Return the input steps sorted by the results of the search starting with a leave node.
     Order of leave node traversal is quite random and depends on the data object.
     For this function, we assume that a node can have no more than one parent.
     If one node has zero parents, it is the root node.
     Other nodes with zero parents will be neglected.
      */
    const reverse_ordered_items = []
    const query = []

    // initialize query with root node.
    for (var i = 0; i < steps.length; i++) {
        const hasNoParentIds = !steps[i].parent_ids || !steps[i].parent_ids.length // does the same job
        //const hasNoParentIds = steps[i].parent_ids.length === 0
        const allIds = steps.map((step) => step.id)
        const hasNoProcessingStepParentIds = () => {
            if (steps[i].parent_ids) {
                return steps[i].parent_ids.every((id) => !allIds.includes(id))
            } else return null
        }

        if (hasNoParentIds || hasNoProcessingStepParentIds) {
            query.push(steps[i])
        }
    }
    // main breadth first algo
    /*steps[i].parent_ids &&*/
    while (query.length !== 0) {
        const node = query.shift()
        reverse_ordered_items.push(node)
        for (var i = 0; i < steps.length; i++) {
            if (steps[i].parent_ids && steps[i].parent_ids.includes(node.id)) {
                query.push(steps[i])
            }
        }
    }
    // return reverse_ordered_items.reverse
    return reverse_ordered_items.filter((v, i, a) => a.findIndex((t) => t.type === v.type) === i)
}

function getFormattedDate(timestamp) {
    const date = new Date(timestamp)
    let day = null
    let month = null

    if (date.getDate() < 10) {
        day = `0${date.getDate()}`
    } else {
        day = `${date.getDate()}`
    }
    if (date.getMonth() + 1 < 10) {
        month = `0${date.getMonth() + 1}`
    } else {
        month = `${date.getMonth() + 1}`
    }
    return day + '.' + month + '.' + `${date.getFullYear()}`
}

function getStepData(step, prodId, data) {
    const arr = []
    const returnVal = { activity: '', icon: null, counterVal: null, compariosonVal: null }
    const cf = getFootprint(step, prodId, data)

    if (step.type.includes('Ship')) {
        returnVal.activity = 'Transport Ship'
        //Improvement relative to the former constants for calculation of co2 footprint
        const weight = data
            .find((item) => item.id === prodId)
            .event_data.find((item) => item.key_name === 'weightInKg').value
        const formerFootprintShip = formerSeaConst * weight

        const improvement = (formerFootprintShip - cf) / formerFootprintShip
        returnVal.compariosonVal = { val: improvement * 100, title: 'Ship reduced' }

        returnVal.counterVal = (
            <div className="flex flex-col">
                <div className="flex flex-row ">
                    <CountUp
                        className="text-l font-medium text-red-900 border-none"
                        start={0}
                        end={cf}
                        duration={100}
                        separator=" "
                        decimals={3}
                        decimal=","
                    />
                    <div className="text-l font-medium text-red-900 border-none"> ekg</div>
                </div>
            </div>
        )
        return returnVal
    } else if (step.type.includes('Truck')) {
        returnVal.activity = 'Transport Truck'
        returnVal.icon = <GiTruck size={20} />
        const weight = data
            .find((item) => item.id === prodId)
            .event_data.find((item) => item.key_name === 'weightInKg').value
        const formerFootprintTruck = formerTruckConst * weight

        const improvement = (formerFootprintTruck - cf) / formerFootprintTruck
        returnVal.compariosonVal = { val: improvement * 100, title: 'Truck Reduced' }

        returnVal.counterVal = (
            <div className="flex flex-row">
                <CountUp
                    className="text-l font-medium text-red-900 border-none"
                    start={0}
                    end={cf}
                    duration={100}
                    separator=" "
                    decimals={3}
                    decimal=","
                />
                <div className="text-l font-medium text-red-900 border-none"> ekg</div>
            </div>
        )
        return returnVal
    } else if (step.type.includes('production')) {
        returnVal.activity = 'Production'
        returnVal.icon = <GiWoodPile size={20} />
        returnVal.counterVal = (
            <div className="flex flex-row ">
                <CountUp
                    className="text-l font-medium text-red-900 border-none"
                    start={0}
                    end={cf}
                    duration={100}
                    separator=" "
                    decimals={3}
                    decimal=","
                />
                <div className="text-l font-medium text-red-900 border-none"> ekg</div>
            </div>
        )
        return returnVal
    } else if (step.type.includes('wood')) {
        returnVal.activity = 'Collect Wood'
        returnVal.icon = <GiWoodPile size={20} />
        const trees = Math.abs(cf) / dividerWood
        for (let i = 0; i < trees; i++) {
            arr.push(i)
        }
        returnVal.compariosonVal = arr
        returnVal.compariosonVal = { val: arr, title: 'Footprint in Tress' }

        returnVal.counterVal = (
            <div className="flex flex-row ">
                <CountUp
                    className="text-l font-medium text-red-900 border-none"
                    start={0}
                    end={cf}
                    duration={100}
                    separator=" "
                    decimals={3}
                    decimal=","
                />
                <div className="text-l font-medium text-red-900 border-none"> ekg</div>
            </div>
        )
        return returnVal
    } else {
        return returnVal
    }
}

function getAllCertificates(data) {
    const certificates = []
    const fsc = data.find((item) => item.id === '4cf678d3-caf4-467a-9e13-b1f64476c3ba')
    const treeNation = data.find((item) => item.id === 'edfdcf3f-8cb1-4bfd-b9a4-db031d8429cc')
    certificates.push(fsc)
    certificates.push(treeNation)

    return certificates
}

function transformData(dataset) {
    return dataset.map((data) => {
        return data.map((datum) => {
            return {
                x: datum.x,
                y: datum.y,
                cornerRadius: data[0].cornerRadius,
                step: datum.y + 'kg Plastic Removed'
            }
        })
    })
}
function getStackBarData(plasticRemoved) {
    return [
        [
            {
                x: 'a',
                y: Math.round(plasticRemoved),
                cornerRadius: { top: 15, bottom: 15 },
                step: plasticRemoved + ' kg'
            }
        ]
    ]
}

export {
    getAllIds,
    getFormattedDate,
    getStepData,
    getAllCertificates,
    getFootprint,
    transformData,
    getStackBarData
}
