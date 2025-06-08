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
import React from 'react'
import StatsCard from '../../common/StatsCard/StatsCard'
import Loader from '../../common/Loader/Loader'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const DataAndArtifactsCounter = () => {
  const projectStore = useSelector(store => store.projectStore)
  const { projectName: paramProjectName } = useParams()
  const loading = projectStore.projectsSummary.loading

  console.log(projectStore)
  //domo mode!
  const totalDataAndArtifacts = paramProjectName
    ? projectStore.projectSummary.data?.dataAndArtifact_count || 0
    : projectStore.jobsMonitoringData?.dataAndArtifact_count || 0

  return (
    <StatsCard className="monitoring-stats">
      <StatsCard.Header title="Data and Artifacts" />
      <StatsCard.Row>
        <div className="stats__counter_header" data-testid="dataAndArtifacts_total_counter">
          {loading ? (
            <Loader section small secondary />
          ) : (
            totalDataAndArtifacts.toLocaleString?.() || totalDataAndArtifacts
          )}
        </div>
      </StatsCard.Row>
    </StatsCard>
  )
}

export default DataAndArtifactsCounter
