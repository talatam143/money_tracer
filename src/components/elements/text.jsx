import React from "react";

const Text = (props) => {
  const {
    content,
    size,
    weight,
    color,
    p,
    m,
    align,
    background,
    borderRadius,
    width,
    lineheight,
    position,
  } = props;
  return (
    <p
      style={{
        fontSize: size ? size : null,
        fontWeight: weight ? weight : null,
        color: color ? color : null,
        padding: p ? p : null,
        margin: m ? m : null,
        textAlign: align ? align : null,
        backgroundColor: background ? background : null,
        borderRadius: borderRadius ? borderRadius : null,
        width: width || null,
        lineHeight: lineheight || null,
        position: position || null,
      }}
    >
      {content ? content : ""}
    </p>
  );
};

export default Text;
