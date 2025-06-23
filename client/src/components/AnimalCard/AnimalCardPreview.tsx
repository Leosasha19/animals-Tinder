import Button from '../Button/Button.tsx';

interface Props {
  className?: string;
  imgURL: string;
  comment: string;
  onNext: () => void;
}

const AnimalCardPreview = ({
  className = '',
  imgURL,
  comment,
  onNext,
}: Props) => {
  return (
    <div className={className}>
      <img src={imgURL} alt="" />
      <div>{comment}</div>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
};

export default AnimalCardPreview;
