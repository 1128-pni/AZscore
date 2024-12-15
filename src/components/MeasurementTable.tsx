import React from 'react';
import { CardiovascularMeasurement } from '../types/calculator';
import { MeasurementRow } from './MeasurementRow';
import { formulas } from '../data/formulas';

interface Props {
  measurements: CardiovascularMeasurement[];
  onMeasurementChange: (index: number, measurement: CardiovascularMeasurement) => void;
}

export const MeasurementTable: React.FC<Props> = ({ 
  measurements, 
  onMeasurementChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
        2D Cardiovascular Measurements
      </h2>
      
      <div className="apple-table bg-white/80">
        <table className="min-w-full divide-y divide-gray-200/60">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100/80">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-600 w-1/3">
                Parameter
              </th>
              <th className="text-center px-6 py-4 text-sm font-medium text-gray-600 w-1/3">
                MEASURED (mm)
              </th>
              <th className="text-center px-6 py-4 text-sm font-medium text-gray-600 w-1/3">
                Z-Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/60 bg-white/60">
            {measurements.map((measurement, index) => (
              <MeasurementRow
                key={index}
                measurement={measurement}
                onChange={(newMeasurement) => onMeasurementChange(index, newMeasurement)}
                parameters={Object.keys(formulas)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};