import React from "react";

const Text = (props) => {
  const { content, size, weight, color, p, m, align } = props;
  return (
    <p
      style={{
        fontSize: size ? size : null,
        fontWeight: weight ? weight : null,
        color: color ? color : "#000000",
        padding: p ? p : null,
        margin: m ? m : null,
        textAlign: align ? align : null,
      }}
    >
      {content ? content : ""}
    </p>
  );
};

export default Text;
