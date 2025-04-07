import { useState } from "react";
import { Layer, Stage } from "react-konva";
import Shape from "../shape/Shape";
import { fontFamily } from "html2canvas/dist/types/css/property-descriptors/font-family";

const Canvas = ({ tool, stageRef }: any) => {
  const [figures, setFigures] = useState<any>([]);
  
  console.log(figures, 'figures')
  // console.log(stageRef, 'stageRef')

  const updateFigure = (id: string, newData: any) => {
    setFigures((prev: any) =>
      prev.map((fig: any) =>
        fig.id === id ? { ...fig, ...newData } : fig
      )
    );
  };

  const handleOnClick = (e: any) => {
    if (tool === "cursor") return;

    const stage = e.target.getStage();
    const stageOffset = stage.absolutePosition();
    const point = stage.getPointerPosition();

    setFigures((prev: any) => [
      ...prev,
      {
        id: Date.now().toString(36),
        width: 100,
        height: 100,
        type: "rect",
        x: point.x - stageOffset.x,
        y: point.y - stageOffset.y,
        html: "",
        text: "",
        fontSize: '14px',
        letterSpacing: '0px',
        fontWeight: 500,
        fontFamily: 'Ariel',
        lineHeight: 1.5,
        padding: '0px',
      },
    ]);
  };

  

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={tool === "cursor"}
      onClick={handleOnClick}
      ref={stageRef}
    >
      <Layer>
        {figures.map((figure: any, i: number) => {
          return <Shape key={i} {...figure} stageRef={stageRef} tool={tool} updateFigure={updateFigure}/>;
        })}
      </Layer>
    </Stage>
  );
};

export default Canvas;
