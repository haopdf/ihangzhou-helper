// 简单功能验证测试
console.log("开始功能验证...");

// 模拟DOM查询函数
function $(selector) {
    return {
        value: '',
        addEventListener: (event, callback) => {},
        style: {}
    };
}

// 测试主题切换逻辑
function testThemeToggle() {
    var state = { theme: 'light' };
    
    function toggleTheme() {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        return state.theme;
    }
    
    var originalTheme = state.theme;
    var newTheme = toggleTheme();
    
    console.log("主题切换测试:", originalTheme !== newTheme ? "✅ 通过" : "❌ 失败");
    console.log(`从 ${originalTheme} 切换到 ${newTheme}`);
}

// 测试搜索功能
function testSearchLogic() {
    var testData = [
        { name: "身份证办理", desc: "首次申领/补办/换证" },
        { name: "社保查询", desc: "浙里办/支付宝查询" },
        { name: "公积金查询", desc: "余额/提取/贷款" }
    ];
    
    function searchItems(query) {
        return testData.filter(function(item) {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 || 
                   item.desc.toLowerCase().indexOf(query.toLowerCase()) >= 0;
        });
    }
    
    var results = searchItems("社保");
    console.log("搜索功能测试:", results.length === 1 && results[0].name === "社保查询" ? "✅ 通过" : "❌ 失败");
    console.log(`搜索"社保"找到 ${results.length} 个结果`);
}

// 测试计算器逻辑
function testCalculatorLogic() {
    function calcTax(salary) {
        var taxable = Math.max(0, salary - 5000);
        var tax = 0;
        if (taxable <= 3000) {
            tax = taxable * 0.03;
        } else if (taxable <= 12000) {
            tax = taxable * 0.10 - 210;
        }
        return Math.max(0, tax);
    }
    
    var testSalary = 8000;
    var expectedTax = (8000 - 5000) * 0.03; // 90
    var actualTax = calcTax(testSalary);
    
    console.log("个税计算测试:", Math.abs(actualTax - expectedTax) < 0.01 ? "✅ 通过" : "❌ 失败");
    console.log(`工资 ${testSalary} 的个税为 ${actualTax.toFixed(2)}`);
}

// 运行所有测试
testThemeToggle();
testSearchLogic();
testCalculatorLogic();

console.log("\n🎯 所有基本功能验证完成!");