import { useState } from 'react';
import { GestationalAge, CardiovascularMeasurement, CalculatorFormData } from '../types/calculator';
import { calculateZScore, calculateCentile } from '../utils/calculations';
import { formulas, dopplerFormulas } from '../data/formulas';

const initialGestationalAge: GestationalAge = {
  weeks: 18,
  days: 0
};

const createEmptyMeasurement = (): CardiovascularMeasurement => ({
  parameter: '',
  measured: 0,
  zScore: 0,
  referenceRange: '',
  centile: 0
});

export const useCalculator = (isDoppler: boolean = false) => {
  const [formData, setFormData] = useState<CalculatorFormData>({
    gestationalAge: initialGestationalAge,
    measurements: [createEmptyMeasurement()]
  });

  const evaluateFormula = (formula: string, x: number): number => {
    try {
      let processedFormula = formula.replace(/x/g, x.toString());

      processedFormula = processedFormula
        .replace(/\^(-?\d+(\.\d+)?)/g, '**$1')
        .replace(/\^(\([^)]+\))/g, '**$1')
        .replace(/10\^/g, '10**');

      console.log('Formula evaluation steps:', {
        original: formula,
        processed: processedFormula,
        x: x,
        expression: processedFormula.replace(/\*\*/g, '^')
      });

      const result = eval(processedFormula);
      console.log('Formula evaluation result:', {
        formula: processedFormula.replace(/\*\*/g, '^'),
        x: x,
        result: result,
        roundedResult: Number(result.toFixed(4))
      });
      
      return Number(result.toFixed(4));
    } catch (error) {
      console.error('Formula evaluation error:', error, formula);
      return 0;
    }
  };

  const calculateMeanAndSD = (parameter: string, gestationalAge: GestationalAge) => {
    const formulaSet = isDoppler ? dopplerFormulas : formulas;
    const formula = formulaSet[parameter];
    
    if (!formula) {
      console.error('Formula not found:', parameter);
      return { mean: 0, sd: 0, isValid: false };
    }

    const x = gestationalAge.weeks + gestationalAge.days / 7;
    console.log('Calculating for gestational age:', {
      weeks: gestationalAge.weeks,
      days: gestationalAge.days,
      x: x,
      parameter: parameter,
      isDoppler: isDoppler
    });

    const [minGA, maxGA] = formula.validRange;
    if (x < minGA || x > maxGA) {
      console.warn(`GA ${x.toFixed(1)} weeks is outside valid range ${minGA}-${maxGA}`);
      return { mean: 0, sd: 0, isValid: false };
    }

    try {
      const mean = evaluateFormula(formula.equation1, x);
      console.log('Mean calculation:', {
        formula: formula.equation1,
        x: x,
        result: mean
      });

      const sd = evaluateFormula(formula.equation2, x);
      console.log('SD calculation:', {
        formula: formula.equation2,
        x: x,
        result: sd
      });

      if (!isFinite(mean) || !isFinite(sd) || sd === 0) {
        console.error('Invalid calculation result:', { mean, sd });
        return { mean: 0, sd: 0, isValid: false };
      }

      return { mean, sd, isValid: true };
    } catch (error) {
      console.error('Formula calculation error:', error);
      return { mean: 0, sd: 0, isValid: false };
    }
  };

  const handleGestationalAgeChange = (newAge: GestationalAge) => {
    console.log('Gestational age update:', {
      current: formData.gestationalAge,
      new: newAge,
      totalWeeks: newAge.weeks + newAge.days / 7
    });

    setFormData(prev => {
      const totalWeeks = newAge.weeks + newAge.days / 7;
      
      const updatedMeasurements = prev.measurements.map(measurement => {
        if (!measurement.parameter || 
            !measurement.measured || 
            measurement.measured === 0) {
          return {
            ...measurement,
            zScore: 0,
            centile: 0
          };
        }

        const { mean, sd, isValid } = calculateMeanAndSD(measurement.parameter, newAge);
        
        if (!isValid) {
          console.warn('Invalid calculation:', {
            parameter: measurement.parameter,
            gestationalAge: totalWeeks
          });
          return {
            ...measurement,
            zScore: 0,
            centile: 0
          };
        }

        const zScoreResult = calculateZScore(measurement.measured, mean, sd);
        const centile = zScoreResult.isValid ? calculateCentile(zScoreResult.value) : 0;

        console.log('Calculation update:', {
          parameter: measurement.parameter,
          measured: measurement.measured,
          gestationalAge: totalWeeks,
          mean: mean,
          sd: sd,
          zScore: zScoreResult.value,
          centile: centile
        });

        return {
          ...measurement,
          zScore: zScoreResult.value,
          centile
        };
      });

      return {
        ...prev,
        gestationalAge: newAge,
        measurements: updatedMeasurements
      };
    });
  };

  const handleMeasurementChange = (index: number, measurement: CardiovascularMeasurement) => {
    setFormData(prev => {
      const newMeasurements = [...prev.measurements];
      
      if (!measurement.parameter || 
          measurement.measured === null || 
          measurement.measured === undefined || 
          measurement.measured === 0) {
        newMeasurements[index] = {
          ...measurement,
          zScore: 0,
          centile: 0
        };
      } else {
        const { mean, sd, isValid } = calculateMeanAndSD(measurement.parameter, prev.gestationalAge);
        console.log('Measurement update:', {
          parameter: measurement.parameter,
          measured: measurement.measured,
          gestationalAge: prev.gestationalAge,
          mean: mean,
          sd: sd,
          isValid: isValid
        });
        
        if (!isValid) {
          newMeasurements[index] = {
            ...measurement,
            zScore: 0,
            centile: 0
          };
        } else {
          const zScoreResult = calculateZScore(measurement.measured, mean, sd);
          const centile = zScoreResult.isValid ? calculateCentile(zScoreResult.value) : 0;

          console.log('Z-score calculation:', {
            parameter: measurement.parameter,
            measured: measurement.measured,
            gestationalAge: prev.gestationalAge,
            zScore: zScoreResult.value,
            centile: centile
          });

          newMeasurements[index] = {
            ...measurement,
            zScore: zScoreResult.value,
            centile
          };
        }
      }

      return {
        ...prev,
        measurements: newMeasurements
      };
    });
  };

  const handleAddMeasurement = () => {
    console.log('handleAddMeasurement called:', {
      currentMeasurements: formData.measurements,
      isDoppler,
      type: isDoppler ? 'Doppler' : '2D'
    });
    
    setFormData(prev => {
      const newMeasurement = createEmptyMeasurement();
      const newMeasurements = [...prev.measurements, newMeasurement];
      
      console.log('Adding new measurement:', {
        type: isDoppler ? 'Doppler' : '2D',
        newMeasurement,
        totalMeasurements: newMeasurements.length
      });
      
      return {
        ...prev,
        measurements: newMeasurements
      };
    });
  };

  return {
    formData,
    handleGestationalAgeChange,
    handleMeasurementChange,
    handleAddMeasurement
  };
};