import React, { memo, useEffect, useRef } from 'react';
import './Column.css';

interface ColumnProps {
  height: number;
}

const Column = memo(function Column({ height }: ColumnProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.style.height = `${height}px`;
  }, []);
  return <div className="column" ref={ref}></div>;
});

export default Column;
