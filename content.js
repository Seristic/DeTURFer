const replacements = [
    {
        pattern: /\bReform UK\b/gi,
        replacement: "🚫 Bigot Alert"
    },
    {
        pattern: /\bNigel Farage\b/gi,
        replacement: "🗑️ Fascist Dad"
    },
    {
        pattern: /\bgender ideology\b/gi,
        replacement: "🚩 Transphobic Dogwhistle"
    }
];

function walkAndReplace(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue;
        for (const { pattern, replacement } of replacements) {
            if (pattern.test(text)) {
                text = text.replace(pattern, replacement);
            }
        }
        node.nodeValue = text;
    } else {
        for (let child of node.childNodes) {
            walkAndReplace(child);
        }
    }
}

function blurText(textNode, match) {
    const span = document.createElement("span");
    span.className = "blur-transphobia";
    span.title = "Censored Transphobia";
    span.textContent = match;
    textNode.parentNode.replaceChild(span, textNode);
}

function censorDOM(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        replacements.forEach(({ pattern }) => {
            const match = text.match(pattern);
            if (match) blurText(node, match[0]);
        });
    } else {
        node.childNodes.forEach(censorDOM);
    }
}

walkAndReplace(document.body);