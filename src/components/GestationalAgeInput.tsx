import React from 'react';
import { GestationalAge } from '../types/calculator';
import { validateGestationalAge } from '../utils/calculations';

interface Props {
  value: GestationalAge;
  onChange: (value: GestationalAge) => void;
}

export const GestationalAgeInput: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (field: keyof GestationalAge, numValue: number) => {
    const newAge = { ...value, [field]: numValue };
    
    if (validateGestationalAge(newAge.weeks, newAge.days)) {
      onChange(newAge);
    }
  };

  const renderMarkers = (min: number, max: number) => {
    const length = max - min + 1;
    return Array.from({ length }, (_, i) => (
      <div key={i} className="absolute transform -translate-x-1/2 -top-7" style={{ left: `${(i / (length - 1)) * 100}%` }}>
        <span className="text-xs font-medium text-gray-400">{i + min}</span>
      </div>
    ));
  };

  const InputGroup = ({ value, min, max, onChange, unit }: { 
    value: number; 
    min: number; 
    max: number; 
    onChange: (value: number) => void; 
    unit: string; 
  }) => (
    <div className="flex items-center space-x-2" style={{ width: '110px' }}>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || min)}
        className="number-input w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-400 focus:border-pink-400"
      />
      <span className="text-sm text-gray-500 w-10">{unit}</span>
    </div>
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4">
      <h2 className="text-xl font-semibold text-gray-900">Gestational Age</h2>
      
      <div className="space-y-12">
        {/* Weeks Section */}
        <div className="flex items-center justify-center space-x-6">
          <div className="w-[500px]">
            <div className="relative pt-8 pb-2">
              <style>
                {`
                  .slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    width: 100%;
                    height: 30px;
                    margin: 0;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                  }
                  
                  .slider-thumb::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #6b7280;
                    cursor: pointer;
                    border: 3px solid #fff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
                    transition: all 0.2s ease;
                    position: relative;
                    z-index: 1;
                  }
                  
                  .slider-thumb::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #6b7280;
                    cursor: pointer;
                    border: 3px solid #fff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
                    transition: all 0.2s ease;
                    position: relative;
                    z-index: 1;
                  }
                  
                  .slider-track {
                    position: absolute;
                    width: 100%;
                    height: 5px;
                    background: #fce7f3;
                    border-radius: 6px;
                    top: 50%;
                    transform: translateY(-50%);
                    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                  }
                  
                  .slider-track::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: var(--progress);
                    background: linear-gradient(to right, #f472b6, #ec4899);
                    border-radius: 6px;
                    transition: width 0.2s ease;
                  }
                  
                  .slider-thumb:focus {
                    outline: none;
                  }
                  
                  .slider-thumb::-webkit-slider-thumb:hover {
                    background: #4b5563;
                    transform: scale(1.1);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
                  }
                  
                  .slider-thumb::-moz-range-thumb:hover {
                    background: #4b5563;
                    transform: scale(1.1);
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
                  }

                  .number-input {
                    transition: all 0.2s ease;
                  }
                  
                  .number-input:hover {
                    border-color: #f472b6;
                  }
                `}
              </style>
              <div className="relative h-10">
                <div className="slider-track"></div>
                <input
                  type="range"
                  min="18"
                  max="35"
                  value={value.weeks}
                  onChange={(e) => handleChange('weeks', parseInt(e.target.value))}
                  className="slider-thumb"
                  style={{ '--progress': `${((value.weeks - 18) / 17) * 100}%` } as any}
                />
                {renderMarkers(18, 35)}
              </div>
            </div>
          </div>
          <InputGroup
            value={value.weeks}
            min={18}
            max={35}
            onChange={(val) => handleChange('weeks', val)}
            unit="weeks"
          />
        </div>

        {/* Days Section */}
        <div className="flex items-center justify-center space-x-6">
          <div className="w-[300px]">
            <div className="relative pt-8 pb-2">
              <div className="relative h-10">
                <div className="slider-track"></div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={value.days}
                  onChange={(e) => handleChange('days', parseInt(e.target.value))}
                  className="slider-thumb"
                  style={{ '--progress': `${(value.days / 6) * 100}%` } as any}
                />
                {renderMarkers(0, 6)}
              </div>
            </div>
          </div>
          <InputGroup
            value={value.days}
            min={0}
            max={6}
            onChange={(val) => handleChange('days', val)}
            unit="days"
          />
        </div>
      </div>
    </div>
  );
};