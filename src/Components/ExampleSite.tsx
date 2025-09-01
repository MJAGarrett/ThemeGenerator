import "./ExampleSite.css";

const ExampleSite = () => {
  return (
    <div
      className="display"
    >
      <div className="palette">
        <div className="surface1 rad-shadow"><span>1</span></div>
        <div className="surface2 rad-shadow"><span>2</span></div>
        <div className="surface3 rad-shadow"><span>3</span></div>
        <div className="surface4 rad-shadow"><span>4</span></div>
      </div>
      <div style={{ zIndex: "1", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
        <h2 className="brand" >Brand</h2>
        <h2 className="text1" >Text Color 1</h2>
        <h2 className="text2" >Text Color 2</h2>
        <p className="text1" >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, dignissimos iure rerum cumque expedita qui in, dolore autem magnam dolorem non dolorum animi accusantium necessitatibus, quia velit minima cum optio?</p>
      </div>
    </div>
  );
};

export default ExampleSite;
