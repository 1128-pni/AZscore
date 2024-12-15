import React, { useState, useEffect } from 'react';
import { cn } from '../utils/cn';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  value: string | number;
  onChange: (value: string) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  id,
  value,
  onChange,
  type = 'text',
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value.toString());
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setLocalValue(value.toString());
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (type === 'number') {
      // 允许空值、负号和小数点开头
      if (newValue === '' || newValue === '-' || newValue === '.') {
        setLocalValue(newValue);
        return;
      }

      // 验证数字格式
      const numberRegex = /^-?\d*\.?\d*$/;
      if (numberRegex.test(newValue)) {
        setLocalValue(newValue);
        // 如果是有效数字才触发onChange
        if (!isNaN(parseFloat(newValue))) {
          onChange(newValue);
        }
      }
    } else {
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    
    if (type === 'number') {
      // 处理特殊情况
      if (localValue === '' || localValue === '-' || localValue === '.') {
        setLocalValue('');
        onChange('');
        return;
      }

      // 处理数字
      const num = parseFloat(localValue);
      if (!isNaN(num)) {
        // 保持原始输入值，不格式化
        onChange(localValue);
      } else {
        setLocalValue('');
        onChange('');
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    
    // 如果是数字类型且值为0，清空输入框
    if (type === 'number' && (localValue === '0' || localValue === '0.00')) {
      setLocalValue('');
      e.target.select(); // 选中所有文本
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type === 'number' ? 'text' : type}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={cn(
          'apple-input transition-all duration-200',
          'w-full px-3 py-2 text-base text-center',
          'border border-gray-300 rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200',
          'hover:border-pink-300',
          error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};