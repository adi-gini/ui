import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useParams } from 'react-router-dom'

import TableCell from '../TableCell/TableCell'

import { DETAILS_OVERVIEW_TAB } from '../../constants'

import './AlertsTableRow.scss'
import { useGroupContent } from '../../hooks/groupContent.hook'
import { getFeatureIdentifier } from '../../utils/getUniqueIdentifier'

const AlertsTableRow = ({ handleExpandRow, handleSelectItem, rowItem, selectedItem }) => {
  const parent = useRef()
  const params = useParams()
  const [alerts, setAlerts] = useState([])

  // const [expandedRows, setExpandedRows] = useState({})

  const rowClassNames = classnames('alert-row', 'table-row', 'table-body-row', 'parent-row')

  const { toggleRow } = useGroupContent(
    alerts,
    getFeatureIdentifier,
    () => {
      setAlerts([{}])
    },
    () => {},
    null,
    'ALERTS-STORE',
    'alerts'
  )

  // const { toggleRow } = useGroupContent(
  //   rowItem,
  //   getFeatureIdentifier,
  //   () => {},
  //   () => {},
  //   null,
  //   'ALERTS-STORE',
  //   'alerts'
  // )

  return (
    <tr className={rowClassNames} ref={parent}>
      <>
        {rowItem.content.map((value, index) => {
          return (
            !value.hidden && (
              <TableCell
                toggleRow={toggleRow}
                data={value}
                firstCell={index === 0}
                handleExpandRow={handleExpandRow}
                item={rowItem.data}
                key={value.id}
                link={value.getLink?.(
                  rowItem.data.tag,
                  params.tab ?? DETAILS_OVERVIEW_TAB,
                  rowItem.data.hash
                )}
                selectedItem={selectedItem}
                selectItem={handleSelectItem}
                showExpandButton={true}
              />
            )
          )
        })}
      </>
    </tr>
  )
}

AlertsTableRow.propTypes = {
  handleExpandRow: PropTypes.func,
  handleSelectItem: PropTypes.func.isRequired,
  rowItem: PropTypes.shape({
    content: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.object.isRequired
  }).isRequired,
  selectedItem: PropTypes.object
}

export default AlertsTableRow
