// 文章页 markdown 表格动态解析
// 扫描 .article-content 内的 <p> 标签，把以 | 开头的连续段落转换成 <table>
(function () {
  function parseTables() {
    var content = document.querySelector('.article-content');
    if (!content) return;

    // 找所有以 | 开头的 <p> 标签
    var ps = content.querySelectorAll('p');
    var tableGroups = [];
    var currentGroup = [];

    for (var i = 0; i < ps.length; i++) {
      var p = ps[i];
      var text = p.textContent.trim();
      if (text.charAt(0) === '|' && text.charAt(text.length - 1) === '|') {
        currentGroup.push(p);
      } else {
        if (currentGroup.length >= 2) {
          tableGroups.push(currentGroup);
        }
        currentGroup = [];
      }
    }
    if (currentGroup.length >= 2) tableGroups.push(currentGroup);

    tableGroups.forEach(function (group) {
      // 解析表格行
      var rows = group.map(function (p) {
        var text = p.textContent.trim();
        // 去掉首尾 |
        if (text.charAt(0) === '|') text = text.substring(1);
        if (text.charAt(text.length - 1) === '|') text = text.substring(0, text.length - 1);
        return text.split('|').map(function (c) { return c.trim(); });
      });

      // 检测分隔行
      var hasSep = false;
      var dataRows = [];
      var headerRow = rows[0];
      for (var ri = 1; ri < rows.length; ri++) {
        if (rows[ri].every(function (c) { return /^[-:\s]*$/.test(c); })) {
          hasSep = true;
        } else {
          dataRows.push(rows[ri]);
        }
      }

      // 生成 table
      var table = document.createElement('table');
      table.className = 'art-table';
      var thead = document.createElement('thead');
      var tr = document.createElement('tr');
      headerRow.forEach(function (c) {
        var th = document.createElement('th');
        th.innerHTML = c;
        tr.appendChild(th);
      });
      thead.appendChild(tr);
      table.appendChild(thead);

      var tbody = document.createElement('tbody');
      dataRows.forEach(function (row) {
        var tr2 = document.createElement('tr');
        for (var ci = 0; ci < headerRow.length; ci++) {
          var td = document.createElement('td');
          td.innerHTML = row[ci] || '';
          tr2.appendChild(td);
        }
        tbody.appendChild(tr2);
      });
      table.appendChild(tbody);

      // 替换：在第一个 p 前插入 table，删除所有 p
      group[0].parentNode.insertBefore(table, group[0]);
      group.forEach(function (p) { p.remove(); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', parseTables);
  } else {
    parseTables();
  }
})();
