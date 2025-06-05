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
import React, { useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Loader from '../../common/Loader/Loader'
import StatsCard from '../../common/StatsCard/StatsCard'
import { Tooltip, TextTooltipTemplate, PopUpDialog } from 'igz-controls/components'

import { generateMonitoringStats } from '../../utils/generateMonitoringData'
import { JOBS_MONITORING_WORKFLOWS_TAB } from '../../constants'

import ClockIcon from 'igz-controls/images/clock.svg?react'
import classNames from 'classnames'

import './projectsMonitoringCounters.scss'

const WorkflowsCounters = () => {
  const navigate = useNavigate()
  const projectStore = useSelector(store => store.projectStore)
  const { projectName: paramProjectName } = useParams()
  const [showPopup, setShowPopup] = useState(false)
  const anchorRef = useRef(null)

  const handleOpenPopUp = () => {
    const width = anchorRef.current?.offsetWidth ?? 0
    setShowPopup(width < 110)
  }

  const workflowsData = useMemo(() => {
    if (paramProjectName) {
      const completed = projectStore.projectSummary.data?.pipelines_completed_recent_count || 0
      const failed = projectStore.projectSummary.data?.pipelines_failed_recent_count || 0
      const running = projectStore.projectSummary.data?.pipelines_running_count || 0

      return {
        completed,
        failed,
        running,
        total: completed + failed + running
      }
    }

    return (
      projectStore.jobsMonitoringData.workflows || {
        completed: 0,
        failed: 0,
        running: 0,
        total: 0
      }
    )
  }, [
    paramProjectName,
    projectStore.projectSummary.data?.pipelines_completed_recent_count,
    projectStore.projectSummary.data?.pipelines_failed_recent_count,
    projectStore.projectSummary.data?.pipelines_running_count,
    projectStore.jobsMonitoringData.workflows
  ])

  const workflowsStats = useMemo(
    () => generateMonitoringStats(workflowsData, navigate, JOBS_MONITORING_WORKFLOWS_TAB),
    [navigate, workflowsData]
  )

  return (
    <StatsCard className="monitoring-stats">
      <div onMouseEnter={handleOpenPopUp} onMouseLeave={() => setShowPopup(false)} ref={anchorRef}>
        <StatsCard.Header title="Workflows">
          <div className="project-card__info">
            <ClockIcon className="project-card__info-icon" />
            <span>Last 24 hrs</span>
          </div>
        </StatsCard.Header>
        <StatsCard.Row>
          <div
            className="stats__link stats__counter_header"
            data-testid="scheduled_total_counter"
            onClick={workflowsStats.total.link}
          >
            <div className="stats__counter">
              {projectStore.projectsSummary.loading ? (
                <Loader section small secondary />
              ) : (
                workflowsStats.total.counter.toLocaleString()
              )}
            </div>
          </div>
        </StatsCard.Row>

        <div className="stats__details">
          {workflowsStats.counters.map(({ counter, label, link, statusClass, tooltip }, index) => {
            const isLast = index === workflowsStats.counters.length - 1
            const linkClassName = classNames('stats__link', !isLast && 'stats__line')
            return (
              <StatsCard.Row key={`${statusClass}-jobs`}>
                <div
                  className={linkClassName}
                  onClick={link}
                  data-testid={`wf_${statusClass}_counter`}
                >
                  <div data-testid={`wf_${statusClass}_status`} className="stats__status">
                    <Tooltip textShow template={<TextTooltipTemplate text={tooltip} />}>
                      <h6 className="stats__subtitle">{label}</h6>
                      <i className={`state-${statusClass}`} />
                    </Tooltip>
                  </div>
                  <div className="stats__counter">
                    {projectStore.projectsSummary.loading ? (
                      <Loader section small secondary />
                    ) : (
                      counter.toLocaleString()
                    )}
                  </div>
                </div>
              </StatsCard.Row>
            )
          })}
        </div>

        {showPopup && (
          <PopUpDialog
            className="card-popup"
            headerIsHidden
            customPosition={{
              element: anchorRef,
              position: 'bottom-left'
            }}
          >
            <div className="card-popup_text">
              {workflowsStats.counters.map(({ link, counter, label, statusClass }) => (
                <div onClick={link} key={label} className="card-popup_text_link">
                  <i className={`state-${statusClass}`} />
                  <span className="stats__subtitle">
                    {' '}
                    {label}: {counter}
                  </span>
                </div>
              ))}
            </div>
          </PopUpDialog>
        )}
      </div>
    </StatsCard>
  )
}

export default React.memo(WorkflowsCounters)
