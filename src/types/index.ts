export type DatasetType = 'Customer' | 'Account' | 'Transaction';

export type Attribute = {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  dataset: DatasetType;
};

export type OperatorType = 
  'Filter' | 
  'Join' | 
  'Math' | 
  'DateFn' | 
  'Logic' | 
  'Aggregation' |
  'Threshold';

export type Operator = {
  id: string;
  type: OperatorType;
  name: string;
  description: string;
  icon: string;
  parameter?: string;
};

export type RuleBlock = {
  id: string;
  type: 'operator' | 'attribute' | 'configuration';
  data: Operator | Attribute | Configuration;
  position: { x: number; y: number };
};

export type Configuration = {
  id: string;
  type: 'threshold' | 'loopback' | 'counter';
  name: string;
  value: string | number;
};

export type CustomerSegment = {
  id: string;
  name: string;
};

export type ScoringCategory = 'High' | 'Medium' | 'Low';

export type TestParameters = {
  dateRange: {
    start: string;
    end: string;
  };
  sampleSize: number;
};

export type TestResult = {
  id: string;
  alertsTriggered: number;
  strsFiled: number;
  hitRate: number;
  missedStrs: number;
  details: TestResultDetail[];
};

export type TestResultDetail = {
  id: string;
  customerId: string;
  accountId: string;
  transactionId: string;
  amount: number;
  date: string;
  triggered: boolean;
  strFiled: boolean;
};

export type RuleExpression = string;