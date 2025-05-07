import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { 
  DatasetType, 
  Attribute, 
  Operator, 
  RuleBlock, 
  CustomerSegment, 
  ScoringCategory,
  TestParameters,
  TestResult,
  RuleExpression
} from '../types';
import { generateMockTestResult } from '../utils/mockData';

interface RuleStore {
  selectedDataset: DatasetType | null;
  attributes: Attribute[];
  operators: Operator[];
  ruleBlocks: RuleBlock[];
  customerSegments: CustomerSegment[];
  selectedSegment: CustomerSegment | null;
  scoringCategory: ScoringCategory;
  ruleExpression: RuleExpression;
  testParameters: TestParameters;
  testResult: TestResult | null;
  isTestResultVisible: boolean;
  
  setSelectedDataset: (dataset: DatasetType) => void;
  addRuleBlock: (block: Omit<RuleBlock, 'id' | 'position'>) => void;
  updateRuleBlock: (id: string, data: Partial<RuleBlock>) => void;
  removeRuleBlock: (id: string) => void;
  setSelectedSegment: (segment: CustomerSegment) => void;
  setScoringCategory: (category: ScoringCategory) => void;
  updateRuleExpression: () => void;
  setTestParameters: (params: Partial<TestParameters>) => void;
  runTest: () => void;
  setTestResultVisible: (visible: boolean) => void;
}

const defaultAttributes: Attribute[] = [];
const defaultOperators: Operator[] = [
  {
    id: nanoid(),
    type: 'Filter',
    name: 'Equal To',
    description: 'Filter where value equals specified value',
    icon: 'filter',
  },
  {
    id: nanoid(),
    type: 'Filter',
    name: 'Greater Than',
    description: 'Filter where value is greater than specified value',
    icon: 'filter',
  },
  {
    id: nanoid(),
    type: 'Filter',
    name: 'Less Than',
    description: 'Filter where value is less than specified value',
    icon: 'filter',
  },
  {
    id: nanoid(),
    type: 'Join',
    name: 'Inner Join',
    description: 'Join two datasets where keys match',
    icon: 'git-merge',
  },
  {
    id: nanoid(),
    type: 'Math',
    name: 'Sum',
    description: 'Calculate sum of values',
    icon: 'plus',
  },
  {
    id: nanoid(),
    type: 'DateFn',
    name: 'Date Difference',
    description: 'Calculate difference between dates',
    icon: 'calendar',
  },
];

const defaultSegments: CustomerSegment[] = [
  { id: nanoid(), name: 'Retail' },
  { id: nanoid(), name: 'SME' },
  { id: nanoid(), name: 'Corporate' },
  { id: nanoid(), name: 'High Net Worth' },
];

const defaultTestParameters: TestParameters = {
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  },
  sampleSize: 100,
};

export const useRuleStore = create<RuleStore>((set, get) => ({
  selectedDataset: null,
  attributes: defaultAttributes,
  operators: defaultOperators,
  ruleBlocks: [],
  customerSegments: defaultSegments,
  selectedSegment: null,
  scoringCategory: 'Medium',
  ruleExpression: '',
  testParameters: defaultTestParameters,
  testResult: null,
  isTestResultVisible: false,

  setSelectedDataset: (dataset) => {
    set({ selectedDataset: dataset });
    
    const attributesByDataset: Record<DatasetType, Attribute[]> = {
      Customer: [
        { id: nanoid(), name: 'CustomerID', type: 'string', dataset: 'Customer' },
        { id: nanoid(), name: 'Name', type: 'string', dataset: 'Customer' },
        { id: nanoid(), name: 'DateOfBirth', type: 'date', dataset: 'Customer' },
        { id: nanoid(), name: 'RiskRating', type: 'string', dataset: 'Customer' },
      ],
      Account: [
        { id: nanoid(), name: 'AccountID', type: 'string', dataset: 'Account' },
        { id: nanoid(), name: 'CustomerID', type: 'string', dataset: 'Account' },
        { id: nanoid(), name: 'Balance', type: 'number', dataset: 'Account' },
        { id: nanoid(), name: 'Currency', type: 'string', dataset: 'Account' },
      ],
      Transaction: [
        { id: nanoid(), name: 'TransactionID', type: 'string', dataset: 'Transaction' },
        { id: nanoid(), name: 'AccountID', type: 'string', dataset: 'Transaction' },
        { id: nanoid(), name: 'Amount', type: 'number', dataset: 'Transaction' },
        { id: nanoid(), name: 'TransactionDate', type: 'date', dataset: 'Transaction' },
      ],
    };
    
    set({ attributes: attributesByDataset[dataset] });
  },

  addRuleBlock: (block) => {
    const newBlock: RuleBlock = {
      id: nanoid(),
      ...block,
      position: { x: 0, y: 0 },
    };
    set((state) => ({
      ruleBlocks: [...state.ruleBlocks, newBlock],
    }));
    get().updateRuleExpression();
  },

  updateRuleBlock: (id, data) => {
    set((state) => ({
      ruleBlocks: state.ruleBlocks.map((block) =>
        block.id === id ? { ...block, ...data } : block
      ),
    }));
    get().updateRuleExpression();
  },

  removeRuleBlock: (id) => {
    set((state) => ({
      ruleBlocks: state.ruleBlocks.filter((block) => block.id !== id),
    }));
    get().updateRuleExpression();
  },

  setSelectedSegment: (segment) => {
    set({ selectedSegment: segment });
    get().updateRuleExpression();
  },

  setScoringCategory: (category) => {
    set({ scoringCategory: category });
    get().updateRuleExpression();
  },

  updateRuleExpression: () => {
    const { ruleBlocks, selectedSegment, scoringCategory } = get();
    
    if (ruleBlocks.length === 0) {
      set({ ruleExpression: '' });
      return;
    }

    let expression = 'IF ';
    
    ruleBlocks.forEach((block, index) => {
      if (index > 0) {
        expression += ' AND ';
      }
      
      const data = block.data;
      if (block.type === 'operator') {
        expression += `[${data.name}${data.parameter ? `: ${data.parameter}` : ''}]`;
      } else if (block.type === 'attribute') {
        expression += `[${data.dataset}.${data.name}]`;
      }
    });
    
    if (selectedSegment) {
      expression += ` FOR SEGMENT "${selectedSegment.name}"`;
    }
    
    expression += ` THEN SCORE AS "${scoringCategory}"`;
    
    set({ ruleExpression: expression });
  },

  setTestParameters: (params) => {
    set((state) => ({
      testParameters: {
        ...state.testParameters,
        ...params,
      },
    }));
  },

  runTest: () => {
    const { testParameters, ruleExpression } = get();
    
    if (ruleExpression) {
      const result = generateMockTestResult(testParameters.sampleSize);
      set({ 
        testResult: result,
        isTestResultVisible: true 
      });
    }
  },

  setTestResultVisible: (visible) => {
    set({ isTestResultVisible: visible });
  },
}));