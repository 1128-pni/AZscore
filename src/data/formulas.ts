interface FormulaData {
  [key: string]: {
    equation1: string; // mean equation
    equation2: string; // SD equation
    validRange: [number, number]; // [min GA, max GA]
  }
}

export const formulas: FormulaData = {
  "Left Atrial": {
    equation1: "-0.7163+0.3885*x",
    equation2: "4.5573+1926.2464*x^(-2)-167.3885*x^(-1)",
    validRange: [18, 35]
  },
  "Right Atrial": {
    equation1: "-1.9215+0.4670*x",
    equation2: "4.5487+1637.8775*x^(-2)-153.1547*x^(-1)",
    validRange: [18, 35]
  },
  "Left Ventricular": {
    equation1: "-1.2909+0.4045*x",
    equation2: "1.1802-0.0388*x+0.0013*x^2",
    validRange: [18, 35]
  },
  "Right Ventricular": {
    equation1: "-2.2855+0.4610*x",
    equation2: "15.2512-1.6925*x+0.0651*x^2-0.0008*x^3",
    validRange: [18, 35]
  },
  "Aortic Valve": {
    equation1: "-0.2740+0.1740*x",
    equation2: "2.6183+1246.7594*x^(-2)-107.3262*x^(-1)",
    validRange: [18, 35]
  },
  "Descending Aorta": {
    equation1: "-0.3798+0.1541*x",
    equation2: "0.0541+0.0126*x",
    validRange: [18, 35]
  },
  "Pulmonary Valve": {
    equation1: "-0.4390+0.2159*x",
    equation2: "2.9778+1436.0891*x^(-2)-122.1260*x^(-1)",
    validRange: [18, 35]
  },
  "Left Pulmonary Artery": {
    equation1: "-0.5471+0.1157*x",
    equation2: "1.7322+748.6185*x^(-2)-67.2795*x^(-1)",
    validRange: [18, 35]
  },
  "Right Pulmonary Artery": {
    equation1: "-0.4855+0.1144*x",
    equation2: "0.1521",
    validRange: [18, 35]
  },
  "Transverse Cardiac": {
    equation1: "-3.1186+1.0983*x",
    equation2: "0.0054*x^2-0.2339*x+4.1486",
    validRange: [18, 35]
  },
  "Ductus Arteriosus": {
    equation1: "-0.2127+0.1131*x",
    equation2: "-0.0924+0.0158*x",
    validRange: [18, 35]
  },
  "Foramen Ovale": {
    equation1: "12.0178-39.5801*x^(-0.5)",
    equation2: "0.0511+0.0225*x",
    validRange: [18, 35]
  },
  "Aortic Isthmus": {
    equation1: "-3.4181+0.4482*x-0.0105*x^2+9.795*10^(-5)*x^3",
    equation2: "-0.0460+0.0138*x",
    validRange: [18, 35]
  }
}; 

