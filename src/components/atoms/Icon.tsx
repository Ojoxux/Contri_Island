import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

export const Icon = ({ name, size = 24, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
};
