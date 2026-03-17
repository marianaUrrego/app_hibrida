import s from "../styles/Add.module.scss";
import { FiCalendar, FiDelete, FiCheck } from "react-icons/fi";

export default function NumberPad({ onPress, onConfirm, showCalendar = true }) {
  return (
    <div className={s.pad}>
      <button onClick={() => onPress("7")}>7</button>
      <button onClick={() => onPress("8")}>8</button>
      <button onClick={() => onPress("9")}>9</button>
      <button className={s.ghost}>
        {showCalendar ? <FiCalendar /> : null}
      </button>

      <button onClick={() => onPress("4")}>4</button>
      <button onClick={() => onPress("5")}>5</button>
      <button onClick={() => onPress("6")}>6</button>
      <button className={s.ghost} onClick={() => onPress("+")}>+</button>

      <button onClick={() => onPress("1")}>1</button>
      <button onClick={() => onPress("2")}>2</button>
      <button onClick={() => onPress("3")}>3</button>
      <button className={s.ghost} onClick={() => onPress("-")}>−</button>

      <button onClick={() => onPress(",")}>,</button>
      <button onClick={() => onPress("0")}>0</button>
      <button className={s.ghost} onClick={() => onPress("DEL")}>
        <FiDelete />
      </button>
      <button className={s.ok} onClick={onConfirm}>
        <FiCheck />
      </button>
    </div>
  );
}