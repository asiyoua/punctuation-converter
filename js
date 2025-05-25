// script.js
"use strict"; // 启用严格模式，有助于捕获常见错误 [24]

document.addEventListener('DOMContentLoaded', () => {
    // DOM 元素获取 (缓存DOM查询结果，提高性能)
    const inputTextElem = document.getElementById('inputText');
    const outputTextElem = document.getElementById('outputText');
    const convertButton = document.getElementById('convertButton');
    const findInputElem = document.getElementById('findInput');
    const replaceInputElem = document.getElementById('replaceInput');
    const addRuleButton = document.getElementById('addRuleButton');
    const rulesListContainer = document.getElementById('rulesListContainer');
    const noRulesMessage = document.getElementById('noRulesMessage');

    let customRules =; // 存储自定义规则的数组

    // --- 规则管理功能 ---

    /**
     * 从 localStorage 加载规则
     * @returns {Array} 解析后的规则数组，如果localStorage中没有则返回空数组
     */
    const loadRulesFromStorage = () => {
        try {
            const storedRules = localStorage.getItem('customRules');
            return storedRules? JSON.parse(storedRules) :; // [6, 7]
        } catch (error) {
            console.error("从localStorage加载规则失败:", error); // [24]
            return; // 发生错误时返回空数组，保证程序健壮性
        }
    };

    /**
     * 将规则保存到 localStorage
     */
    const saveRulesToStorage = () => {
        try {
            localStorage.setItem('customRules', JSON.stringify(customRules)); // [6, 7]
        } catch (error) {
            console.error("保存规则到localStorage失败:", error);
            // 可以考虑给用户一些反馈，例如提示保存失败
        }
    };

    /**
     * 渲染规则列表到UI
     * 此函数会清空现有列表并根据 customRules 数组重新生成所有规则项
     */
    const renderRulesList = () => {
        rulesListContainer.innerHTML = ''; // 清空现有列表

        if (customRules.length === 0) {
            noRulesMessage.style.display = 'block'; // 显示“暂无规则”提示
            return;
        }
        noRulesMessage.style.display = 'none'; // 隐藏提示

        customRules.forEach((rule, index) => {
            const listItem = document.createElement('li');
            listItem.dataset.ruleIndex = index; // 存储索引，便于删除

            // 创建规则文本显示部分
            const ruleTextSpan = document.createElement('span');
            ruleTextSpan.classList.add('rule-text');
            
            const findSpan = document.createElement('span');
            findSpan.classList.add('rule-find');
            findSpan.textContent = rule.find;

            const arrowSpan = document.createElement('span');
            arrowSpan.classList.add('rule-arrow');
            arrowSpan.textContent = '➔';
            
            const replaceSpan = document.createElement('span');
            replaceSpan.textContent = rule.replace;

            ruleTextSpan.appendChild(findSpan);
            ruleTextSpan.appendChild(arrowSpan);
            ruleTextSpan.appendChild(replaceSpan);
            
            listItem.appendChild(ruleTextSpan);
            
            // 规则项点击删除功能 (使用事件委托可能更优，但此处为简化直接绑定)
            // 为了响应用户的需求（点击规则可删除），整个li项都可点击
            listItem.addEventListener('click', () => {
                removeRule(index);
            });

            rulesListContainer.appendChild(listItem);
        });
    };

    /**
     * 添加新规则
     * @param {string} findText - 要查找的文本
     * @param {string} replaceText - 要替换的文本
     */
    const addRule = (findText, replaceText) => {
        if (!findText.trim()) { // 不允许添加空的查找规则
            alert("“查找的词汇”不能为空！");
            return;
        }
        customRules.push({ find: findText, replace: replaceText });
        saveRulesToStorage();
        renderRulesList();
        findInputElem.value = ''; // 清空输入框
        replaceInputElem.value = '';
        findInputElem.focus(); // 将焦点移回查找输入框
    };

    /**
     * 删除指定索引的规则
     * @param {number} index - 要删除规则的索引
     */
    const removeRule = (index) => {
        if (index >= 0 && index < customRules.length) {
            customRules.splice(index, 1); // 从数组中移除规则
            saveRulesToStorage();
            renderRulesList();
        }
    };

    // --- 文本转换功能 ---

    /**
     * 应用自定义规则转换文本
     * @param {string} text - 待转换的原始文本
     * @returns {string} 转换后的文本
     */
    const applyCustomRules = (text) => {
        if (customRules.length === 0) {
            return text; // 没有规则，直接返回原文
        }

        // 构建替换映射表和正则表达式，以避免链式替换问题 [8]
        const replacementMap = {};
        const findTerms =;

        customRules.forEach(rule => {
            // 注意：如果查找词包含正则表达式特殊字符，需要进行转义
            // 此处简化处理，假设查找词不含特殊正则字符
            // 若需处理，可使用 escapeRegExp 函数：
            // const escapedFind = escapeRegExp(rule.find);
            // findTerms.push(escapedFind);
            // replacementMap[escapedFind.toLowerCase()] = rule.replace;
            
            // 当前简化版，不处理正则特殊字符转义，且默认大小写不敏感查找
            const findKey = rule.find.toLowerCase(); // 统一转小写作为key
            if (!findTerms.includes(rule.find)) { // 避免重复的查找词（如果允许，可能需要更复杂的逻辑）
                 findTerms.push(rule.find);
            }
            replacementMap[findKey] = rule.replace;
        });
        
        if (findTerms.length === 0) return text;

        // 创建一个正则表达式，匹配所有查找词，全局且不区分大小写
        // 需要对 findTerms 中的每个词进行正则转义，防止它们包含特殊字符
        const escapedFindTerms = findTerms.map(term => 
            term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') // 转义正则特殊字符
        );
        const regex = new RegExp(escapedFindTerms.join('|'), 'gi');

        // 使用回调函数进行替换，确保基于原始匹配进行查找
        return text.replace(regex, (matched) => {
            const replacement = replacementMap[matched.toLowerCase()];
            // 如果在映射中找到了替换项，则使用它；否则（理论上不应发生），返回原始匹配项
            return typeof replacement!== 'undefined'? replacement : matched;
        });
    };

    // --- 事件监听器 ---

    // 添加规则按钮点击事件
    addRuleButton.addEventListener('click', () => {
        const findText = findInputElem.value;
        const replaceText = replaceInputElem.value;
        addRule(findText, replaceText);
    });
    
    // 允许通过回车键添加规则
    replaceInputElem.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addRuleButton.click();
        }
    });
     findInputElem.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            replaceInputElem.focus(); // 如果在查找框按回车，则聚焦到替换框
        }
    });


    // 开始转换按钮点击事件
    convertButton.addEventListener('click', () => {
        const originalText = inputTextElem.value;
        const convertedText = applyCustomRules(originalText);
        outputTextElem.value = convertedText;
    });

    // --- 初始化 ---
    customRules = loadRulesFromStorage(); // 页面加载时加载规则
    renderRulesList(); // 并渲染到列表

}); // DOMContentLoaded 结束
