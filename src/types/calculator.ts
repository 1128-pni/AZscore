export interface GestationalAge {
  weeks: number;
  days: number;
}

export interface CardiovascularMeasurement {
  parameter: string;
  measured: number;
  zScore: number;
  referenceRange: string;
  centile: number;
}

export interface CalculatorFormData {
  gestationalAge: GestationalAge;
  measurements: CardiovascularMeasurement[];
}

export interface Formula {
  parameter: string;
  equation1: string; // 均值方程
  equation2: string; // 标准差方程
  validRange: [number, number]; // [最小胎龄, 最大胎龄]
}

export interface ZScoreResult {
  value: number;
  isValid: boolean;
  message?: string;
  mean?: number;
  sd?: number;
}