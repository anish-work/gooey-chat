import { useResponseContext } from "src/App";
import "./incoming.scss";

export const DEMO_QUERIES = {
  a: "What is the best time to visit Kashmir ?",
  b: "Is visa required for Indians to visit Thailand ?",
  c: "How long a Europe tour should be ?",
  d: "What are places to visit as a tourist in France ?",
};
const PlaceholderMessage = () => {
  const { initializeQuery } = useResponseContext();
  return (
    <div className="d-flex flex-1 h-100 flex-col">
      <p className="anim-typing text-darkGrey font_18_600">
        Howdy! Let me help you plan your trip with ease. <br />
        Ask anything or select any option below
        <br />
      </p>
      <div>
        <button
          onClick={() => initializeQuery(DEMO_QUERIES.a)}
          className="medium mt-10 cr-pointer b-none p-12 button-hover"
        >
          {DEMO_QUERIES.a}
        </button>
      </div>
      <div>
        <button
          onClick={() => initializeQuery(DEMO_QUERIES.b)}
          className="medium mt-10 cr-pointer b-none p-12 button-hover"
        >
          {DEMO_QUERIES.b}
        </button>
      </div>
    </div>
  );
};

export default PlaceholderMessage;
