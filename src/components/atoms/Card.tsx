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
    default: 'card bg-base-100 shadow-xl',
    bordered: 'card card-bordered bg-base-100',
    compact: 'card card-compact bg-base-100 shadow-xl',
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`} {...props}>
      <div className="card-body">{children}</div>
    </div>
  );
};
