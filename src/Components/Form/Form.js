import React from 'react';
import cx from 'classnames';

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={cx('Input', className)}
      type="text"
      ref={ref}
      {...props}
    />
  );
});

export function Label({ className, ...props }) {
  return <label className={cx('Label', className)} {...props} />;
}
