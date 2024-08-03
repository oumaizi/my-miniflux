import { Card, Skeleton } from "@arco-design/web-react";

import { useAtomValue } from "jotai";
import { configAtom } from "../../atoms/configAtom";
import "./LoadingCards.css";

const LoadingCards = ({ loading }) => {
  const { layout } = useAtomValue(configAtom);
  const cardCount = layout === "large" ? 2 : 4;

  const renderCard = (index) => (
    <Card
      className="card-style"
      cover={layout === "large" ? <div className="card-cover-style" /> : null}
      key={index}
    >
      <Card.Meta
        description={
          <Skeleton
            loading={loading}
            animation={true}
            text={{ rows: 3, width: 150 }}
          />
        }
      />
    </Card>
  );

  return loading
    ? Array.from({ length: cardCount }, (_, i) => renderCard(i))
    : null;
};

export default LoadingCards;
