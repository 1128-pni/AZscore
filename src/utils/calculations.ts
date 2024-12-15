import { GestationalAge, ZScoreResult } from '../types/calculator';

// Add Math.erf type declaration
declare global {
  interface Math {
    erf(x: number): number;
  }
}

// Implement erf function (for normal distribution cumulative function)
if (!Math.erf) {
  Math.erf = (x: number): number => {
    // Calculate error function using Taylor series approximation
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  };
}

/**
 * Calculate total days of gestational age
 */
export const calculateTotalDays = (gestationalAge: GestationalAge): number => {
  if (!gestationalAge || typeof gestationalAge.weeks !== 'number' || typeof gestationalAge.days !== 'number') {
    return 0;
  }
  return gestationalAge.weeks * 7 + gestationalAge.days;
};

/**
 * Calculate Z-score
 */
export const calculateZScore = (measured: number, mean: number, sd: number): ZScoreResult => {
  // 检查输入值是否为有效数字
  if (measured === null || measured === undefined || 
      mean === null || mean === undefined || 
      sd === null || sd === undefined || 
      sd === 0) {
    console.warn('Invalid input for Z-score calculation:', { measured, mean, sd });
    return { value: 0, isValid: false };
  }

  try {
    // 将输入值转换为数字类型并保留4位小数
    const measuredNum = Number(measured);
    const meanNum = Number(mean);
    const sdNum = Number(sd);

    // 检查转换后的值是否有效
    if (!isFinite(measuredNum) || !isFinite(meanNum) || !isFinite(sdNum)) {
      console.warn('Non-finite values in Z-score calculation:', { measuredNum, meanNum, sdNum });
      return { value: 0, isValid: false };
    }

    // 计算Z-score
    const difference = measuredNum - meanNum;
    const zScore = difference / sdNum;

    console.log('Z-score calculation details:', {
      measured: measuredNum,
      mean: meanNum,
      sd: sdNum,
      difference: difference,
      zScore: zScore,
      roundedZScore: Number(zScore.toFixed(4))
    });
    
    return {
      value: Number(zScore.toFixed(4)),
      isValid: true
    };
  } catch (error) {
    console.error('Z-score calculation error:', error);
    return { value: 0, isValid: false };
  }
};

/**
 * Calculate percentile
 */
export const calculateCentile = (zScore: number): number => {
  if (!isFinite(zScore)) {
    return 0;
  }

  try {
    // 使用正态分布的累积分布函数计算百分位数
    const erf = (x: number): number => {
      const t = 1.0 / (1.0 + 0.5 * Math.abs(x));
      const tau = t * Math.exp(-x * x - 1.26551223 +
        t * (1.00002368 +
          t * (0.37409196 +
            t * (0.09678418 +
              t * (-0.18628806 +
                t * (0.27886807 +
                  t * (-1.13520398 +
                    t * (1.48851587 +
                      t * (-0.82215223 +
                        t * 0.17087277)))))))));
      return x >= 0 ? 1 - tau : tau - 1;
    };

    const centile = (1 + erf(zScore / Math.sqrt(2))) * 50;
    return Number(centile.toFixed(1));
  } catch (error) {
    console.error('Centile calculation error:', error);
    return 0;
  }
};

/**
 * Validate gestational age
 */
export const validateGestationalAge = (weeks: number, days: number): boolean => {
  // Type check
  if (typeof weeks !== 'number' || typeof days !== 'number') {
    return false;
  }

  // Range check
  if (!isFinite(weeks) || !isFinite(days)) {
    return false;
  }

  // Valid range validation
  return weeks >= 18 && weeks <= 35 && days >= 0 && days <= 6;
};

/**
 * Format gestational age display
 */
export const formatGestationalAge = (weeks: number, days: number): string => {
  if (!validateGestationalAge(weeks, days)) {
    return 'Invalid GA';
  }
  return `${weeks}w${days}d`;
};