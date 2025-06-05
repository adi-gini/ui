import React, { useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import StatsCard from '../../common/StatsCard/StatsCard'
import Loader from '../../common/Loader/Loader'
import { generateMonitoringStats } from '../../utils/generateMonitoringData'
import { JOBS_MONITORING_SCHEDULED_TAB } from '../../constants'
import { PopUpDialog } from 'igz-controls/components'
import ClockIcon from 'igz-controls/images/clock.svg?react'

import './projectsMonitoringCounters.scss'

const ScheduledJobsCounters = () => {
  const navigate = useNavigate()
  const { projectName: paramProjectName } = useParams()
  const projectStore = useSelector(store => store.projectStore)
  const [showPopup, setShowPopup] = useState(false)
  const anchorRef = useRef(null)

  const handleOpenPopUp = () => {
    const width = anchorRef.current?.offsetWidth ?? 0
    setShowPopup(width < 110)
  }

  const scheduledData = useMemo(() => {
    if (paramProjectName) {
      const jobs = projectStore.projectSummary.data?.distinct_scheduled_jobs_pending_count || 0
      const workflows =
        projectStore.projectSummary.data?.distinct_scheduled_pipelines_pending_count || 0

      return {
        jobs,
        workflows,
        total: jobs + workflows
      }
    }

    return (
      projectStore.jobsMonitoringData.scheduled || {
        jobs: 0,
        workflows: 0,
        total: 0
      }
    )
  }, [
    paramProjectName,
    projectStore.projectSummary.data?.distinct_scheduled_jobs_pending_count,
    projectStore.projectSummary.data?.distinct_scheduled_pipelines_pending_count,
    projectStore.jobsMonitoringData.scheduled
  ])

  const scheduledStats = useMemo(
    () => generateMonitoringStats(scheduledData, navigate, JOBS_MONITORING_SCHEDULED_TAB),
    [navigate, scheduledData]
  )

  return (
    <StatsCard className="monitoring-stats">
      <div onMouseEnter={handleOpenPopUp} onMouseLeave={() => setShowPopup(false)} ref={anchorRef}>
        <StatsCard.Header title="Scheduled">
          <div className="project-card__info">
            <ClockIcon className="project-card__info-icon" />
            <span>Next 24 hrs</span>
          </div>
        </StatsCard.Header>
        <StatsCard.Row>
          <div
            onClick={scheduledStats.total.link}
            className="stats__counter_header stats__link"
            data-testid="scheduled_total_counter"
          >
            <div className="stats__counter">
              {projectStore.projectsSummary.loading ? (
                <Loader section small secondary />
              ) : (
                scheduledStats.total.counter.toLocaleString()
              )}
            </div>
          </div>
        </StatsCard.Row>
        <div className="stats__details">
          <StatsCard.Row>
            <div
              className="stats__link stats__line"
              onClick={scheduledStats.jobs.link}
              data-testid="scheduled_jobs_counter"
            >
              <h6 className="stats__subtitle">Jobs</h6>
              <div className="stats__counter">
                {projectStore.projectsSummary.loading ? (
                  <Loader section small secondary />
                ) : (
                  scheduledStats.jobs.counter.toLocaleString()
                )}
              </div>
            </div>
          </StatsCard.Row>
          <StatsCard.Row>
            <div
              className="stats__link stats__line"
              onClick={scheduledStats.workflows.link}
              data-testid="scheduled_workflows_counter"
            >
              <h6 className="stats__subtitle">Workflows</h6>
              <div className="stats__counter">
                {projectStore.projectsSummary.loading ? (
                  <Loader section small secondary />
                ) : (
                  scheduledStats.workflows.counter.toLocaleString()
                )}
              </div>
            </div>
          </StatsCard.Row>
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
            <div className={'card-popup_text'}>
              <div className="card-popup_text_link" onClick={scheduledStats.jobs.link}>
                Jobs: {scheduledStats.workflows.counter}
              </div>
              <div className="card-popup_text_link" onClick={scheduledStats.workflows.link}>
                Workflows: {scheduledStats.workflows.counter}
              </div>
            </div>
          </PopUpDialog>
        )}
      </div>
    </StatsCard>
  )
}

export default React.memo(ScheduledJobsCounters)
