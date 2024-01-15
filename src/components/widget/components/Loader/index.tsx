import { useEffect, useRef } from "react";

const ResponseLoader = (props: any) => {
  const LoaderRef = useRef({});
  useEffect(() => {
    if (props.show) {
      const loader = LoaderRef.current;
      loader.scrollIntoView(false, {
        behavior: "smooth",
      });
    }
  }, [props.show]);
  if (!props.show) return null;
  return (
    <div ref={LoaderRef} className="p-10 b-1">
      Loading response .. . . . .{" "}
    </div>
  );
};

export default ResponseLoader;
