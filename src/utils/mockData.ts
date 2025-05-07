import { nanoid } from 'nanoid';
import { TestResult, TestResultDetail } from '../types';

export const generateMockTestResult = (sampleSize: number): TestResult => {
  const alertsTriggered = Math.floor(Math.random() * sampleSize * 0.3);
  const strsFiled = Math.floor(alertsTriggered * 0.4);
  const missedStrs = Math.floor(Math.random() * 10);
  
  const details: TestResultDetail[] = [];
  
  // Generate sample data
  for (let i = 0; i < sampleSize; i++) {
    const triggered = i < alertsTriggered;
    const strFiled = triggered && i < strsFiled;
    
    details.push({
      id: nanoid(),
      customerId: `CUST${100000 + Math.floor(Math.random() * 900000)}`,
      accountId: `ACC${200000 + Math.floor(Math.random() * 900000)}`,
      transactionId: `TXN${300000 + Math.floor(Math.random() * 900000)}`,
      amount: Math.floor(Math.random() * 10000) / 100,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      triggered,
      strFiled,
    });
  }
  
  return {
    id: nanoid(),
    alertsTriggered,
    strsFiled,
    hitRate: (alertsTriggered / sampleSize) * 100,
    missedStrs,
    details,
  };
};