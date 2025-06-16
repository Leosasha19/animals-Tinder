import { ReactNode } from 'react';

interface Props {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
}

const Button = ({
  onClick,
  className = '',
  disabled = false,
  children,
}: Props) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
