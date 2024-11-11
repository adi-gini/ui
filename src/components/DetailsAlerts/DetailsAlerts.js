import React from 'react'
import demoDataAlerts from '../../utils/demoDataAlerts'
import { useSelector } from 'react-redux'
import DatePicker from '../../common/DatePicker/DatePicker'
import { TIME_FRAME_LIMITS } from '../../utils/datePicker.util'

// import MetricsSelector from '../../elements/MetricsSelector/MetricsSelector'
// import modelEndpointsActions from '../../actions/modelEndpoints'
// import DatePicker from '../../common/DatePicker/DatePicker'
// import { TIME_FRAME_LIMITS } from '../../utils/datePicker.util'

const DetailsAlerts = () => {
  const detailsStore = useSelector(store => store.detailsStore)

  return (
    <div>
      <div className="metrics__custom-filters"></div>
      <DatePicker
        className="details-date-picker"
        date={detailsStore.dates.value[0]}
        dateTo={detailsStore.dates.value[1]}
        selectedOptionId={detailsStore.dates.selectedOptionId}
        label=""
        onChange={() => {}}
        type="date-range-time"
        timeFrameLimit={TIME_FRAME_LIMITS.MONTH}
        withLabels
      />
      <ul>
        {demoDataAlerts.map(alert => (
          <li key={alert.name}>
            <h3>{alert.name}</h3>
            <p>Project: {alert.project}</p>
            <p>Severity: {alert.severity}</p>
            <p>Event Kind: {alert.event_kind}</p>
            <p>Number of Events: {alert.number_of_events}</p>
            <p>Activation Time: {new Date(alert.activation_time).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DetailsAlerts
