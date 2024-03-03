import { useState, useEffect } from 'react'

interface RatioProps {
  value: number
}

export const Ratio = ({ value }: RatioProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useState(value)

  useEffect(() => {
    // Only proceed if currentValue does not equal the target value
    if (currentValue !== value) {
      const difference = Math.abs(value - currentValue);
      const delay = difference > 10 ? 20 : (115 - difference * 10);

      const timer = setTimeout(() => {
        setCurrentValue(prevValue => prevValue + (value > prevValue ? 1 : -1));
      }, delay);

      // Return a cleanup function that clears the timeout
      return () => clearTimeout(timer);
    }
    // If currentValue equals the target value, no cleanup function is needed.
    // This effectively returns `undefined`, which is a valid `void` return type.
  }, [value, currentValue]);

  return <div>{currentValue}%</div>
}
