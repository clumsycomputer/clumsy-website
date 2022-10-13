import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export default MobileDevPage;

function MobileDevPage() {
  const [viewportHeight, setViewportHeight] = useState(0);
  useEffect(() => {
    if (window?.visualViewport) {
      setViewportHeight(window.visualViewport!.height);
      window.visualViewport!.addEventListener("resize", () => {
        console.log("b");
        console.log(window.visualViewport!.height);
        setViewportHeight(window.visualViewport!.height);
      });
    }
  }, []);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    });
  }, []);
  // const disallowMobileScrollHandler = useMemo(() => {
  //   return (someTouchEvent: TouchEvent) => {
  //     someTouchEvent.preventDefault();
  //   };
  // }, []);
  return (
    <div
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: viewportHeight,
      }}
    >
      <div
        style={{
          flexGrow: 1,
          padding: 8,
          backgroundColor: "grey",
          border: "solid 8px black",
        }}
      >
        <input
        // onFocus={() => {
        //   console.log(window.visualViewport!.height);
        //   setViewportHeight(window.visualViewport!.height);
        // }}
        // onBlur={() => {
        //   console.log(window.visualViewport!.height);
        //   setViewportHeight(window.visualViewport!.height);
        // }}
        />
      </div>
    </div>
  );
}
