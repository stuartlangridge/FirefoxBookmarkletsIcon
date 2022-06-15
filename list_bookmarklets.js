/* jshint esversion: 11 */
let ul = document.querySelector("ul");
let pre = document.querySelector("pre");
let add = document.getElementById("add");
add.onclick = () => {
    browser.tabs.create({
        url: `https://support.mozilla.org/en-US/kb/bookmarklets-perform-common-web-page-tasks`
    });
};

let bookmarklets = [];
browser.tabs.getCurrent().then(t => {
    browser.bookmarks.getTree().then(roots => {
        function walk(node, level) {
            if (node.url && node.url.toLowerCase().startsWith("javascript:")) {
                bookmarklets.push(node);
            }
            if (node.children) {
                node.children.forEach(n => {
                    walk(n, level + 1);
                });
            }
        }
        roots.forEach(root => {
            walk(root, 0);
        });
        bookmarklets.sort((a, b) => { return a.title.localeCompare(b.title); });
        bookmarklets.forEach(node => {
            let li = document.createElement("li");
            let button = document.createElement("button");
            button.title = node.title;
            button.append(node.title);
            button.onclick = async () => {
                browser.tabs.executeScript({
                    code: node.url.replace(/^javascript:/i, "")
                });
            };
            li.append(button);
            ul.insertBefore(li, add.parentNode);
        });
    }, error => {
        console.error("error", error);
    });
});
