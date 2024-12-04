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

import '../DetailsInfo/detailsInfo.scss'
import React from 'react'
import { Tooltip, TextTooltipTemplate } from 'igz-controls/components'

const DetailsAlert = ({ pageData, selectedItem }) => {
  const {
    details: { infoHeaders }
  } = pageData

  const generalRows = infoHeaders.alertsGeneralHeaders
  const triggerCriteriaRows = infoHeaders.alertsTriggerCriteriaHeaders

  const mapFieldsToData = fields => {
    return fields.map(field => {
      let value
      if (field.id === 'project_name') {
        value = selectedItem?.data.project
      } else if (field.id === 'endpoint_name') {
        value = selectedItem?.data.entity_kind
      } else if (field.id === 'entity_id') {
        value = selectedItem?.data.entity_id
      } else if (field.id === 'type') {
        value = selectedItem?.content[4].value
      } else if (field.id === 'timestamp') {
        value = selectedItem?.data.activation_time
      } else if (field.id === 'severity') {
        value = selectedItem?.data.severity
      } else if (field.id === 'trigger_criteria_count') {
        value = selectedItem?.data.criteria.count
      } else if (field.id === 'timestamp_key') {
        value = selectedItem?.data.activation_time
      } else if (field.id === 'trigger_criteria_time_period') {
        value = selectedItem?.data.criteria.period
      }

      return { title: field.label, content: value }
    })
  }
  const primaryRows = mapFieldsToData(generalRows)
  const secondaryRows = mapFieldsToData(triggerCriteriaRows)

  return (
    <div style={{ marginTop: '55px' }} className="table__item">
      <div className="item-info">
        <div className="item-info__details-wrapper">
          <h3 className="item-info__header">General</h3>
          <div className="item-info__details">
            {primaryRows.map((row, index) => (
              <div className="details-item" key={index}>
                <div className="details-item__header">{row.title}</div>
                <div className="details-item__data">{row.content}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="item-info__details-wrapper">
          <h3 className="item-info__header">Trigger criteria</h3>
          <div className="item-info__details">
            {secondaryRows.map((row, index) => (
              <div className="details-item" key={index}>
                <div className="details-item__header">{row.title}</div>
                <div className="details-item__data">{row.content}</div>
              </div>
            ))}
          </div>
          <div className="item-info__details-wrapper">
            <h3 className="item-info__header">Notifications</h3>
            <div className="item-info__details">
              <div className="details-item">
                <div className="details-item__data">
                  {selectedItem.content[9].value.map((valueItem, index) => (
                    <Tooltip
                      key={valueItem.tooltip + index}
                      template={<TextTooltipTemplate text={valueItem.tooltip} />}
                    >
                      {valueItem.icon}
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsAlert
