type Props = {
  imageURL: string;
};

const AnimalImage = ({ imageURL }: Props) => {
  return (
    <img className="AnimalCard__picture" src={imageURL} alt="Тут животное" />
  );
};

export default AnimalImage;
