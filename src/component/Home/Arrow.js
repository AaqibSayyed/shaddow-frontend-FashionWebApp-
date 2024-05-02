
const arrowStyle= {
    display: "flex", 
    alignItems: 'center',
    justifyContent: 'center',
    background: "#343434",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    height: '50px', 
    width: '50px',
    
}

export function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...arrowStyle, right: '-1%', top: '50%'}}
        onClick={onClick}
      />
    );
  }


export function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...arrowStyle, left: '-1%', top: '50%', zIndex: '1'}}
        onClick={onClick}
      />
    );
  }