import { forwardRef } from "react";

const HtmlText = forwardRef(({ html, id, fontSize, letterSpacing, fontWeight, fontFamily, lineHeight }: any, ref: any) => {

  console.log(html, 'html')
  // console.log(id, 'id')
  return (
    <div
      id={`htmltext_${id}`}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        position: "fixed",
        overflow: "hidden",
        left: "100000px",
        top: "100000px",
        fontSize: fontSize, 
        letterSpacing: letterSpacing,
        fontWeight: fontWeight,
        fontFamily: fontFamily,
        lineHeight: lineHeight,
        border: 'none',
        padding: '0px',
      }}
      ref={ref}
    ></div>
  );
});

export default HtmlText;
