import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    container: {
        maxHeight: 440
    },
    root: {
        width: '100%'
    }
})

const columns = [
    { id: 'subject', label: 'Locations' },
    {
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
        id: 'value',
        label: 'Date'
    }
]

function createData(subject, value) {
    return { subject, value }
}

const makeRows = (product, handler) => {
    let rows = []
    if (handler === 1) {
        rows = [
            createData('Company Id', product.company_id),
            createData('Timestamp', product.timestamp)
        ]
    }
    if (handler === 2) {
        rows = [
            createData('Company 1', '??'),
            createData('Company 2', '??'),
            createData('Company 3', '??'),
            createData('Company 4', '??'),
            createData('Company 5', '??')
        ]
    }

    return rows
}

export default function CustomTable({ props }) {
    const [page] = useState(0)
    const [rowsPerPage] = useState(10)
    const classes = useStyles()
    const rows = makeRows(props.product, props.handler)

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align="center"
                                    style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover tabIndex={-1}>
                                        {columns.map((column) => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell
                                                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                                                    key={column.id}
                                                    align="center">
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}
