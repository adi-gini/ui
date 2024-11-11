const demoDataAlerts = [
  {
    name: 'alert_1',
    project: 'workflow-proj',
    activation_time: '2024-10-23T10:15:30Z',
    notifications: [
      {
        kind: 'email',
        err: ''
      },
      {
        kind: 'webhook',
        err: 'Timeout error'
      }
    ],
    entity_id: 'model-endpoint-1.app-1.result-1',
    entity_kind: 'model-endpoint-result',
    criteria: {
      count: 3,
      period: '30m'
    },
    event_kind: 'data-drift-detected',
    severity: 'critical',
    number_of_events: 15
  },
  {
    name: 'alert_2',
    project: 'tutorial-admin',
    activation_time: '2024-10-24T12:20:30Z',
    notifications: [
      {
        kind: 'slack',
        err: 'Failed to send notification due to network issue'
      },
      {
        kind: 'git',
        err: ''
      }
    ],
    entity_id: 'job-entity-2.app-2.result-2',
    entity_kind: 'job',
    criteria: {
      count: 10,
      period: '2h'
    },
    event_kind: 'concept-drift-suspected',
    severity: 'low',
    number_of_events: 7
  },
  {
    name: 'alert_3',
    project: 'workflow-proj',
    activation_time: '2024-10-25T14:45:00Z',
    notifications: [
      {
        kind: 'webhook',
        err: ''
      }
    ],
    entity_id: 'model-endpoint-3.app-3.result-3',
    entity_kind: 'model-monitoring-application',
    criteria: {
      count: 2,
      period: '1h'
    },
    event_kind: 'mm-app-anomaly-detected',
    severity: 'high',
    number_of_events: 12
  },
  {
    name: 'alert_4',
    project: 'analysis-hub',
    activation_time: '2024-10-26T08:10:20Z',
    notifications: [
      {
        kind: 'email',
        err: ''
      },
      {
        kind: 'git',
        err: 'Authentication failed'
      }
    ],
    entity_id: 'model-monitoring-4.app-4.result-4',
    entity_kind: 'model-monitoring-application',
    criteria: {
      count: 8,
      period: '1h'
    },
    event_kind: 'model-performance-detected',
    severity: 'low',
    number_of_events: 5
  },
  {
    name: 'alert_5',
    project: 'reporting-app',
    activation_time: '2024-10-27T16:55:10Z',
    notifications: [
      {
        kind: 'slack',
        err: ''
      }
    ],
    entity_id: 'job-entity-5.app-5.result-5',
    entity_kind: 'job',
    criteria: {
      count: 4,
      period: '3h'
    },
    event_kind: 'system-performance-suspected',
    severity: 'critical',
    number_of_events: 20
  },
  {
    name: 'alert_6',
    project: 'tutorial-admin',
    activation_time: '2024-10-28T09:25:40Z',
    notifications: [
      {
        kind: 'email',
        err: 'SMTP server not reachable'
      }
    ],
    entity_id: 'model-endpoint-6.app-6.result-6',
    entity_kind: 'model-endpoint-result',
    criteria: {
      count: 6,
      period: '2h'
    },
    event_kind: 'mm-app-failed',
    severity: 'high',
    number_of_events: 3
  },
  {
    name: 'alert_7',
    project: 'workflow-proj',
    activation_time: '2024-10-29T07:30:50Z',
    notifications: [
      {
        kind: 'webhook',
        err: ''
      }
    ],
    entity_id: 'model-monitoring-7.app-7.result-7',
    entity_kind: 'model-monitoring-application',
    criteria: {
      count: 1,
      period: '30m'
    },
    event_kind: 'model-performance-suspected',
    severity: 'low',
    number_of_events: 4
  },
  {
    name: 'alert_8',
    project: 'analysis-hub',
    activation_time: '2024-10-30T11:15:10Z',
    notifications: [
      {
        kind: 'slack',
        err: 'Failed to send notification due to network issue'
      }
    ],
    entity_id: 'job-entity-8.app-8.result-8',
    entity_kind: 'job',
    criteria: {
      count: 9,
      period: '4h'
    },
    event_kind: 'concept-drift-detected',
    severity: 'critical',
    number_of_events: 16
  },
  {
    name: 'alert_9',
    project: 'reporting-app',
    activation_time: '2024-10-31T17:05:35Z',
    notifications: [
      {
        kind: 'email',
        err: ''
      },
      {
        kind: 'webhook',
        err: ''
      }
    ],
    entity_id: 'model-endpoint-9.app-9.result-9',
    entity_kind: 'model-endpoint-result',
    criteria: {
      count: 7,
      period: '1h'
    },
    event_kind: 'data-drift-suspected',
    severity: 'high',
    number_of_events: 18
  },
  {
    name: 'alert_10',
    project: 'workflow-proj',
    activation_time: '2024-11-01T06:20:15Z',
    notifications: [
      {
        kind: 'git',
        err: ''
      }
    ],
    entity_id: 'model-endpoint-10.app-10.result-10',
    entity_kind: 'model-endpoint-result',
    criteria: {
      count: 5,
      period: '2h'
    },
    event_kind: 'system-performance-detected',
    severity: 'low',
    number_of_events: 9
  },
  {
    name: 'alert_11',
    project: 'analysis-hub',
    activation_time: '2024-11-02T14:10:50Z',
    notifications: [
      {
        kind: 'email',
        err: ''
      },
      {
        kind: 'webhook',
        err: 'API endpoint not responding'
      }
    ],
    entity_id: 'model-monitoring-11.app-11.result-11',
    entity_kind: 'model-monitoring-application',
    criteria: {
      count: 10,
      period: '3h'
    },
    event_kind: 'mm-app-anomaly-suspected',
    severity: 'critical',
    number_of_events: 13
  },
  {
    name: 'alert_12',
    project: 'tutorial-admin',
    activation_time: '2024-11-03T18:35:25Z',
    notifications: [
      {
        kind: 'slack',
        err: ''
      }
    ],
    entity_id: 'job-entity-12.app-12.result-12',
    entity_kind: 'job',
    criteria: {
      count: 3,
      period: '1h'
    },
    event_kind: 'failed',
    severity: 'low',
    number_of_events: 14
  },
  {
    name: 'alert_13',
    project: 'workflow-proj',
    activation_time: '2024-11-04T09:05:00Z',
    notifications: [
      {
        kind: 'email',
        err: 'SMTP server not reachable'
      }
    ],
    entity_id: 'model-endpoint-13.app-13.result-13',
    entity_kind: 'model-endpoint-result',
    criteria: {
      count: 8,
      period: '4h'
    },
    event_kind: 'concept-drift-suspected',
    severity: 'critical',
    number_of_events: 6
  },
  {
    name: 'alert_14',
    project: 'reporting-app',
    activation_time: '2024-11-05T13:15:45Z',
    notifications: [
      {
        kind: 'webhook',
        err: ''
      }
    ],
    entity_id: 'model-monitoring-14.app-14.result-14',
    entity_kind: 'model-monitoring-application',
    criteria: {
      count: 2,
      period: '30m'
    },
    event_kind: 'mm-app-failed',
    severity: 'high',
    number_of_events: 11
  },
  {
    name: 'alert_15',
    project: 'tutorial-admin',
    activation_time: '2024-11-06T12:25:20Z',
    notifications: [
      {
        kind: 'git',
        err: ''
      }
    ],
    entity_id: 'job-entity-15.app-15.result-15',
    entity_kind: 'job',
    criteria: {
      count: 5,
      period: '2h'
    },
    event_kind: 'data-drift-detected',
    severity: 'low',
    number_of_events: 2
  },
  {
    name: 'alert_16',
    project: 'workflow-proj',
    activation_time: '2024-11-07T14:00:35Z',
    notifications: [
      {
        kind: 'slack',
        err: 'Failed to send notification due to network issue'
      }
    ],
    entity_id: 'model-endpoint-16.app-16.result-16',
    entity_kind: 'model-endpoint-result',
    criteria: {
      count: 7,
      period: '1h'
    },
    event_kind: 'system-performance-suspected',
    severity: 'critical',
    number_of_events: 17
  },
  {
    name: 'alert_17',
    project: 'analysis-hub',
    activation_time: '2024-11-08T08:40:55Z',
    notifications: [
      {
        kind: 'email',
        err: ''
      },
      {
        kind: 'webhook',
        err: ''
      }
    ],
    entity_id: 'model-monitoring-17.app-17.result-17',
    entity_kind: 'model-monitoring-application',
    criteria: {
      count: 9,
      period: '3h'
    },
    event_kind: 'model-performance-detected',
    severity: 'high',
    number_of_events: 19
  },
  {
    name: 'alert_18',
    project: 'reporting-app',
    activation_time: '2024-11-09T11:50:30Z',
    notifications: [
      {
        kind: 'webhook',
        err: ''
      }
    ],
    entity_id: 'job-entity-18.app-18.result-18',
    entity_kind: 'job',
    criteria: {
      count: 6,
      period: '4h'
    },
    event_kind: 'concept-drift-detected',
    severity: 'low',
    number_of_events: 8
  },
  {
    name: 'alert_19',
    project: 'tutorial-admin',
    activation_time: '2024-11-10T10:10:10Z',
    notifications: [
      {
        kind: 'git',
        err: ''
      }
    ],
    entity_id: 'model-endpoint-19.app-19.result-19',
    entity_kind: 'model-endpoint-result',
    criteria: {
      count: 4,
      period: '2h'
    },
    event_kind: 'mm-app-anomaly-detected',
    severity: 'critical',
    number_of_events: 10
  },
  {
    name: 'alert_20',
    project: 'workflow-proj',
    activation_time: '2024-11-11T13:30:45Z',
    notifications: [
      {
        kind: 'email',
        err: ''
      },
      {
        kind: 'slack',
        err: 'Failed to send notification due to network issue'
      }
    ],
    entity_id: 'model-monitoring-20.app-20.result-20',
    entity_kind: 'model-monitoring-application',
    criteria: {
      count: 1,
      period: '30m'
    },
    event_kind: 'mm-app-failed',
    severity: 'high',
    number_of_events: 5
  }
]

export default demoDataAlerts
