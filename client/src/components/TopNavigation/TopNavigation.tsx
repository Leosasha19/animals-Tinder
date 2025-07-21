import React from 'react';

import Button from '../Button/Button.tsx';

type Props = {
  isCat: boolean;
  setIsCat: (value: boolean) => void;
  goLikedPage: () => void;
};

const TopNavigation: React.FC<Props> = ({
  isCat,
  setIsCat,
  goLikedPage,
}: Props) => {
  return (
    <div>
      <div className={'mainContainer__topLine'}>
        <Button
          onClick={() => setIsCat(true)}
          className={
            isCat
              ? 'mainContainer__topLine__switchButtonsActive'
              : 'mainContainer__topLine__switchButtons'
          }
        >
          CATS
        </Button>
        <Button
          onClick={() => setIsCat(false)}
          className={
            isCat
              ? 'mainContainer__topLine__switchButtons'
              : 'mainContainer__topLine__switchButtonsActive'
          }
        >
          DOGS
        </Button>
        <Button
          onClick={goLikedPage}
          className={'mainContainer__topLine__liked'}
        >
          ❤️
        </Button>
      </div>
    </div>
  );
};

export default TopNavigation;
