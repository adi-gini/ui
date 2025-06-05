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
import StatsCard from '../../common/StatsCard/StatsCard'
import Loader from '../../common/Loader/Loader'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const ApplicationCounter = () => {
  const projectStore = useSelector(store => store.projectStore)
  const { projectName: paramProjectName } = useParams()

  //TODO: moke-data
  const applicationData = paramProjectName
    ? projectStore.projectSummary.data?.application_counter || 0
    : projectStore.jobsMonitoringData?.application_counter || 0

  return (
    <StatsCard className="monitoring-stats">
      <StatsCard.Header title="Applications"></StatsCard.Header>
      <StatsCard.Row>
        <div className="stats__counter_header" data-testid="application_total_counter">
          <div>
            {projectStore.projectsSummary.loading ? (
              <Loader section small secondary />
            ) : (
              applicationData.toLocaleString()
            )}
          </div>
        </div>
      </StatsCard.Row>
    </StatsCard>
  )
}
export default ApplicationCounter
