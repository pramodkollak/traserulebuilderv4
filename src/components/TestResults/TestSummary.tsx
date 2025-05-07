import React from 'react';
import { AlertCircle, CheckCircle, Download, FileText, ArrowLeft, Check } from 'lucide-react';
import { useRuleStore } from '../../store/useRuleStore';

const TestSummary: React.FC = () => {
  const { testResult, setTestResultVisible } = useRuleStore();

  if (!testResult) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neutral-800">Test Results</h2>
        <button
          onClick={() => setTestResultVisible(false)}
          className="text-neutral-500 hover:text-neutral-700 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to editor
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
          <div className="flex items-center text-neutral-500 mb-2">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">Alerts Triggered</span>
          </div>
          <div className="text-2xl font-bold">{testResult.alertsTriggered}</div>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
          <div className="flex items-center text-neutral-500 mb-2">
            <FileText className="h-4 w-4 mr-1" />
            <span className="text-sm">STRs Filed</span>
          </div>
          <div className="text-2xl font-bold">{testResult.strsFiled}</div>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
          <div className="flex items-center text-neutral-500 mb-2">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">Hit Rate</span>
          </div>
          <div className="text-2xl font-bold">{testResult.hitRate.toFixed(2)}%</div>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
          <div className="flex items-center text-neutral-500 mb-2">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">Missed STRs</span>
          </div>
          <div className="text-2xl font-bold">{testResult.missedStrs}</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-700 mb-3">Test Data</h3>
        <div className="border border-neutral-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Customer ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Account ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Alert
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    STR
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {testResult.details.slice(0, 10).map((detail) => (
                  <tr key={detail.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {detail.customerId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {detail.accountId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {detail.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      ${detail.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {detail.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {detail.triggered ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning-100 text-warning-800">
                          Triggered
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-neutral-100 text-neutral-800">
                          No Alert
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {detail.strFiled ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-error-100 text-error-800">
                          Filed
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-neutral-100 text-neutral-800">
                          No STR
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-neutral-50 px-4 py-2 border-t border-neutral-200 text-right">
            <span className="text-sm text-neutral-500">
              Showing 10 of {testResult.details.length} results
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Download Results (CSV)
        </button>
        <button className="px-4 py-2 bg-success-600 text-white rounded hover:bg-success-700 flex items-center">
          <Check className="h-4 w-4 mr-2" />
          Submit for Governance
        </button>
      </div>
    </div>
  );
};

export default TestSummary;