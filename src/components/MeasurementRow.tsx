import React from 'react';
import { CardiovascularMeasurement } from '../types/calculator';
import { Input } from './Input';
import { Select } from './Select';

interface Props {
  measurement: CardiovascularMeasurement;
  onChange: (measurement: CardiovascularMeasurement) => void;
  parameters: string[];
}

export const MeasurementRow: React.FC<Props> = ({ measurement, onChange, parameters }) => {
  const handleMeasuredChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({ 
      ...measurement, 
      measured: numValue
    });
  };

  const handleParameterChange = (value: string) => {
    onChange({ 
      ...measurement, 
      parameter: value,
      measured: measurement.measured || 0,
      zScore: 0,
      referenceRange: '',
      centile: 0
    });
  };

  return (
    <tr className="hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap w-1/3">
        <Select
          options={parameters.map(param => ({ value: param, label: param }))}
          value={measurement.parameter}
          onValueChange={handleParameterChange}
          className="w-full"
          placeholder="Select parameter..."
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap w-1/3">
        <Input
          type="number"
          value={measurement.measured}
          onChange={handleMeasuredChange}
          className="w-full text-center"
          placeholder="0.00"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center w-1/3">
        <div className="text-gray-900 font-medium">
          {measurement.zScore.toFixed(2)}
        </div>
      </td>
    </tr>
  );
};