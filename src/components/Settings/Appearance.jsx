import {
  Divider,
  Slider,
  Space,
  Switch,
  Tooltip,
  Typography,
} from "@arco-design/web-react";

import { useAtomValue } from "jotai";
import { applyColor, colors, getColorValue } from "../../utils/colors";

import { configAtom } from "../../atoms/configAtom";
import { useConfig } from "../../hooks/useConfig";
import "./Appearance.css";

const Appearance = () => {
  const { updateConfig } = useConfig();
  const {
    articleWidth,
    fontSize,
    layout,
    showDetailedRelativeTime,
    showFeedIcon,
    themeColor,
  } = useAtomValue(configAtom);

  const handleConfigChange = (configChanges) => {
    updateConfig(configChanges);
    if (configChanges.themeColor) {
      applyColor(configChanges.themeColor);
    }
  };

  return (
    <>
      <div className="setting-row">
        <div>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            Accent color
          </Typography.Title>
          <Typography.Text type="secondary">
            Choose your accent color
          </Typography.Text>
        </div>
        <div style={{ display: "flex" }}>
          {Object.keys(colors).map((colorName) => (
            <Tooltip content={colorName} key={colorName}>
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  margin: "2px",
                  backgroundColor: getColorValue(colorName),
                  cursor: "pointer",
                  border: "3px solid var(--color-bg-3)",
                  outline:
                    colorName === themeColor
                      ? `1px solid ${getColorValue(colorName)}`
                      : "none",
                }}
                onClick={() => handleConfigChange({ themeColor: colorName })}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleConfigChange({ themeColor: colorName });
                  }
                }}
                aria-label={`Change theme color to ${colorName}`}
              />
            </Tooltip>
          ))}
        </div>
      </div>

      <Divider />
      <div className="setting-row">
        <div>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            Compact article list
          </Typography.Title>
          <Typography.Text type="secondary">
            Use small thumbnail in article list
          </Typography.Text>
        </div>
        <div>
          <Switch
            checked={layout === "small"}
            onChange={(value) =>
              handleConfigChange({ layout: value ? "small" : "large" })
            }
          />
        </div>
      </div>
      <Divider />
      <div className="setting-row">
        <div>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            Show detailed relative time
          </Typography.Title>
          <Typography.Text type="secondary">
            Show detailed relative time in article list
          </Typography.Text>
        </div>
        <div>
          <Switch
            checked={showDetailedRelativeTime}
            onChange={(value) =>
              handleConfigChange({ showDetailedRelativeTime: value })
            }
          />
        </div>
      </div>
      <Divider />
      <div className="setting-row">
        <div>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            Show feed icon
          </Typography.Title>
          <Typography.Text type="secondary">
            Show feed icon in feed list and article list
          </Typography.Text>
        </div>
        <div>
          <Switch
            checked={showFeedIcon}
            onChange={(value) => handleConfigChange({ showFeedIcon: value })}
          />
        </div>
      </div>
      <Divider />
      <div className="setting-row">
        <div>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            Font size
          </Typography.Title>
          <Typography.Text type="secondary">
            Adjust article text size
          </Typography.Text>
        </div>
        <div>
          <Space>
            <Typography.Text style={{ fontSize: "0.75rem" }}>A</Typography.Text>
            <Slider
              formatTooltip={(value) => `${value}rem`}
              max={1.25}
              min={0.75}
              showTicks
              step={0.05}
              style={{ width: 200 }}
              value={fontSize}
              onChange={(value) => handleConfigChange({ fontSize: value })}
            />
            <Typography.Text style={{ fontSize: "1.25rem" }}>A</Typography.Text>
          </Space>
        </div>
      </div>
      <Divider />
      <div className="setting-row">
        <div>
          <Typography.Title heading={6} style={{ marginTop: 0 }}>
            Article width
          </Typography.Title>
          <Typography.Text type="secondary">
            Adjust article width
          </Typography.Text>
        </div>
        <div>
          <Space>
            <Typography.Text>60%</Typography.Text>
            <Slider
              formatTooltip={(value) => `${value}%`}
              max={90}
              min={60}
              showTicks
              step={10}
              style={{ width: 160 }}
              value={articleWidth}
              onChange={(value) => handleConfigChange({ articleWidth: value })}
            />
            <Typography.Text>90%</Typography.Text>
          </Space>
        </div>
      </div>
    </>
  );
};

export default Appearance;
