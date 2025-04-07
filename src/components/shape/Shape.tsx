import html2canvas from "html2canvas";
import Konva from "konva";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Group, Rect } from "react-konva";
import { Html } from "react-konva-utils";
import HtmlText from "../htmlText/HtmlText";


interface ShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  tool: string;
  html: string;
  id: string;
  text: string;
  fontSize: string;
  letterSpacing: string;
  fontWeight: number;
  fontFamily: string;
  lineHeight: number;
  updateFigure: (id: string, data: { text: string, html: string }) => void;
}


const Shape: FC<ShapeProps> = (props) => {
  const { x, y, width, height, tool, html, id, text, fontSize, letterSpacing, fontWeight, fontFamily, lineHeight, updateFigure } = props;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(text);

  const groupRef = useRef<Konva.Group>(null);
  const imageRef = useRef<Konva.Image | null>(null);
  const htmlRef = useRef<HTMLDivElement | null>(null);

  console.log(htmlRef, 'htmlRef')
  console.log(imageRef, 'imageRef')

  const renderImage = async () => {

    // if (imageRef.current) {
    //   imageRef.current.destroy();
    //   imageRef.current = null;
    // }



    console.log(html, 'html передан в HtmlText')

    const htmltext = document.getElementById(`htmltext_${id}`);

    console.log(htmltext, 'htmltext')
    

    if (htmltext) {

      const innerhtml = htmltext.innerHTML;
      
      console.log(innerhtml, 'innerhtml')

      

      if (innerhtml) {

        const canvas = await html2canvas(htmltext, {
          backgroundColor: "rgba(0,0,0,0)",
        });
        
        console.log(canvas, 'canvas')

        const shape = new Konva.Image({
          x: 0,
          y: 0,
          scaleX: 1 / window.devicePixelRatio,
          scaleY: 1 / window.devicePixelRatio,
          image: canvas,
          fontSize: fontSize,
          // border: 0,
          padding: '0px',
        });
        
        groupRef.current?.add(shape);
       
        imageRef.current = shape;
        
      } else return console.error('innerhtml не найден');
    } else return;
  };

  useEffect(() => {
    renderImage();
  }, [isEditing]);

  const handleClick = () => {
    
    console.log(tool, 'tool')

    if (tool === "shape") {
      return;
    } else {
      
      setIsEditing((prev) => !prev);

      if (imageRef.current) {
        if (isEditing) {
          imageRef.current.show();
        } else {
          imageRef.current.hide();
        }
      } else return;
    }
  };

  
  
  
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    
    updateFigure(id, {
      text: e.target.value,
      html: e.target.value,
    });
    
  };

  
  function handlerOnBlur() {
    // setIsEditing((prev) => !prev);
  }

  

  return (
    <>
      <Group x={x} y={y} onClick={handleClick} ref={groupRef} draggable>
        <Rect stroke={"black"} width={width} height={height} />
        
          <Html>
            {isEditing ? <textarea placeholder="Введите текст" value={value} onChange={handleInput} onBlur={handlerOnBlur} style={{
              width:width,
              height:height,
              fontSize: fontSize,
              letterSpacing: letterSpacing,
              textAlign: 'left',
              fontWeight: fontWeight,
              fontFamily: fontFamily,
              border: '0px',
              padding: '0px',
              margin: 0,
              resize: 'none',
              overflow: 'hidden',
              outline: 'none',
              boxSizing: 'border-box',
              lineHeight: lineHeight,
              backgroundColor: 'transparent',
              // padding: '2px 0px 0px 1px',

            }}/>
            :
            <HtmlText ref={htmlRef} html={html} id={id} width={width} fontSize={fontSize} letterSpacing={letterSpacing} fontWeight={fontWeight} fontFamily={fontFamily} lineHeight={lineHeight}/>
            }
          </Html>
           
      </Group>
      
    </>
  );
};

export default Shape;
