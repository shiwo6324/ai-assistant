# 模型和关系

## User (用户)

`User` 模型表示系统中的用户。

### 关系

- 一个用户可以有多个 `Domain`（域）。
- 一个用户可以有多个 `Campaign`（活动）。
- 一个用户可以有一个 `Billings`（账单）。

### 示例

一个用户可能是一个拥有多个网站的管理员。

---

## Domain (域)

`Domain` 模型表示一个域或网站。

### 关系

- 一个域可以有一个 `ChatBot`（聊天机器人）。
- 一个域可以有多个 `HelpDesk`（帮助台）。
- 一个域可以有多个 `FilterQuestions`（过滤问题）。
- 一个域可以有多个 `Product`（产品）。
- 一个域可以有多个 `Customer`（客户）。
- 一个域属于一个 `User`。
- 一个域可以属于一个 `Campaign`。

### 示例

一个域可能是一个电商网站，包含了产品、客户、帮助台功能等。

---

## ChatBot (聊天机器人)

`ChatBot` 模型表示一个域的聊天机器人。

### 关系

- 一个聊天机器人属于一个域。

### 示例

一个网站的聊天机器人可以帮助用户解答常见问题。

---

## Billings (账单)

`Billings` 模型表示用户的账单信息。

### 关系

- 一个账单属于一个用户。

### 示例

用户的账单信息包括他们订阅的计划和可用的积分。

---

## HelpDesk (帮助台)

`HelpDesk` 模型表示帮助台问题和答案。

### 关系

- 一个帮助台问题属于一个域。

### 示例

网站的帮助台包含常见问题及其答案。

---

## FilterQuestions (过滤问题)

`FilterQuestions` 模型表示用于过滤的问题。

### 关系

- 一个过滤问题属于一个域。

### 示例

网站上的过滤问题用于在客户搜索时提供帮助。

---

## CustomerResponses (客户回复)

`CustomerResponses` 模型表示客户对问题的回复。

### 关系

- 一个客户回复属于一个 `Customer`。

### 示例

客户可以回复聊天机器人提出的问题。

---

## Customer (客户)

`Customer` 模型表示一个客户。

### 关系

- 一个客户可以有多个 `CustomerResponses`（客户回复）。
- 一个客户可以有多个 `ChatRoom`（聊天房间）。
- 一个客户可以有多个 `Bookings`（预订）。
- 一个客户属于一个域。

### 示例

客户在网站上进行交互，提出问题，进行预订等。

---

## ChatRoom (聊天房间)

`ChatRoom` 模型表示客户与支持人员的聊天房间。

### 关系

- 一个聊天房间属于一个客户。
- 一个聊天房间可以有多个 `ChatMessage`（聊天消息）。

### 示例

客户在网站上与支持人员进行聊天。

---

## ChatMessage (聊天消息)

`ChatMessage` 模型表示聊天房间中的一条消息。

### 关系

- 一个聊天消息属于一个聊天房间。

### 示例

聊天房间中的每条消息。

---

## Bookings (预订)

`Bookings` 模型表示客户的预订信息。

### 关系

- 一个预订属于一个客户。
- 一个预订可以属于一个域。

### 示例

客户可以在网站上进行服务预订。

---

## Campaign (活动)

`Campaign` 模型表示市场活动。

### 关系

- 一个活动属于一个用户。
- 一个活动可以涉及多个域。

### 示例

用户可以为多个网站发起市场活动。

---

## Product (产品)

`Product` 模型表示域中的产品。

### 关系

- 一个产品属于一个域。

### 示例

电商网站上的产品。

---

## 实例说明

假设我们有一个用户 Alice，她在平台上创建了一个域 "example.com"，这个域有一个聊天机器人和一个帮助台。Alice 还创建了一些产品，并通过市场活动吸引客户。客户在网站上与聊天机器人互动，提出问题，并进行产品购买和预订。系统通过这些模型来管理和存储所有这些信息。

## 主要功能

- **注册表单处理**：使用 `useForm` 和 `zodResolver` 来处理表单提交和验证。
- **管理当前聊天机器人**：使用 `useState` 存储和管理当前聊天机器人的信息。
- **滚动消息窗口到底部**：使用 `useRef` 引用消息窗口元素，并在消息更新时自动滚动到底部。
- **切换聊天机器人窗口的打开状态**：通过 `useState` 存储并管理聊天机器人窗口的打开状态。
- **处理聊天消息的发送和接收**：管理用户和聊天机器人的消息交互。
- **动态调整窗口大小**：根据聊天机器人窗口的打开状态调整窗口大小。
- **实时聊天功能**：管理和处理实时聊天模式。
- **不同网页通信**:向父窗口发送消息，用于跨窗口通信。

## 实例说明

假设你有一个聊天机器人窗口，需要在用户交互时自动滚动、动态调整大小、发送和接收消息，通过 useChatBot Hook 可以简化这些逻辑的管理。

## 不同网页的通信实现

### 整理后的描述

应用启动时，在 `chatbot` 组件的 `useEffect` 中会触发 `postMessage` 事件。此事件会通知 `iframe` 动态调整其宽度和高度。随后，`iframe` 的 `message` 事件监听器会被触发，从而设置 `iframe` 的尺寸，并调用 `postMessage` 向 `chatbot` 组件传递当前的 `domainId`。

### 详细解释

1. **触发 `postMessage`**：

   - 在 `chatbot` 组件的 `useEffect` 中，应用会向嵌入的 `iframe` 发送一个 `postMessage` 事件。
   - 该事件用于通知 `iframe` 组件需要调整其宽高。

2. **`iframe` 监听 `message` 事件**：

   - `iframe` 组件中有一个 `message` 事件监听器，当接收到来自 `chatbot` 组件的 `postMessage` 事件时，该监听器会被触发。
   - `iframe` 通过解析事件数据，动态调整自身的宽度和高度，以适应内容的变化。

3. **向 `chatbot` 组件传递 `domainId`**：
   - 调整完尺寸后，`iframe` 组件会使用 `postMessage` 事件将当前的 `domainId` 传递回 `chatbot` 组件。
   - `chatbot` 组件通过监听 `message` 事件，接收并处理来自 `iframe` 的 `domainId`，以继续后续操作。

通过这些步骤，确保了嵌入的 `iframe` 能够根据内容动态调整尺寸，并且能够与主应用程序进行有效的双向通信。
