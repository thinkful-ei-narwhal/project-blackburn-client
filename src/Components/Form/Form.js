import React from 'react';
import cx from 'classnames';

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return <input className={cx(className)} type="text" ref={ref} {...props} />;
});
export function Required({ className, ...props }) {
  return (
    <span className={cx(className)} {...props}>
      &#42;
    </span>
  );
}

export function Label({ className, ...props }) {
  return <label className={cx(className)} {...props} />;
}
