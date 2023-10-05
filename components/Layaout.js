
import Header from "./Header";
const Layaout = ({ children, setVisible,visible, visibleTable,setVisibleTable}) => {
  return (
    <div>
      <Header setVisible={setVisible} visible={visible} visibleTable={visibleTable} setVisibleTable={setVisibleTable}/>
      {children}
    </div>
  );
};

export default Layaout;
