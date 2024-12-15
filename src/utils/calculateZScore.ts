interface ZScoreFormula {
  parameter: string;
  equation1: string;  // 均值方程
  equation2: string;  // 标准差方程
  validRange: [number, number];
}

let formulas: Record<string, ZScoreFormula> = {
  'Left Atrial': {
    parameter: 'Left Atrial',
    equation1: '-0.7163+0.3885*x',
    equation2: '4.5573+1926.2464*x^(-2)-167.3885*x^(-1)',
    validRange: [15, 40]
  },
  'Right Atrial': {
    parameter: 'Right Atrial',
    equation1: '-1.9215+0.4670*x',
    equation2: '4.5487+1637.8775*x^(-2)-153.1547*x^(-1)',
    validRange: [15, 40]
  },
  'Left Ventricular': {
    parameter: 'Left Ventricular',
    equation1: '-1.2909+0.4045*x',
    equation2: '1.1802+0.0388*x+0.0013*x^2',
    validRange: [15, 40]
  },
  'Right Ventricular': {
    parameter: 'Right Ventricular',
    equation1: '-2.2855+0.4610*x',
    equation2: '15.2512-1.6925*x+0.0651*x^2-0.0008*x^3',
    validRange: [15, 40]
  },
  'Aortic Valve': {
    parameter: 'Aortic Valve',
    equation1: '-0.2740+0.1740*x',
    equation2: '2.6183+1246.7594*x^(-2)-107.3262*x^(-1)',
    validRange: [15, 40]
  },
  'Descending Aorta': {
    parameter: 'Descending Aorta',
    equation1: '-0.3798+0.1541*x',
    equation2: '0.0541 + 0.0126*x',
    validRange: [15, 40]
  },
  'Pulmonary valve': {
    parameter: 'Pulmonary valve',
    equation1: '-0.4350+0.2159*x',
    equation2: '2.9778+1436.0891*x^(-2)-122.1260*x^(-1)',
    validRange: [15, 40]
  },
  'Left Pulmonary Artery': {
    parameter: 'Left Pulmonary Artery',
    equation1: '-0.5471+0.1157*x',
    equation2: '1.7322+748.6185*x^(-2)-67.2795*x^(-1)',
    validRange: [15, 40]
  },
  'Right Pulmonary Artery': {
    parameter: 'Right Pulmonary Artery',
    equation1: '-0.4855+0.1144*x',
    equation2: '0.1521',
    validRange: [15, 40]
  },
  'Transverse Cardiac': {
    parameter: 'Transverse Cardiac',
    equation1: '-3.1186+1.0983*x',
    equation2: '0.0054*x^2-0.2339*x+4.1486',
    validRange: [15, 40]
  },
  'Ductus Arteriosus': {
    parameter: 'Ductus Arteriosus',
    equation1: '-0.2127+0.1131*x',
    equation2: '-0.0924+0.0158*x',
    validRange: [15, 40]
  },
  'Foramen Ovale diameter': {
    parameter: 'Foramen Ovale diameter',
    equation1: '12.0178-39.5801*x^(-0.5)',
    equation2: '0.0511+0.0225*x',
    validRange: [15, 40]
  },
  'Aortic Isthmus diameter': {
    parameter: 'Aortic Isthmus diameter',
    equation1: '-3.4181+0.4482*x-0.0165*x^2+2.94795*10^(-5)*x^3',
    equation2: '-0.0460+0.0138*x',
    validRange: [15, 40]
  }
};

// 计算方程值
function calculateEquation(equation: string, x: number): number {
  try {
    const expression = equation
      .replace(/x\^\(-2\)/g, `Math.pow(${x},-2)`)
      .replace(/x\^\(-1\)/g, `Math.pow(${x},-1)`)
      .replace(/x\^2/g, `Math.pow(${x},2)`)
      .replace(/x\^3/g, `Math.pow(${x},3)`)
      .replace(/x\^\(-0\.5\)/g, `Math.pow(${x},-0.5)`)
      .replace(/10\^\(-5\)/g, `Math.pow(10,-5)`)
      .replace(/x/g, x.toString());
    
    return eval(expression);
  } catch (error) {
    console.error('计算公式错误:', error);
    throw error;
  }
}

export interface ZScoreResult {
  value: number;
  isValid: boolean;
  message?: string;
  mean?: number;
  sd?: number;
}

export function calculateZScore(
  measurement: number,
  weeks: number,
  days: number,
  parameter: string
): ZScoreResult {
  try {
    const formula = formulas[parameter];
    if (!formula) {
      return {
        value: 0,
        isValid: false,
        message: `未找到参数 ${parameter} 的计算公式`
      };
    }

    // 计算胎龄（周+天/7）
    const x = weeks + days / 7;

    const [minGA, maxGA] = formula.validRange;
    if (x < minGA || x > maxGA) {
      return {
        value: 0,
        isValid: false,
        message: `胎龄 ${x.toFixed(1)} 周超出有效范围 ${minGA}-${maxGA}`
      };
    }

    // 计算均值（Equation1）
    const mean = calculateEquation(formula.equation1, x);
    
    // 计算标准差（Equation2）
    const sd = calculateEquation(formula.equation2, x);

    // 计算Z-score
    const zScore = (measurement - mean) / sd;

    return {
      value: Number(zScore.toFixed(2)),
      isValid: true,
      mean: Number(mean.toFixed(2)),
      sd: Number(sd.toFixed(2))
    };
  } catch (error) {
    return {
      value: 0,
      isValid: false,
      message: '计算错误，请检查输入值'
    };
  }
} 