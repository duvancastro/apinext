
import Header from "./Header";
const Layaout = ({ children, setVisible,visible }) => {
  return (
    <div>
      <Header setVisible={setVisible}visible={visible}/>
      {children}
    </div>
  );
};

export default Layaout;
