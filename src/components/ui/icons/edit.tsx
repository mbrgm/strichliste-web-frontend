import * as React from 'react';

export interface EditIconProps {}

export function EditIcon(props: EditIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <path d="M3,3 L6,3 L6,5 L3,5 C2.44771525,5 2,5.44771525 2,6 L2,13 C2,13.5522847 2.44771525,14 3,14 L10,14 C10.5522847,14 11,13.5522847 11,13 L11,10 L13,10 L13,13 C13,14.6568542 11.6568542,16 10,16 L3,16 C1.34314575,16 0,14.6568542 0,13 L0,6 C0,4.34314575 1.34314575,3 3,3 Z M11,2 L14,5 L7,12 L4,12 L4,9 L11,2 Z M12,1 C13.2893219,-0.201010127 14.5929291,-0.201010127 15,1 C16.2010101,1.40707089 16.2010101,2.71067812 15,4 L12,1 Z" />
    </svg>
  );
}
