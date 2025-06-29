# Hsuan's Space

## 友链添加说明

### 基本要求

- 网站内容健康，无违法违规内容
- 网站以原创内容为主
- 确保网站能够正常访问

### 数据格式

友链数据存放在 `src/data/friends.ts` 文件中，格式如下：

```typescript
export interface FriendLink {
	href: string;    // 网站链接
	name: string;    // 网站名称
	desc?: string;   // 网站描述（可选）
	icon?: string;   // 图标名称（可选，使用 Iconify 图标）
}
```

其中，`icon`可以从 [Icônes](https://icones.netlify.app/) 上寻找合适的。

### 添加方式

1. Fork 本仓库
2. 在 `src/data/friends.ts` 中的 `friendLinks` 数组中添加你的网站信息
3. 提交 Pull Request

### 示例

```json5
{
  "href": "https://example.com",
  "name": "Name",
  "desc": "Description", // 可选
  "icon": "tabler:world" // 可选，使用 Iconify 图标
}
```

### 我的友链信息

如果你想添加本站到你的友链，可以使用以下信息：

- 名称：Hsuan's Space
- 链接：https://quarkpixel.github.io/

### 注意事项

- 请确保提供的信息准确无误
- 建议添加网站描述，让访客更好地了解你的网站
- 图标推荐使用 [Icônes](https://icones.netlify.app/) 中的图标
- 提交 PR 前请确保数据格式正确，且能通过 TypeScript 类型检查
