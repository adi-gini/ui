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
import React, { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

import Loader from '../../common/Loader/Loader'
import StatsCard from '../../common/StatsCard/StatsCard'
import { ReactComponent as Alerts } from 'igz-controls/images/alerts.svg'
import { ReactComponent as ClockIcon } from 'igz-controls/images/clock.svg'

import { generateAlertsStats } from '../../utils/generateAlertsStats'

import './projectsMonitoringCounters.scss'

const AlertsCounters = () => {
  const { pathname } = useLocation()
  const { projectName: paramProjectName } = useParams()
  const navigate = useNavigate()
  const projectStore = useSelector(store => store.projectStore)

  const alertsData = useMemo(() => {
    const path = pathname === '/projects' ? '*' : paramProjectName
    const defaultAlertData = {
      endpoint: 0,
      jobs: 0,
      application: 0,
      total: 0
    }

    if (path !== '*') {
      const endpoint = projectStore.projectSummary.data.endpoint_alerts_count || 0
      const jobs = projectStore.projectSummary.data.job_alerts_count || 0
      const application = projectStore.projectSummary.data.other_alerts_count || 0

      return {
        projectName: path,
        data: {
          endpoint,
          jobs,
          application,
          total: endpoint + jobs + application
        }
      }
    }

    return {
      projectName: path,
      data: projectStore.jobsMonitoringData.alerts || defaultAlertData
    }
  }, [
    pathname,
    paramProjectName,
    projectStore.jobsMonitoringData.alerts,
    projectStore.projectSummary.data.endpoint_alerts_count,
    projectStore.projectSummary.data.job_alerts_count,
    projectStore.projectSummary.data.other_alerts_count
  ])

  const alertsStats = useMemo(
    () => generateAlertsStats(alertsData.data, navigate, alertsData.projectName),
    [navigate, alertsData]
  )

  return (
    <StatsCard className="monitoring-stats alerts-card">
      <StatsCard.Header>
        <div className="header-title">
          <Alerts className="header-icon" />
          Alerts
        </div>
        <div className="info">
          <ClockIcon className="info-icon" />
          <span>Last 24 hours</span>
        </div>
      </StatsCard.Header>
      <StatsCard.Row>
        <StatsCard.Col>
          <h6 className="stats__subtitle">Endpoint</h6>
          <span className="stats__counter">
            {projectStore.projectsSummary.loading ? (
              <Loader section small secondary />
            ) : (
              <span
                className="stats__link"
                onClick={() => alertsStats.endpoints.link()}
                data-testid="alerts_endpoint_see_all"
              >
                {(alertsData.data.endpoint || 0).toLocaleString()}
              </span>
            )}
          </span>
        </StatsCard.Col>
        <StatsCard.Col>
          <h6 className="stats__subtitle">Jobs</h6>
          <span className="stats__counter">
            {projectStore.projectsSummary.loading ? (
              <Loader section small secondary />
            ) : (
              <span
                className="stats__link"
                onClick={() => alertsStats.job.link()}
                data-testid="alerts_jobs_see_all"
              >
                {(alertsData.data.jobs || 0).toLocaleString()}
              </span>
            )}
          </span>
        </StatsCard.Col>
        <StatsCard.Col>
          <h6 className="stats__subtitle">Application</h6>
          <span className="stats__counter">
            {projectStore.projectsSummary.loading ? (
              <Loader section small secondary />
            ) : (
              <span
                className="stats__link"
                onClick={() => alertsStats.application.link()}
                data-testid="alerts_application_see_all"
              >
                {(alertsData.data.application || 0).toLocaleString()}
              </span>
            )}
          </span>
        </StatsCard.Col>
        <StatsCard.Col>
          <h6 className="stats__subtitle">Total</h6>
          <span className="stats__counter">
            {projectStore.projectsSummary.loading ? (
              <Loader section small secondary />
            ) : (
              <span
                className="stats__link"
                onClick={() => alertsStats.all.link()}
                data-testid="alerts_total_see_all"
              >
                {(alertsData.data.total || 0).toLocaleString()}
              </span>
            )}
          </span>
        </StatsCard.Col>
      </StatsCard.Row>
      <StatsCard.Row>
        <StatsCard.Col />
      </StatsCard.Row>
    </StatsCard>
  )
}

export default React.memo(AlertsCounters)
