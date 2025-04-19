# Tariff-NJS

**Tariff-NJS** 是一个恶搞的 Node.js 包，用于给 `require` 函数添加“关税”。通过配置关税比例，指定的模块在被 `require` 导入时会增加额外的耗时，模拟“关税”效果。

## 功能

- **动态关税**：为指定模块设置关税比例，影响其导入耗时。
- **实时调整**：支持动态增加或移除关税配置。
- **简单易用**：通过简单的 API 调用即可实现关税功能。

## 安装

```bash
npm install tariff-njs
```

## 使用示例

```javascript
const tariff = require("tariff-njs");
const { percent } = require("tariff-njs");

// 为模块设置关税比例
tariff.increaseBy({
    axios: percent(200) // 设置 axios 模块的关税为 200%
});

// 测试导入耗时
console.log(
    "导入 axios 的耗时：",
    tariff.timer(() => require("axios"))
);

// 移除关税配置
tariff.cancel("axios");
```

## API

### `increaseBy(newConfig: Configer): Configer`
为指定模块设置关税比例。

- `newConfig`：一个对象，键为模块名，值为关税比例（如 `percent(200)` 表示 200%）。

### `cancel(...name: string[]): boolean`
移除指定模块的关税配置。

- `name`：一个或多个模块名。

### `timer(executor: () => any): number`
测量指定代码块的执行时间（单位：毫秒）。

### `percent(num: number): number`
将百分比转换为小数形式。

## 注意事项

- 关税耗时的实现是靠阻塞线程，会直接影响应用性能，不要在生产环境使用。

## 许可证

MIT License
> Readme written by GPT-4o