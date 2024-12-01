/*
Copyright 2019 Iguazio Systems Ltd.

Licensed under the Apache License, Version 2.0 (the "License") with
an addition restriction as set forth herein. You may not use this
file except in compliance with the License. You may obtain a copy of
the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
implied. See the License for the specific language governing
permissions and limitations under the License.

In addition, you may not use the software for any purposes that are
illegal under applicable law, and the grant of the foregoing license
under the Apache 2.0 license is conditioned upon your compliance with
such restriction.
*/
import { useCallback, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProjectAlertsView from './ProjectsAlertsView'

import { getAlertsFiltersConfig, parseAlertsQueryParamsCallback } from './alerts.util'
import { useFiltersFromSearchParams } from '../../hooks/useFiltersFromSearchParams.hook'

import { useParams } from 'react-router-dom'
import { fetchAlerts } from '../../reducers/alertsReducer'
import { useVirtualization } from '../../hooks/useVirtualization.hook'
import { createAlertRowData } from '../../utils/createAlertsContent'
import { useInitialTableFetch } from '../../hooks/useInitialTableFetch.hook'

import cssVariables from './alerts.scss'

const ProjectsAlerts = () => {
  const [alerts, setAlerts] = useState([])
  const [requestErrorMessage, setRequestErrorMessage] = useState('')
  const [selectedAlert] = useState({})
  const [selectedRowData] = useState({})
  const params = useParams()
  const dispatch = useDispatch()
  const alertsStore = useSelector(state => state.alertsStore)

  const abortControllerRef = useRef(new AbortController())

  const alertsFiltersConfig = useMemo(() => getAlertsFiltersConfig(), [])

  const alertsFilters = useFiltersFromSearchParams(
    alertsFiltersConfig,
    parseAlertsQueryParamsCallback
  )

  const fetchData = useCallback(
    filters => {
      abortControllerRef.current = new AbortController()
      dispatch(
        fetchAlerts({
          project: params.id,
          filters,
          config: {
            ui: {
              controller: abortControllerRef.current,
              setRequestErrorMessage
            },
            params: {
              format: 'minimal'
            }
          }
        })
      )
        .unwrap()
        .then(data => {
          setAlerts(data)
        })
    },
    [dispatch, params.id]
  )
  const tableContent = useMemo(() => {
    return alerts.map(alert => createAlertRowData(alert))
  }, [alerts])

  const refreshAlertsCallback = useCallback(
    filters => {
      setAlerts([])
      return fetchData(filters)
    },
    [fetchData]
  )

  useInitialTableFetch({
    fetchData,
    filters: alertsFilters
  })

  const virtualizationConfig = useVirtualization({
    rowsData: {
      content: tableContent,
      expandedRowsData: selectedRowData,
      selectedItem: selectedAlert
    },
    heightData: {
      headerRowHeight: cssVariables.$alertsHeaderRowHeight,
      rowHeight: cssVariables.$alertsRowHeight,
      rowHeightExtended: cssVariables.$alertsRowHeightExtended
    },
    activateTableScroll: true
  })

  return (
    <ProjectAlertsView
      alerts={alerts}
      alertsFiltersConfig={alertsFiltersConfig}
      alertsStore={alertsStore}
      actionsMenu={() => []} // TODO
      filters={alertsFilters}
      pageData={{}} //TODO
      refreshAlertsCallback={refreshAlertsCallback}
      requestErrorMessage={requestErrorMessage}
      selectedAlert={selectedAlert}
      tableContent={tableContent}
      virtualizationConfig={virtualizationConfig}
    />
  )
}

export default ProjectsAlerts
