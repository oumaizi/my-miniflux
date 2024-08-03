import { Button, Input, Select, Tooltip } from "@arco-design/web-react";
import {
  IconSortAscending,
  IconSortDescending,
} from "@arco-design/web-react/icon";
import { useConfig } from "../../hooks/useConfig";

import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { configAtom } from "../../atoms/configAtom";
import { filterStringAtom, filterTypeAtom } from "../../atoms/contentAtom";
import { useScreenWidth } from "../../hooks/useScreenWidth";
import "./SearchAndSortBar.css";

const SearchAndSortBar = () => {
  const { belowMd } = useScreenWidth();

  const config = useAtomValue(configAtom);
  const { updateConfig } = useConfig();
  const { orderDirection } = config;

  const [filterString, setFilterString] = useAtom(filterStringAtom);
  const [filterType, setFilterType] = useAtom(filterTypeAtom);

  const toggleOrderDirection = () => {
    const newOrderDirection = orderDirection === "desc" ? "asc" : "desc";
    updateConfig({ orderDirection: newOrderDirection });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setFilterType("title");
    setFilterString("");
  }, []);

  return (
    <div className="search-and-sort-bar">
      <Input.Search
        allowClear
        onChange={setFilterString}
        placeholder="Search..."
        style={{ width: belowMd ? "100%" : 278, marginLeft: 8 }}
        value={filterString}
        addBefore={
          <Select
            placeholder="Select type"
            onChange={setFilterType}
            style={{ width: 100 }}
            value={filterType}
          >
            <Select.Option value="title">Title</Select.Option>
            <Select.Option value="content">Content</Select.Option>
            <Select.Option value="author">Author</Select.Option>
          </Select>
        }
      />
      <Tooltip
        mini
        content={orderDirection === "desc" ? "Newest first" : "Oldest first"}
      >
        <Button
          shape="circle"
          size="small"
          style={{ margin: "0 8px", flexShrink: 0 }}
          icon={
            orderDirection === "desc" ? (
              <IconSortDescending />
            ) : (
              <IconSortAscending />
            )
          }
          onClick={toggleOrderDirection}
        />
      </Tooltip>
    </div>
  );
};

export default SearchAndSortBar;
