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
import PropTypes from 'prop-types'

import ActionBar from '../ActionBar/ActionBar'
import AlertsTableRow from '../../elements/AlertsTableRow/AlertsTableRow'
import Breadcrumbs from '../../common/Breadcrumbs/Breadcrumbs'
import Loader from '../../common/Loader/Loader'
import NoData from '../../common/NoData/NoData'
import ProjectsAlertsFilters from './ProjectsAlertsFilters'
import Table from '../Table/Table'

import { getNoDataMessage } from '../../utils/getNoDataMessage'
import { getCloseDetailsAlertLink } from '../../utils/link-helper.util'
import { ALERTS_FILTERS, ALERTS_PAGE, FUNCTION_FILTERS } from '../../constants'
import { VIRTUALIZATION_CONFIG } from '../../types'
import { isRowRendered } from '../../hooks/useVirtualization.hook'

const ProjectAlertsView = ({
  actionsMenu,
  alertsFiltersConfig,
  alertsStore,
  filters,
  handleCancel,
  pageData,
  params,
  refreshAlertsCallback,
  requestErrorMessage,
  selectedAlert,
  tableContent,
  virtualizationConfig
}) => {
  return (
    <>
      <div className="content-wrapper">
        <div className="content__header">
          <Breadcrumbs />
        </div>
        <div className="content">
          <div className="table-container">
            <div className="content__action-bar-wrapper">
              <ActionBar
                autoRefreshIsStopped={true}
                filterMenuName={ALERTS_FILTERS}
                filtersConfig={alertsFiltersConfig}
                filters={filters}
                handleRefresh={refreshAlertsCallback}
                page={ALERTS_PAGE}
                withRefreshButton
                withoutExpandButton
              >
                <ProjectsAlertsFilters />
              </ActionBar>
            </div>
            {alertsStore.loading ? (
              <Loader />
            ) : tableContent.length === 0 ? (
              <NoData
                message={getNoDataMessage(
                  filters,
                  alertsFiltersConfig,
                  requestErrorMessage,
                  ALERTS_PAGE,
                  null,
                  FUNCTION_FILTERS
                )}
              />
            ) : (
              <Table
                actionsMenu={actionsMenu}
                getCloseDetailsLink={() =>
                  getCloseDetailsAlertLink(window.location, params.alertName)
                }
                isDetailsScreenLarge={true}
                pageData={pageData}
                retryRequest={refreshAlertsCallback}
                selectedItem={selectedAlert}
                tableClassName="alerts-table"
                handleCancel={handleCancel}
                hideActionsMenu
                tableHeaders={tableContent[0]?.content ?? []}
                withActionMenu={false}
              >
                {tableContent.map(
                  (tableItem, index) =>
                    isRowRendered(virtualizationConfig, index) && (
                      <AlertsTableRow
                        key={index}
                        hideActionsMenu
                        handleSelectItem={() => {}}
                        rowIndex={index}
                        rowItem={tableItem}
                        actionsMenu={[]}
                        selectedItem={selectedAlert}
                      />
                    )
                )}
              </Table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

ProjectAlertsView.propTypes = {
  alertsFiltersConfig: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  refreshAlertsCallback: PropTypes.func.isRequired,
  requestErrorMessage: PropTypes.string.isRequired,
  tableContent: PropTypes.arrayOf(PropTypes.object).isRequired,
  virtualizationConfig: VIRTUALIZATION_CONFIG.isRequired
}
export default ProjectAlertsView
