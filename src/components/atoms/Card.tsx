import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'compact';
}

export const Card = ({
  children,
  variant = 'default',
  className = '',
  ...props
}: CardProps) => {
  const variantClasses = {
    default: 'card bg-white/90 shadow-acnh border-2 border-acnh-green',
    bordered: 'card bg-white/90 border-2 border-acnh-green',
    compact:
      'card card-compact bg-white/90 shadow-acnh border-2 border-acnh-green',
  };

  return (
    <div
      className={`${variantClasses[variant]} rounded-acnh ${className}`}
      {...props}
    >
      <div className="card-body">{children}</div>
    </div>
  );
};
