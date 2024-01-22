import { useResponseContext } from "src/contexts/hooks";
import "./incoming.scss";
import Button from "src/components/shared/Button";

export const DEMO_QUERIES = {
  a: "What is the best time to visit Kashmir ?",
  b: "Is visa required for Indians to visit Thailand ?",
  c: "How long a Europe tour should be ?",
  d: "What are places to visit as a tourist in France ?",
};
const PlaceholderMessage = () => {
  const { initializeQuery }: any = useResponseContext();
  return (
    <div className="d-flex flex-1 h-100 flex-col">
      <p className="anim-typing text-darkGrey font_16_600 mb-8">
        Howdy! <br /> Let me help you plan your trip with ease. <br />
        Ask anything or select any option below
        <br />
      </p>
      <div className="mt-8 mb-8">
        <Button variant="b" onClick={() => initializeQuery(DEMO_QUERIES.a)}>
          {DEMO_QUERIES.a}
        </Button>
      </div>
      <div className="mt-8">
        <Button variant="b" onClick={() => initializeQuery(DEMO_QUERIES.b)}>
          {DEMO_QUERIES.b}
        </Button>
      </div>
    </div>
  );
};

export default PlaceholderMessage;