export const dopplerFormulas: FormulaData = {
  "Mitral Valve E wave velocity": {
    equation1: "66.3084-180.1391*x^(-0.5)",
    equation2: "42.4318-4.4722*x+0.1752*x^2-0.0022*x^3",
    validRange: [18, 35]
  },
  "Mitral Valve A wave velocity": {
    equation1: "89.2115-0.0001*x^3-193.1850*x^(-0.5)",
    equation2: "6.4108+0.0024*x^2",
    validRange: [18, 35]
  },
  "Mitral Valve E/A Ratio": {
    equation1: "0.4221+0.0080*x",
    equation2: "0.0408+0.0017*x",
    validRange: [18, 35]
  },
  "Tricuspid Valve E wave velocity": {
    equation1: "5.9474+1.5206*x-0.0153*x^2",
    equation2: "2.0689+0.1793*x",
    validRange: [18, 35]
  },
  "Tricuspid Valve A wave velocity": {
    equation1: "85.7364-165.3491*x^(-0.5)",
    equation2: "4.5211+0.1577*x",
    validRange: [18, 35]
  },
  "Tricuspid Valve E/A Ratio": {
    equation1: "0.5110+0.0058*x",
    equation2: "0.0282+0.0021*x",
    validRange: [18, 35]
  },
  "Aortic Valve peak velocity in systole": {
    equation1: "36.9766+1.3731*x",
    equation2: "5.2860+0.2068*x",
    validRange: [18, 35]
  },
  "Pulmonary valve peak velocity in systole": {
    equation1: "29.4775+1.1473*x",
    equation2: "4.7094+0.1720*x",
    validRange: [18, 35]
  },
  "Aortic Arch peak velocity in systole": {
    equation1: "38.2433+1.7503*x",
    equation2: "2.9831+0.3612*x",
    validRange: [18, 35]
  },
  "Aortic Arch peak velocity in diastole": {
    equation1: "25.6784-2.2554*x+0.1068*x^2-0.0015*x^3",
    equation2: "-9.8784+1.1877*x-0.0325*x^2+0.0003*x^3",
    validRange: [18, 35]
  },
  "Ductus Arteriosus peak velocity in systole": {
    equation1: "17.9396+2.3799*x",
    equation2: "-2.7442+0.6396*x",
    validRange: [18, 35]
  },
  "Ductus Arteriosus peak velocity in diastole": {
    equation1: "5.3722+0.3842*x",
    equation2: "-0.3887+0.1668*x",
    validRange: [18, 35]
  },
  "Pulmonary Vein S wave velocity": {
    equation1: "78.9779-8.3789*x+0.3562*x^2-0.0045*x^3",
    equation2: "24.3327-2.4754*x+0.0978*x^2-0.0012*x^3",
    validRange: [18, 35]
  },
  "Pulmonary Vein D wave velocity": {
    equation1: "-12.1161+1.5970*x-0.0171*x^2",
    equation2: "31.3043-3.5068*x+0.1408*x^2-0.0018*x^3",
    validRange: [18, 35]
  },
  "Pulmonary Vein A wave velocity": {
    equation1: "32.5904-906.3173*x^(-1)+8231.0236*x^(-2)",
    equation2: "29.2673+3549.8296*x^(-2)-160.3487*x^(-0.5)",
    validRange: [18, 35]
  },
  "Ductus Venosus S wave velocity": {
    equation1: "31.9852+0.6376*x",
    equation2: "10.4516+0.1622*x",
    validRange: [18, 35]
  },
  "Ductus Venosus D wave velocity": {
    equation1: "29.0917+0.5354*x",
    equation2: "9.6877+0.1545*x",
    validRange: [18, 35]
  },
  "Ductus Venosus A wave velocity": {
    equation1: "9.2117+0.7167*x",
    equation2: "4.2580+0.2157*x",
    validRange: [18, 35]
  },
  "Middle cerebral artery peak velocity in systole": {
    equation1: "223.4447-23.7946*x+0.9011*x^2-0.0106*x^3",
    equation2: "99.1418-10.9561*x+0.4127*x^2-0.0050*x^3",
    validRange: [18, 35]
  },
  "Middle cerebral artery PI": {
    equation1: "-1.2703+0.1934*x-0.0031*x^2",
    equation2: "0.0314+0.0107*x",
    validRange: [18, 35]
  },
  "Fetal External Section Umbilical Artery peak velocity in systole": {
    equation1: "17.6649+0.7697*x",
    equation2: "2.9544+0.2055*x",
    validRange: [18, 35]
  },
  "Fetal External Section Umbilical Artery peak velocity in diastole": {
    equation1: "-2.3840+0.5616*x",
    equation2: "-3.4624-0.0001*x^3+0.3157*x",
    validRange: [18, 35]
  },
  "Fetal External Section Umbilical Artery PI": {
    equation1: "1.6658-0.0229*x",
    equation2: "0.1953",
    validRange: [18, 35]
  },
  "Fetal Internal Section Umbilical Artery peak velocity in diastole": {
    equation1: "-5.6295+0.9613*x-0.0080*x^2",
    equation2: "0.6975+0.1749*x",
    validRange: [18, 35]
  },
  "Fetal Internal Section Umbilical Artery PI": {
    equation1: "1.8659-0.0266*x",
    equation2: "0.2117+0.0005*x",
    validRange: [18, 35]
  }
}; 