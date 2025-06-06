# 中英文智能排版转换器

本项目是一个轻量级的网页工具，旨在帮助用户快速、智能地转换中英文混排文本中的标点符号，并进行基本的排版优化。它还允许用户自定义词汇替换规则，以适应特定的排版需求。

## 功能特性

* **智能标点转换**：
    * 自动将文本中的英文标点符号（如 `,`, `.`, `?`, `!`, `:`, `;`, `'`, `( )`, `[ ]`, `{ }`）转换为对应的中文全角标点符号（如 `，`, `。`, `？`, `！`, `：`, `；`, `’`, `（ ）`, `【 】`, `｛ ｝`）。
    * 正确处理中英文引号的配对转换（`"` -> `“ ”`）。
    * 将连续的多个英文句点 `...` 转换成中文省略号 `……`。
* **格式保留**：
    * **网址 (URLs)**：自动识别并完整保留网址格式，不转换其中的标点。
    * **特定图片格式**：识别并保留形如 `![[@meta/pictures/image.png]]` 的图片占位符。
    * **纯英文单词**：纯英文单词内部的标点（如有）通常不作转换，以保持其原貌。
    * **数字序号/序列**：智能识别并保留常见的数字序号格式，如 `1.`, `1.23`, `Fig1`, `A.1.`, `v2.0` 等，防止错误转换。
* **自定义转换规则**：
    * 用户可以添加自定义的原文和替换文规则（例如，将 "AI" 自动替换为 "人工智能"）。
    * 自定义规则会保存在浏览器的 `localStorage` 中，关闭浏览器后规则依然存在，方便长期使用。
    * 用户可以随时添加、查看和删除自定义规则。
* **用户界面**：
    * 采用左右分栏布局，用户可以同时看到输入文本和转换后的输出文本，方便即时对比。
    * 界面简洁、美观大方，操作直观。
    * 响应式设计，适应不同屏幕尺寸。

## 亮点

* **核心转换逻辑稳定**：特别针对网址和复杂数字序号的保留进行了优化，确保这些关键信息在排版转换过程中不被错误处理。
* **高度可定制**：自定义词汇替换功能使得工具能更好地适应个性化和专业领域的排版需求。
* **持久化规则**：自定义规则的本地存储极大提升了用户再次使用时的便捷性。
* **前端实现，无需后端**：纯 HTML, CSS, JavaScript 实现，直接在浏览器中运行，无需安装或依赖服务器。
* **代码注释清晰**：方便开发者理解和二次开发。

## 应用场景

* **内容编辑与校对**：快速规范化中英文混排稿件中的标点符号，提升阅读体验。
* **笔记整理**：将从不同来源复制粘贴的文本（可能包含不规范的标点）统一格式化。
* **技术文档撰写**：处理包含大量英文术语、代码示例、网址和版本号的文档，确保格式正确。
* **个人知识库管理**：在 Notion、Obsidian 等笔记软件中，对导入或撰写的含有特殊格式（如双链图片格式）的内容进行排版优化。
* **任何需要进行中英文标点规范化和简单词汇替换的文本处理任务**。

## 如何使用

1.  该工具部署在 Vercel 上，点击 [地址](https://punctuation-converter-chi.vercel.app) 使用。
2.  在左侧“输入文本”框中粘贴或输入需要处理的文本。
3.  (可选) 在“自定义转换规则”区域添加您需要的词汇替换规则。
4.  点击“一键转换”按钮。
5.  在右侧“转换后文本”框中查看和复制处理结果。

## 界面一览

![CleanShot 2025-05-25 at 17 02 27@2x](https://github.com/user-attachments/assets/4f4135ac-cbc7-45bb-bc27-b924806934c6)


# 欢迎关注！！！来聊天，来玩耍～

<img src="https://github.com/user-attachments/assets/838e8f24-3b7c-409b-ad46-e53749ae423a" width="300">
