interface ParsedFormula {
  mean: (ga: number) => number;
  sd: (ga: number) => number;
}

export function parseFormula(formulaStr: string): ParsedFormula {
  const [meanStr, sdStr] = formulaStr.split(';');
  
  const meanFormula = createFormulaFunction(meanStr.split('=')[1]);
  const sdFormula = createFormulaFunction(sdStr.split('=')[1]);

  return {
    mean: meanFormula,
    sd: sdFormula
  };
}

function createFormulaFunction(expression: string): (ga: number) => number {
  // 替换 GA 为实际值的占位符
  const jsExpression = expression
    .replace(/GA\^2/g, 'Math.pow(ga,2)')
    .replace(/GA/g, 'ga');
  
  // 创建函数
  return new Function('ga', `return ${jsExpression}`) as (ga: number) => number;
} 