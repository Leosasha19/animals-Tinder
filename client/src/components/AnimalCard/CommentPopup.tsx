import React from 'react';

import Button from '../Button/Button.tsx';

interface Props {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  className?: string;
  placeholder?: string;
  children?: React.ReactNode;
  type?: string;
}

const CommentPopup = ({
  value,
  onChange,
  onClick,
  className = '',
  placeholder = '',
  children,
  type = '',
}: Props) => {
  return (
    <div className={className}>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
      <Button onClick={onClick}>{children}</Button>
    </div>
  );
};

export default CommentPopup;
