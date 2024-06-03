import { useContext } from "react";
import { ApiContext } from "../../context/Context";

const Card = ({ message, Icon }) => {
  const { onSent, setDisplayButton } = useContext(ApiContext);

  const handleClick = () => {
    onSent(message);
    setDisplayButton(false);
  };

  return (
    <div className="flex" onClick={handleClick}>
      <div className=" relative h-40 w-60 cursor-pointer rounded-[10px]  bg-[#1E1F20] p-[15px] hover:bg-[#333537] md:h-[200px] md:w-[500px]">
        <p>{message}</p>
        <Icon className="absolute bottom-[10px] right-[15px]" />
      </div>
    </div>
  );
};

export default Card;
